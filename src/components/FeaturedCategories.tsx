import { Link } from "react-router-dom";

const catNike = "https://cdn.pixabay.com/photo/2020/10/11/05/36/nike-5644799_640.jpg";
const catAdidas = "https://rukminim2.flixcart.com/image/480/640/xif0q/shoe/q/s/n/-original-imah25hq9y8t3ukf.jpeg?q=90";
const catPuma = "https://77sports.in/cdn/shop/files/puma-dual-tone-shoes-cricket-shoes-1296246.jpg?v=1758445690&width=1920";

const cats = [
  { name: "Nike", image: catNike, desc: "Premium performance gear" },
  { name: "Adidas", image: catAdidas, desc: "Innovative sports apparel" },
  { name: "Puma", image: catPuma, desc: "Dynamic athletic wear" },
];

const FeaturedCategories = () => (
  <section className="section-padding bg-background">
    <div className="container-luxury">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3">Featured Brands</h2>
        <p className="text-muted-foreground font-sans">Explore top sports brands</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cats.map((c) => (
          <Link to={`/products?material=${c.name}`} key={c.name} className="group relative overflow-hidden rounded-2xl aspect-square hover-lift">
            <img src={c.image} alt={c.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="text-2xl font-serif font-bold" style={{ color: "hsl(30,50%,95%)" }}>{c.name}</h3>
              <p className="text-sm mt-1" style={{ color: "hsl(30,30%,80%)" }}>{c.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturedCategories;

