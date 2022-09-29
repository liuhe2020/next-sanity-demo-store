import create from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';

const handleAddToBag = (items, nextItem) => {
  // check if item to be added already exists
  if (items.find((item) => item._id === nextItem._id)) {
    // map through the items and update the quantity of the targeted item
    return items.map((item) =>
      item._id === nextItem._id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }
  return [...items, { ...nextItem, quantity: 1 }];
};

// const handleAddToBag = (items, nextItem) => {
//   // check if item to be added already exists
//   if (items.find((item) => item._id === nextItem._id)) {
//     // map through the items and update the quantity of the targeted item
//     const newItems = items.map((item) =>
//       item._id === nextItem._id
//         ? { ...item, quantity: item.quantity + 1 }
//         : item
//     );
//     Cookies.set('shoppingBag', JSON.stringify(newItems));
//   }
//   const newItems = [...items, { ...nextItem, quantity: 1 }];
//   return newItems;
// };

const handleReduceFromBag = (items, nextItem) => {
  // locate item with matching id
  const targetItem = items.find((item) => item._id === nextItem._id);
  // if item's quantity = 1, remove it
  if (targetItem.quantity === 1) {
    return items.filter((item) => item._id !== nextItem._id);
  }
  // otherwise reduce quantity by 1
  return items.map((item) =>
    item._id === nextItem._id ? { ...item, quantity: item.quantity - 1 } : item
  );
};

const useStore = create(
  persist((set, get) => ({
    total: 0,
    totalqty: 0,
    items: [],

    addToBag: (nextItem) => {
      set((state) => ({
        totalqty: state.totalqty + 1,
        total: state.total + parseFloat(nextItem.price),
        items: handleAddToBag(state.items, nextItem),
      }));
    },

    updateBag: ({ nextItem, mycart }) => {
      set((state) => ({
        totalqty: state.totalqty + 1,
        total: state.total + parseFloat(nextItem.price),
        items: mycart,
      }));
    },

    clearBag: () => set({ totalqty: 0, total: 0, items: [] }),

    removeFromBag: (nextItem) =>
      set((state) => ({
        total: state.total - nextItem.price * nextItem.quantity,
        totalqty: state.totalqty - nextItem.quantity,
        items: state.items.filter((item) => item._id !== nextItem._id),
      })),
  })),
  {
    name: 'food-storage', // unique name
    getStorage: () => sessionStorage,
  }
);

export { useStore };
