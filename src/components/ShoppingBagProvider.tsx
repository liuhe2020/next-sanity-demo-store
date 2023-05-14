'use client';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import useStore from '../store/store';
import client from '@/utils/client';

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
      const getUserBag = async () => {
        const data: { bag: string } = await client.fetch(`*[_type == "user" && _id == "${session?.user?.id}"]{bag}[0]`);
        data && store.hydrateBag(JSON.parse(data.bag));
      };
      getUserBag();
      return;
    }
    // shopping bag exists locally, update to sanity
    const overwriteUserBag = async () => {
      await client
        .patch(session.user!.id)
        .set({ bag: JSON.stringify(JSON.parse(localValue)) })
        .commit();
    };
    overwriteUserBag();
  }, [session]);

  useEffect(() => {
    localStorage.setItem('NSDS-shopping-bag', JSON.stringify(store));
    // update user shopping bag on sanity when signed in
    if (session) {
      const updateUserBag = async () => {
        await client
          .patch(session.user!.id)
          .set({ bag: JSON.stringify(store) })
          .commit();
      };
      updateUserBag();
    }
  }, [store]);

  return <>{children}</>;
}
