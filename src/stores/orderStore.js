import { create } from 'zustand';
import { createOrder, getOrders, getOrderById, updateOrderStatus } from '../api/order';

export const useOrderStore = create((set) => ({
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,

  fetchOrders: async () => {
    set({ loading: true, error: null });
    try {
      const orders = await getOrders();
      set({ orders, loading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch orders', loading: false });
      throw error;
    }
  },

  createOrder: async (orderData) => {
    set({ loading: true, error: null });
    try {
      const order = await createOrder(orderData);
      set(state => ({ orders: [...state.orders, order], loading: false }));
      return order;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to create order', loading: false });
      throw error;
    }
  },

  getOrderById: async (id) => {
    set({ loading: true, error: null });
    try {
      const order = await getOrderById(id);
      set({ currentOrder: order, loading: false });
      return order;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch order', loading: false });
      throw error;
    }
  },

  updateOrderStatus: async (id, status) => {
    set({ loading: true, error: null });
    try {
      const updatedOrder = await updateOrderStatus(id, status);
      set(state => ({
        orders: state.orders.map(order => order._id === id ? updatedOrder : order),
        currentOrder: state.currentOrder?._id === id ? updatedOrder : state.currentOrder,
        loading: false
      }));
      return updatedOrder;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to update order status', loading: false });
      throw error;
    }
  },
}));