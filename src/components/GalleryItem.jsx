import { useState } from 'react';

/**
 * GalleryItem — Reusable masonry card for the Collection Gallery.
 * Accepts size variant: 'large' | 'tall' | 'wide' | 'small'
 */
export default function GalleryItem({ src, label, category, onClick, size = 'small', index = 0 }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div
      className={`masonry-card masonry-card--${size}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`View ${label}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Loading shimmer */}
      {!loaded && !error && <div className="masonry-card__shimmer" />}

      {/* Product image */}
      <img
        src={src}
        alt={label}
        className={`masonry-card__img ${loaded ? 'masonry-card__img--loaded' : ''}`}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => { setError(true); setLoaded(true); }}
        draggable={false}
      />

      {/* Gradient overlay, always rendered */}
      <div className="masonry-card__overlay" />

      {/* Hover glow ring */}
      <div className="masonry-card__glow" />

      {/* Category badge */}
      <div className="masonry-card__badge">{category}</div>

      {/* Bottom info */}
      <div className="masonry-card__info">
        <span className="masonry-card__label">{label}</span>
        <span className="masonry-card__arrow">↗</span>
      </div>

      {/* Error fallback */}
      {error && (
        <div className="masonry-card__error">
          <span>⚠</span>
          <span>Image unavailable</span>
        </div>
      )}
    </div>
  );
}
