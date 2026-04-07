import { Link } from "react-router-dom";

const catRunning = "https://static.vecteezy.com/system/resources/thumbnails/046/125/044/small/runner-s-legs-in-motion-during-marathon-athlete-s-feet-running-in-a-race-jogging-man-concept-of-fitness-endurance-outdoor-exercise-performance-morning-run-activity-sport-sprinting-photo.jpeg";
const catBasketball = "https://i.pinimg.com/474x/70/a3/0d/70a30d722a74911efe4bf54a7cae22cd.jpg";
const catFootball = "https://cdng.europosters.eu/pod_public/1300/169545.jpg";
const catTennis = "https://img.freepik.com/premium-photo/tennis-game-tennis-balls-rackets-background_488220-1471.jpg?semt=ais_rp_50_assets&w=740&q=80";
const catSwimming = "https://www.health.com/thmb/Yv4HuoQyNbHNNxgtOTm63zqxurQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Health-Swimming-080c78802f384a4687df5a3b13d5611e-3719a8e40a3c4c43a63a4d795e47c505.jpg";
const catGym = "https://img.freepik.com/free-photo/view-gym-room-training-sports_23-2151699540.jpg?semt=ais_rp_progressive&w=740&q=80";

const items = [
  { name: "Running", image: catRunning },
  { name: "Basketball", image: catBasketball },
  { name: "Football", image: catFootball },
  { name: "Tennis", image: catTennis },
  { name: "Swimming", image: catSwimming },
  { name: "Gym", image: catGym },
];

const ShopByCategory = () => (
  <section className="section-padding bg-secondary/50">
    <div className="container-luxury">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3">Shop by Category</h2>
        <p className="text-muted-foreground font-sans">Find your perfect gear</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
        {items.map((c) => (
          <Link to={`/products?category=${c.name}`} key={c.name} className="group text-center">
            <div className="relative overflow-hidden rounded-full aspect-square mb-3 hover-lift border-2 border-border hover:border-primary transition-colors">
              <img src={c.image} alt={c.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <span className="font-sans font-medium text-sm text-foreground group-hover:text-primary transition-colors">{c.name}</span>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default ShopByCategory;

