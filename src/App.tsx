import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Login from './components/Login';
import { User } from './types';
import { addToCartApi } from './api';
import './App.css';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [cartCount, setCartCount] = useState<number>(0);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const addToCart = async (productId: number, quantity: number) => {
    if (!user) {
      alert('Please log in to add items to your cart');
      return;
    }
    try {
      await addToCartApi(productId, quantity);
      setCartCount((prev) => prev + quantity);
    } catch (err: any) {
      console.error('Error adding to cart:', err);
      alert(err.response?.data?.error || 'Failed to add to cart');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>ShopEase</h1>
          <div className="search-bar">
            <input type="text" placeholder="Search products..." />
            <button>Search</button>
          </div>
          <nav className="nav-menu">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/shop">Shop</Link></li>
              <li><Link to="/cart">Cart</Link></li>
              {user ? (
                <li><button onClick={handleLogout}>Logout</button></li>
              ) : (
                <li><Link to="/login">Login</Link></li>
              )}
            </ul>
          </nav>
        </header>
        <div className="main-content">
          <aside className="sidebar">
            <div className="sidebar-section">
              <h3>Quick Cart</h3>
              <p>{cartCount} Items in Cart</p>
              <Link to="/cart" className="sidebar-link">View Cart</Link>
            </div>
            <div className="sidebar-section">
              <h3>Account</h3>
              {user ? (
                <p>Welcome, {user.displayName || user.email}</p>
              ) : (
                <Link to="/login" className="sidebar-link">Login</Link>
              )}
            </div>
          </aside>
          <main className="content">
            <Routes>
              <Route path="/" element={<ProductList addToCart={addToCart} />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/shop" element={<ProductList addToCart={addToCart} />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;