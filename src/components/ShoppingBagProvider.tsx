'use client';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Cookies from 'js-cookie';
import useStore from '../store/store';
import client from '@/utils/client';

export default function ShoppingBagProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const store = useStore();
  const shoppingBag = Cookies.get('NSDS-bag');

  // SHOPPING BAG HYDRATION FLOW
  // if cookies -> get bag from cookies
  //          -> and user -> get bag from cookies
  // if no cookies -> no user -> do nothing
  //             -> and user -> get bag from sanity
  useEffect(() => {
    if (shoppingBag) {
      const parsedBag = JSON.parse(shoppingBag);
      // update user bag when sign in
      if (session && parsedBag.total != 0) {
        (async function () {
          await client
            .patch(session.user!.id)
            .set({ bag: JSON.stringify(parsedBag) })
            .commit();
          return;
        })();
      }
      // fill bag from cookies for guest user
      return store.hydrateBag(parsedBag);
    }
    // no shopping bag in cookies - fill bag from sanity for signed in user
    const getUserBag = async () => {
      const userBag: string = await client.fetch(`*[_type == "user" && _id == "${session?.user?.id}"]{bag}[0]`);
      console.log(userBag);
      store.hydrateBag(JSON.parse(userBag));
    };
    getUserBag();
    // if (session.user.bag) store.hydrateBag(JSON.parse(session.user.bag));
  }, [session]);

  const unsub = useStore.subscribe((state) => {
    Cookies.set('NSDS-bag', JSON.stringify(state));
    // update user shopping bag on sanity when signed in
    if (session) {
      (async function () {
        await client
          .patch(session.user!.id)
          .set({ bag: JSON.stringify(state) })
          .commit();
      })();
    }
  });

  useEffect(() => {
    // unsub on component dismount
    return () => unsub();
  }, []);

  return <>{children}</>;
}
