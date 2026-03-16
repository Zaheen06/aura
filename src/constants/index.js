// ─────────────────────────────────────────────
// CONSTANTS — Shared static data used across the app.
// Import from here so UI is never hardcoded.
// ─────────────────────────────────────────────

export const STATS = [
  { val: '40mm', label: 'Beryllium Drivers' },
  { val: '-40dB', label: 'ANC Depth' },
  { val: '60h',   label: 'Max Battery Life' },
  { val: 'IP67',  label: 'Water Resistance' },
];

export const BRAND_FEATURES = [
  {
    icon: '🎧',
    title: 'Studio-Grade Sound',
    desc: 'Engineered for perfect frequency balance — every driver tuned by professional audio engineers.',
  },
  {
    icon: '🛡️',
    title: 'Built Indestructible',
    desc: 'Aircraft-grade aluminum frame and premium leather — built to outlast every phone you own.',
  },
  {
    icon: '🌍',
    title: '2-Year Global Warranty',
    desc: 'No-questions-asked replacement, worldwide. If it breaks, we fix it.',
  },
  {
    icon: '📦',
    title: 'Free Worldwide Shipping',
    desc: 'Every AURA order ships free with full tracking and 30-day hassle-free returns.',
  },
];

export const GALLERY_ITEMS = [
  { src: '/nova_gold.png',      label: 'NOVA X — Gold', category: 'NOVA X', productId: 'nova' },
  { src: '/nova_cognac.png',    label: 'NOVA X — Cognac', category: 'NOVA X', productId: 'nova' },
  { src: '/pulse_graphite.png', label: 'PULSE — Graphite', category: 'PULSE', productId: 'pulse' },
  { src: '/pulse_walnut.png',   label: 'PULSE — Walnut', category: 'PULSE', productId: 'pulse' },
  { src: '/pulse_sky.png',      label: 'PULSE — Sky', category: 'PULSE', productId: 'pulse' },
  { src: '/arc_phantom.png',    label: 'ARC — Phantom', category: 'ARC', productId: 'arc' },
  { src: '/arc_chalk.png',      label: 'ARC — Chalk', category: 'ARC', productId: 'arc' },
  { src: '/arc_forest.png',     label: 'ARC — Forest', category: 'ARC', productId: 'arc' },
];

export const NAV_LINKS = [
  { label: 'Collection', href: '/#products' },
  { label: 'Technology', href: '/technology' },
  { label: 'Reviews',    href: '/reviews' },
  { label: 'About',      href: '/about' },
];

export const FOOTER_LINKS = ['Privacy', 'Terms', 'Support', 'Careers'];

export const FOOTER_COLUMNS = [
  {
    heading: 'Products',
    links: ['NOVA X', 'PULSE', 'ARC', 'Accessories'],
  },
  {
    heading: 'Support',
    links: ['Contact Us', 'Warranty', 'Shipping Info', 'Returns'],
  },
  {
    heading: 'Company',
    links: ['About AURA', 'Careers', 'Press', 'Partners'],
  },
  {
    heading: 'Legal',
    links: ['Privacy Policy', 'Terms of Use', 'Cookie Policy', 'Accessibility'],
  },
];

