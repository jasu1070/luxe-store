import React from 'react';

const INFO_CONTENT = {
  faq: {
    title: 'Frequently Asked Questions',
    sections: [
      { q: 'How long does shipping take?', a: 'Standard shipping takes 3-5 business days. Express shipping is available for 1-2 day delivery.' },
      { q: 'Do you ship internationally?', a: 'Yes, we ship to over 50 countries worldwide. International rates vary by location.' },
      { q: 'Can I track my order?', a: 'Once your order ships, you will receive a tracking number via email.' }
    ]
  },
  shipping: {
    title: 'Shipping Policy',
    content: 'We offer free standard shipping on all orders over $50. For orders under $50, a flat rate of $9.99 applies. All orders are processed within 24 hours.'
  },
  returns: {
    title: 'Returns & Exchanges',
    content: 'We offer a 30-day return policy for most items. Products must be in original condition with packaging. Return shipping is free for exchanges.'
  },
  privacy: {
    title: 'Privacy Policy',
    content: 'Your privacy is important to us. We use secure encryption for all transactions and never share your personal data with third parties.'
  },
  terms: {
    title: 'Terms of Service',
    content: 'By using LUXE Store, you agree to our terms and conditions. We reserve the right to update these terms at any time.'
  }
};

export default function InfoPage({ type = 'faq' }) {
  const data = INFO_CONTENT[type] || INFO_CONTENT.faq;

  return (
    <main id="main-content" className="page-info">
      <section className="section">
        <div className="container narrow">
          <h1>{data.title}</h1>
          <div className="info-body">
            {data.sections ? (
              <div className="faq-list">
                {data.sections.map((item, i) => (
                  <div key={i} className="faq-item">
                    <h5>{item.q}</h5>
                    <p>{item.a}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="info-paragraph">{data.content}</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
