import React, { useState, useMemo } from 'react';
import ProductGrid from '../components/ProductGrid';
import { PRODUCTS, CATEGORIES } from '../data';

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest First' },
];

export default function Shop({ onAddToCart, onNavigate, initialFilter = null }) {
  const [selectedCats, setSelectedCats] = useState(initialFilter?.category ? [initialFilter.category] : []);
  const [sort, setSort] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(600);
  const [activeStatus] = useState(initialFilter?.status || null);

  const toggleCat = (cat) => {
    setSelectedCats(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const filtered = useMemo(() => {
    let list = [...PRODUCTS].filter(p => p.price <= maxPrice);
    if (selectedCats.length) list = list.filter(p => selectedCats.includes(p.category));
    
    if (activeStatus === 'sale') list = list.filter(p => p.badgeType === 'sale' || p.originalPrice > p.price);
    if (activeStatus === 'new') list = list.filter(p => p.badgeType === 'new');
    if (activeStatus === 'hot') list = list.filter(p => p.badgeType === 'hot');

    switch (sort) {
      case 'price-asc': return list.sort((a, b) => a.price - b.price);
      case 'price-desc': return list.sort((a, b) => b.price - a.price);
      case 'rating': return list.sort((a, b) => b.rating - a.rating);
      case 'newest': return list.sort((a, b) => b.id - a.id);
      default: return list;
    }
  }, [selectedCats, sort, maxPrice, activeStatus]);

  return (
    <main id="main-content">
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <div className="section-label" style={{ background: 'rgba(37,99,235,0.2)', color: '#93C5FD' }}>
            Collections
          </div>
          <h1 style={{ color: 'white', marginTop: 8 }}>
            {activeStatus ? `${activeStatus.charAt(0).toUpperCase() + activeStatus.slice(1)} Items` : 'Shop All Products'}
          </h1>
          <p>
            {activeStatus === 'sale' ? 'Premium products at unbeatable prices' : 'Discover our complete collection of premium products'}
          </p>
        </div>
      </div>

      <div className="section">
        <div className="container">
          <div className="shop-layout">

            {/* Sidebar */}
            <aside className="shop-sidebar" aria-label="Filters">
              {/* Categories */}
              <div className="sidebar-card">
                <h4>Categories</h4>
                {CATEGORIES.map(cat => (
                  <div
                    key={cat.id}
                    className="filter-option"
                    onClick={() => toggleCat(cat.name)}
                    role="checkbox"
                    aria-checked={selectedCats.includes(cat.name)}
                    tabIndex={0}
                    onKeyDown={e => e.key === 'Enter' && toggleCat(cat.name)}
                  >
                    <div className={`filter-checkbox${selectedCats.includes(cat.name) ? ' checked' : ''}`} />
                    <span className="filter-label">{cat.emoji} {cat.name}</span>
                    <span className="filter-count">{cat.count}</span>
                  </div>
                ))}
              </div>

              {/* Price */}
              <div className="sidebar-card">
                <h4>Price Range</h4>
                <div className="price-range">
                  <input
                    type="range"
                    className="price-slider"
                    min={0}
                    max={600}
                    value={maxPrice}
                    onChange={e => setMaxPrice(Number(e.target.value))}
                    aria-label="Maximum price filter"
                  />
                  <div className="price-labels">
                    <span>$0</span>
                    <span style={{ color: 'var(--color-secondary)', fontWeight: 600 }}>Up to ${maxPrice}</span>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="sidebar-card">
                <h4>Min Rating</h4>
                {[4.5, 4.0, 3.5].map(r => (
                  <div key={r} className="filter-option" role="button" tabIndex={0}>
                    <div className="filter-checkbox" />
                    <span className="filter-label">
                      {'★'.repeat(Math.floor(r))} {r}+
                    </span>
                  </div>
                ))}
              </div>

              {/* Clear */}
              {(selectedCats.length > 0) && (
                <button
                  className="btn btn-secondary"
                  style={{ width: '100%' }}
                  onClick={() => { setSelectedCats([]); setMaxPrice(500); }}
                >
                  Clear Filters
                </button>
              )}
            </aside>

            {/* Main content */}
            <div>
              <div className="shop-toolbar">
                <p className="shop-result-count">
                  Showing <strong>{filtered.length}</strong> of {PRODUCTS.length} products
                  {selectedCats.length > 0 && ` in ${selectedCats.join(', ')}`}
                </p>
                <select
                  className="shop-sort"
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                  aria-label="Sort products"
                >
                  {SORT_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              {filtered.length > 0 ? (
                <ProductGrid
                  products={filtered}
                  onAddToCart={onAddToCart}
                  onNavigate={onNavigate}
                />
              ) : (
                <div style={{
                  textAlign: 'center',
                  padding: 'var(--space-10)',
                  color: 'var(--color-text-secondary)',
                }}>
                  <div style={{ fontSize: 64, marginBottom: 16 }}>🔍</div>
                  <h3>No products found</h3>
                  <p style={{ marginTop: 8 }}>Try adjusting your filters</p>
                  <button
                    className="btn btn-primary"
                    style={{ marginTop: 24 }}
                    onClick={() => { setSelectedCats([]); setMaxPrice(600); }}
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
