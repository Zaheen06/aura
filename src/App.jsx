

import { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

// Routing
import AppRoutes from './routes/AppRoutes';

// Reusable components
import Navbar from './components/Navbar';
import SidePanel from './components/SidePanel';
import ScrollToTop from './components/ScrollToTop';

// Page components (rendered inside panels or as overlays)
import ShowcasePage from './pages/ShowcasePage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';

// Static nav links from constants
import { NAV_LINKS } from './constants';

export default function App() {
  // ── Global state ──────────────────────────
  // showProduct holds product data (content stays mounted during exit animation)
  const [showProduct, setShowProduct] = useState(null);
  // showcaseOpen drives the CSS .open class (controls animation)
  const [showcaseOpen, setShowcaseOpen] = useState(false);
  const [cart, setCart] = useState([]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // ── Handlers ──────────────────────────────

  const [flashVisible, setFlashVisible] = useState(false);

  // Opens the showcase: flash → load content → add .open class
  const handleProductClick = (product) => {
    // 1. Trigger shutter flash
    setFlashVisible(true);
    setTimeout(() => setFlashVisible(false), 300);
    // 2. Load content then open with CSS animation
    setShowProduct(product);
    requestAnimationFrame(() => setShowcaseOpen(true));
    document.body.style.overflow = 'hidden';
  };

  // Closes the showcase: remove .open (triggers CSS slide-down), unmount after transition
  const handleCloseShowcase = () => {
    setShowcaseOpen(false);
    document.body.style.overflow = '';
    setTimeout(() => setShowProduct(null), 850); // matches CSS transition duration
  };

  // Adds a product (with selected color info) to the cart
  const handleAddToCart = (enrichedItem) => {
    setCart((prev) => [...prev, enrichedItem]);
    setIsCartOpen(true); // open cart panel after adding
  };

  // Removes an item from cart by its index
  const handleRemoveFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  // ESC key closes any open overlay or panel
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        handleCloseShowcase();
        setIsCartOpen(false);
        setIsProfileOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showcaseOpen]);

  return (
    <BrowserRouter>
      {/* ── Fixed top navigation ── */}
      <Navbar
        cartCount={cart.length}
        onCartClick={() => setIsCartOpen(true)}
        onProfileClick={() => setIsProfileOpen(true)}
        links={NAV_LINKS}
      />

      {/* ── Camera-shutter flash on card click ── */}
      <div className={`click-flash ${flashVisible ? 'active' : ''}`} />

      {/* ── Page content based on current URL ── */}
      <AppRoutes onProductClick={handleProductClick} onAddToCart={handleAddToCart} />

      {/* ── Product showcase overlay ── */}
      <ShowcasePage
        product={showProduct}
        isOpen={showcaseOpen}
        onClose={handleCloseShowcase}
        onAddToCart={handleAddToCart}
      />

      {/* ── Cart side panel (reuses SidePanel with CartPage content) ── */}
      <SidePanel
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        title="Your Cart"
      >
        <CartPage
          cart={cart}
          onRemove={handleRemoveFromCart}
        />
      </SidePanel>

      {/* ── Profile side panel (reuses SidePanel with ProfilePage content) ── */}
      <SidePanel
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        title="AURA ID"
      >
        <ProfilePage />
      </SidePanel>

      {/* ── Scroll to top FAB ── */}
      <ScrollToTop />
    </BrowserRouter>
  );
}
