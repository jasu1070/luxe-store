import React, { useState } from 'react';

export default function Cart({ cartItems, onUpdateQty, onRemove, onNavigate }) {
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const shipping = subtotal >= 50 ? 0 : 9.99;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + shipping + tax;

  const handlePromo = () => {
    if (promoCode.toUpperCase() === 'LUXE10') {
      setPromoApplied(true);
    }
  };

  if (cartItems.length === 0) {
    return (
      <main id="main-content">
        <div className="page-header">
          <div className="container">
            <h1 style={{ color: 'white' }}>Your Cart</h1>
          </div>
        </div>
        <div className="section">
          <div className="container" style={{ textAlign: 'center', padding: 'var(--space-12) 0' }}>
            <div style={{ fontSize: 80, marginBottom: 'var(--space-3)' }}>🛒</div>
            <h2>Your cart is empty</h2>
            <p style={{ color: 'var(--color-text-secondary)', margin: 'var(--space-2) 0 var(--space-4)' }}>
              Looks like you haven't added anything yet.
            </p>
            <button className="btn btn-primary btn-lg" onClick={() => onNavigate('shop')}>
              Start Shopping
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main id="main-content">
      <div className="page-header">
        <div className="container">
          <h1 style={{ color: 'white' }}>Your Cart</h1>
          <p>{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart</p>
        </div>
      </div>

      <div className="section">
        <div className="container">
          <div className="cart-layout">

            {/* Cart Items */}
            <div>
              <div className="cart-page-items">
                <div className="cart-page-header">
                  <h3>Order Items</h3>
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                    {cartItems.length} item{cartItems.length !== 1 ? 's' : ''}
                  </span>
                </div>

                {cartItems.map(item => (
                  <div key={item.id} className="cart-page-item">
                    <div className="cart-page-image">{item.emoji}</div>

                    <div className="cart-page-info">
                      <div className="cart-page-name">{item.name}</div>
                      <div className="cart-page-cat">{item.category}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '4px 8px' }}>
                          <button
                            className="qty-btn"
                            onClick={() => onUpdateQty(item.id, item.qty - 1)}
                            aria-label="Decrease"
                            style={{ border: 'none' }}
                          >−</button>
                          <span className="qty-display" style={{ fontSize: 'var(--text-base)' }}>{item.qty}</span>
                          <button
                            className="qty-btn"
                            onClick={() => onUpdateQty(item.id, item.qty + 1)}
                            aria-label="Increase"
                            style={{ border: 'none' }}
                          >+</button>
                        </div>
                        <button
                          onClick={() => onRemove(item.id)}
                          style={{ fontSize: 'var(--text-sm)', color: 'var(--color-error)', fontWeight: 500 }}
                          aria-label={`Remove ${item.name}`}
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', fontWeight: 700 }}>
                        ${(item.price * item.qty).toFixed(2)}
                      </div>
                      <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                        ${item.price} each
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 'var(--space-2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  className="btn btn-secondary"
                  onClick={() => onNavigate('shop')}
                >
                  ← Continue Shopping
                </button>
                <button
                  style={{ fontSize: 'var(--text-sm)', color: 'var(--color-error)', fontWeight: 500 }}
                  onClick={() => cartItems.forEach(item => onRemove(item.id))}
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="order-summary">
              <h3>Order Summary</h3>

              <div className="summary-row">
                <span className="summary-label">Subtotal ({cartItems.length} items)</span>
                <span className="summary-value">${subtotal.toFixed(2)}</span>
              </div>
              {promoApplied && (
                <div className="summary-row" style={{ color: 'var(--color-success)' }}>
                  <span>Promo (LUXE10)</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="summary-row">
                <span className="summary-label">
                  Shipping
                  {shipping === 0 && <span style={{ color: 'var(--color-success)', marginLeft: 4, fontSize: '12px' }}>(Free!)</span>}
                </span>
                <span className="summary-value">
                  {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Estimated Tax</span>
                <span className="summary-value">${tax.toFixed(2)}</span>
              </div>

              <div className="summary-row total">
                <span className="label">Total</span>
                <span className="value">${total.toFixed(2)}</span>
              </div>

              {/* Promo */}
              {!promoApplied && (
                <div className="promo-code-wrap">
                  <input
                    type="text"
                    className="promo-code-input"
                    placeholder="Promo code"
                    value={promoCode}
                    onChange={e => setPromoCode(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handlePromo()}
                    aria-label="Promo code"
                  />
                  <button className="promo-apply-btn" onClick={handlePromo}>
                    Apply
                  </button>
                </div>
              )}

              {promoApplied && (
                <div style={{
                  background: 'rgba(16,185,129,0.1)',
                  border: '1px solid rgba(16,185,129,0.3)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '10px 16px',
                  fontSize: 'var(--text-sm)',
                  color: '#059669',
                  fontWeight: 500,
                  marginBottom: 'var(--space-2)',
                }}>
                  ✓ Promo code LUXE10 applied — 10% off!
                </div>
              )}

              <button
                className="cart-checkout-btn"
                style={{ marginBottom: 'var(--space-1)' }}
              >
                Proceed to Checkout →
              </button>

              <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 12 }}>
                {['💳', '🍎', '📱'].map((icon, i) => (
                  <span key={i} style={{ fontSize: 24 }} title="Payment method">{icon}</span>
                ))}
              </div>

              <p style={{
                fontSize: '12px',
                color: 'var(--color-text-secondary)',
                textAlign: 'center',
                marginTop: 12,
              }}>
                🔒 Secure SSL encrypted checkout
              </p>

              {!promoApplied && (
                <p style={{
                  fontSize: '11px',
                  color: 'var(--color-text-secondary)',
                  textAlign: 'center',
                  marginTop: 8,
                }}>
                  Try code <strong>LUXE10</strong> for 10% off!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
