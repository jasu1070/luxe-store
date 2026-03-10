import React from 'react';
import { TRUST_ITEMS } from '../data';

export default function TrustBanner() {
  return (
    <section className="trust-banner" aria-label="Trust indicators">
      <div className="container">
        <div className="grid-trust">
          {TRUST_ITEMS.map((item, i) => (
            <div
              key={item.id}
              className="trust-item"
              style={{
                animation: `fadeIn 0.5s ease both`,
                animationDelay: `${i * 100}ms`,
              }}
            >
              <div className="trust-icon-wrap" role="img" aria-label={item.title}>
                {item.icon}
              </div>
              <div className="trust-text">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
