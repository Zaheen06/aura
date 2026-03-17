// ─────────────────────────────────────────────
// ShowcasePage — The product detail overlay.
// Slides up over the homepage when a product
// is selected.
//
// Data flow:
//   - product is passed in via props (already fetched by HomePage)
//   - Color change is managed locally via activeColor state
//   - addToCart callback is passed in from App.jsx
//
// Props:
//   product    — the selected product object
//   isOpen     — controls slide-up visibility
//   onClose    — callback to close the overlay
//   onAddToCart— callback to add item to cart
// ─────────────────────────────────────────────

import { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import SoundViz from '../components/SoundViz';
import SkeletonLoader from '../components/SkeletonLoader';
import GalleryCard from '../components/GalleryCard';
import Footer from '../components/Footer';
// ── Internal 3D scene ── (self-contained, not exported)
function ShowcaseGeometry({ product, activeColor }) {
  const meshRef  = useRef(); const wireRef  = useRef();
  const lightRef = useRef();

  useFrame((state) => {
    const tx = state.pointer.x * 2.5;
    const ty = state.pointer.y * 2.5;
    if (meshRef.current) {
      meshRef.current.rotation.x += (ty - meshRef.current.rotation.x) * 0.035;
      meshRef.current.rotation.y += (tx - meshRef.current.rotation.y) * 0.035;
    }
    if (wireRef.current) {
      wireRef.current.rotation.x = meshRef.current?.rotation.x || 0;
      wireRef.current.rotation.y = meshRef.current?.rotation.y || 0;
    }

    if (lightRef.current) {
      const t = Date.now() * 0.0006;
      lightRef.current.position.x = Math.sin(t) * 4;
      lightRef.current.position.z = Math.cos(t) * 3;
    }
  });

  return (
    <>
      <ambientLight intensity={0.25} />
      <pointLight ref={lightRef} position={[4,4,3]} intensity={8} distance={20} color={product.glowColor} />
      <pointLight position={[-4,-3,2]} intensity={3} distance={20} color={0xffffff} />
      <pointLight position={[0,-4,-1]} intensity={4} distance={15} color={activeColor} />

      <mesh ref={meshRef}>
        {product.geometry === 'torus'       && <torusGeometry args={[1.2,0.42,24,80]} />}
        {product.geometry === 'sphere'      && <sphereGeometry args={[1.4,48,48]} />}
        {product.geometry === 'icosahedron' && <icosahedronGeometry args={[1.4,2]} />}
        <meshPhongMaterial color={activeColor} specular={0xffffff} shininess={160} transparent opacity={0.95} />
      </mesh>
      <mesh ref={wireRef}>
        {product.geometry === 'torus'       && <torusGeometry args={[1.2,0.42,24,80]} />}
        {product.geometry === 'sphere'      && <sphereGeometry args={[1.4,48,48]} />}
        {product.geometry === 'icosahedron' && <icosahedronGeometry args={[1.4,2]} />}
        <meshBasicMaterial color={0xffffff} wireframe transparent opacity={0.07} />
      </mesh>

    </>
  );
}

// ── Exported page component ──
export default function ShowcasePage({ product, isOpen, onClose, onAddToCart }) {
  const [activeColor, setActiveColor] = useState('');
  const scRef = useRef();

  // Reset active color whenever a new product is shown
  useEffect(() => {
    if (product) setActiveColor(product.colors[0]);
  }, [product]);

  // Scroll reveal for sections inside the overlay (uses its own root)
  useEffect(() => {
    if (!product || !scRef.current) return;
    const reveals = scRef.current.querySelectorAll('.sc-reveal');
    reveals.forEach((el) => el.classList.remove('vis'));
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('vis'); }),
      { root: scRef.current, threshold: 0.1 }
    );
    reveals.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [product]);

  // Handle ESC key to close
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose?.(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const handleAddToCart = () => {
    const idx   = product.colors.indexOf(activeColor);
    const selectedColorName = product.colorNames[idx];
    const image = product.colorImages[activeColor] || product.image;
    // Pass enriched cart item up to App.jsx
    onAddToCart?.({ ...product, image, selectedColorName });
  };

  return (
    <div 
      id="showcase" 
      ref={scRef} 
      className={isOpen ? 'open' : ''}
      role="dialog"
      aria-modal="true"
      aria-labelledby="showcase-title"
    >
      <button 
        className="showcase-close" 
        onClick={onClose} 
        aria-label="Close product details"
      >
        ✕
      </button>

      {/* Only render content when a product is selected */}
      {product && (
        <>
          {/* ── HERO ── */}
          <div className="sc-hero">
            <div className="sc-bg-glow sc-bg-glow-1" style={{ background: product.glowColor }} />
            <div className="sc-bg-glow sc-bg-glow-2" style={{ background: product.accentColor }} />

            <div className="sc-hero-left">
              <div className="sc-name-marquee">
                <h1 id="showcase-title" className="sc-name">{product.name}</h1>
              </div>
              <p className="sc-tagline">{product.tagline}</p>
              <div className="sc-price-tag" aria-label={`Price: ${product.price}`}>{product.price}</div>

              {/* Color swatches — clicking changes the 3D color and product image */}
              <div className="sc-colors" role="radiogroup" aria-label="Select color">
                {product.colors.map((c, i) => (
                  <div
                    key={c}
                    className="swatch-wrap"
                    onClick={() => setActiveColor(c)}
                    role="radio"
                    aria-checked={activeColor === c}
                    tabIndex={0}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setActiveColor(c)}
                  >
                    {/* Color name tooltip — appears on hover via CSS */}
                    <span className="swatch-name">{product.colorNames[i]}</span>
                    <div
                      className={`color-dot ${activeColor === c ? 'active' : ''}`}
                      style={{ background: c }}
                      aria-label={product.colorNames[i]}
                    />
                  </div>
                ))}
              </div>

              <div className="sc-actions">
                <button className="sc-buy" onClick={handleAddToCart}>Add to Cart →</button>
                <button className="sc-wish">♡ Wishlist</button>
              </div>
            </div>

            <div className="sc-hero-right">
              <div id="sc-main-canvas-wrap">
  <img
    src={product.colorImages[activeColor] || product.image}
    alt={product.name}
    className="sc-hero-img"
  />
</div>
              <div className="sc-ring-label">{product.category}</div>
            </div>
          </div>

          {/* ── MARQUEE STRIP ── */}
          <div className="name-strip">
            <div className="name-strip-inner">
              {[...Array(8)].map((_, i) => <span key={i}>{product.name}</span>)}
            </div>
          </div>

          {/* ── SPECS ── */}
          <div className="sc-section sc-reveal">
            <div className="sc-sec-label">Technical Specifications</div>
            <h2 className="sc-sec-title">{product.name} Specs.</h2>
            <div className="specs-grid">
              {product.specs.map((s, i) => (
                <div className="spec-cell" key={i}>
                  <div className="spec-val">{s.val}<span className="spec-unit">{s.unit}</span></div>
                  <div className="spec-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── COLOR GALLERY (inline) ── */}
          <div className="sc-section sc-reveal">
            <div className="sc-sec-label">Available Colorways</div>
            <h2 className="sc-sec-title">Choose Your<br />Identity.</h2>
            <div className="gallery-color-grid">
              {product.colors.map((c, i) => (
                <div key={c} className="gallery-item">
                  <GalleryCard 
                    src={product.colorImages[c] || product.image} 
                    label={product.colorNames[i]}
                    category={product.name}
                    isSelected={activeColor === c}
                    onClick={() => setActiveColor(c)}
                  />
                </div>
              ))}
            </div>
          </div>


          {/* ── SOUND VIZ ── */}
          <div className="sc-section sc-reveal" style={{ textAlign: 'center' }}>
            <div className="sc-sec-label">Frequency Response</div>
            <h2 className="sc-sec-title" style={{ textAlign: 'center' }}>Feel Every<br />Wave.</h2>
            {/* SoundViz is a reusable component — no props needed */}
            <SoundViz />
            <p style={{ color:'#888', fontSize:'.9rem', maxWidth:'480px', margin:'0 auto', lineHeight:1.7 }}>
              {product.soundDesc}
            </p>
          </div>

          {/* ── FEATURES ── */}
          <div className="sc-section sc-reveal">
            <div className="sc-sec-label">Key Features</div>
            <h2 className="sc-sec-title">Engineered<br />to Last.</h2>
            <div className="feat-list">
              {product.features.map((f, i) => (
                <div className="feat-row" key={i}>
                  <div className="feat-row-left">
                    <div className="feat-icon">{f.icon}</div>
                    <div>
                      <div className="feat-name">{f.name}</div>
                      <div className="feat-desc">{f.desc}</div>
                    </div>
                  </div>
                  <span className="feat-badge">{f.badge}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── REVIEW ── */}
          <div className="sc-section sc-reveal">
            <div className="sc-sec-label">Press Review</div>
            <h2 className="sc-sec-title">Critics<br />Agree.</h2>
            <div className="review-card">
              <div>
                <div className="stars">★★★★★</div>
                <div className="review-text">{product.review}</div>
                <div className="review-author">{product.reviewAuthor}</div>
              </div>
              <div className="review-score">
                <div className="score-num">{product.score}</div>
                <div className="score-sub">OUT OF 10<br />EDITOR'S CHOICE</div>
              </div>
            </div>
          </div>

          <div style={{ height: '6rem' }} />
          {/* ── FOOTER ── */}
          <Footer />
        </>
      )}
    </div>
  );
}
