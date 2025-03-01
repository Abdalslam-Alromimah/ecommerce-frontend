// src/api.ts
import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

// API functions
export const loginUser = (idToken: string) =>
  api.post('/auth/login', { idToken });

export const fetchProducts = () =>
  api.get('/products').then((res) => res.data.products);

export const fetchCart = () =>
  api.get('/cart').then((res) => res.data.cart);

export const addToCartApi = (productId: number, quantity: number) =>
  api.post('/cart/add', { productId, quantity });