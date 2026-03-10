import React from 'react';

export function CategoryCard({ category, onNavigate }) {
  return (
    <article
      className="category-card"
      style={{ background: category.gradient }}
      onClick={() => onNavigate('shop', category.name)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onNavigate('shop', category.name)}
      aria-label={`Browse ${category.name}`}
    >
      <div className="category-card-bg">{category.emoji}</div>
      <div className="category-card-overlay" />

      <div className="category-card-arrow">→</div>

      <div className="category-card-content">
        <div className="category-card-label">{category.label}</div>
        <h3 className="category-card-name">{category.name}</h3>
        <div className="category-card-count">{category.count} products</div>
      </div>
    </article>
  );
}

export default function CategorySection({ categories, onNavigate }) {
  return (
    <section className="section" aria-labelledby="categories-heading">
      <div className="container">
        <div className="section-header">
          <div className="section-label">Collections</div>
          <h2 id="categories-heading">Shop by Category</h2>
          <p>Discover our curated collections across every lifestyle</p>
        </div>

        <div className="grid-categories">
          {categories.map((cat, i) => (
            <div
              key={cat.id}
              style={{
                animation: `fadeIn 0.5s ease both`,
                animationDelay: `${i * 80}ms`,
              }}
            >
              <CategoryCard category={cat} onNavigate={onNavigate} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
