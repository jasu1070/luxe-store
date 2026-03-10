import React, { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setEmail('');
    }, 1000);
  };

  return (
    <div className="container">
      <section className="newsletter" aria-labelledby="newsletter-heading">
        <div className="newsletter-content">
          <div className="section-label">Newsletter</div>
          <h2 id="newsletter-heading">Stay Updated</h2>
          <p>
            Join 50,000+ subscribers and get exclusive deals, new arrivals,
            and style tips delivered to your inbox.
          </p>

          {submitted ? (
            <div style={{
              padding: '20px 32px',
              background: 'rgba(16,185,129,0.1)',
              border: '1px solid rgba(16,185,129,0.3)',
              borderRadius: 'var(--radius-md)',
              color: '#059669',
              fontFamily: 'var(--font-heading)',
              fontWeight: 600,
              fontSize: 'var(--text-lg)',
              animation: 'fadeIn 0.4s ease',
            }}>
              ✅ You're subscribed! Welcome to the LUXE family.
            </div>
          ) : (
            <form className="newsletter-form" onSubmit={handleSubmit} noValidate>
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                className="newsletter-input"
                placeholder="Enter your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                aria-required="true"
              />
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
                aria-busy={loading}
              >
                {loading ? <span className="loading-spinner" /> : 'Subscribe'}
              </button>
            </form>
          )}

          <p className="newsletter-note">
            🔒 No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </div>
  );
}
