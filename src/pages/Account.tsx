import { useState, useEffect } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AccountLayout from "@/components/AccountLayout";
import { useAuth } from "@/context/AuthContext";
import AccountSettings from "./Account/AccountSettings";
import OrdersList from "./Account/OrdersList";
import Address from "./Account/Address";
import CartView from "./Account/CartView";

const Account = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("profile");

  // Set active tab from URL query params
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && ["profile", "orders", "address", "cart"].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  // Update URL when tab changes
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <AccountSettings />;
      case "orders":
        return <OrdersList />;
      case "address":
        return <Address />;
      case "cart":
        return <CartView />;
      default:
        return <AccountSettings />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <AccountLayout activeTab={activeTab} onTabChange={handleTabChange}>
        {renderContent()}
      </AccountLayout>
      <Footer />
    </div>
  );
};

export default Account;
