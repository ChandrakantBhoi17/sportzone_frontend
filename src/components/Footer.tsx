import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background/80">
      <div className="container-luxury section-padding">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-serif font-bold text-background mb-4">SportZone</h3>
            <p className="text-sm leading-relaxed text-background/60">Premium sports equipment for athletes of all levels. Elevate your game with quality gear.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-sans font-semibold text-background mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/products" className="hover:text-background transition-colors">All Products</Link></li>
              <li><Link to="/products?category=Running" className="hover:text-background transition-colors">Running</Link></li>
              <li><Link to="/products?category=Basketball" className="hover:text-background transition-colors">Basketball</Link></li>
              <li><Link to="/products?category=Football" className="hover:text-background transition-colors">Football</Link></li>
              <li><Link to="/products?category=Gym" className="hover:text-background transition-colors">Gym</Link></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="font-sans font-semibold text-background mb-4 text-sm uppercase tracking-wider">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><span className="hover:text-background transition-colors cursor-pointer">About Us</span></li>
              <li><span className="hover:text-background transition-colors cursor-pointer">Contact Us</span></li>
              <li><span className="hover:text-background transition-colors cursor-pointer">Shipping Policy</span></li>
              <li><span className="hover:text-background transition-colors cursor-pointer">Return Policy</span></li>
              <li><span className="hover:text-background transition-colors cursor-pointer">Terms & Conditions</span></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-sans font-semibold text-background mb-4 text-sm uppercase tracking-wider">Newsletter</h4>
            <p className="text-sm mb-3 text-background/60">Subscribe for exclusive offers and new arrivals.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Your email" className="flex-1 px-3 py-2 rounded-lg bg-background/10 border border-background/20 text-sm text-background placeholder:text-background/40 focus:outline-none focus:ring-1 focus:ring-primary" />
              <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">Join</button>
            </div>
            <div className="flex gap-4 mt-4">
              {["Instagram", "Facebook", "Twitter", "Pinterest"].map((s) => (
                <span key={s} className="text-xs text-background/50 hover:text-background cursor-pointer transition-colors">{s}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-background/40">
          <span>© 2026 SportZone. All rights reserved.</span>
          <span className="flex items-center gap-1">Made with <Heart className="w-3 h-3 text-primary fill-primary" /> By Briskode</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

