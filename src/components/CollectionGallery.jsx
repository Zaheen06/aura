import { useState, useRef, useEffect, useCallback } from 'react';

// ─── Data: group items by product family ───────────────────────────────────
const MODELS = [
  {
    id: 'nova',
    name: 'NOVA X',
    tagline: 'Reference-grade sound. Sculptural form.',
    accentHex: '#C9A84C',         // warm gold
    accentRgb: '201,168,76',
    items: [
      { src: '/nova_gold.png',   label: 'Gold',   tag: 'Signature' },
      { src: '/nova_cognac.png', label: 'Cognac', tag: 'Limited' },
    ],
  },
  {
    id: 'pulse',
    name: 'PULSE',
    tagline: 'Studio precision meets everyday comfort.',
    accentHex: '#6B8CFF',         // electric indigo
    accentRgb: '107,140,255',
    items: [
      { src: '/pulse_graphite.png', label: 'Graphite', tag: 'Core' },
      { src: '/pulse_walnut.png',   label: 'Walnut',   tag: 'Edition' },
      { src: '/pulse_sky.png',      label: 'Sky',       tag: 'Summer' },
    ],
  },
  {
    id: 'arc',
    name: 'ARC',
    tagline: '60 hours. Everywhere. No compromises.',
    accentHex: '#4ECFA8',         // mint teal
    accentRgb: '78,207,168',
    items: [
      { src: '/arc_phantom.png', label: 'Phantom', tag: 'Pro' },
      { src: '/arc_chalk.png',   label: 'Chalk',   tag: 'Core' },
      { src: '/arc_forest.png',  label: 'Forest',  tag: 'Eco' },
    ],
  },
];

// ─── Single colorway thumb ──────────────────────────────────────────────────
function ColorThumb({ item, active, accent, onClick }) {
  return (
    <button
      className={`cg-thumb ${active ? 'cg-thumb--active' : ''}`}
      onClick={onClick}
      aria-label={`View ${item.label} colorway`}
      style={{ '--accent': accent }}
    >
      <img src={item.src} alt={item.label} className="cg-thumb__img" />
      <span className="cg-thumb__label">{item.label}</span>
      {item.tag && <span className="cg-thumb__tag">{item.tag}</span>}
    </button>
  );
}

// ─── Hero card (large featured view) ───────────────────────────────────────
function HeroCard({ item, model, onOpen }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const rafRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const rect = cardRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = ((e.clientX - cx) / (rect.width / 2)) * 8;
      const dy = ((e.clientY - cy) / (rect.height / 2)) * -6;
      setTilt({ x: dx, y: dy });
    });
  }, []);

  const resetTilt = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    setTilt({ x: 0, y: 0 });
  }, []);

  // Cancel RAF on unmount
  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  return (
    <div
      ref={cardRef}
      className="cg-hero-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      style={{
        '--accent': model.accentHex,
        '--accent-rgb': model.accentRgb,
        transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
      }}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      aria-label={`Open ${item.label} full view`}
      onKeyDown={(e) => e.key === 'Enter' && onOpen()}
    >
      {/* Ambient glow behind */}
      <div className="cg-hero-card__ambient" />

      {/* Image */}
      <img
        src={item.src}
        alt={item.label}
        className="cg-hero-card__img"
        loading="eager"
        decoding="async"
        style={{
          transform: `translateX(${tilt.x * -0.5}px) translateY(${tilt.y * -0.5}px) scale(1.04)`,
        }}
      />

      {/* Bottom info */}
      <div className="cg-hero-card__info">
        <div>
          <p className="cg-hero-card__colorway">{item.label}</p>
          <p className="cg-hero-card__model">{model.name}</p>
        </div>
        <button className="cg-hero-card__expand" aria-label="Enlarge image">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
        </button>
      </div>

      {/* Corner badge */}
      {item.tag && (
        <div className="cg-hero-card__badge">{item.tag}</div>
      )}
    </div>
  );
}

