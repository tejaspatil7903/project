import { create } from 'zustand';

export const useCartStore = create((set) => ({
  items: [],
  totalAmount: 0,
  addItem: (item) => set((state) => {
    const updatedItems = [...state.items, item];
    const total = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return { items: updatedItems, totalAmount: total };
  }),
  removeItem: (itemId) => set((state) => {
    const updatedItems = state.items.filter(item => item.id !== itemId);
    const total = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return { items: updatedItems, totalAmount: total };
  }),
  clearCart: () => set({ items: [], totalAmount: 0 }),
}));