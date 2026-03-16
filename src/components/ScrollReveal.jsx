// ─────────────────────────────────────────────
// ScrollReveal — Wraps any content and animates
// it into view when it enters the viewport.
//
// Props:
//   children — the content to reveal
//   delay    — optional ms delay before animation starts
// ─────────────────────────────────────────────

import { useEffect, useRef, useState } from 'react';

export default function ScrollReveal({ children, delay = 0, fillHeight = false, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.85s cubic-bezier(.16,1,.3,1) ${delay}ms,
                     transform 0.85s cubic-bezier(.16,1,.3,1) ${delay}ms`,
        ...(fillHeight ? { height: '100%', display: 'flex', flexDirection: 'column' } : {}),
      }}
    >
      {children}
    </div>
  );
}
