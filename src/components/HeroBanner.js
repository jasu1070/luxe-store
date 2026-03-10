import React from 'react';

export default function HeroBanner({ onNavigate }) {
  return (
    <section className="hero" aria-label="Hero banner">
      <div className="container">
        <div className="hero-grid">

          {/* Left Content */}
          <div className="hero-content">
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-dot" />
              New Collection 2025
            </div>

            <h1>
              Premium Products<br />
              For <span className="highlight">Modern Living</span>
            </h1>

            <p className="hero-description">
              Discover high-quality products designed for modern lifestyles.
              Curated collections that blend form, function, and timeless style.
            </p>

            <div className="hero-actions">
              <button
                className="btn btn-primary btn-lg"
                onClick={() => onNavigate('shop')}
              >
                Shop Now
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
              <button
                className="btn btn-ghost btn-lg"
                onClick={() => onNavigate('shop')}
              >
                Explore Collection
              </button>
            </div>

            <div className="hero-stats">
              <div className="hero-stat">
                <div className="hero-stat-number">50K+</div>
                <div className="hero-stat-label">Products</div>
              </div>
              <div className="hero-divider" />
              <div className="hero-stat">
                <div className="hero-stat-number">200K</div>
                <div className="hero-stat-label">Customers</div>
              </div>
              <div className="hero-divider" />
              <div className="hero-stat">
                <div className="hero-stat-number">4.9★</div>
                <div className="hero-stat-label">Rating</div>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="hero-visual">
            <div className="hero-image-container">
              <div className="hero-image-bg" />

              <div className="hero-image-card">
                <div className="hero-image-inner">
                  <div className="hero-product-display">
                    {[
                      { emoji: '🎧', name: 'Headphones', price: '$299' },
                      { emoji: '⌚', name: 'Smart Watch', price: '$449' },
                      { emoji: '👟', name: 'Sneakers', price: '$219' },
                      { emoji: '🕶️', name: 'Sunglasses', price: '$159' },
                    ].map((item, i) => (
                      <div key={i} className="hero-product-item">
                        <span className="hero-product-emoji">{item.emoji}</span>
                        <div className="hero-product-name">{item.name}</div>
                        <div className="hero-product-price">{item.price}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="hero-floating-badge hero-badge-sale">
                🔥 40% OFF Sale
              </div>
              <div className="hero-floating-badge hero-badge-free">
                ✓ Free Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
