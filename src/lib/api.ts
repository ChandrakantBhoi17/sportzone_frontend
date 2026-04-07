const API_BASE = 'https://truptienterprises.in/api';

export interface BackendProduct {
  _id?: string;
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  material: 'Nike' | 'Adidas' | 'Puma' | 'Under Armour';
  category: 'Running' | 'Basketball' | 'Football' | 'Tennis' | 'Swimming' | 'Gym' | 'Cycling';
  weight: string;
  image: string;
  rating: number;
  reviews: number;
  dailyWear?: boolean;
}

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  image: string;
  material: string;
  category: string;
  quantity: number;
}

export interface Cart {
  _id?: string;
  userId: string;
  items: CartItem[];
  totalPrice: number;
}

export interface OrderItem {
  productId: number;
  name: string;
  price: number;
  image: string;
  material: string;
  category: string;
  quantity: number;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
}

export interface Address {
  _id?: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  isDefault: boolean;
}

export interface Order {
  _id?: string;
  userId: string;
  orderNumber: string;
  items: OrderItem[];
  totalPrice: number;
  shippingAddress: ShippingAddress;
  paymentMethod: 'upi' | 'cod';
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'completed' | 'failed';
  createdAt?: string;
  updatedAt?: string;
}

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE}${endpoint}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  if (!res.ok) {
    throw new Error(`API Error: ${res.status}`);
  }
  return res.json();
};

export const productsAPI = {
  list: (params: { category?: string; minPrice?: string; maxPrice?: string } = {}) => 
    apiFetch('/products?' + new URLSearchParams(params as any).toString()),
  get: (id: number) => apiFetch(`/products/${id}`),
};

export const authAPI = {
  register: (data: { email: string; password: string; name?: string }) => 
    apiFetch('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  login: (data: { email: string; password: string }) => 
    apiFetch('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
};

export const addressesAPI = {
  list: (token: string) =>
    apiFetch('/addresses', { headers: { Authorization: `Bearer ${token}` } }),
  create: (data: Omit<Address, '_id'>, token: string) =>
    apiFetch('/addresses', { method: 'POST', body: JSON.stringify(data), headers: { Authorization: `Bearer ${token}` } }),
  update: (id: string, data: Partial<Address>, token: string) =>
    apiFetch(`/addresses/${id}`, { method: 'PUT', body: JSON.stringify(data), headers: { Authorization: `Bearer ${token}` } }),
  delete: (id: string, token: string) =>
    apiFetch(`/addresses/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } }),
};

export const cartAPI = {
  get: (token: string) => 
    apiFetch('/cart', { headers: { Authorization: `Bearer ${token}` } }),
  add: (data: { productId: number; quantity?: number }, token: string) => 
    apiFetch('/cart/add', { method: 'POST', body: JSON.stringify(data), headers: { Authorization: `Bearer ${token}` } }),
  update: (productId: number, quantity: number, token: string) => 
    apiFetch(`/cart/update/${productId}`, { method: 'PUT', body: JSON.stringify({ quantity }), headers: { Authorization: `Bearer ${token}` } }),
  remove: (productId: number, token: string) => 
    apiFetch(`/cart/remove/${productId}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } }),
  clear: (token: string) =>
    apiFetch('/cart/clear', { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } }),
};

export const ordersAPI = {
  list: (token: string) =>
    apiFetch('/orders', { headers: { Authorization: `Bearer ${token}` } }),
  get: (id: string, token: string) =>
    apiFetch(`/orders/${id}`, { headers: { Authorization: `Bearer ${token}` } }),
  create: (data: { items: OrderItem[]; shippingAddress: ShippingAddress; totalPrice: number; paymentMethod: 'upi' | 'cod' }, token: string) =>
    apiFetch('/orders', { method: 'POST', body: JSON.stringify(data), headers: { Authorization: `Bearer ${token}` } }),
  updateStatus: (id: string, status: string, token: string) =>
    apiFetch(`/orders/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }), headers: { Authorization: `Bearer ${token}` } }),
  updatePaymentStatus: (id: string, paymentStatus: string, token: string) =>
    apiFetch(`/orders/${id}/payment-status`, { method: 'PUT', body: JSON.stringify({ paymentStatus }), headers: { Authorization: `Bearer ${token}` } }),
};

