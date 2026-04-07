import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useQuery } from '@tanstack/react-query';
import { useProducts } from '@/hooks/useProducts';
import { categories, materials } from "@/data/products";
import { SlidersHorizontal, X } from "lucide-react";

const priceRanges = [
  { label: "Under ₹5,000", min: 0, max: 5000 },
  { label: "₹5,000 - ₹20,000", min: 5000, max: 20000 },
  { label: "₹20,000 - ₹50,000", min: 20000, max: 50000 },
  { label: "Above ₹50,000", min: 50000, max: Infinity },
];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  const selectedCategory = searchParams.get("category") || "";
  const selectedMaterial = searchParams.get("material") || "";
  const selectedPrice = searchParams.get("price") || "";

  const minPrice = selectedPrice ? priceRanges[parseInt(selectedPrice)].min : undefined;
  const maxPrice = selectedPrice ? priceRanges[parseInt(selectedPrice)].max : undefined;

  const { data: products = [], isLoading } = useProducts({ 
    category: selectedCategory, 
    minPrice: minPrice === 0 ? 0 : minPrice, 
    maxPrice 
  });

  const setFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    setSearchParams(params);
  };

  const clearFilters = () => setSearchParams({});

  const hasFilters = selectedCategory || selectedMaterial || selectedPrice;

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Category */}
      <div>
        <h3 className="font-sans font-semibold text-sm uppercase tracking-wider mb-3">Category</h3>
        <div className="space-y-2">
          {categories.map((c) => (
            <button key={c} onClick={() => setFilter("category", selectedCategory === c ? "" : c)}
              className={`block w-full text-left text-sm py-1.5 px-3 rounded-lg transition-colors ${selectedCategory === c ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Material */}
      <div>
        <h3 className="font-sans font-semibold text-sm uppercase tracking-wider mb-3">Material</h3>
        <div className="space-y-2">
          {materials.map((m) => (
            <button key={m} onClick={() => setFilter("material", selectedMaterial === m ? "" : m)}
              className={`block w-full text-left text-sm py-1.5 px-3 rounded-lg transition-colors ${selectedMaterial === m ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}>
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="font-sans font-semibold text-sm uppercase tracking-wider mb-3">Price Range</h3>
        <div className="space-y-2">
          {priceRanges.map((r, i) => (
            <button key={i} onClick={() => setFilter("price", selectedPrice === String(i) ? "" : String(i))}
              className={`block w-full text-left text-sm py-1.5 px-3 rounded-lg transition-colors ${selectedPrice === String(i) ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}>
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {hasFilters && (
        <button onClick={clearFilters} className="w-full py-2 text-sm text-primary hover:text-primary/80 border border-primary rounded-lg transition-colors">
          Clear All Filters
        </button>
      )}
    </div>
  );


  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Breadcrumb */}
      <div className="container-luxury px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <span className="text-foreground">All Sports</span>
          {selectedCategory && <><span>/</span><span className="text-foreground">{selectedCategory}</span></>}
        </div>
      </div>

      <div className="container-luxury px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold">
              {selectedCategory || selectedMaterial || "All Sports"}
            </h1>
<p className="text-muted-foreground text-sm mt-1">{products.length} products</p>
          </div>
          <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm">
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
        </div>

        <div className="flex gap-8">
          {/* Desktop filters */}
          <aside className="hidden lg:block w-60 flex-shrink-0">
            <FilterContent />
          </aside>

          {/* Mobile filters overlay */}
          {showFilters && (
            <div className="fixed inset-0 z-50 bg-foreground/50 lg:hidden" onClick={() => setShowFilters(false)}>
              <div className="absolute right-0 top-0 h-full w-72 bg-card p-6 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif font-bold text-lg">Filters</h2>
                  <button onClick={() => setShowFilters(false)}><X className="w-5 h-5" /></button>
                </div>
                <FilterContent />
              </div>
            </div>
          )}

          {/* Products grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">No products found matching your filters.</p>
                <button onClick={clearFilters} className="mt-4 text-primary hover:underline">Clear filters</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Products;
