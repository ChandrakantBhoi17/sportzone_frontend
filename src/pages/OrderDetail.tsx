import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useOrderDetail } from "@/hooks/useOrderDetail";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Loader2, AlertCircle } from "lucide-react";

const OrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { order, isLoading, error } = useOrderDetail(id);

  // Debug log
  console.log('[OrderDetail] Component rendered - orders ID:', id, 'order object:', order, 'loading:', isLoading, 'error:', error);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
            <p className="text-muted-foreground">Loading order details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="container-luxury section-padding text-center max-w-md">
            <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <h1 className="text-2xl font-serif font-bold mb-2">Error</h1>
            <p className="text-muted-foreground mb-8">{error}</p>
            <div className="space-y-2">
              <Button onClick={() => navigate("/account")} className="w-full">
                Go to Account
              </Button>
              <Button onClick={() => window.location.reload()} variant="outline" className="w-full">
                Try Again
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Order not found
  if (!order) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="container-luxury section-padding text-center max-w-md">
            <h1 className="text-2xl font-serif font-bold mb-2">Order Not Found</h1>
            <p className="text-muted-foreground mb-8">
              Sorry, we couldn't find this order. It may take a few moments to appear.
            </p>
            <div className="space-y-2">
              <Button onClick={() => navigate("/account")} className="w-full">
                Go to Account
              </Button>
              <Button onClick={() => window.location.reload()} variant="outline" className="w-full">
                Refresh Page
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

// Utility functions
  const formatPrice = (p?: number) => p != null ? `₹${p.toLocaleString("en-IN")}` : "₹0";

  const getItemPrice = (item: any) => {
    return item.price ?? item.product?.price ?? 0;
  };
  const formatDate = (date: string) => new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const statusColors: { [key: string]: string } = {
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
    shipped: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  // Success state - display order
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-1">
        <div className="container-luxury px-4 sm:px-6 lg:px-8 py-8">
          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="max-w-3xl mx-auto">
            {/* Success Message */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
              <p className="text-green-800 font-medium">✓ Your order has been placed successfully!</p>
            </div>

            {/* Header Section */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-serif font-bold">
                    Order {order.orderNumber}
                  </h1>
                </div>
                <Badge className={`${statusColors[order.status]} text-sm py-2 px-4`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </div>
              <p className="text-muted-foreground text-sm">
                Placed on {formatDate(order.createdAt || order.date || new Date().toISOString())}
              </p>
            </div>

            {/* Order Items Section */}
            <div className="bg-card border border-border/50 rounded-lg p-6 mb-6">
              <h2 className="text-lg font-semibold mb-6">Order Items</h2>
              {order.items && order.items.length > 0 ? (
                <div className="space-y-6">
                  {order.items.map((item, idx) => (
                    <div key={`${item.productId}-${idx}`} className="flex gap-4 pb-6 border-b last:border-b-0 last:pb-0">
                      {/* Product Image */}
                      <div className="w-24 h-24 flex-shrink-0">
                        <img
                          src={item.image || "/public/placeholder.svg"}
                          alt={item.name || "Product"}
                          className="w-full h-full rounded-lg object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">{item.name || "Unknown Product"}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {item.material} • {item.category}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Qty: {item.quantity}</span>
                        <span className="text-sm font-medium">{formatPrice(getItemPrice(item))} each</span>
                        </div>
                      </div>

                      {/* Item Total */}
                      <div className="text-right flex-shrink-0">
                        <p className="text-lg font-semibold text-foreground">
                          {formatPrice(getItemPrice(item) * (item.quantity ?? 1))}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">No items in this order</p>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Shipping Address Section */}
              <div className="bg-card border border-border/50 rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Delivery Address</h2>
                {order.shippingAddress ? (
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">Name</p>
                      <p className="font-medium text-foreground">{order.shippingAddress.fullName}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Address</p>
                      <p className="font-medium text-foreground">{order.shippingAddress.address}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-muted-foreground">City</p>
                        <p className="font-medium text-foreground">{order.shippingAddress.city}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Postal Code</p>
                        <p className="font-medium text-foreground">{order.shippingAddress.postalCode}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">No address information available</p>
                )}
              </div>

              {/* Contact Information */}
              <div className="bg-card border border-border/50 rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
                {order.shippingAddress ? (
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">Email</p>
                      <p className="font-medium text-foreground break-all">{order.shippingAddress.email}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Phone</p>
                      <p className="font-medium text-foreground">{order.shippingAddress.phone}</p>
                    </div>
                    {order.shippingAddress.state && (
                      <div>
                        <p className="text-muted-foreground">State</p>
                        <p className="font-medium text-foreground">{order.shippingAddress.state}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">No contact information available</p>
                )}
              </div>
            </div>

            {/* Price Summary Section */}
            <div className="bg-card border border-border/50 rounded-lg p-6 mb-8">
              <h2 className="text-lg font-semibold mb-6">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">{formatPrice(order.totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium text-green-600">FREE</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (GST 3%)</span>
                  <span className="font-medium">{formatPrice(Math.round(order.totalPrice * 0.03))}</span>
                </div>
                <div className="border-t pt-4 flex justify-between">
                  <span className="text-lg font-semibold">Total Amount</span>
                  <span className="text-2xl font-bold text-primary">
                    {formatPrice(Math.round(order.totalPrice * 1.03))}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Method Section */}
            <div className="bg-card border border-border/50 rounded-lg p-6 mb-8">
              <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
              <div className="text-sm">
                {order.paymentMethod === 'upi' ? (
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Selected Method</p>
                    <p className="font-semibold text-foreground">UPI Payment</p>
                    <p className="text-xs text-muted-foreground mt-2">Pay using Google Pay, PhonePe, Paytm, or any UPI app</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Selected Method</p>
                    <p className="font-semibold text-foreground">Cash on Delivery</p>
                    <p className="text-xs text-muted-foreground mt-2">Pay when your order is delivered</p>
                  </div>
                )}
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-blue-900 mb-3">What's Next?</h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>✓ Your order has been confirmed</li>
                <li>✓ We'll send you a confirmation email</li>
                <li>✓ Your order will be processed within 2-3 hours</li>
                <li>✓ You'll receive tracking info once dispatched</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={() => navigate("/account")} className="sm:flex-1">
                View All Orders
              </Button>
              <Button onClick={() => navigate("/products")} variant="outline" className="sm:flex-1">
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderDetail;
