import React from 'react';

function StarRating({ rating }) {
  return (
    <div className="product-stars">
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} className="product-star" style={{ opacity: i <= Math.floor(rating) ? 1 : 0.3 }}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function ProductCard({ product, onAddToCart, onNavigate }) {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPct = hasDiscount
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <article
      className="product-card"
      onClick={() => onNavigate('product', product.id)}
      aria-label={`${product.name}, $${product.price}`}
    >
      <div className="product-card-image">
        <div className="product-card-image-inner">
          <span className="product-emoji">{product.emoji}</span>
        </div>

        {/* Badges */}
        <div className="product-card-badges">
          {product.badge && (
            <span className={`badge badge-${product.badgeType}`}>
              {product.badge}
            </span>
          )}
          {discountPct && (
            <span className="badge badge-sale">-{discountPct}%</span>
          )}
        </div>

        {/* Hover Actions */}
        <div className="product-card-actions">
          <button
            className="product-action-btn"
            onClick={e => { e.stopPropagation(); }}
            aria-label="Add to wishlist"
            title="Add to wishlist"
          >
            ♡
          </button>
          <button
            className="product-action-btn"
            onClick={e => { e.stopPropagation(); onNavigate('product', product.id); }}
            aria-label="Quick view"
            title="Quick view"
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="product-card-body">
        <div className="product-category">{product.category}</div>
        <h3 className="product-title">{product.name}</h3>

        <div className="product-rating">
          <StarRating rating={product.rating} />
          <span className="product-review-count">({product.reviews.toLocaleString()})</span>
        </div>

        <div className="product-pricing">
          <div className="product-prices">
            <span className="product-price">${product.price}</span>
            {hasDiscount && (
              <span className="product-price-original">${product.originalPrice}</span>
            )}
          </div>
          <button
            className="product-add-btn"
            onClick={e => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            aria-label={`Add ${product.name} to cart`}
            title="Add to cart"
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
}
