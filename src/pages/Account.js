import React, { useState } from 'react';

export default function Account() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <main id="main-content" className="page-account">
      <div className="page-header">
        <div className="container">
          <h1 style={{ color: 'white' }}>{isLogin ? 'Welcome Back' : 'Join LUXE Store'}</h1>
          <p>{isLogin ? 'Sign in to manage your orders and profile' : 'Create an account for a faster checkout experience'}</p>
        </div>
      </div>

      <div className="section">
        <div className="container" style={{ maxWidth: '480px' }}>
          <div className="contact-form-container">
            <h2 style={{ marginBottom: 'var(--space-4)', textAlign: 'center' }}>
              {isLogin ? 'Account Login' : 'Create Account'}
            </h2>
            
            <form onSubmit={e => e.preventDefault()}>
              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input type="text" id="name" placeholder="John Doe" required />
                </div>
              )}
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" placeholder="john@example.com" required />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="••••••••" required />
              </div>
              
              {isLogin && (
                <div style={{ textAlign: 'right', marginBottom: 'var(--space-4)' }}>
                  <button type="button" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-primary)' }}>
                    Forgot password?
                  </button>
                </div>
              )}
              
              <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginBottom: 'var(--space-4)' }}>
                {isLogin ? 'Sign In' : 'Create Account'}
              </button>
              
              <div style={{ textAlign: 'center', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button 
                  type="button" 
                  onClick={() => setIsLogin(!isLogin)}
                  style={{ color: 'var(--color-secondary)', fontWeight: 600 }}
                >
                  {isLogin ? 'Sign Up' : 'Log In'}
                </button>
              </div>
            </form>

            <div style={{ marginTop: 'var(--space-8)', borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-6)' }}>
              <p style={{ textAlign: 'center', fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 'var(--space-4)', color: 'var(--color-text-secondary)' }}>
                Or continue with
              </p>
              <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                <button className="btn btn-secondary" style={{ flex: 1 }}>Google</button>
                <button className="btn btn-secondary" style={{ flex: 1 }}>Apple</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
