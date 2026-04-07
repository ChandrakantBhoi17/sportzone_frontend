import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const CartView = () => {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();
  const formatPrice = (p: number) => `₹${p.toLocaleString("en-IN")}`;

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <ShoppingBag className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Your Cart is Empty</h3>
        <p className="text-muted-foreground mb-6">
          Start shopping to add items to your cart
        </p>
        <Link
          to="/products"
          className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>

      <div className="space-y-4 mb-8">
        {items.map(({ product, quantity }) => (
          <div
            key={product.id}
            className="flex gap-4 bg-muted rounded-lg p-4"
          >
            <Link
              to={`/product/${product.id}`}
              className="w-20 h-20 rounded-lg overflow-hidden bg-background flex-shrink-0"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </Link>

            <div className="flex-1">
              <Link
                to={`/product/${product.id}`}
                className="font-semibold hover:text-primary transition-colors"
              >
                {product.name}
              </Link>
              <p className="text-sm text-muted-foreground mt-1">
                {product.material} · {product.category}
              </p>
              <p className="font-semibold mt-2">{formatPrice(product.price)}</p>
            </div>

            <div className="flex flex-col items-end justify-between">
              <button
                onClick={() => {
                  removeFromCart(product.id);
                  toast.info("Item removed");
                }}
                className="text-muted-foreground hover:text-destructive transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 border border-border rounded-lg p-1">
                <button
                  onClick={() => updateQuantity(product.id, quantity - 1)}
                  className="w-6 h-6 rounded flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-4 text-center text-sm font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => updateQuantity(product.id, quantity + 1)}
                  className="w-6 h-6 rounded flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>

              <p className="font-semibold">
                {formatPrice(product.price * quantity)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="border-t pt-6 space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span className="text-primary font-medium">Free</span>
        </div>
        <div className="flex justify-between text-lg font-semibold pt-3 border-t">
          <span>Total</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
      </div>

      <Link
        to="/checkout"
        className="block w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold text-center hover:bg-primary/90 transition-all"
      >
        Proceed to Checkout
      </Link>
    </div>
  );
};

export default CartView;
