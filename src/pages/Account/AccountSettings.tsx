import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

const AccountSettings = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      toast.success("Profile updated!");
      setIsEditing(false);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-serif font-bold mb-6">Account Settings</h1>
      <form onSubmit={handleUpdate} className="space-y-6 max-w-md">
        <div>
          <label className="block text-sm font-medium mb-3">Full Name</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!isEditing || isLoading}
            className="text-lg font-semibold h-12"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-3">Email Address</label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            disabled={!isEditing || isLoading}
            className="text-lg h-12"
          />
        </div>
        <div className="flex gap-3">
          {isEditing ? (
            <>
              <Button type="submit" disabled={isLoading} className="flex-1">
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
              <Button type="button" variant="outline" onClick={() => setIsEditing(false)} disabled={isLoading}>
                Cancel
              </Button>
            </>
          ) : (
            <Button type="button" onClick={() => setIsEditing(true)} className="flex-1">
              Edit Profile
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AccountSettings;

