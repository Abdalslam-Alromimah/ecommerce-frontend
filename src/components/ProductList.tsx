import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { fetchProducts, addToCartApi } from '../api';
import './ProductList.css';

interface ProductListProps {
  addToCart: (productId: number, quantity: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ addToCart }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err: any) {
        setError('Failed to load products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="product-list">
      <div className="filters">All Categories</div>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            {/* Placeholder image */}
            <img
              src={`https://via.placeholder.com/150?text=${product.name}`}
              alt={product.name}
              className="product-image"
            />
            <h3>{product.name}</h3>
            <p className="price">${product.price.toFixed(2)}</p>
            <p className="stock">In Stock: {product.stock}</p>
            <button
              onClick={() => addToCart(product.id, 1)}
              className="add-to-cart"
              disabled={product.stock === 0}
            >
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;