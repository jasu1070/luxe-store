import React from 'react';
import HeroBanner from '../components/HeroBanner';
import TrustBanner from '../components/TrustBanner';
import ProductGrid from '../components/ProductGrid';
import CategorySection from '../components/CategorySection';
import PromoBanner from '../components/PromoBanner';
import Newsletter from '../components/Newsletter';
import { PRODUCTS, CATEGORIES } from '../data';

export default function Home({ onAddToCart, onNavigate }) {
  return (
    <main id="main-content">
      {/* Hero */}
      <HeroBanner onNavigate={onNavigate} />

      {/* Trust Banner */}
      <TrustBanner />

      {/* Featured Products */}
      <section className="section" aria-labelledby="featured-heading">
        <div className="container">
          <div className="section-header">
            <div className="section-label">Featured</div>
            <h2 id="featured-heading">Trending Right Now</h2>
            <p>Handpicked favorites loved by thousands of customers worldwide</p>
          </div>
          <ProductGrid
            products={PRODUCTS}
            onAddToCart={onAddToCart}
            onNavigate={onNavigate}
          />
          <div className="view-all-wrap">
            <button
              className="btn btn-secondary btn-lg"
              onClick={() => onNavigate('shop')}
            >
              View All Products
            </button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <CategorySection categories={CATEGORIES} onNavigate={onNavigate} />

      {/* Promo Banner */}
      <PromoBanner onNavigate={onNavigate} />

      {/* Newsletter */}
      <Newsletter />

      {/* Bottom padding */}
      <div style={{ height: 'var(--space-8)' }} />
    </main>
  );
}
