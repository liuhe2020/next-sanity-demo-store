import create from 'zustand';
import { persist } from 'zustand/middleware';

const handleAddToBag = ({ items, nextItem }) => {
  // check if item to be added already exists
  if (items.find((item) => item._id === nextItem._id)) {
    // map through the items and update the quantity to the one already exists
    return items.map((item) =>
      item._id === nextItem._id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }
  return [...items, { ...nextItem, quantity: 1 }];
};

const handleReduceBasket = ({ prevItems, toRemoveItem }) => {
  // locate item with matching id
  const existingItem = prevItems.find((item) => item.id === toRemoveItem.id);
  // if item's quantity = 1, remove it
  if (existingItem.quantity === 1) {
    return prevItems.filter((item) => item.id !== toRemoveItem.id);
  }
  // otherwise reduce quantity by 1
  return prevItems.map((item) =>
    item.id === toRemoveItem.id
      ? { ...item, quantity: item.quantity - 1 }
      : item
  );
};

const useStore = create((set, get) => ({
  total: 0,
  totalqty: 0,
  items: [],

  addToBag: (newItem) => {
    set((state) => ({
      totalqty: state.totalqty + 1,
      total: state.total + parseFloat(newItem.price),
      items: [...state.items, newItem],
    }));
  },

  updateBag: ({ newItem, mycart }) => {
    set((state) => ({
      totalqty: state.totalqty + 1,
      total: state.total + parseFloat(newItem.price),
      items: mycart,
    }));
  },

  clearBag: () => set({ totalqty: 0, total: 0, items: [] }),

  removeFromBag: (newItem) =>
    set((state) => ({
      total: state.total - newItem.price * newItem.quantity,
      totalqty: state.totalqty - newItem.quantity,
      items: state.items.filter((item) => item._id !== newItem._id),
    })),
}));

export { useStore };
