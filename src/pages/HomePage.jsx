import { useEffect, useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';

import { getProducts } from '../api/productApi';

import ScrollReveal      from '../components/ScrollReveal';
import ProductCard       from '../components/ProductCard';
import StatItem          from '../components/StatItem';
import FeatureCell       from '../components/FeatureCell';
import Footer            from '../components/Footer';
import SkeletonLoader    from '../components/SkeletonLoader';
import SoundRecommender  from '../components/SoundRecommender';
import CollectionGallery from '../components/CollectionGallery';

import { STATS, BRAND_FEATURES, FOOTER_COLUMNS } from '../constants';

const TESTIMONIALS = [
  {
    quote: "The NOVA X isn't just better than the competition — it's in a different category.",
    author: 'Marcus T.',
    role: 'Audiophile · New York',
    product: 'NOVA X',
    score: '9.8',
  },
  {
    quote: "I'm a mastering engineer. The PULSE competes with my $1,200 open-backs. At $299.",
    author: 'Elena R.',
    role: 'Professional Engineer · Berlin',
    product: 'PULSE',
    score: '9.5',
  },
  {
    quote: "Charged the ARC once before a 3-week hiking trip. Came back with battery to spare.",
    author: 'James K.',
    role: 'Outdoor Enthusiast · Sydney',
    product: 'ARC',
    score: '9.2',
  },
];

const AWARD_STRIP = [
  { outlet: 'AudiophileToday', award: '2024 Headphone of the Year' },
  { outlet: 'StudioSound',     award: "Editor's Choice Award" },
  { outlet: 'GearLab',         award: 'Best Sport Headphone 2024' },
  { outlet: 'TechRadar',       award: '4.5/5 — Exceptional' },
];

export default function HomePage({ onProductClick, onAddToCart }) {
  const [products, setProducts]               = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [recommenderOpen, setRecommenderOpen] = useState(false);

  useEffect(() => {
    getProducts().then((data) => { setProducts(data); setLoadingProducts(false); });
  }, []);

  return (
    <main id="main-content">
      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section id="hero">
        <div className="hero-bg" />
        {/* Hero bottom gradient fade to dark */}
        <div className="hero-fade-bottom" />

        {/* ── LEFT column ── */}
        <div className="hero-left">
          <div className="hero-eyebrow">Premium Audio · Est. 2024</div>

          <h1 className="hero-title">
            <span>Hear</span>
            <span>Everything.</span>
          </h1>

          <p className="hero-sub">
            Three headphones. One obsession. Sound engineered to make you feel every frequency your music intended.
          </p>

          {/* Trust signal */}
          <div className="hero-trust">
            <span className="hero-trust-stars">★★★★★</span>
            <span className="hero-trust-text">4.9 · Trusted by <strong>40,000+</strong> audiophiles</span>
          </div>

          <div className="hero-cta-row">
            <a
              className="hero-cta"
              href="#products"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>Explore Collection</span>
              <span className="hero-cta-arrow">→</span>
            </a>
            <button className="hero-cta-secondary" onClick={() => setRecommenderOpen(true)}>
              🎧 Find My Headphone
            </button>
          </div>

          {/* Award strip — frosted glass pill row */}
          <div className="hero-awards" role="list" aria-label="Awards and recognition">
            {AWARD_STRIP.map((a) => (
              <div key={a.outlet} className="hero-award-item" role="listitem">
                <span className="hero-award-outlet">{a.outlet}</span>
                <span className="hero-award-name">{a.award}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT column ── */}
        <div className="hero-right">
          <div
            className="hero-glow"
            style={{ background: 'radial-gradient(circle, rgba(230,195,100,0.22) 0%, rgba(192,132,252,0.09) 45%, transparent 70%)' }}
          />
          {/* Pulsing rings */}
          <div className="hero-ring hero-ring--1" />
          <div className="hero-ring hero-ring--2" />
          <div className="hero-ring hero-ring--3" />
          <img
            src="/nova_gold.png"
            alt="AURA NOVA X headphone"
            className="hero-product-img"
            loading="eager"
            decoding="async"
          />
        </div>
      </section>

      {/* ══ STATS BAR ════════════════════════════════════════ */}
      <section className="stats-bar">
        <div className="stats-bar-inner">
          {STATS.map((s, i) => (
            <ScrollReveal key={s.label} delay={i * 80}>
              <div className="stat-divider-cell" style={{ padding: '0 3rem', textAlign: 'center' }}>
                <StatItem val={s.val} label={s.label} />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ══ PRODUCTS GRID ════════════════════════════════════ */}
      <section id="products" style={{ padding: '3rem 3rem 5rem', maxWidth: '1300px', margin: '0 auto' }}>
        <ScrollReveal>
          <div className="section-label">Our Collection</div>
        </ScrollReveal>

        <div className="products-grid">
          {loadingProducts ? (
            <>
              <div className="product-slot--nova"><SkeletonLoader type="card" count={1} /></div>
              <div className="product-slot--pulse"><SkeletonLoader type="card" count={1} /></div>
              <div className="product-slot--arc"><SkeletonLoader type="card" count={1} /></div>
            </>
          ) : (
            products.map((product, i) => (
              <ScrollReveal
                key={product.id}
                delay={i * 100}
                fillHeight
                className={`product-slot--${product.id}`}
              >
                <ProductCard
                  product={product}
                  onClick={() => onProductClick(product)}
                  onAddToCart={onAddToCart}
                  featured={i === 0}
                />
              </ScrollReveal>
            ))
          )}
        </div>
      </section>

      {/* ══ TESTIMONIALS ══════════════════════════════════════ */}
      <section className="testimonials-section">
        <div className="testimonials-inner">
          <ScrollReveal>
            <div className="section-label">What They Say</div>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <h2 className="testimonials-heading">40,000 Listeners.<br />One Verdict.</h2>
          </ScrollReveal>
          <div className="testimonials-grid">
            {TESTIMONIALS.map((t, i) => (
              <ScrollReveal key={t.author} delay={i * 100}>
                <div className="testimonial-card">
                  <div className="testimonial-score">{t.score}</div>
                  <div className="testimonial-product-tag">{t.product}</div>
                  <p className="testimonial-quote">"{t.quote}"</p>
                  <div className="testimonial-footer">
                    <div className="testimonial-author">{t.author}</div>
                    <div className="testimonial-role">{t.role}</div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={200}>
            <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
              <Link to="/reviews" className="hero-cta-secondary" style={{ display: 'inline-flex', textDecoration: 'none' }}>
                Read All Reviews →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══ COLLECTION GALLERY ════════════════════════════════ */}
      <CollectionGallery />

      {/* ══ BRAND FEATURES ════════════════════════════════════ */}
      <section id="brand-features" className="features-section">
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <ScrollReveal>
            <div className="section-label">Why AURA</div>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <h2 className="features-heading">
              Sound Isn't<br />Negotiable.
            </h2>
          </ScrollReveal>

          <div className="features-grid">
            {BRAND_FEATURES.map((f, i) => (
              <ScrollReveal key={f.title} delay={i * 80}>
                <FeatureCell icon={f.icon} title={f.title} desc={f.desc} />
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={200}>
            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <Link to="/technology" className="hero-cta-secondary" style={{ display: 'inline-flex', textDecoration: 'none' }}>
                Explore the Science →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="cta-banner">
        <div className="cta-banner-glow" />
        <ScrollReveal>
          <div className="cta-banner-label">Experience AURA</div>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <h2 className="cta-banner-title">Numbers Are One Thing.<br />Listening Is Another.</h2>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <p className="cta-banner-sub">
            60-day home trial. No questions asked return. The data already convinced us — let us convince your ears.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={300}>
          <a className="hero-cta" href="/#products" style={{ display: 'inline-flex' }}>Shop Collection →</a>
        </ScrollReveal>
      </section>

      {/* ── FOOTER ── */}
      <Footer />

      {/* AI Sound Recommender modal */}
      {recommenderOpen && (
        <SoundRecommender
          products={products}
          onClose={() => setRecommenderOpen(false)}
          onProductClick={(p) => { setRecommenderOpen(false); onProductClick(p); }}
        />
      )}
    </main>

  );
}
