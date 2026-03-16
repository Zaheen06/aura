// ─────────────────────────────────────────────
// ProductCard — Displays a single product card.
// Features: 3D tilt, hover glass overlay, tag badge, star rating.
//
// Props:
//   product  — full product object
//   onClick  — opens showcase overlay
//   onAddToCart — adds to cart directly from card
//   featured — hero card flag (larger name, badge)
//   slotClass— CSS grid-area class
// ─────────────────────────────────────────────

import { useRef, useState } from 'react';

// ── Helper: render filled/empty stars
function StarRating({ rating }) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5;
  return (
    <span className="card-stars" aria-label={`${rating} stars`}>
      {'★'.repeat(full)}{half ? '½' : ''}{'☆'.repeat(5 - full - (half ? 1 : 0))}
    </span>
  );
}

export default function ProductCard({ product, onClick, onAddToCart, featured = false }) {
  const [pressing, setPressing]   = useState(false);
  const [overlayOn, setOverlayOn] = useState(false);
  const cardRef = useRef();

  const defaultImage = product.colorImages?.[product.colors[0]] || product.image;

  // ── Click: brief press animation → open showcase
  const handleClick = () => {
    setPressing(true);
    setTimeout(() => {
      setPressing(false);
      onClick?.();
    }, 160);
  };

  const handleMouseLeave = () => {
    setOverlayOn(false);
  };

  return (
    <article
      ref={cardRef}
      className={`product-card ${pressing ? 'pressing' : ''}`}
      onClick={handleClick}
      onMouseEnter={() => setOverlayOn(true)}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      aria-label={`View ${product.name} details`}
    >
      {/* Product tag badge — BESTSELLER / NEW / AUDIOPHILE */}
      {product.tag && (
        <div className="card-tag">{product.tag}</div>
      )}

      {/* Product Image Wrapper */}
      <div className="card-canvas-wrap">
        {/* Floating product photo */}
        <img
          src={defaultImage}
          alt={product.name}
          className="headphone-img"
          draggable={false}
          loading="lazy"
          decoding="async"
        />

        {/* Glow on hover */}
        <div
          className="card-glow"
          style={{ background: `radial-gradient(ellipse at center, ${product.glowColor}55, transparent 65%)` }}
        />

        {/* Quick-action glass overlay — visible on hover */}
        <div className={`card-overlay ${overlayOn && !pressing ? 'visible' : ''}`}>
          <button
            className="card-overlay-btn card-overlay-btn--primary"
            onClick={(e) => { e.stopPropagation(); onAddToCart?.({ ...product, selectedColorName: product.colorNames[0] }); }}
          >
            Add to Cart
          </button>
          <button
            className="card-overlay-btn card-overlay-btn--ghost"
            onClick={(e) => { e.stopPropagation(); onClick?.(); }}
          >
            View Details
          </button>
        </div>
      </div>

      {/* "Flagship" badge — featured card only */}
      {featured && (
        <div className="featured-badge">Flagship · {new Date().getFullYear()}</div>
      )}

      {/* Arrow */}
      <div className="card-arrow">↗</div>

      {/* Name, subtitle, rating, price */}
      <div className="card-info">
        <div>
          <div className={`card-name ${featured ? 'card-name--lg' : ''}`}>{product.name}</div>
          <div className="card-sub">{product.sub}</div>
          {product.rating && (
            <div className="card-rating">
              <StarRating rating={product.rating} />
              <span className="card-review-count">({product.reviewCount})</span>
            </div>
          )}
        </div>
        <div className="card-price">{product.price}</div>
      </div>
    </article>
  );
}

