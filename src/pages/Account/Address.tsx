import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Plus, Trash2, Edit2, MapPin, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Address as AddressType, addressesAPI } from "@/lib/api";

const Address = () => {
  const { token } = useAuth();
  const [addresses, setAddresses] = useState<AddressType[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
  });

  // Load addresses on mount
  useEffect(() => {
    loadAddresses();
  }, [token]);

  const loadAddresses = async () => {
    if (!token) return;
    try {
      setIsLoading(true);
      const data = await addressesAPI.list(token);
      setAddresses(data || []);
    } catch (error) {
      console.error("Failed to load addresses:", error);
      toast.error("Failed to load addresses");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.postalCode
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!token) {
      toast.error("Not authenticated");
      return;
    }

    setIsSaving(true);
    try {
      if (editingId) {
        // Update existing address
        const updated = await addressesAPI.update(
          editingId,
          formData,
          token
        );
        setAddresses((prev) =>
          prev.map((addr) =>
            addr._id === editingId ? { ...addr, ...updated } : addr
          )
        );
        toast.success("Address updated successfully!");
        setEditingId(null);
      } else {
        // Create new address
        const isDefault = addresses.length === 0;
        const newAddress = await addressesAPI.create(
          { ...formData, isDefault },
          token
        );
        setAddresses((prev) => [newAddress, ...prev]);
        toast.success("Address added successfully!");
      }

      setFormData({
        fullName: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        postalCode: "",
      });
      setShowForm(false);
    } catch (error) {
      console.error("Error saving address:", error);
      toast.error("Failed to save address");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (address: AddressType) => {
    setEditingId(address._id || null);
    setFormData({
      fullName: address.fullName,
      phone: address.phone,
      address: address.address,
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!token) return;
    
    try {
      await addressesAPI.delete(id, token);
      setAddresses((prev) => prev.filter((addr) => addr._id !== id));
      toast.success("Address deleted!");
    } catch (error) {
      console.error("Error deleting address:", error);
      toast.error("Failed to delete address");
    }
  };

  const handleSetDefault = async (id: string) => {
    if (!token) return;

    try {
      await addressesAPI.update(id, { isDefault: true }, token);
      setAddresses((prev) =>
        prev.map((addr) => ({
          ...addr,
          isDefault: addr._id === id,
        }))
      );
      toast.success("Default address updated!");
    } catch (error) {
      console.error("Error setting default address:", error);
      toast.error("Failed to set default address");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Delivery Addresses</h2>
        {!showForm && (
          <Button onClick={() => setShowForm(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            Add New Address
          </Button>
        )}
      </div>

      {showForm && (
        <div className="bg-muted rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">
            {editingId ? "Edit Address" : "Add New Address"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Full Name *
                </label>
                <Input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="h-11"
                  disabled={isSaving}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Phone *
                </label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 9876543210"
                  className="h-11"
                  disabled={isSaving}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Address *
              </label>
              <Input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Main Street"
                className="h-11"
                disabled={isSaving}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  City *
                </label>
                <Input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Delhi"
                  className="h-11"
                  disabled={isSaving}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  State *
                </label>
                <Input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Delhi"
                  className="h-11"
                  disabled={isSaving}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Postal Code *
                </label>
                <Input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="110001"
                  className="h-11"
                  disabled={isSaving}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button type="submit" disabled={isSaving}>
                {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {editingId ? "Update Address" : "Add Address"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setFormData({
                    fullName: "",
                    phone: "",
                    address: "",
                    city: "",
                    state: "",
                    postalCode: "",
                  });
                }}
                disabled={isSaving}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {addresses.length === 0 ? (
        <div className="text-center py-12 bg-muted rounded-lg">
          <MapPin className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No addresses saved</h3>
          <p className="text-muted-foreground">
            Add your first delivery address to get started
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {addresses.map((addr) => (
            <div
              key={addr._id}
              className="bg-card border border-border/50 rounded-lg p-4 flex justify-between items-start"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold">{addr.fullName}</h3>
                  {addr.isDefault && (
                    <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{addr.address}</p>
                <p className="text-sm text-muted-foreground">
                  {addr.city}, {addr.state} {addr.postalCode}
                </p>
                <p className="text-sm text-muted-foreground">{addr.phone}</p>
              </div>

              <div className="flex gap-2 ml-4">
                {!addr.isDefault && (
                  <button
                    onClick={() => handleSetDefault(addr._id!)}
                    className="text-xs text-primary hover:underline"
                  >
                    Set as Default
                  </button>
                )}
                <button
                  onClick={() => handleEdit(addr)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(addr._id!)}
                  className="p-2 hover:bg-destructive/10 hover:text-destructive rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Address;

