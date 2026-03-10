import React, { useState } from 'react';
import { PRODUCTS } from '../data';

export default function ProductDetails({ productId, onAddToCart, onNavigate }) {
  const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];
  const [qty, setQty] = useState(1);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [activeThumb, setActiveThumb] = useState(0);
  const [added, setAdded] = useState(false);

  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const thumbnails = [product.emoji, '📦', '🔍', '✨'];

  return (
    <main id="main-content">
      <div className="section">
        <div className="container">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" style={{
            display: 'flex', gap: 8, alignItems: 'center',
            marginBottom: 'var(--space-4)',
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text-secondary)',
          }}>
            <button onClick={() => onNavigate('home')} style={{ color: 'var(--color-secondary)' }}>Home</button>
            <span>/</span>
            <button onClick={() => onNavigate('shop')} style={{ color: 'var(--color-secondary)' }}>Shop</button>
            <span>/</span>
            <button onClick={() => onNavigate('shop')} style={{ color: 'var(--color-secondary)' }}>{product.category}</button>
            <span>/</span>
            <span style={{ color: 'var(--color-text)' }}>{product.name}</span>
          </nav>

          <div className="product-detail-grid">

            {/* Gallery */}
            <div className="product-gallery">
              <div className="product-main-image">
                <span style={{ fontSize: 140, filter: 'drop-shadow(0 16px 32px rgba(0,0,0,0.15))' }}>
                  {product.emoji}
                </span>
                {product.badge && (
                  <span className={`badge badge-${product.badgeType}`} style={{ position: 'absolute', top: 20, left: 20 }}>
                    {product.badge}
                  </span>
                )}
              </div>
              <div className="product-thumbnails">
                {thumbnails.map((thumb, i) => (
                  <button
                    key={i}
                    className={`product-thumb${activeThumb === i ? ' active' : ''}`}
                    onClick={() => setActiveThumb(i)}
                    aria-label={`Product image ${i + 1}`}
                    aria-pressed={activeThumb === i}
                  >
                    {thumb}
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="product-info-panel">
              <div className="product-brand">{product.category}</div>
              <h1>{product.name}</h1>

              <div className="product-info-rating">
                <div style={{ display: 'flex', gap: 2 }}>
                  {[1,2,3,4,5].map(i => (
                    <span key={i} style={{ color: 'var(--color-accent)', fontSize: 18 }}>
                      {i <= Math.floor(product.rating) ? '★' : '☆'}
                    </span>
                  ))}
                </div>
                <span style={{ fontWeight: 600 }}>{product.rating}</span>
                <span style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
                  ({product.reviews.toLocaleString()} reviews)
                </span>
                <span style={{
                  marginLeft: 'auto',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-success)',
                  fontWeight: 600,
                }}>
                  ✓ In Stock
                </span>
              </div>

              <div className="product-info-price">
                <span className="current">${product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="original">${product.originalPrice}</span>
                    <span className="save">
                      Save {Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </span>
                  </>
                )}
              </div>

              <p className="product-description">{product.description}</p>

              {/* Colors */}
              {product.colors && (
                <div>
                  <div className="product-options-label">
                    Color: <strong style={{ color: 'var(--color-text)' }}>
                      {['Midnight', 'Ocean Blue', 'Crimson', 'Pearl'][selectedColor] || 'Selected'}
                    </strong>
                  </div>
                  <div className="product-color-options">
                    {product.colors.map((color, i) => (
                      <button
                        key={i}
                        className={`color-option${selectedColor === i ? ' selected' : ''}`}
                        style={{ background: color, outline: selectedColor === i ? '3px solid var(--color-secondary)' : 'none', outlineOffset: 2 }}
                        onClick={() => setSelectedColor(i)}
                        aria-label={`Color option ${i + 1}`}
                        aria-pressed={selectedColor === i}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {product.sizes && (
                <div>
                  <div className="product-options-label">
                    Size: <strong>{product.sizes[selectedSize]}</strong>
                  </div>
                  <div className="product-size-options">
                    {product.sizes.map((size, i) => (
                      <button
                        key={i}
                        className={`size-option${selectedSize === i ? ' selected' : ''}`}
                        onClick={() => setSelectedSize(i)}
                        aria-label={`Size ${size}`}
                        aria-pressed={selectedSize === i}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Qty + Add to Cart */}
              <div className="product-qty-add">
                <div className="qty-selector">
                  <button
                    className="qty-btn"
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    disabled={qty <= 1}
                  >−</button>
                  <span className="qty-display">{qty}</span>
                  <button
                    className="qty-btn"
                    onClick={() => setQty(q => q + 1)}
                    aria-label="Increase quantity"
                  >+</button>
                </div>

                <button
                  className="add-to-cart-btn"
                  onClick={handleAddToCart}
                  aria-live="polite"
                >
                  {added ? '✓ Added to Cart!' : `Add to Cart — $${(product.price * qty).toFixed(2)}`}
                </button>

                <button className="wishlist-btn" aria-label="Add to wishlist">
                  ♡
                </button>
              </div>

              {/* Meta */}
              <div className="product-meta-info">
                {[
                  { icon: '🚚', text: <><strong>Free shipping</strong> on orders over $50</> },
                  { icon: '↩️', text: <><strong>30-day returns</strong> — no questions asked</> },
                  { icon: '🔒', text: <><strong>Secure checkout</strong> — 256-bit SSL encrypted</> },
                ].map(({ icon, text }, i) => (
                  <div key={i} className="product-meta-row">
                    <span className="product-meta-icon">{icon}</span>
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Related Products */}
          {related.length > 0 && (
            <div style={{ marginTop: 'var(--space-12)' }}>
              <div className="section-header" style={{ textAlign: 'left' }}>
                <div className="section-label">More Like This</div>
                <h2>You May Also Like</h2>
              </div>
              <div className="grid-products">
                {related.map(p => (
                  <article
                    key={p.id}
                    className="product-card"
                    onClick={() => onNavigate('product', p.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="product-card-image">
                      <div className="product-card-image-inner">
                        <span className="product-emoji">{p.emoji}</span>
                      </div>
                    </div>
                    <div className="product-card-body">
                      <div className="product-category">{p.category}</div>
                      <h3 className="product-title">{p.name}</h3>
                      <div className="product-pricing">
                        <span className="product-price">${p.price}</span>
                        <button
                          className="product-add-btn"
                          onClick={e => { e.stopPropagation(); onAddToCart(p); }}
                          aria-label={`Add ${p.name} to cart`}
                        >+</button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
