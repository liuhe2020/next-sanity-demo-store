'use client';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import useStore from '../store/store';
import { getUserBag, updateUserBag } from '@/app/actions';

export default function ShoppingBagProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const store = useStore();

  // SHOPPING BAG HYDRATION FLOW
  // user signed in -> no local data  -> no sanity data  -> do nothing
  //                                  -> has sanity data -> fetch sanity data
  //                -> has local data -> update sanity data
  // guest user     -> get data from local storage

  useEffect(() => {
    const localValue = localStorage.getItem('NSDS-shopping-bag');

    if (!session) {
      if (!localValue || JSON.parse(localValue).total == 0) return;
      return store.hydrateBag(JSON.parse(localValue));
    }
    // user signed in
    if (!localValue || JSON.parse(localValue).total == 0) {
      // no shopping bag locally - fill bag from sanity for signed in user
      const getBag = async () => {
        const bag = await getUserBag();
        console.log(bag);
        if (bag) {
          store.hydrateBag(bag);
          localStorage.setItem('NSDS-shopping-bag', JSON.stringify(store));
        }
      };
      getBag();
    } else {
      // shopping bag exists locally, update to sanity
      updateUserBag(JSON.stringify(JSON.parse(localValue)));
    }
  }, [session]);

  useEffect(() => {
    localStorage.setItem('NSDS-shopping-bag', JSON.stringify(store));
    // update user shopping bag on sanity when signed in
    updateUserBag(JSON.stringify(store));
  }, [store]);

  return <>{children}</>;
}
