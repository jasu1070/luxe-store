import React, { useState } from 'react';

const SHOP_LINKS = [
  { label: 'New Arrivals', page: 'shop' },
  { label: 'Best Sellers', page: 'shop' },
  { label: 'Sale Items', page: 'shop' },
  { label: 'Electronics', page: 'shop' },
  { label: 'Fashion', page: 'shop' },
  { label: 'Home & Living', page: 'shop' }
];
const SUPPORT_LINKS = [
  { label: 'Help Center', page: 'info', slug: 'faq' },
  { label: 'Track Order', page: 'info', slug: 'faq' },
  { label: 'Returns & Exchanges', page: 'info', slug: 'returns' },
  { label: 'Size Guide', page: 'info', slug: 'faq' },
  { label: 'Contact Us', page: 'contact' },
  { label: 'FAQs', page: 'info', slug: 'faq' }
];
const SOCIALS = ['𝕏', 'f', 'in', '📷', '▶'];

export default function Footer({ onNavigate }) {
  const [email, setEmail] = useState('');

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="grid-footer">

          {/* Brand */}
          <div>
            <div className="footer-logo">
              <div className="footer-logo-mark">L</div>
              <span className="footer-logo-text">LUXE.</span>
            </div>
            <p className="footer-brand-desc">
              Premium products for modern living. Curated quality across
              electronics, fashion, home, and lifestyle since 2019.
            </p>
            <div className="footer-socials">
              {SOCIALS.map((s, i) => (
                <button key={i} className="footer-social-btn" aria-label={`Social media ${i + 1}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div className="footer-col">
            <h5>Shop</h5>
            <nav className="footer-links" aria-label="Shop links">
              {SHOP_LINKS.map(link => (
                <button key={link.label} onClick={() => onNavigate(link.page)}>
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Support */}
          <div className="footer-col">
            <h5>Support</h5>
            <nav className="footer-links" aria-label="Support links">
              {SUPPORT_LINKS.map(link => (
                <button key={link.label} onClick={() => onNavigate(link.page, link.slug)}>
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Newsletter */}
          <div className="footer-col">
            <h5>Stay Connected</h5>
            <p style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--space-2)', lineHeight: 1.6 }}>
              Get exclusive deals and new arrivals straight to your inbox.
            </p>
            <input
              type="email"
              className="footer-newsletter-input"
              placeholder="Your email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              aria-label="Newsletter email"
            />
            <button className="footer-newsletter-btn" onClick={() => setEmail('')}>
              Subscribe Now
            </button>

            <div style={{ marginTop: 'var(--space-3)' }}>
              <p style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.4)', marginBottom: 12 }}>
                We accept
              </p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['💳 Visa', '💳 MC', '🍎 Pay', '📱 GPay'].map(p => (
                  <span
                    key={p}
                    style={{
                      background: 'rgba(255,255,255,0.07)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '4px 10px',
                      fontSize: 'var(--text-xs)',
                      color: 'rgba(255,255,255,0.5)',
                    }}
                  >{p}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2025 LUXE Store. All rights reserved.
          </p>
          <nav className="footer-bottom-links" aria-label="Legal links">
            <button onClick={() => onNavigate('info', 'privacy')}>Privacy Policy</button>
            <button onClick={() => onNavigate('info', 'terms')}>Terms of Service</button>
            <button onClick={() => onNavigate('info', 'returns')}>Cookie Policy</button>
          </nav>
        </div>
      </div>
    </footer>
  );
}
