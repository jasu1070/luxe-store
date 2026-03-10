import React, { useState, useEffect, useRef } from 'react';
import { PRODUCTS } from '../data';

const TRENDING = ['Headphones', 'Smart Watch', 'Sneakers', 'Backpack', 'Sunglasses'];

export default function SearchModal({ isOpen, onClose, onNavigate }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  const results = query.length > 1
    ? PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : [];

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    if (!isOpen) setQuery('');
  }, [isOpen]);

  useEffect(() => {
    const handleKey = e => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="search-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Search">
      <div className="search-modal" onClick={e => e.stopPropagation()}>
        <div className="search-modal-inner">
          <div className="search-input-wrap">
            <span className="search-icon" aria-hidden="true">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </span>
            <input
              ref={inputRef}
              type="search"
              className="search-input"
              placeholder="Search for products..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              aria-label="Search products"
              autoComplete="off"
            />
            <button className="search-close" onClick={onClose}>
              ESC
            </button>
          </div>

          {results.length > 0 ? (
            <div className="search-results" role="listbox" aria-label="Search results">
              {results.map(product => (
                <div
                  key={product.id}
                  className="search-result-item"
                  role="option"
                  aria-selected="false"
                  tabIndex={0}
                  onClick={() => {
                    onClose();
                    onNavigate('product', product.id);
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      onClose();
                      onNavigate('product', product.id);
                    }
                  }}
                >
                  <div className="search-result-image">{product.emoji}</div>
                  <div>
                    <div className="search-result-name">{product.name}</div>
                    <div className="search-result-meta">{product.category}</div>
                  </div>
                  <div className="search-result-price">${product.price}</div>
                </div>
              ))}
            </div>
          ) : query.length > 1 ? (
            <div style={{ padding: '32px', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
              <p>No results for "<strong>{query}</strong>"</p>
            </div>
          ) : null}

          <div className="search-footer">
            <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginRight: 8 }}>
              Trending:
            </span>
            {TRENDING.map(tag => (
              <button
                key={tag}
                className="search-tag"
                onClick={() => setQuery(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
