import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useOrders } from "@/context/OrderContext";
import { ArrowLeft } from "lucide-react";
import { Address, addressesAPI } from "@/lib/api";

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const { user, token } = useAuth();
  const { addOrder } = useOrders();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(true);
  const [savedAddresses, setSavedAddresses] = useState<Address[]>([]);
  const [useExisting, setUseExisting] = useState(true);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");

  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "cod">("cod");

  // Load addresses from API
  useEffect(() => {
    const loadAddresses = async () => {
      if (!token) {
        setIsLoadingAddresses(false);
        return;
      }
      try {
        setIsLoadingAddresses(true);
        const addresses = await addressesAPI.list(token);
        setSavedAddresses(addresses || []);
        if (addresses && addresses.length > 0) {
          const defaultAddr = addresses.find((a) => a.isDefault) || addresses[0];
          setSelectedAddressId(defaultAddr._id || "");
          setUseExisting(true);
        }
      } catch (error) {
        console.error("Failed to load addresses:", error);
      } finally {
        setIsLoadingAddresses(false);
      }
    };
    loadAddresses();
  }, [token]);

  // Populate form when selected address changes
  useEffect(() => {
    if (useExisting && selectedAddressId && savedAddresses.length > 0) {
      const selected = savedAddresses.find((a) => a._id === selectedAddressId);
      if (selected) {
        setFormData({
          fullName: selected.fullName,
          email: user?.email || "",
          phone: selected.phone,
          address: selected.address,
          city: selected.city,
          state: selected.state,
          postalCode: selected.postalCode,
        });
      }
    }
  }, [useExisting, selectedAddressId, savedAddresses, user?.email]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate form
    if (!formData.fullName || !formData.email || !formData.phone || !formData.address || !formData.city || !formData.state || !formData.postalCode) {
      toast.error("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    if (items.length === 0) {
      toast.error("Your cart is empty");
      setIsLoading(false);
      return;
    }

    try {
      // Create order via API
      const result = await addOrder(items, formData, totalPrice, paymentMethod);
      
      console.log('[Checkout] Order result:', result);
      console.log('[Checkout] Order ID from response:', result._id);
      console.log('[Checkout] Payment method selected:', paymentMethod);
      
      await clearCart();

      toast.success("Order placed successfully!");
      // Redirect to account orders tab
      setTimeout(() => navigate("/account?tab=orders"), 1500);
    } catch (error: any) {
      toast.error(error.message || "Failed to place order");
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (p: number) => `₹${p.toLocaleString("en-IN")}`;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container-luxury px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border/50 rounded-xl p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>

              {/* Saved Addresses Option */}
              {savedAddresses.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={useExisting}
                        onChange={() => setUseExisting(true)}
                        className="w-4 h-4"
                      />
                      <span className="font-medium">Use Existing Address</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={!useExisting}
                        onChange={() => setUseExisting(false)}
                        className="w-4 h-4"
                      />
                      <span className="font-medium">Enter New Address</span>
                    </label>
                  </div>

                  {useExisting && (
                    <select
                      value={selectedAddressId}
                      onChange={(e) => setSelectedAddressId(e.target.value)}
                      className="w-full px-4 py-3 border border-border rounded-lg bg-background"
                    >
                      {savedAddresses.map((addr) => (
                        <option key={addr._id} value={addr._id}>
                          {addr.fullName} - {addr.address}, {addr.city}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name *</label>
                    <Input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      disabled={isLoading || (useExisting && selectedAddressId !== "")}
                      className="h-11"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      disabled={isLoading}
                      className="h-11"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone *</label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 9876543210"
                    disabled={isLoading || (useExisting && selectedAddressId !== "")}
                    className="h-11"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Address *</label>
                  <Input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="123 Main Street"
                    disabled={isLoading || (useExisting && selectedAddressId !== "")}
                    className="h-11"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">City *</label>
                    <Input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Delhi"
                      disabled={isLoading || (useExisting && selectedAddressId !== "")}
                      className="h-11"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">State *</label>
                    <Input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="Delhi"
                      disabled={isLoading || (useExisting && selectedAddressId !== "")}
                      className="h-11"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Postal Code *</label>
                    <Input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      placeholder="110001"
                      disabled={isLoading || (useExisting && selectedAddressId !== "")}
                      className="h-11"
                    />
                  </div>
                </div>

                {/* Payment Method Section */}
                <div className="border-t pt-6 mt-6">
                  <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors" style={{borderColor: paymentMethod === 'cod' ? 'hsl(var(--primary))' : 'hsl(var(--border))'}}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                        className="w-4 h-4"
                      />
                      <div>
                        <p className="font-semibold text-sm">Cash on Delivery</p>
                        <p className="text-xs text-muted-foreground">Pay when you receive your order</p>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors" style={{borderColor: paymentMethod === 'upi' ? 'hsl(var(--primary))' : 'hsl(var(--border))'}}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="upi"
                        checked={paymentMethod === "upi"}
                        onChange={() => setPaymentMethod("upi")}
                        className="w-4 h-4"
                      />
                      <div>
                        <p className="font-semibold text-sm">UPI Payment</p>
                        <p className="text-xs text-muted-foreground">Pay instantly using UPI (Google Pay, PhonePe, Paytm)</p>
                      </div>
                    </label>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 text-base font-semibold mt-8"
                >
                  {isLoading ? "Processing..." : `Place Order - ${formatPrice(totalPrice)}`}
                </Button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-card border border-border/50 rounded-xl p-6 sticky top-20">
              <h2 className="text-lg font-semibold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 pb-6 border-b">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex justify-between text-sm">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {quantity}</p>
                    </div>
                    <p className="font-medium">{formatPrice(product.price * quantity)}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>FREE</span>
                </div>
                <div className="flex justify-between text-lg font-semibold pt-3 border-t">
                  <span>Total</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
