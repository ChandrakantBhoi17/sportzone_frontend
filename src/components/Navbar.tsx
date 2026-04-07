import { Link } from "react-router-dom";
import { ShoppingBag, User, Menu, X, Search } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { totalItems } = useCart();
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "All Products", to: "/products" },
    { label: "Running", to: "/products?category=Running" },
    { label: "Basketball", to: "/products?category=Basketball" },
    { label: "Football", to: "/products?category=Football" },
    { label: "Gym", to: "/products?category=Gym" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b">
      <div className="container-luxury flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-serif font-bold tracking-tight gold-text">SportZone</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <Link key={l.to + l.label} to={l.to} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {user ? (
            <Link to="/account" className="hidden sm:flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <User className="w-4 h-4" />
            <span className="hidden lg:inline">Account</span>
          </Link>
          ) : (
            <Link to="/login" className="hidden sm:flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <User className="w-4 h-4" />
              <span className="hidden lg:inline">Sign In</span>
            </Link>
          )}
          <Link to="/cart" className="relative flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-semibold">
                {totalItems}
              </span>
            )}
          </Link>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-1 text-foreground">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-card animate-fade-in">
          <nav className="flex flex-col p-4 gap-3">
            {navLinks.map((l) => (
              <Link key={l.to + l.label} to={l.to} onClick={() => setMobileOpen(false)} className="text-sm font-medium text-muted-foreground hover:text-foreground py-2 border-b border-border/50">
                {l.label}
              </Link>
            ))}
            {user ? (
              <Link to="/account" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-muted-foreground hover:text-foreground py-2">
                Account
              </Link>
            ) : (
              <Link to="/login" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-muted-foreground hover:text-foreground py-2">
                Sign In
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;

