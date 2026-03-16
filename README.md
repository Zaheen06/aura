# AURA Audio - Premium Headphone E-Commerce

> A modern, accessible React e-commerce application built with Vite, featuring 3D product visualization and a premium dark UI.

## ✨ Features

- 🎧 **3D Product Showcase** - Interactive Three.js product visualization
- ♿ **WCAG AA Compliant** - Full keyboard navigation and screen reader support
- 📱 **Fully Responsive** - Mobile-first design with smooth animations
- 🎨 **Design System** - Centralized design tokens for consistency
- 🚀 **Performance Optimized** - Lazy loading, GPU-accelerated animations
- 🛒 **Shopping Cart** - Side panel cart with real-time updates
- 🎭 **Glass Morphism UI** - Modern frosted glass effects
- 🌈 **Color Variants** - Interactive color selection with live preview

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
project-2/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ShowcasePage.jsx
│   │   └── ...
│   ├── pages/              # Page components
│   │   ├── HomePage.jsx
│   │   ├── CartPage.jsx
│   │   └── ...
│   ├── constants/          # Static data and design tokens
│   │   ├── index.js
│   │   └── designSystem.js
│   ├── api/                # API integration
│   ├── routes/             # React Router setup
│   ├── App.jsx             # Root component
│   ├── index.css           # Global styles
│   └── main.jsx            # Entry point
├── public/                 # Static assets
├── docs/                   # Documentation
│   ├── UI_STRUCTURE.md
│   ├── DESIGN_SYSTEM.md
│   ├── COMPONENT_LIBRARY.md
│   ├── IMPROVEMENTS_SUMMARY.md
│   └── TESTING_CHECKLIST.md
└── package.json
```

## 🎨 Design System

The project uses a comprehensive design system with:

- **Spacing Scale**: 8-point grid (4px to 96px)
- **Typography**: Outfit (body) + Bebas Neue (display)
- **Color Palette**: Dark theme with semantic naming
- **Border Radius**: Consistent rounding (8px to 100px)
- **Transitions**: Smooth cubic-bezier easing

See [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for details.

## ♿ Accessibility

- ✅ WCAG 2.1 AA compliant
- ✅ Full keyboard navigation
- ✅ Screen reader optimized
- ✅ Skip-to-content link
- ✅ ARIA landmarks and labels
- ✅ Focus-visible states
- ✅ Semantic HTML

See [TESTING_CHECKLIST.md](./TESTING_CHECKLIST.md) for testing guide.

## 📱 Responsive Design

- **Mobile**: < 768px (single column, hamburger menu)
- **Tablet**: 768px - 1024px (2-column grids)
- **Desktop**: > 1024px (full bento layout)

## 🛠️ Tech Stack

- **React 19** - UI library
- **Vite** - Build tool
- **React Router** - Client-side routing
- **Three.js** - 3D graphics
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Three.js helpers

## 📚 Documentation

- [UI Structure](./UI_STRUCTURE.md) - Architecture overview
- [Design System](./DESIGN_SYSTEM.md) - Design tokens reference
- [Component Library](./COMPONENT_LIBRARY.md) - Copy-paste components
- [Improvements Summary](./IMPROVEMENTS_SUMMARY.md) - What's new
- [Testing Checklist](./TESTING_CHECKLIST.md) - QA guide

## 🎯 Key Components

### ProductCard
Interactive product card with hover effects, 3D tilt, and quick actions.

### ShowcasePage
Full-screen product detail modal with 3D visualization and color selection.

### Navbar
Responsive navigation with mobile drawer and cart integration.

### SoundRecommender
AI-powered product recommendation quiz.

## 🎨 Component Usage

```jsx
import { SPACING, TYPOGRAPHY } from './constants/designSystem';

<div style={{ 
  padding: SPACING.lg,
  fontSize: TYPOGRAPHY.fontSize.lg 
}}>
  Content
</div>
```

See [COMPONENT_LIBRARY.md](./COMPONENT_LIBRARY.md) for more examples.

## 🧪 Testing

Run through the comprehensive testing checklist:

```bash
# Visual testing
- Desktop, tablet, mobile viewports
- All interactive states (hover, focus, active)

# Accessibility testing
- Keyboard navigation (Tab, Enter, Escape)
- Screen reader (NVDA, JAWS, VoiceOver)
- Color contrast validation

# Performance testing
- Lighthouse audit (aim for 90+ scores)
- Network throttling
- Memory profiling
```

See [TESTING_CHECKLIST.md](./TESTING_CHECKLIST.md) for full guide.

## 🚀 Performance

- ⚡ Lazy image loading
- ⚡ GPU-accelerated animations
- ⚡ Code splitting
- ⚡ Optimized bundle size
- ⚡ Passive event listeners

## 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Safari 14+

## 📄 License

MIT

## 🤝 Contributing

1. Follow the design system guidelines
2. Maintain accessibility standards
3. Test on multiple devices
4. Update documentation

## 📞 Support

For questions or issues, refer to:
- [UI Structure Documentation](./UI_STRUCTURE.md)
- [Component Library](./COMPONENT_LIBRARY.md)
- [Testing Guide](./TESTING_CHECKLIST.md)

---

**Built with ❤️ using React + Vite**

**Version**: 2.0.0 | **Status**: Production Ready ✅
# aura
