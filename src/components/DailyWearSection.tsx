import { Link } from "react-router-dom";
import { products } from "@/data/products";
import ProductCard from "./ProductCard";

const DailyWearSection = () => {
  const dailyWear = products.filter((p) => p.dailyWear).slice(0, 8);

  return (
    <section className="section-padding bg-background">
      <div className="container-luxury">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3">Everyday Elegance</h2>
          <p className="text-muted-foreground font-sans">Lightweight pieces perfect for daily wear</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {dailyWear.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/products" className="inline-block px-8 py-3 rounded-full border-2 border-primary text-primary font-medium hover:bg-primary hover:text-primary-foreground transition-all">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DailyWearSection;
