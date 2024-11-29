import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

export default function UserDashboard() {
  const [orders, setOrders] = useState([]);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    // TODO: Fetch user orders from API
    setOrders([
      { id: 1, status: 'pending', total: 450, date: '2024-03-15' },
      { id: 2, status: 'delivered', total: 380, date: '2024-03-14' },
    ]);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 bg-green-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-green-600">Welcome, {user?.name}</h2>
        
        <Link
          to="/select-food"
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-500 transition-colors"
        >
          Order Food
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-green-700 mb-4">Your Orders</h3>
        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border border-gray-200 rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium text-green-600">Order #{order.id}</p>
                  <p className="text-gray-600">Date: {order.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-green-700">₹{order.total}</p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm ${
                      order.status === 'delivered' ? 'bg-green-500 text-white' : 'bg-yellow-400 text-gray-800'
                    }`}
                  >
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No orders yet. Start ordering now!</p>
        )}
      </div>
    </div>
  );
}
