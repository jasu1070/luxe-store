import React, { useState, useEffect } from 'react';

const NAV_LINKS = [
  { label: 'Home', page: 'home' },
  { label: 'Shop', page: 'shop' },
  { label: 'Categories', page: 'categories' },
  { label: 'Deals', page: 'shop' },
  { label: 'About', page: 'about' },
  { label: 'Contact', page: 'contact' },
];

export default function Navbar({ currentPage, onNavigate, cartCount, onCartOpen, onSearchOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="container">
          <div className="navbar-inner">

            {/* Logo */}
            <button
              className="navbar-logo"
              onClick={() => onNavigate('home')}
              aria-label="LUXE Store home"
            >
              <div className="navbar-logo-mark">L</div>
              <span className="navbar-logo-text">LUXE<span>.</span></span>
            </button>

            {/* Desktop Navigation */}
            <nav className="navbar-nav" aria-label="Site navigation">
              {NAV_LINKS.map(link => (
                <button
                  key={link.label}
                  className={`navbar-nav-link ${currentPage === link.page ? 'active' : ''}`}
                  onClick={() => onNavigate(link.page)}
                  style={{
                    fontSize: 'var(--text-sm)',
                    fontWeight: 500,
                    color: currentPage === link.page ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                    padding: '8px 14px',
                    borderRadius: 'var(--radius-sm)',
                    background: currentPage === link.page ? 'rgba(15,23,42,0.05)' : 'none',
                    transition: 'all var(--transition-fast)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Actions */}
            <div className="navbar-actions">
              <button
                className="navbar-icon-btn"
                onClick={onSearchOpen}
                aria-label="Search products"
                title="Search"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
              </button>

              <button 
                className="navbar-icon-btn" 
                onClick={() => onNavigate('account')}
                aria-label="User account" 
                title="Account"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </button>

              <button
                className="navbar-icon-btn"
                onClick={onCartOpen}
                aria-label={`Shopping cart, ${cartCount} items`}
                title="Cart"
                style={{ position: 'relative' }}
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                {cartCount > 0 && (
                  <span className="cart-badge">{cartCount > 9 ? '9+' : cartCount}</span>
                )}
              </button>

              {/* Mobile Hamburger */}
              <button
                className={`hamburger${menuOpen ? ' open' : ''}`}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
              >
                <span/>
                <span/>
                <span/>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu" role="dialog" aria-label="Mobile navigation">
          {NAV_LINKS.map(link => (
            <button
              key={link.label}
              onClick={() => { onNavigate(link.page); setMenuOpen(false); }}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '14px 16px',
                fontSize: 'var(--text-base)',
                fontWeight: 500,
                color: 'var(--color-text)',
                borderBottom: '1px solid var(--color-border)',
                background: 'none',
                transition: 'color var(--transition-fast)',
              }}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
