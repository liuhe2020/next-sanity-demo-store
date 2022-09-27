import create from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create((set, get) => ({
  total: 0,
  totalqty: 0,
  items: [],

  addTocart: (newItem) => {
    set((state) => ({
      totalqty: state.totalqty + 1,
      total: state.total + parseFloat(newItem.price),
      items: [...state.items, newItem],
    }));
  },

  updatecart: ({ newItem, mycart }) => {
    set((state) => ({
      totalqty: state.totalqty + 1,
      total: state.total + parseFloat(newItem.price),
      items: mycart,
    }));
  },

  clearCart: () => set({ totalqty: 0, total: 0, items: [] }),

  removeFromCart: (newItem) =>
    set((state) => ({
      total: state.total - newItem.price * newItem.quantity,
      totalqty: state.totalqty - newItem.quantity,
      items: state.items.filter((item) => item._id !== newItem._id),
    })),
}));

export { useStore };
