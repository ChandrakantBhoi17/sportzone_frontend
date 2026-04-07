import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { cartAPI, CartItem as APICartItem, Cart as CartType } from "@/lib/api";
import { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { token, user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart from API on mount or when user changes
  useEffect(() => {
    if (user && token) {
      loadCart();
    } else {
      setItems([]);
      setIsLoading(false);
    }
  }, [user, token]);

  const loadCart = async () => {
    if (!token) return;
    try {
      setIsLoading(true);
      const cart = await cartAPI.get(token);
      // Convert API cart items to local items format
      const formattedItems: CartItem[] = cart.items.map((item: APICartItem) => ({
        product: {
          id: item.productId,
          name: item.name,
          price: item.price,
          image: item.image,
          material: item.material as any,
          category: item.category as any,
        } as Product,
        quantity: item.quantity,
      }));
      setItems(formattedItems);
    } catch (error) {
      console.error("Failed to load cart:", error);
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (product: Product) => {
    if (!token) return;
    try {
      await cartAPI.add({ productId: product.id, quantity: 1 }, token);
      await loadCart();
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  const removeFromCart = async (productId: number) => {
    if (!token) return;
    try {
      await cartAPI.remove(productId, token);
      await loadCart();
    } catch (error) {
      console.error("Failed to remove from cart:", error);
    }
  };

  const updateQuantity = async (productId: number, quantity: number) => {
    if (!token) return;
    try {
      if (quantity <= 0) {
        await removeFromCart(productId);
      } else {
        await cartAPI.update(productId, quantity, token);
        await loadCart();
      }
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  const clearCart = async () => {
    if (!token) return;
    try {
      await cartAPI.clear(token);
      setItems([]);
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  };

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice, isLoading }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
