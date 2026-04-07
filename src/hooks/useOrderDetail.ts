import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useOrders } from '@/context/OrderContext';
import { ordersAPI } from '@/lib/api';

interface Order {
  _id?: string;
  orderNumber: string;
  date?: string;
  createdAt?: string;
  items: any[];
  totalPrice: number;
  paymentMethod?: 'upi' | 'cod';
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: any;
}

interface UseOrderDetailReturn {
  order: Order | null;
  isLoading: boolean;
  error: string | null;
}

export const useOrderDetail = (orderId: string | undefined): UseOrderDetailReturn => {
  const { token } = useAuth();
  const { getOrderById, isLoading: contextLoading } = useOrders();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;

  useEffect(() => {
    if (!orderId) {
      setIsLoading(false);
      return;
    }

    const loadOrder = async () => {
      try {
        setIsLoading(true);
        setError(null);

        console.log(`[OrderDetail] Loading order: ${orderId}, retry: ${retryCount}`);

        // Check context first
        const contextOrder = getOrderById(orderId);
        if (contextOrder) {
          console.log('[OrderDetail] Found order in context');
          const formattedOrder: Order = {
            _id: contextOrder.id,
            orderNumber: contextOrder.orderNumber,
            createdAt: contextOrder.date,
            items: contextOrder.items,
            totalPrice: contextOrder.totalPrice,
            status: contextOrder.status,
            shippingAddress: contextOrder.shippingAddress,
          };
          setOrder(formattedOrder);
          setIsLoading(false);
          return;
        }

        // If not in context and context is still loading, wait a bit
        if (contextLoading && retryCount === 0) {
          console.log('[OrderDetail] Context still loading, will retry...');
          setTimeout(() => setRetryCount(prev => prev + 1), 500);
          return;
        }

        // Fetch from API
        if (!token) {
          setError('Not authorized. Please log in to view your order.');
          setIsLoading(false);
          return;
        }

        console.log('[OrderDetail] Fetching from API...');
        const data = await ordersAPI.get(orderId, token);
        console.log('[OrderDetail] API response:', data);
        setOrder(data);
        setError(null);
      } catch (err: any) {
        console.error('[OrderDetail] Error loading order:', err);
        
        // Retry on network errors
        if (retryCount < MAX_RETRIES && err.message?.includes('API Error')) {
          console.log(`[OrderDetail] Retrying... (${retryCount + 1}/${MAX_RETRIES})`);
          setTimeout(() => setRetryCount(prev => prev + 1), 1000);
          return;
        }

        setError(err.message || 'Failed to load order details. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    loadOrder();
  }, [orderId, token, getOrderById, contextLoading, retryCount]);

  return { order, isLoading, error };
};
