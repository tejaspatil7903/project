import { useOrderStore } from "../../stores/orderStore";
import { Card } from "../common/Card";
import { Badge } from "../common/Badge";
import { Button } from "../common/Button";

export default function OrderList() {
  const { orders, updateOrderStatus } = useOrderStore();

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case "pending":
        return "secondary";
      case "preparing":
        return "primary";
      case "ready":
        return "accent";
      case "delivered":
        return "success";
      default:
        return "primary";
    }
  };

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <Card
          key={order._id}
          className="shadow-lg border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105"
        >
          <div className="flex justify-between items-start p-4 bg-white">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Order #{order._id.slice(-6)}
              </h3>
              <p className="text-gray-600">Customer: {order.user.name}</p>
              <p className="text-gray-600">Total: ₹{order.totalAmount}</p>
            </div>
            <Badge
              variant={getStatusBadgeVariant(order.status)}
              className="self-start"
            >
              {order.status}
            </Badge>
          </div>

          <div className="p-4 bg-gray-50">
            <h4 className="font-medium text-gray-800 mb-3">Items:</h4>
            <ul className="space-y-2">
              {order.items.map((item) => (
                <li key={item._id} className="text-gray-600">
                  {item.quantity}x {item.menuItem.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 p-4 bg-gray-100 flex justify-end space-x-4">
            {order.status === "pending" && (
              <Button
                variant="primary"
                className="text-white bg-blue-500 hover:bg-blue-600"
                onClick={() => updateOrderStatus(order._id, "preparing")}
              >
                Start Preparing
              </Button>
            )}
            {order.status === "preparing" && (
              <Button
                variant="accent"
                className="text-white bg-yellow-500 hover:bg-yellow-600"
                onClick={() => updateOrderStatus(order._id, "ready")}
              >
                Mark Ready
              </Button>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}
