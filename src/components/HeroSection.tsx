import { Link } from "react-router-dom";

const heroBanner = "https://www.shutterstock.com/image-photo/mix-all-sports-elements-vibrant-600nw-2527418843.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-[70vh] md:h-[85vh] overflow-hidden">
      <img src={heroBanner} alt="Premium sports collection" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />
      <div className="relative z-10 container-luxury h-full flex items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <p className="text-primary-foreground/80 font-sans text-sm uppercase tracking-[0.25em] mb-4 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Premium Quality Gear
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6 animate-fade-up" style={{ animationDelay: "0.2s", color: "hsl(30,50%,98%)" }}>
            Elevate Your Game with Professional Sports Equipment
          </h1>
          <p className="text-lg md:text-xl mb-8 animate-fade-up font-sans" style={{ animationDelay: "0.3s", color: "hsl(30,30%,85%)" }}>
            Discover our curated collections designed for athletes of all levels.
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <Link to="/products" className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl">
              Shop Now
            </Link>
            <Link to="/products" className="px-8 py-3 rounded-full border-2 font-medium transition-all hover:bg-card/10" style={{ borderColor: "hsl(30,50%,90%)", color: "hsl(30,50%,90%)" }}>
              Explore Collections
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

