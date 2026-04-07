import { Link } from "react-router-dom";
import { ShoppingBag, Star } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  const formatPrice = (p: number) => `₹${p.toLocaleString("en-IN")}`;

  return (
    <Link to={`/product/${product.id}`} className="group block hover-lift">
      <div className="bg-card rounded-xl overflow-hidden border border-border/50 shadow-sm hover:shadow-md transition-shadow">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          {product.originalPrice && (
            <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded-full">
              {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
            </span>
          )}
          <button onClick={handleAdd} className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-card/90 backdrop-blur-sm text-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-primary hover:text-primary-foreground shadow-md">
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>

        {/* Info */}
        <div className="p-3 md:p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{product.material} · {product.category}</p>
          <h3 className="font-sans font-semibold text-sm md:text-base text-foreground line-clamp-1 mb-1">{product.name}</h3>
          <div className="flex items-center gap-1 mb-2">
            <Star className="w-3 h-3 fill-accent text-accent" />
            <span className="text-xs text-muted-foreground">{product.rating} ({product.reviews})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
