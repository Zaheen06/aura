// ─────────────────────────────────────────────
// ScrollToTop — Fixed button that appears after
// scrolling 400px and smoothly returns to top.
// Shows a "TOP" label that fades in on hover.
// ─────────────────────────────────────────────

import { useEffect, useState } from 'react';

export default function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <button
      onClick={handleClick}
      aria-label="Back to top"
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 600,
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.07)',
        border: '1px solid rgba(255,255,255,0.12)',
        color: '#fff',
        fontSize: '1rem',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0',
        backdropFilter: 'blur(12px)',
        opacity: show ? 1 : 0,
        pointerEvents: show ? 'all' : 'none',
        transform: show ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.85)',
        transition: 'all 0.4s cubic-bezier(.16,1,.3,1)',
        boxShadow: show ? '0 8px 32px rgba(0,0,0,0.5)' : 'none',
        overflow: 'hidden',
      }}
      title="Back to top"
    >
      {/* Arrow always visible */}
      <span style={{ lineHeight: 1 }}>↑</span>
      {/* "TOP" label appears on hover via CSS ::after — done with a <span> */}
      <span
        style={{
          fontSize: '.45rem',
          letterSpacing: '.14em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,.45)',
          marginTop: '.1rem',
          lineHeight: 1,
        }}
      >
        TOP
      </span>
    </button>
  );
}
