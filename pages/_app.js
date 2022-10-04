import { useState, useEffect } from 'react';
import '../styles/globals.css';
import { SessionProvider, getSession } from 'next-auth/react';
import Cookies from 'js-cookie';
import Layout from '../components/Layout';
import useStore from '../store/store';
import mySanityClient from '../utils/client';

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const hydrateBag = useStore((state) => state.hydrateBag);

  // SHOPPING BAG HYDRATION FLOW
  // if local -> get bag from cookie
  //          -> and user -> get bag from cookie
  // if no local -> no user -> do nothing
  //             -> and user -> get bag from sanity
  useEffect(() => {
    const getClientSession = async () => {
      // fetch session from next auth
      const clientSession = await getSession();
      if (Cookies.get('NSDS-bag')) {
        const localShoppingBag = JSON.parse(Cookies.get('NSDS-bag'));
        // update user bag when sign in
        if (clientSession && localShoppingBag.total != 0) {
          await mySanityClient
            .patch(clientSession.user._id)
            .set({ bag: JSON.stringify(localShoppingBag) })
            .commit();
        }
        // fill bag from cookies for guest user
        return hydrateBag(localShoppingBag);
      }

      // fill bag from sanity for signed in user
      if (clientSession?.user.bag)
        hydrateBag(JSON.parse(clientSession.user.bag));
    };
    getClientSession();
  }, []);

  // listen to items change in store and update the shopping bag cookies
  const sub = useStore.subscribe((state) => {
    // const { data: session, status } = useSession();
    // if (session) {
    //   await mySanityClient
    //     .patch(session.user._id) // Document ID to patch
    //     .set({ bag: JSON.stringify(state) }) // Shallow merge
    //     .commit(); // Perform the patch and return a promise
    // }
    Cookies.set('NSDS-bag', JSON.stringify(state));
  });

  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
