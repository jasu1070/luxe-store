import React from 'react';

export default function About() {
  return (
    <main id="main-content" className="page-about">
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-content">
            <h1>Our Story</h1>
            <p className="lead">Redefining modern living through curated quality and timeless design since 2019.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-2">
            <div>
              <div className="section-label">The Vision</div>
              <h2>Quality Over Everything</h2>
              <p>At LUXE, we believe that the objects you surround yourself with should be as functional as they are beautiful. Our journey started with a simple frustration: the difficulty of finding high-quality, tastefully designed products that didn't compromise on durability or ethics.</p>
              <p>Every item in our store undergoes a rigorous selection process. We partner with artisans and manufacturers who share our commitment to excellence, ensuring that every LUXE product is built to last.</p>
            </div>
            <div className="about-stats-grid">
              <div className="about-stat-card">
                <h3>5+</h3>
                <p>Years of Quality</p>
              </div>
              <div className="about-stat-card">
                <h3>200K+</h3>
                <p>Happy Customers</p>
              </div>
              <div className="about-stat-card">
                <h3>15</h3>
                <p>Global Partners</p>
              </div>
              <div className="about-stat-card">
                <h3>24/7</h3>
                <p>Customer Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-light">
        <div className="container">
          <div className="section-header center">
            <div className="section-label">Our Values</div>
            <h2>What Drives Us</h2>
          </div>
          <div className="values-grid">
            {[
              { title: 'Sustainability', desc: 'We prioritize eco-friendly materials and ethical manufacturing processes.', icon: '🌱' },
              { title: 'Innovation', desc: 'Continuously pushing boundaries to bring you the latest in tech and design.', icon: '💡' },
              { title: 'Integrity', desc: 'Transparent pricing, honest reviews, and reliable service always.', icon: '🤝' }
            ].map(v => (
              <div key={v.title} className="value-card">
                <span className="value-icon">{v.icon}</span>
                <h4>{v.title}</h4>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
