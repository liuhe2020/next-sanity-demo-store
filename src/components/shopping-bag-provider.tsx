'use client';

import { useEffect } from 'react';
import useShoppingBagStore from '../store/shopping-bag-store';
import { getUserBag, updateUserBag } from '@/app/actions';
import { type Session } from 'next-auth';

export default function ShoppingBagProvider({ children, session }: { children: React.ReactNode; session: Session | null }) {
  const total = useShoppingBagStore.getState().total;
  const store = useShoppingBagStore();

  // const unsub = useShoppingBagStore.subscribe((total) => {
  //   const local = localStorage.getItem('nsds-shopping-bag');

  //   if (!session) {
  //     if (local && JSON.parse(local).total !== 0) {
  //       console.log('no session');
  //       store.hydrateBag(JSON.parse(local));
  //       return;
  //     }
  //   } else {
  //     if (local && JSON.parse(local).total !== 0) {
  //       console.log('session & local');
  //       updateUserBag(JSON.stringify(JSON.parse(local)));
  //       return;
  //     }
  //     console.log('get server data');
  //     getUserBag().then((data) => {
  //       if (data) {
  //         store.hydrateBag(JSON.parse(data.bag));
  //         localStorage.setItem('nsds-shopping-bag', data.bag);
  //       }
  //     });
  //   }
  // });

  // SHOPPING BAG HYDRATION FLOW
  // user signed in -> no local data  -> no sanity data  -> do nothing
  //                                  -> has sanity data -> fetch sanity data
  //                -> has local data -> update sanity data
  // guest user     -> get data from local storage

  // useEffect(() => {
  //   const local = localStorage.getItem('nsds-shopping-bag');

  //   if (!session) {
  //     if (local && JSON.parse(local).total !== 0) {
  //       store.hydrateBag(JSON.parse(local));
  //       return;
  //     }
  //   } else {
  //     if (local && JSON.parse(local).total !== 0) {
  //       updateUserBag(JSON.stringify(JSON.parse(local)));
  //       return;
  //     }
  //     getUserBag().then((data) => {
  //       if (data) {
  //         store.hydrateBag(JSON.parse(data.bag));
  //         localStorage.setItem('nsds-shopping-bag', data.bag);
  //       }
  //     });
  //   }
  // }, [session]);

  // useEffect(() => {
  //   localStorage.setItem('nsds-shopping-bag', JSON.stringify(store));
  //   // update user shopping bag on sanity when signed in
  //   updateUserBag(JSON.stringify(store));
  // }, [store]);

  // useShoppingBagStore.subscribe((state) => {
  //   console.log(session);
  // });

  return <>{children}</>;
}
