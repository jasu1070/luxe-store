import React, { useState, useEffect } from 'react';

function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const calc = () => {
      const diff = targetDate - Date.now();
      if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
      return {
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      };
    };
    setTimeLeft(calc());
    const interval = setInterval(() => setTimeLeft(calc()), 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}

export default function PromoBanner({ onNavigate }) {
  // Set sale end date to 3 days from now
  const [saleEnd] = useState(() => Date.now() + 3 * 24 * 3600 * 1000);
  const { d, h, m, s } = useCountdown(saleEnd);

  const pad = n => String(n || 0).padStart(2, '0');

  return (
    <div className="container">
      <section className="promo-banner" aria-label="Promotional sale">
        <div className="promo-content">
          <div className="promo-tag">
            🔥 Limited Time Offer
          </div>
          <h2>
            Summer Mega Sale<br/>
            <span>40% OFF</span> Everything
          </h2>
          <p>Shop our biggest sale of the year. Premium products at unbeatable prices.</p>

          <div className="promo-timer" aria-label="Sale countdown">
            {[
              { num: pad(d), label: 'Days' },
              { num: pad(h), label: 'Hours' },
              { num: pad(m), label: 'Mins' },
              { num: pad(s), label: 'Secs' },
            ].map(({ num, label }) => (
              <div key={label} className="promo-timer-unit">
                <span className="promo-timer-num">{num}</span>
                <span className="promo-timer-label">{label}</span>
              </div>
            ))}
          </div>

          <button
            className="btn btn-primary btn-lg"
            onClick={() => onNavigate('shop')}
          >
            Shop Deals
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        <div className="promo-visual" aria-hidden="true">🛍️</div>
      </section>
    </div>
  );
}
