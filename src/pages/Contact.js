import React, { useState } from 'react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main id="main-content" className="page-contact">
      <section className="section">
        <div className="container">
          <div className="section-header center">
            <div className="section-label">Support</div>
            <h1>Get In Touch</h1>
            <p>Have a question or need assistance? Our team is here to help.</p>
          </div>

          <div className="contact-grid">
            <div className="contact-info">
              <div className="contact-method">
                <div className="contact-icon">📍</div>
                <div>
                  <h4>Visit Us</h4>
                  <p>123 Luxury Lane, Design District<br />New York, NY 10001</p>
                </div>
              </div>
              <div className="contact-method">
                <div className="contact-icon">📧</div>
                <div>
                  <h4>Email Us</h4>
                  <p>support@luxestore.com<br />press@luxestore.com</p>
                </div>
              </div>
              <div className="contact-method">
                <div className="contact-icon">📞</div>
                <div>
                  <h4>Call Us</h4>
                  <p>+1 (888) LUXE-123<br />Mon-Fri, 9am - 6pm EST</p>
                </div>
              </div>
              <div className="contact-socials">
                <h4>Follow Us</h4>
                <div className="social-links">
                  {['𝕏', 'f', 'in', '📷'].map(s => (
                    <button key={s} className="social-link-btn">{s}</button>
                  ))}
                </div>
              </div>
            </div>

            <div className="contact-form-container">
              {submitted ? (
                <div className="contact-success">
                  <div className="success-icon">✅</div>
                  <h3>Message Sent!</h3>
                  <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
                  <button className="btn btn-primary" onClick={() => setSubmitted(false)}>Send Another</button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Full Name</label>
                      <input type="text" id="name" required placeholder="John Doe" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input type="email" id="email" required placeholder="john@example.com" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <select id="subject">
                      <option>General Inquiry</option>
                      <option>Order Support</option>
                      <option>Returns</option>
                      <option>Partnership</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea id="message" required rows="5" placeholder="How can we help you?"></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">Send Message</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