// ─── Lightbox ──────────────────────────────────────────────────────────────
function Lightbox({ item, model, onClose, onPrev, onNext, counter }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape')      onClose();
      if (e.key === 'ArrowRight')  onNext();
      if (e.key === 'ArrowLeft')   onPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="cg-lightbox"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Gallery lightbox"
    >
      <div className="cg-lightbox__inner" onClick={(e) => e.stopPropagation()}>
        {/* Prev */}
        <button className="cg-lightbox__nav cg-lightbox__nav--prev" onClick={onPrev} aria-label="Previous">‹</button>

        <img src={item.src} alt={item.label} className="cg-lightbox__img" />

        <div className="cg-lightbox__meta">
          <span className="cg-lightbox__name">{item.label}</span>
          <span
            className="cg-lightbox__model"
            style={{ color: model.accentHex }}
          >{model.name}</span>
          <span className="cg-lightbox__counter">{counter}</span>
        </div>

        {/* Next */}
        <button className="cg-lightbox__nav cg-lightbox__nav--next" onClick={onNext} aria-label="Next">›</button>

        {/* Close */}
        <button className="cg-lightbox__close" onClick={onClose} aria-label="Close">✕</button>
      </div>
    </div>
  );
}

// ─── Main CollectionGallery ────────────────────────────────────────────────
export default function CollectionGallery() {
  const [activeModelIdx, setActiveModelIdx] = useState(0);
  const [activeColorIdx, setActiveColorIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen]     = useState(false);
  const [animDir, setAnimDir]               = useState('right'); // tab slide direction

  const model = MODELS[activeModelIdx];
  const item  = model.items[activeColorIdx];

  // Flat list of all items for lightbox counter
  const allItems = MODELS.flatMap((m) => m.items.map((it) => ({ ...it, modelIdx: MODELS.indexOf(m) })));
  const flatIdx = MODELS.slice(0, activeModelIdx).reduce((acc, m) => acc + m.items.length, 0) + activeColorIdx;

  const switchModel = (idx) => {
    if (idx === activeModelIdx) return;
    setAnimDir(idx > activeModelIdx ? 'right' : 'left');
    setActiveModelIdx(idx);
    setActiveColorIdx(0);
  };

  const nextItem = useCallback(() => {
    const nextFlat = (flatIdx + 1) % allItems.length;
    let count = 0;
    for (let mi = 0; mi < MODELS.length; mi++) {
      const m = MODELS[mi];
      if (nextFlat < count + m.items.length) {
        setAnimDir('right');
        setActiveModelIdx(mi);
        setActiveColorIdx(nextFlat - count);
        return;
      }
      count += m.items.length;
    }
  }, [flatIdx, allItems.length]);

  const prevItem = useCallback(() => {
    const prevFlat = (flatIdx - 1 + allItems.length) % allItems.length;
    let count = 0;
    for (let mi = 0; mi < MODELS.length; mi++) {
      const m = MODELS[mi];
      if (prevFlat < count + m.items.length) {
        setAnimDir('left');
        setActiveModelIdx(mi);
        setActiveColorIdx(prevFlat - count);
        return;
      }
      count += m.items.length;
    }
  }, [flatIdx, allItems.length]);

  return (
    <section className="cg-section" id="collection-gallery">
      {/* ── Section header ─────────────────────────────── */}
      <div className="cg-header">
        <p className="section-label">Collection / Image Gallery</p>
        <h2 className="cg-title">
          Crafted in<br />
          <span className="cg-title__accent" style={{ color: model.accentHex }}>
            {model.name}
          </span>
        </h2>
        <p className="cg-tagline">{model.tagline}</p>
      </div>

      {/* ── Model tab switcher ──────────────────────────── */}
      <div className="cg-tabs" role="tablist" aria-label="Product models">
        {MODELS.map((m, i) => (
          <button
            key={m.id}
            className={`cg-tab ${i === activeModelIdx ? 'cg-tab--active' : ''}`}
            onClick={() => switchModel(i)}
            role="tab"
            aria-selected={i === activeModelIdx}
            style={{
              '--tab-accent': m.accentHex,
              '--tab-accent-rgb': m.accentRgb,
            }}
          >
            <span className="cg-tab__name">{m.name}</span>
            <span className="cg-tab__count">{m.items.length} colorways</span>
          </button>
        ))}
      </div>

      {/* ── Main layout: hero + sidebar ─────────────────── */}
      <div
        className={`cg-layout cg-layout--slide-${animDir}`}
        key={`${activeModelIdx}-${activeColorIdx}`}
        style={{ '--accent': model.accentHex, '--accent-rgb': model.accentRgb }}
      >
        {/* Hero (large) card */}
        <div className="cg-layout__hero">
          <HeroCard
            item={item}
            model={model}
            onOpen={() => setLightboxOpen(true)}
          />
        </div>

        {/* Right sidebar: stats + colorway strip */}
        <div className="cg-layout__sidebar">
          {/* Spec pills */}
          <div className="cg-specs">
            <div className="cg-spec">
              <span className="cg-spec__val">40mm</span>
              <span className="cg-spec__key">Beryllium Driver</span>
            </div>
            <div className="cg-spec">
              <span className="cg-spec__val">−40dB</span>
              <span className="cg-spec__key">ANC Depth</span>
            </div>
            <div className="cg-spec">
              <span className="cg-spec__val">60h</span>
              <span className="cg-spec__key">Battery Life</span>
            </div>
          </div>

          {/* Divider */}
          <div className="cg-divider" />

          {/* Colorway label */}
          <p className="cg-colorway-heading">Choose Colorway</p>

          {/* Colorway thumbs */}
          <div className="cg-thumbs">
            {model.items.map((it, ci) => (
              <ColorThumb
                key={it.src}
                item={it}
                active={ci === activeColorIdx}
                accent={model.accentHex}
                onClick={() => setActiveColorIdx(ci)}
              />
            ))}
          </div>

          {/* Divider */}
          <div className="cg-divider" />

          {/* Navigation counter */}
          <div className="cg-nav-row">
            <button className="cg-nav-btn" onClick={prevItem} aria-label="Previous item">←</button>
            <span className="cg-nav-counter">
              {String(flatIdx + 1).padStart(2, '0')}
              <span className="cg-nav-counter__slash"> / </span>
              {String(allItems.length).padStart(2, '0')}
            </span>
            <button className="cg-nav-btn" onClick={nextItem} aria-label="Next item">→</button>
          </div>
        </div>
      </div>

      {/* ── Model thumbnail strip (all 3 models previewed) ── */}
      <div className="cg-model-strip">
        {MODELS.map((m, mi) => (
          <button
            key={m.id}
            className={`cg-model-card ${mi === activeModelIdx ? 'cg-model-card--active' : ''}`}
            onClick={() => switchModel(mi)}
            aria-label={`Switch to ${m.name}`}
            style={{ '--mc-accent': m.accentHex, '--mc-rgb': m.accentRgb }}
          >
            <img src={m.items[0].src} alt={m.name} className="cg-model-card__img" />
            <div className="cg-model-card__label">
              <span className="cg-model-card__name">{m.name}</span>
              <span className="cg-model-card__tag">{m.items.length} colors</span>
            </div>
            <div className="cg-model-card__glow" />
          </button>
        ))}
      </div>

      {/* ── Lightbox ─────────────────────────────────────── */}
      {lightboxOpen && (
        <Lightbox
          item={item}
          model={model}
          onClose={() => setLightboxOpen(false)}
          onNext={nextItem}
          onPrev={prevItem}
          counter={`${flatIdx + 1} / ${allItems.length}`}
        />
      )}
    </section>
  );
}
