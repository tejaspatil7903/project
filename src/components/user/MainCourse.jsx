import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useCartStore } from '../../stores/cartStore';

export default function MainCourse() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const foodType = searchParams.get('type');
  const addItem = useCartStore((state) => state.addItem);
  
  const [dishes, setDishes] = useState([
    {
      id: 1,
      name: 'Paneer Butter Masala',
      type: 'veg',
      price: 180,
      description: 'Rich and creamy paneer curry',
      image: 'https://placeholder.com/150',
    },
    {
      id: 2,
      name: 'Butter Chicken',
      type: 'non-veg',
      price: 220,
      description: 'Classic butter chicken curry',
      image: 'https://placeholder.com/150',
    },
  ]);

  const filteredDishes = dishes.filter(dish => dish.type === foodType);

  const handleSelect = (dish) => {
    addItem({ ...dish, quantity: 1 });
    navigate('/breads');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-primary mb-8">Select Main Course</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDishes.map((dish) => (
          <div key={dish.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={dish.image}
              alt={dish.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-secondary">{dish.name}</h3>
              <p className="text-gray-600 mt-2">{dish.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-lg font-medium">₹{dish.price}</span>
                <button
                  onClick={() => handleSelect(dish)}
                  className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90"
                >
                  Select
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}