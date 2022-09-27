import { createContext, useReducer, useEffect } from 'react';
import Cookies from 'js-cookie';

// initial state for watch list
const initialState = {
  shoppingBag: Cookies.get('items') ? JSON.parse(Cookies.get('items')) : [1],
};

// create context
export const Store = createContext(initialState);

// reducer
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_BAG': {
      const newItem = action.payload;
      const existItem = state.shoppingBag.find(
        (item) => item._key === newItem._key
      );
      const items = existItem
        ? state.shoppingBag.map((item) =>
            item._key === existItem._key ? newItem : item
          )
        : [...state.shoppingBag, newItem];
      Cookies.set('items', JSON.stringify(items));
      return { ...state, cart: { ...state.cart, items } };
    }
    default:
      return state;
  }
};

// provider component
export const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = { state, dispatch };

  //   useEffect(() => {
  //     localStorage.setItem('watchlist', JSON.stringify(state.watchlist));
  //   }, [state]);

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};
