import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import SearchModal from './components/SearchModal';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Categories from './pages/Categories';
import About from './pages/About';
import Contact from './pages/Contact';
import InfoPage from './pages/InfoPage';
import Account from './pages/Account';
import Checkout from './pages/Checkout';
import './styles/global.css';
import './styles/layout.css';
import './styles/components.css';

// Toast notification component
function Toast({ message, onHide }) {
  useEffect(() => {
    const t = setTimeout(onHide, 3000);
    return () => clearTimeout(t);
  }, [onHide]);

  return (
    <div className="toast" role="alert" aria-live="polite">
      <span className="toast-icon">🛒</span>
      {message}
    </div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentProductId, setCurrentProductId] = useState(null);
  const [infoType, setInfoType] = useState('faq');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, currentProductId]);

  // Navigation handler
  const handleNavigate = useCallback((page, id = null) => {
    setCurrentPage(page);
    if (page === 'product') {
      setCurrentProductId(id);
    } else if (page === 'info') {
      setInfoType(id || 'faq');
    } else if (page === 'shop' && id) {
      setSelectedCategory(id);
    } else if (page === 'shop') {
      setSelectedCategory(null);
    }
    setCartOpen(false);
    setSearchOpen(false);
  }, []);

  // Cart operations
  const handleAddToCart = useCallback((product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setToast(`${product.name} added to cart!`);
  }, []);

  const handleUpdateQty = useCallback((id, qty) => {
    if (qty < 1) {
      setCartItems(prev => prev.filter(item => item.id !== id));
    } else {
      setCartItems(prev => prev.map(item =>
        item.id === id ? { ...item, qty } : item
      ));
    }
  }, []);

  const handleRemoveFromCart = useCallback((id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const cartTax = cartSubtotal * 0.08;
  const cartShipping = cartSubtotal >= 50 ? 0 : 9.99;
  const cartTotal = cartSubtotal + cartTax + cartShipping;

  const renderPage = () => {
    switch (currentPage) {
      case 'shop':
        return (
          <Shop
            key={selectedCategory || 'all'}
            onAddToCart={handleAddToCart}
            onNavigate={handleNavigate}
            initialCategory={selectedCategory}
          />
        );
      case 'product':
        return (
          <ProductDetails
            productId={currentProductId}
            onAddToCart={handleAddToCart}
            onNavigate={handleNavigate}
          />
        );
      case 'cart':
        return (
          <Cart
            cartItems={cartItems}
            onUpdateQty={handleUpdateQty}
            onRemove={handleRemoveFromCart}
            onNavigate={handleNavigate}
          />
        );
      case 'categories':
        return <Categories onNavigate={handleNavigate} />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      case 'info':
        return <InfoPage type={infoType} />;
      case 'account':
        return <Account />;
      case 'checkout':
        return (
          <Checkout
            cartItems={cartItems}
            total={cartTotal}
            onNavigate={handleNavigate}
          />
        );
      case 'home':
      default:
        return (
          <Home
            onAddToCart={handleAddToCart}
            onNavigate={handleNavigate}
          />
        );
    }
  };

  return (
    <div className="app">
      {/* Skip to main content for accessibility */}
      <a
        href="#main-content"
        style={{
          position: 'absolute',
          top: -100,
          left: 0,
          padding: '8px 16px',
          background: 'var(--color-secondary)',
          color: 'white',
          zIndex: 9999,
          borderRadius: '0 0 8px 0',
          transition: 'top 0.2s',
        }}
        onFocus={e => e.target.style.top = '0'}
        onBlur={e => e.target.style.top = '-100px'}
      >
        Skip to main content
      </a>

      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        onSearchOpen={() => setSearchOpen(true)}
      />

      <div className="app-main">
        {renderPage()}
      </div>

      <Footer onNavigate={handleNavigate} />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemove={handleRemoveFromCart}
        onNavigate={handleNavigate}
      />

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={handleNavigate}
      />

      {toast && (
        <Toast
          message={toast}
          onHide={() => setToast(null)}
        />
      )}
    </div>
  );
}
