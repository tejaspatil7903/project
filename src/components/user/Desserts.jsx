import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../stores/cartStore';

function Desserts() {
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);
  const [selectedDessert, setSelectedDessert] = useState(null);

  const desserts = [
    {
      id: 'dessert-1',
      name: 'Gulab Jamun',
      price: 40,
      description: 'Sweet milk-solid-based balls soaked in sugar syrup',
      quantity: 2,
      image: 'https://placeholder.com/150',
    },
    {
      id: 'dessert-2',
      name: 'Kheer',
      price: 50,
      description: 'Rich and creamy rice pudding with nuts',
      quantity: 1,
      image: 'https://placeholder.com/150',
    },
    {
      id: 'dessert-3',
      name: 'Rasgulla',
      price: 45,
      description: 'Soft and spongy cottage cheese balls in sugar syrup',
      quantity: 2,
      image: 'https://placeholder.com/150',
    },
  ];

  const handleSelect = (dessert) => {
    setSelectedDessert(dessert);
    addItem({
      ...dessert,
      totalPrice: dessert.price * dessert.quantity,
    });
  };

  const handleContinue = () => {
    navigate('/cart');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-primary mb-8">Select Dessert</h2>
      <p className="text-gray-600 mb-6">Complete your meal with a delicious dessert</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {desserts.map((dessert) => (
          <div
            key={dessert.id}
            className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${
              selectedDessert?.id === dessert.id ? 'ring-2 ring-primary' : ''
            }`}
          >
            <img
              src={dessert.image}
              alt={dessert.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-secondary mb-2">
                {dessert.name}
              </h3>
              <p className="text-gray-600 mb-4">{dessert.description}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-medium">₹{dessert.price}</span>
                <span className="text-sm text-gray-500">
                  Quantity: {dessert.quantity} {dessert.quantity === 1 ? 'piece' : 'pieces'}
                </span>
              </div>
              <button
                onClick={() => handleSelect(dessert)}
                className={`w-full py-2 rounded ${
                  selectedDessert?.id === dessert.id
                    ? 'bg-accent text-white'
                    : 'bg-primary text-white'
                } hover:bg-opacity-90`}
              >
                {selectedDessert?.id === dessert.id ? 'Selected' : 'Select'}
              </button>
            </div>
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
        <button
          onClick={handleContinue}
          className="bg-accent text-white px-6 py-2 rounded hover:bg-opacity-90"
        >
          {selectedDessert ? 'Continue to Cart' : 'Skip Dessert'}
        </button>
      </div>
    </div>
  );
}

export default Desserts;