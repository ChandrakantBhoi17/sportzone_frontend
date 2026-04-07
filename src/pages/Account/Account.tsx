import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import AccountSettings from "./AccountSettings";
import AccountOrders from "./AccountOrders";
import AccountAddress from "./AccountAddress";
import AccountCart from "./AccountCart";
import { User, Package, MapPin, ShoppingBag, Menu } from "lucide-react";

type AccountTab = 'settings' | 'orders' | 'address' | 'cart';

const Account = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<AccountTab>('settings');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const tabs = [
    { id: 'settings' as AccountTab, label: 'Account', icon: <User className="w-5 h-5" /> },
    { id: 'orders' as AccountTab, label: 'Orders', icon: <Package className="w-5 h-5" /> },
    { id: 'address' as AccountTab, label: 'Address', icon: <MapPin className="w-5 h-5" /> },
    { id: 'cart' as AccountTab, label: 'Cart', icon: <ShoppingBag className="w-5 h-5" /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'settings':
        return <AccountSettings />;
      case 'orders':
        return <AccountOrders />;
      case 'address':
        return <AccountAddress />;
      case 'cart':
        return <AccountCart />;
      default:
        return <AccountSettings />;
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <div className={`fixed md:relative inset-0 z-40 bg-card border-r transition-transform duration-300 lg:translate-x-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} w-64 shadow-lg`}>
          <div className="p-6 border-b">
            <h2 className="text-xl font-serif font-bold">My Account</h2>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground font-medium shadow-md'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
          <div className="p-4 border-t">
            <Button onClick={logout} variant="destructive" className="w-full">
              Log Out
            </Button>
          </div>
        </div>
        {sidebarOpen && (
          <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}
        <div className="flex-1 min-h-screen lg:ml-0">
          <div className="border-b p-4 flex items-center gap-4 lg:ml-64">
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)} className="lg:hidden">
              <Menu className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <p className="font-medium">{user?.name || user?.email}</p>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>
          </div>
          <main className="p-6 lg:p-8">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Account;

