// ─────────────────────────────────────────────
// SidePanel — Slide-in panel used for both
// the Cart and the Profile. Reused with
// different content via props.children.
//
// Props:
//   isOpen   — boolean controls visibility
//   onClose  — callback to close the panel
//   title    — panel heading text
//   children — content rendered inside
// ─────────────────────────────────────────────

export default function SidePanel({ isOpen, onClose, title, children }) {
  // Close when clicking the dark overlay behind the panel
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('overlay')) onClose?.();
  };

  return (
    <div
      className={`overlay ${isOpen ? 'open' : ''}`}
      onClick={handleOverlayClick}
    >
      <div className="side-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header row: title + close button */}
        <div className="panel-header">
          <span>{title}</span>
          <button className="panel-close" onClick={onClose} aria-label="Close panel">
            ✕
          </button>
        </div>

        {/* Content injected by parent */}
        {children}
      </div>
    </div>
  );
}
