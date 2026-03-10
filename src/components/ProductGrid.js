import React from 'react';
import ProductCard from './ProductCard';

export default function ProductGrid({ products, onAddToCart, onNavigate }) {
  return (
    <div className="grid-products">
      {products.map((product, i) => (
        <div
          key={product.id}
          style={{
            animation: `fadeIn 0.5s ease both`,
            animationDelay: `${i * 60}ms`,
          }}
        >
          <ProductCard
            product={product}
            onAddToCart={onAddToCart}
            onNavigate={onNavigate}
          />
        </div>
      ))}
    </div>
  );
}
