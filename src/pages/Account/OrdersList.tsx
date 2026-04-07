import { Link } from "react-router-dom";
import { useOrders } from "@/context/OrderContext";
import { Badge } from "@/components/ui/badge";
import { Package } from "lucide-react";

const OrdersList = () => {
  const { orders, isLoading } = useOrders();

  const formatPrice = (p: number) => `₹${p.toLocaleString("en-IN")}`;
  const formatDate = (date: string) => new Date(date).toLocaleDateString("en-IN");

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
    shipped: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Loading orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No Orders Yet</h3>
        <p className="text-muted-foreground">You haven't placed any orders yet. Start shopping!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Link
          key={order.id}
          to={`/account/orders/${order.id}`}
          className="block bg-muted border border-border/50 rounded-xl p-6 hover:border-border/100 transition-colors"
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="font-semibold">{order.orderNumber}</p>
              <p className="text-sm text-muted-foreground">Placed on {formatDate(order.date)}</p>
            </div>
            <Badge className={statusColors[order.status as keyof typeof statusColors]}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </Badge>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Items</p>
              <p className="font-semibold">{order.items.length}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Total</p>
              <p className="font-semibold">{formatPrice(order.totalPrice)}</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-muted-foreground mb-1">Delivery Address</p>
              <p className="font-semibold text-sm">{order.shippingAddress.city}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default OrdersList;
