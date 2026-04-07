import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { ordersAPI, Order as OrderType, OrderItem } from "@/lib/api";
import { CartItem } from "./CartContext";

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: CartItem[];
  totalPrice: number;
  paymentMethod?: 'upi' | 'cod';
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  shippingAddress: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
  };
}

interface OrderContextType {
  orders: Order[];
  addOrder: (items: CartItem[], shippingAddress: any, totalPrice: number, paymentMethod?: 'upi' | 'cod') => Promise<any>;
  getOrderById: (id: string) => Order | undefined;
  updateOrderStatus: (id: string, status: Order["status"]) => Promise<void>;
  isLoading: boolean;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const { token, user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load orders from API on mount or when user changes
  useEffect(() => {
    if (user && token) {
      loadOrders();
    } else {
      setOrders([]);
      setIsLoading(false);
    }
  }, [user, token]);

  const loadOrders = async () => {
    if (!token) return;
    try {
      setIsLoading(true);
      console.log('[OrderContext] Loading orders from API...');
      const data = await ordersAPI.list(token);
      console.log('[OrderContext] Orders loaded from API:', data);
      const formattedOrders: Order[] = data.map((order: OrderType) => ({
        id: order._id || '',
        orderNumber: order.orderNumber,
        date: order.createdAt || new Date().toISOString(),
        items: order.items.map((item: OrderItem) => ({
          product: {
            id: item.productId,
            name: item.name,
            price: item.price,
            image: item.image,
            material: item.material,
            category: item.category,
          },
          quantity: item.quantity,
        })),
        totalPrice: order.totalPrice,
        paymentMethod: order.paymentMethod,
        status: order.status,
        shippingAddress: order.shippingAddress,
      }));
      console.log('[OrderContext] Formatted orders:', formattedOrders);
      setOrders(formattedOrders);
    } catch (error) {
      console.error("[OrderContext] Failed to load orders:", error);
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  };

  const addOrder = async (items: CartItem[], shippingAddress: any, totalPrice: number, paymentMethod: 'upi' | 'cod' = 'cod') => {
    if (!token) throw new Error("Not authenticated");
    try {
      const orderItems: OrderItem[] = items.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        price: item.product.price,
        image: item.product.image,
        material: item.product.material,
        category: item.product.category,
        quantity: item.quantity,
      }));

      console.log('[OrderContext] Creating order with items:', orderItems);
      console.log('[OrderContext] Payment method:', paymentMethod);
      const result = await ordersAPI.create({ items: orderItems, shippingAddress, totalPrice, paymentMethod }, token);
      console.log('[OrderContext] Order created, API response:', result);
      console.log('[OrderContext] Order ID from response:', result._id);
      await loadOrders(); // Reload orders list
      return result;
    } catch (error: any) {
      throw new Error(error.message || "Failed to create order");
    }
  };

  const getOrderById = (id: string): Order | undefined => {
    return orders.find((order) => order.id === id);
  };

  const updateOrderStatus = async (id: string, status: Order["status"]) => {
    if (!token) throw new Error("Not authenticated");
    try {
      await ordersAPI.updateStatus(id, status, token);
      await loadOrders(); // Reload orders list
    } catch (error: any) {
      throw new Error(error.message || "Failed to update order status");
    }
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, getOrderById, updateOrderStatus, isLoading }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be used within OrderProvider");
  return ctx;
};
