  import { useParams, Link } from "react-router-dom";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Star, ShoppingBag, ChevronLeft, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import ProductCard from "@/components/ProductCard";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container-luxury section-padding text-center">
          <h1 className="text-2xl font-serif">Product not found</h1>
          <Link to="/products" className="text-primary hover:underline mt-4 inline-block">Back to products</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAdd = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  const formatPrice = (p: number) => `₹${p.toLocaleString("en-IN")}`;
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  // Generate mock reviews
  const mockReviews = [
    { name: "Priya S.", rating: 5, text: "Amazing quality! Perfect for my training sessions.", date: "2 weeks ago" },
    { name: "Anita M.", rating: 4, text: "Great product, exactly as described. Fast shipping too!", date: "1 month ago" },
    { name: "Sneha R.", rating: 5, text: "Bought this as a gift and they loved it! Premium quality.", date: "2 months ago" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Breadcrumb */}
      <div className="container-luxury px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-foreground transition-colors">All Products</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>
      </div>

      <div className="container-luxury px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-muted border border-border/50">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className={`aspect-square rounded-lg overflow-hidden bg-muted border-2 cursor-pointer transition-colors ${i === 0 ? "border-primary" : "border-border/50 hover:border-primary/50"}`}>
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">{product.material} · {product.category}</p>
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-3">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className={`w-4 h-4 ${s <= Math.round(product.rating) ? "fill-accent text-accent" : "text-border"}`} />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">{product.rating} ({product.reviews} reviews)</span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-foreground">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
                  <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </span>
                </>
              )}
            </div>

            <p className="text-muted-foreground font-sans leading-relaxed">{product.description}</p>

            <div className="grid grid-cols-2 gap-4 py-4 border-y border-border">
              <div>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Material</span>
                <p className="font-medium text-sm mt-1">{product.material}</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Weight</span>
                <p className="font-medium text-sm mt-1">{product.weight}</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Category</span>
                <p className="font-medium text-sm mt-1">{product.category}</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Rating</span>
                <p className="font-medium text-sm mt-1">{product.rating}/5</p>
              </div>
            </div>

            <button onClick={handleAdd} className="w-full py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3">
              <ShoppingBag className="w-5 h-5" />
              Add to Cart
            </button>

            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Truck, label: "Free Shipping" },
                { icon: ShieldCheck, label: "Certified" },
                { icon: RotateCcw, label: "Easy Returns" },
              ].map((f) => (
                <div key={f.label} className="flex flex-col items-center gap-1 p-3 rounded-lg bg-muted/50 text-center">
                  <f.icon className="w-4 h-4 text-primary" />
                  <span className="text-xs text-muted-foreground">{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-16">
          <h2 className="text-2xl font-serif font-bold mb-8">Customer Reviews</h2>
          <div className="space-y-4">
            {mockReviews.map((r, i) => (
              <div key={i} className="bg-card border border-border/50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">{r.name[0]}</div>
                    <div>
                      <p className="font-medium text-sm">{r.name}</p>
                      <p className="text-xs text-muted-foreground">{r.date}</p>
                    </div>
                  </div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className={`w-3 h-3 ${s <= r.rating ? "fill-accent text-accent" : "text-border"}`} />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{r.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-serif font-bold mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
