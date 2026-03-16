// ─────────────────────────────────────────────
// GalleryCard — Displays a single color-variant
// headphone image with a label.
//
// Props:
//   src   — image path string
//   label — text shown below the image
//   onClick - click handler for lightbox
//   category - optional category/product name
//   isSelected - optional flag for selection state
// ─────────────────────────────────────────────

import { useState } from 'react';

export default function GalleryCard({ src, label, onClick, category = '', isSelected = false }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleImageLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <div
      className={`gallery-card ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`${label} - Gallery item${category ? ` from ${category}` : ''}`}
      aria-pressed={isSelected}
    >
      {isLoading && !hasError && (
        <div className="gallery-skeleton">
          <div className="skeleton-pulse" />
        </div>
      )}

      {hasError && (
        <div className="gallery-error">
          <span className="error-icon">⚠</span>
          <span className="error-text">Failed to load</span>
        </div>
      )}

      <img
        src={src}
        alt={label}
        loading="lazy"
        decoding="async"
        onLoad={handleImageLoad}
        onError={handleImageError}
        className={`gallery-img ${isLoading ? 'loading' : ''} ${hasError ? 'hidden' : ''}`}
      />

      <div className="gallery-label">{label}</div>

      {category && <div className="gallery-category">{category}</div>}
    </div>
  );
}

