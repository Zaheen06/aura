import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ cartCount = 0, onCartClick, onProfileClick, links = [] }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const location = useLocation();

  const handleTopClick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setMobileOpen(false), [location.pathname]);

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      
      <nav className={scrolled ? 'nav--scrolled' : ''} role="navigation" aria-label="Main navigation">
        {/* Brand logo */}
        <Link to="/" className="logo" onClick={handleTopClick} aria-label="AURA Home">
          AURA
        </Link>

        {/* Desktop nav links */}
        <ul className="nav-links" role="menubar">
          {links.map((link) => {
            const isExternal = link.href.startsWith('/#');
            const isActive   = !isExternal && location.pathname === link.href;
            return (
              <li key={link.label} role="none">
                {isExternal ? (
                  <a 
                    href={link.href} 
                    className={`nav-link ${isActive ? 'nav-link--active' : ''}`}
                    role="menuitem"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    to={link.href}
                    className={`nav-link ${isActive ? 'nav-link--active' : ''}`}
                    role="menuitem"
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            );
          })}
          <li role="none">
            <a
              href="#"
              className="nav-link"
              onClick={(e) => { e.preventDefault(); onProfileClick?.(); }}
              role="menuitem"
            >
              Profile
            </a>
          </li>
        </ul>

        {/* Right side actions */}
        <div className="nav-actions">
          {/* Cart icon button with live badge */}
          <button
            className="nav-cart-icon"
            onClick={onCartClick}
            aria-label={`Cart (${cartCount} items)`}
            id="nav-cart-btn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {cartCount > 0 && (
              <span className="nav-cart-badge">{cartCount}</span>
            )}
          </button>

          {/* Hamburger — mobile only */}
          <button
            className={`nav-hamburger ${mobileOpen ? 'open' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`mobile-drawer ${mobileOpen ? 'mobile-drawer--open' : ''}`}>
        <ul className="mobile-nav-links">
          {links.map((link) => {
            const isExternal = link.href.startsWith('/#');
            return (
              <li key={link.label}>
                {isExternal ? (
                  <a href={link.href} className="mobile-nav-link" onClick={() => setMobileOpen(false)}>
                    {link.label}
                  </a>
                ) : (
                  <Link to={link.href} className="mobile-nav-link">
                    {link.label}
                  </Link>
                )}
              </li>
            );
          })}
          <li>
            <a
              href="#"
              className="mobile-nav-link"
              onClick={(e) => { e.preventDefault(); onProfileClick?.(); setMobileOpen(false); }}
            >
              Profile
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
