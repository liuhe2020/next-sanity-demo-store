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
  // if cookies -> get bag from cookies
  //          -> and user -> get bag from cookies
  // if no cookies -> no user -> do nothing
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
    console.log('reload');
  }, []);

  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
