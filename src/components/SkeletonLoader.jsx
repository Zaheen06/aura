// ─────────────────────────────────────────────
// SkeletonLoader — Placeholder UI shown while
// data is being fetched from the API.
//
// Props:
//   type  — 'card' | 'gallery' | 'spec' | 'feat'
//   count — how many skeleton blocks to render
// ─────────────────────────────────────────────

// Shared pulse animation style injected once
const pulse = {
  background: 'linear-gradient(90deg, #1a1a1a 25%, #252525 50%, #1a1a1a 75%)',
  backgroundSize: '200% 100%',
  animation: 'skeletonPulse 1.5s ease-in-out infinite',
  borderRadius: '8px',
};

// Inject the keyframe animation into the page (once)
if (typeof document !== 'undefined' && !document.getElementById('sk-style')) {
  const style = document.createElement('style');
  style.id = 'sk-style';
  style.textContent = `
    @keyframes skeletonPulse {
      0%   { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
  `;
  document.head.appendChild(style);
}

// ── Individual skeleton shapes ──
function CardSkeleton() {
  return (
    <div style={{ borderRadius: '24px', border: '1px solid rgba(255,255,255,.07)', overflow: 'hidden', aspectRatio: '3/4', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, ...pulse }} />
      <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,.07)' }}>
        <div style={{ height: '22px', width: '60%', ...pulse, marginBottom: '8px' }} />
        <div style={{ height: '14px', width: '40%', ...pulse }} />
      </div>
    </div>
  );
}

function GallerySkeleton() {
  return (
    <div style={{ borderRadius: '16px', border: '1px solid rgba(255,255,255,.07)', overflow: 'hidden' }}>
      <div style={{ aspectRatio: '1', ...pulse }} />
      <div style={{ padding: '.75rem 1rem' }}>
        <div style={{ height: '12px', width: '70%', ...pulse }} />
      </div>
    </div>
  );
}

function SpecSkeleton() {
  return (
    <div style={{ background: '#111', padding: '2rem 1.5rem' }}>
      <div style={{ height: '40px', width: '55%', ...pulse, marginBottom: '8px' }} />
      <div style={{ height: '12px', width: '70%', ...pulse }} />
    </div>
  );
}

function FeatSkeleton() {
  return (
    <div style={{ background: '#111', padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ height: '32px', width: '32px', borderRadius: '50%', ...pulse }} />
      <div style={{ height: '18px', width: '50%', ...pulse }} />
      <div style={{ height: '14px', width: '85%', ...pulse }} />
    </div>
  );
}

// ── Exported component — picks type via prop ──
export default function SkeletonLoader({ type = 'card', count = 3 }) {
  const items = Array.from({ length: count });

  const skeletonMap = {
    card:    <CardSkeleton />,
    gallery: <GallerySkeleton />,
    spec:    <SpecSkeleton />,
    feat:    <FeatSkeleton />,
  };

  return (
    <>
      {items.map((_, i) => (
        <div key={i}>{skeletonMap[type] ?? <CardSkeleton />}</div>
      ))}
    </>
  );
}
