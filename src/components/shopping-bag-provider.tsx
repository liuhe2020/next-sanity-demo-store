'use client';

import { useEffect, useRef } from 'react';
import useShoppingBagStore from '../store/shopping-bag-store';
import { getUserBag, updateUserBag } from '@/app/actions';
import { type Session } from 'next-auth';
import { useQuery } from 'react-query';

export default function ShoppingBagProvider({ children, session }: { children: React.ReactNode; session: Session | null }) {
  const store = useShoppingBagStore();
  const initialRender = useRef(true);

  // SHOPPING BAG HYDRATION FLOW
  // has localstorage -> signed in     -> no sanity data  -> push local data to sanity
  //                                   -> has sanity data -> fetch sanity data
  //                     not signed in -> get local data
  // no localstorage  -> signed in     -> get data from sanity
  //                     not signed in -> do nothing

  useQuery('getShoppingBag', () => localStorage.getItem('nsds-shopping-bag'), {
    onSettled: async (localData) => {
      if (localData && JSON.parse(localData).total !== 0) {
        store.hydrateBag(JSON.parse(localData));
      } else {
        if (!session) return;
        const { bag } = await getUserBag();
        if (!bag || bag.total === 0) return;
        store.hydrateBag(JSON.parse(bag));
        localStorage.setItem('nsds-shopping-bag', bag);
      }
    },
    staleTime: 1000 * 60 * 10,
  });

  // do not run effect on first render as it is unnecessary and interferes with the above query
  useEffect(() => {
    if (!initialRender.current) {
      localStorage.setItem('nsds-shopping-bag', JSON.stringify(store));
      // update user shopping bag on sanity when signed in
      if (session) updateUserBag(JSON.stringify(store));
    }
    return () => {
      initialRender.current = false;
    };
  }, [store, session]);

  return <>{children}</>;
}
