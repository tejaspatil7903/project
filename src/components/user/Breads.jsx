import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../stores/cartStore';

function Breads() {
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);
  const [selectedBread, setSelectedBread] = useState(null);

  const breads = [
    {
      id: 1,
      name: 'Chapati',
      price: 10,
      description: 'Whole wheat flatbread',
      defaultQuantity: 3,
    },
    {
      id: 2,
      name: 'Tandoori Roti',
      price: 15,
      description: 'Clay oven baked flatbread',
      defaultQuantity: 3,
    },
    {
      id: 3,
      name: 'Naan',
      price: 25,
      description: 'Leavened flatbread',
      defaultQuantity: 2,
    },
  ];

  const handleSelect = (bread) => {
    setSelectedBread(bread);
    addItem({
      ...bread,
      quantity: bread.defaultQuantity,
      totalPrice: bread.price * bread.defaultQuantity,
    });
    navigate('/extra-breads');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-primary mb-8">Select Your Bread</h2>
      <p className="text-gray-600 mb-6">Each selection comes with a default quantity</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {breads.map((bread) => (
          <div
            key={bread.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold text-secondary mb-2">{bread.name}</h3>
            <p className="text-gray-600 mb-4">{bread.description}</p>
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-medium">₹{bread.price} each</span>
              <span className="text-sm text-gray-500">
                Default: {bread.defaultQuantity} pieces
              </span>
            </div>
            <button
              onClick={() => handleSelect(bread)}
              className="w-full bg-primary text-white py-2 rounded hover:bg-opacity-90"
            >
              Select ({bread.defaultQuantity} pcs)
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300"
        >
          Back
        </button>
        {selectedBread && (
          <button
            onClick={() => navigate('/extra-breads')}
            className="bg-accent text-white px-6 py-2 rounded hover:bg-opacity-90"
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
}

export default Breads;