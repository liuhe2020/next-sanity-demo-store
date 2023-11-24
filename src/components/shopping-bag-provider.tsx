'use client';

import { useEffect, useState } from 'react';
import useShoppingBagStore from '../store/shopping-bag-store';
import { getUserBag, updateUserBag } from '@/app/actions';
import { type Session } from 'next-auth';

export default function ShoppingBagProvider({ children, session }: { children: React.ReactNode; session: Session | null }) {
  const store = useShoppingBagStore();
  const [initialRender, setInitialRender] = useState(true);

  // SHOPPING BAG HYDRATION FLOW
  // has localstorage -> signed in     -> no sanity data  -> push local data to sanity
  //                                   -> has sanity data -> fetch sanity data
  //                     not signed in -> get local data
  // no localstorage  -> signed in     -> get data from sanity
  //                     not signed in -> do nothing

  useEffect(() => {
    const local = localStorage.getItem('nsds-shopping-bag');

    if (local && JSON.parse(local).total !== 0) {
      store.hydrateBag(JSON.parse(local));
      if (!session) return;
      // updateUserBag(local);
    } else {
      if (!session) return;
      getUserBag().then((data) => {
        if (data && data.total !== 0) {
          store.hydrateBag(JSON.parse(data.bag));
          localStorage.setItem('nsds-shopping-bag', data.bag);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (initialRender) {
      setInitialRender(false);
      return;
    }
    localStorage.setItem('nsds-shopping-bag', JSON.stringify(store));
    // update user shopping bag on sanity when signed in
    if (session) updateUserBag(JSON.stringify(store));
  }, [store]);

  return <>{children}</>;
}
