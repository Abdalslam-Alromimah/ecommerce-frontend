import React, { useState, useEffect } from 'react';
import { CartItem } from '../types';
import { fetchCart } from '../api';
import './Cart.css';

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const data = await fetchCart();
        setCartItems(data);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to load cart');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadCart();
  }, []);

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="cart">
      <h3>Your Cart</h3>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <p>Product ID: {item.productId}</p>
              <p>Qty: {item.quantity}</p>
            </div>
          ))}
          {/* Note: Total calculation requires product prices, which need to be fetched separately */}
        </>
      )}
    </div>
  );
};

export default Cart;