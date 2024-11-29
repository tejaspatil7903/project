import { useState } from 'react';
import toast from 'react-hot-toast';

function AddMenuItem({ onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    type: 'veg',
    price: '',
    description: '',
    image: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // TODO: Implement API call to add menu item
      toast.success('Menu item added successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to add menu item');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg w-full max-w-md">
        <h3 className="text-2xl font-bold text-primary mb-6">Add Menu Item</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 border rounded focus:outline-none focus:border-primary"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full p-2 border rounded focus:outline-none focus:border-primary"
            >
              <option value="veg">Vegetarian</option>
              <option value="non-veg">Non-Vegetarian</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Price (₹)</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full p-2 border rounded focus:outline-none focus:border-primary"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2 border rounded focus:outline-none focus:border-primary"
              rows="3"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
              className="w-full p-2 border rounded focus:outline-none focus:border-primary"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90"
            >
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddMenuItem;