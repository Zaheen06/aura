// ─────────────────────────────────────────────
// StatItem — Displays a single statistic value
// with a descriptive label beneath it.
//
// Props:
//   val   — string like '40mm', '-40dB'
//   label — description text below the value
// ─────────────────────────────────────────────

export default function StatItem({ val, label }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: '2.8rem',
          letterSpacing: '-1px',
          lineHeight: 1,
        }}
      >
        {val}
      </div>
      <div
        style={{
          fontSize: '.75rem',
          color: '#888',
          letterSpacing: '.08em',
          marginTop: '.3rem',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </div>
    </div>
  );
}
