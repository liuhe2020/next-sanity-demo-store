import Cookies from 'js-cookie';
import create from 'zustand';
import { getSession } from 'next-auth/react';
import mySanityClient from '../utils/client';

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

const handleUpdateQuantity = (items, nextItem, qty) => {
  // update quantity of target item
  const newBag = items.map((item) =>
    item._id === nextItem._id ? { ...item, quantity: qty } : item
  );
  // remove item if quantity = 0
  const updatedBag = newBag.filter((item) => item.quantity !== 0);
  return {
    total: updatedBag.reduce((a, item) => a + item.quantity * item.price, 0),
    totalQty: updatedBag.reduce((a, item) => a + item.quantity, 0),
    items: updatedBag,
  };
};

const useStore = create((set, get) => ({
  total: 0,
  totalQty: 0,
  items: [],

  addToBag: (nextItem) => {
    set((state) => ({
      totalQty: state.totalQty + 1,
      total: state.total + nextItem.price,
      items: handleAddToBag(state.items, nextItem),
    }));
  },

  reduceFromBag: (nextItem) => {
    set((state) => ({
      totalQty: state.totalQty - 1,
      total: state.total - nextItem.price,
      items: handleReduceFromBag(state.items, nextItem),
    }));
  },

  updateQuantity: (nextItem, qty) => {
    set((state) => handleUpdateQuantity(state.items, nextItem, qty));
  },

  // removeFromBag: (nextItem) =>
  //   set((state) => ({
  //     total: state.total - nextItem.price * nextItem.quantity,
  //     totalQty: state.totalQty - nextItem.quantity,
  //     items: state.items.filter((item) => item._id !== nextItem._id),
  //   })),

  clearBag: () => set(() => ({ totalQty: 0, total: 0, items: [] })),

  hydrateBag: (bag) => set(() => bag),
}));

// need session for store subscription function below
let session;
const fetchSession = async () => {
  const res = await getSession();
  session = res;
};
fetchSession();

// listen to items change in store and update the shopping bag cookies
const unsub = useStore.subscribe(async (state) => {
  Cookies.set('NSDS-bag', JSON.stringify(state));
  // update user shopping bag on sanity when signed in
  if (session) {
    await mySanityClient
      .patch(session.user._id)
      .set({ bag: JSON.stringify(state) })
      .commit();
  }
});

export default useStore;
