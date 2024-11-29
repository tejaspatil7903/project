import { Link } from 'react-router-dom';

export default function FoodSelection() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-primary mb-8">Select Food Type</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Link
          to="/main-course?type=veg"
          className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h3 className="text-2xl font-semibold text-secondary mb-4">Vegetarian</h3>
          <p className="text-gray-600">Explore our delicious vegetarian options</p>
        </Link>
        <Link
          to="/main-course?type=non-veg"
          className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h3 className="text-2xl font-semibold text-secondary mb-4">Non-Vegetarian</h3>
          <p className="text-gray-600">Discover our savory non-vegetarian dishes</p>
        </Link>
      </div>
    </div>
  );
}