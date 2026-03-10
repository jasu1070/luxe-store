import React from 'react';

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQty, onRemove, onNavigate }) {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal >= 50 ? 0 : 9.99;
  const total = subtotal + shipping;

  return (
    <>
      <div className="cart-overlay" onClick={onClose} aria-hidden="true" />

      <aside
        className="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <div className="cart-drawer-header">
          <h2 className="cart-drawer-title">
            Shopping Cart
            {cartItems.length > 0 && (
              <span style={{
                marginLeft: 10,
                background: 'var(--color-secondary)',
                color: 'white',
                borderRadius: 'var(--radius-full)',
                fontSize: '13px',
                fontWeight: 700,
                padding: '2px 8px',
              }}>
                {cartItems.length}
              </span>
            )}
          </h2>
          <button className="cart-close-btn" onClick={onClose} aria-label="Close cart">
            ✕
          </button>
        </div>

        <div className="cart-drawer-body">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">🛒</div>
              <h3>Your cart is empty</h3>
              <p>Add some products to get started!</p>
              <button className="btn btn-primary" onClick={() => { onClose(); onNavigate('shop'); }} style={{ marginTop: 16 }}>
                Start Shopping
              </button>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">{item.emoji}</div>

                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-cat">{item.category}</div>
                  <div className="cart-item-controls">
                    <button
                      className="qty-btn"
                      onClick={() => onUpdateQty(item.id, item.qty - 1)}
                      aria-label="Decrease quantity"
                    >−</button>
                    <span className="qty-display">{item.qty}</span>
                    <button
                      className="qty-btn"
                      onClick={() => onUpdateQty(item.id, item.qty + 1)}
                      aria-label="Increase quantity"
                    >+</button>
                  </div>
                </div>

                <div className="cart-item-price">
                  ${(item.price * item.qty).toFixed(2)}
                  <button
                    className="cart-item-remove"
                    onClick={() => onRemove(item.id)}
                    aria-label={`Remove ${item.name}`}
                    title="Remove item"
                  >🗑</button>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-subtotal">
              <span className="cart-subtotal-label">Subtotal</span>
              <span className="cart-subtotal-value">${subtotal.toFixed(2)}</span>
            </div>
            <div className="cart-subtotal" style={{ marginBottom: 8 }}>
              <span className="cart-subtotal-label">
                Shipping {shipping === 0 && <span style={{ color: 'var(--color-success)', fontSize: '12px' }}>(Free!)</span>}
              </span>
              <span className="cart-subtotal-value" style={{ fontSize: 16 }}>
                {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="cart-total-row">
              <span className="cart-total-label">Total</span>
              <span className="cart-total-value">${total.toFixed(2)}</span>
            </div>

            <button
              className="cart-checkout-btn"
              onClick={() => { onClose(); onNavigate('checkout'); }}
            >
              Proceed to Checkout →
            </button>

            <button className="cart-continue-btn" onClick={onClose}>
              ← Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
