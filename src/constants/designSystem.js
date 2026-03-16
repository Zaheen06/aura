// ═════════════════════════════════════════════
// DESIGN SYSTEM — Centralized design tokens
// for consistent spacing, typography, and colors
// ═════════════════════════════════════════════

export const SPACING = {
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px
  md: '1rem',       // 16px
  lg: '1.5rem',     // 24px
  xl: '2rem',       // 32px
  '2xl': '3rem',    // 48px
  '3xl': '4rem',    // 64px
  '4xl': '6rem',    // 96px
};

export const BORDER_RADIUS = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '24px',
  full: '100px',
};

export const TYPOGRAPHY = {
  fontFamily: {
    primary: "'Outfit', sans-serif",
    display: "'Bebas Neue', sans-serif",
  },
  fontSize: {
    xs: '0.65rem',
    sm: '0.75rem',
    base: '0.9rem',
    lg: '1.05rem',
    xl: '1.4rem',
    '2xl': '1.7rem',
    '3xl': '2.4rem',
    '4xl': '3.5rem',
    '5xl': '5rem',
  },
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  letterSpacing: {
    tight: '-1px',
    normal: '0.03em',
    wide: '0.1em',
    wider: '0.2em',
    widest: '0.3em',
  },
};

export const COLORS = {
  bg: '#0a0a0a',
  white: '#f8f8f6',
  gray: {
    100: '#888',
    200: '#555',
    300: '#3a3a3a',
  },
  border: 'rgba(255,255,255,.07)',
  overlay: 'rgba(0,0,0,0.6)',
};

export const TRANSITIONS = {
  fast: '0.2s',
  normal: '0.3s',
  slow: '0.5s',
  ease: 'cubic-bezier(.16,1,.3,1)',
};

export const BREAKPOINTS = {
  mobile: '768px',
  tablet: '1024px',
  desktop: '1280px',
};

export const Z_INDEX = {
  base: 1,
  dropdown: 100,
  overlay: 500,
  modal: 800,
  toast: 900,
  tooltip: 1000,
};
