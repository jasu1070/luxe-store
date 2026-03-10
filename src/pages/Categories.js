import React from 'react';
import { CATEGORIES } from '../data';

export default function Categories({ onNavigate }) {
  return (
    <main id="main-content" className="page-categories">
      <section className="section">
        <div className="container">
          <div className="section-header center">
            <div className="section-label">Explore</div>
            <h1>Browse by Category</h1>
            <p>Find exactly what you're looking for across our curated collections</p>
          </div>

          <div className="category-grid-large">
            {CATEGORIES.map(cat => (
              <button 
                key={cat.id} 
                className="category-card-large"
                onClick={() => onNavigate('shop', cat.name)}
                style={{ '--cat-gradient': cat.gradient }}
              >
                <div className="cat-card-bg" />
                <div className="cat-card-content">
                  <span className="cat-card-emoji">{cat.emoji}</span>
                  <h3>{cat.name}</h3>
                  <span className="cat-card-label">{cat.label}</span>
                  <span className="cat-card-count">{cat.count} Products</span>
                </div>
                <div className="cat-card-arrow">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
