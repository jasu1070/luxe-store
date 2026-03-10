import React, { useState } from 'react';

export default function Checkout({ cartItems, total, onNavigate }) {
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success

  if (step === 3) {
    return (
      <main id="main-content">
        <div className="section">
          <div className="container" style={{ textAlign: 'center', padding: 'var(--space-16) 0' }}>
            <div style={{ fontSize: 80, marginBottom: 'var(--space-3)' }}>🎉</div>
            <h1>Order Confirmed!</h1>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-lg)', margin: 'var(--space-2) 0 var(--space-6)' }}>
              Thank you for your purchase. Your order #LX-98231 is being processed.
            </p>
            <button className="btn btn-primary btn-lg" onClick={() => onNavigate('home')}>
              Back to Home
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
          <h1 style={{ color: 'white' }}>Checkout</h1>
          <p>Complete your order securely</p>
        </div>
      </div>

      <div className="section">
        <div className="container">
          <div className="cart-layout" style={{ gridTemplateColumns: '1.5fr 1fr' }}>
            
            {/* Form Side */}
            <div className="contact-form-container">
              <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-8)' }}>
                <div style={{ flex: 1, height: 4, background: step >= 1 ? 'var(--color-secondary)' : 'var(--color-border)', borderRadius: 2 }} />
                <div style={{ flex: 1, height: 4, background: step >= 2 ? 'var(--color-secondary)' : 'var(--color-border)', borderRadius: 2 }} />
              </div>

              {step === 1 ? (
                <div>
                  <h2 style={{ marginBottom: 'var(--space-4)' }}>Shipping Information</h2>
                  <form onSubmit={e => { e.preventDefault(); setStep(2); }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-2)' }}>
                      <div className="form-group">
                        <label>First Name</label>
                        <input type="text" placeholder="John" required />
                      </div>
                      <div className="form-group">
                        <label>Last Name</label>
                        <input type="text" placeholder="Doe" required />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Address</label>
                      <input type="text" placeholder="123 Luxury Ave" required />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 'var(--space-2)' }}>
                      <div className="form-group">
                        <label>City</label>
                        <input type="text" placeholder="New York" required />
                      </div>
                      <div className="form-group">
                        <label>State</label>
                        <input type="text" placeholder="NY" required />
                      </div>
                      <div className="form-group">
                        <label>Zip</label>
                        <input type="text" placeholder="10001" required />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 'var(--space-4)' }}>
                      Continue to Payment →
                    </button>
                  </form>
                </div>
              ) : (
                <div>
                  <h2 style={{ marginBottom: 'var(--space-4)' }}>Payment Details</h2>
                  <form onSubmit={e => { e.preventDefault(); setStep(3); }}>
                    <div className="form-group">
                      <label>Card Number</label>
                      <input type="text" placeholder="0000 0000 0000 0000" required />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-2)' }}>
                      <div className="form-group">
                        <label>Expiry Date</label>
                        <input type="text" placeholder="MM/YY" required />
                      </div>
                      <div className="form-group">
                        <label>CVV</label>
                        <input type="text" placeholder="123" required />
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-4)' }}>
                      <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setStep(1)}>
                        ← Back
                      </button>
                      <button type="submit" className="btn btn-primary btn-lg" style={{ flex: 2 }}>
                        Pay ${total.toFixed(2)}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* Summary Side */}
            <aside className="order-summary" style={{ height: 'fit-content' }}>
              <h3>Order Summary</h3>
              <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: 'var(--space-4)' }}>
                {cartItems.map(item => (
                  <div key={item.id} style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                    <div style={{ width: 48, height: 48, background: 'var(--color-bg-alt)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyCenter: 'center', fontSize: 24 }}>
                      {item.emoji}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>{item.name}</div>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>Qty: {item.qty}</div>
                    </div>
                    <div style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>${(item.price * item.qty).toFixed(2)}</div>
                  </div>
                ))}
              </div>
              <div className="summary-row total">
                <span className="label" style={{ fontSize: 'var(--text-lg)' }}>Total</span>
                <span className="value" style={{ fontSize: 'var(--text-2xl)' }}>${total.toFixed(2)}</span>
              </div>
              <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', textAlign: 'center', marginTop: 16 }}>
                🔒 Secure SSL encrypted checkout
              </p>
            </aside>

          </div>
        </div>
      </div>
    </main>
  );
}
