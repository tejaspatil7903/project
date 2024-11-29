import { useMenuStore } from "../../stores/menuStore";
import { Card } from "../common/Card";
import { Badge } from "../common/Badge";
import { Button } from "../common/Button";

export default function MenuItemList({ onEdit }) {
  const { items, deleteMenuItem } = useMenuStore();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map((item) => (
        <Card
          key={item._id}
          className="shadow-lg border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="p-4 bg-white">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold text-gray-800">
                {item.name}
              </h3>
              <Badge variant={item.type === "veg" ? "accent" : "secondary"}>
                {item.type}
              </Badge>
            </div>
            <p className="text-gray-600 text-sm mb-2">{item.description}</p>
            <p className="text-xl font-medium text-gray-900 mb-4">
              ₹{item.price}
            </p>
            <div className="flex justify-between space-x-2">
              <Button
                variant="outline"
                className="text-primary hover:bg-primary hover:text-white"
                onClick={() => onEdit(item)}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                className="text-white bg-red-500 hover:bg-red-600"
                onClick={() => deleteMenuItem(item._id)}
              >
                Delete
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
