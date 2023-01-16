import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Cookies from 'js-cookie';
import useStore from '../store/store';
import client from '../utils/client';

export default function StoreProvider({ children }) {
  const { data: session } = useSession();
  const state = useStore();
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
            .patch(session.user._id)
            .set({ bag: JSON.stringify(parsedBag) })
            .commit();
          return;
        })();
      }
      // fill bag from cookies for guest user
      return state.hydrateBag(parsedBag);
    }
    // fill bag from sanity for signed in user
    if (session?.user.bag) state.hydrateBag(JSON.parse(session.user.bag));
  }, [session]);

  useEffect(() => {
    Cookies.set('NSDS-bag', JSON.stringify(state));
    // update user shopping bag on sanity when signed in
    if (session) {
      (async function () {
        await client
          .patch(session.user._id)
          .set({ bag: JSON.stringify(state) })
          .commit();
        return;
      })();
    }
  }, [state]);

  return <>{children}</>;
}
