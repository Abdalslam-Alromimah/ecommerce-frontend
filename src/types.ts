// src/types.ts
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
}

export interface CartItem {
  id: number;
  userId: string;
  productId: number;
  quantity: number;
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
}