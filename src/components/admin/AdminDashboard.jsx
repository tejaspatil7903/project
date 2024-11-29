import { useState, useEffect } from "react";
import { useMenuStore } from "../../stores/menuStore";
import { useOrderStore } from "../../stores/orderStore";
import { PageContainer } from "../layout/PageContainer";
import { Card } from "../common/Card";
import { Badge } from "../common/Badge";
import { Button } from "../common/Button";
import AddMenuItem from "./AddMenuItem";
import MenuItemList from "./MenuItemList";
import OrderList from "./OrderList";

export default function AdminDashboard() {
  const [showAddItem, setShowAddItem] = useState(false);
  const [activeTab, setActiveTab] = useState("orders");
  const {
    fetchMenuItems,
    menuItems,
    loading: menuLoading,
    error: menuError,
  } = useMenuStore();
  const {
    fetchOrders,
    orders,
    loading: ordersLoading,
    error: ordersError,
  } = useOrderStore();

  useEffect(() => {
    fetchOrders();
    fetchMenuItems();
  }, [fetchOrders, fetchMenuItems]);

  return (
    <PageContainer>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-primary">Admin Dashboard</h2>
        <Button variant="accent" onClick={() => setShowAddItem(true)}>
          Add Menu Item
        </Button>
      </div>

      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("orders")}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-300 ${
                activeTab === "orders"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Orders
            </button>
            <button
              onClick={() => setActiveTab("menu")}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-300 ${
                activeTab === "menu"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Menu Items
            </button>
          </nav>
        </div>
      </div>

      {/* Tab content */}
      <div className="space-y-6">
        {activeTab === "orders" ? (
          ordersLoading ? (
            <div className="flex justify-center items-center py-6 text-lg text-gray-600">
              Loading Orders...
            </div>
          ) : ordersError ? (
            <div className="flex justify-center items-center py-6 text-lg text-danger">
              Error loading orders: {ordersError.message}
            </div>
          ) : (
            <OrderList orders={orders} />
          )
        ) : menuLoading ? (
          <div className="flex justify-center items-center py-6 text-lg text-gray-600">
            Loading Menu Items...
          </div>
        ) : menuError ? (
          <div className="flex justify-center items-center py-6 text-lg text-danger">
            Error loading menu items: {menuError.message}
          </div>
        ) : (
          <MenuItemList
            menuItems={menuItems}
            onEdit={(item) => console.log("Edit item:", item)}
          />
        )}
      </div>

      {/* Add Menu Item Modal */}
      {showAddItem && <AddMenuItem onClose={() => setShowAddItem(false)} />}
    </PageContainer>
  );
}
