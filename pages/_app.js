import { useEffect } from 'react';
import '../styles/globals.css';
import Cookies from 'js-cookie';
import Layout from '../components/Layout';
import useStore from '../store/store';
import { SessionProvider, getSession } from 'next-auth/react';

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const { hydrateBag } = useStore();

  // hydrate shopping bag on load and user sign in/out
  useEffect(() => {
    // fetch session from next auth
    const getClientSession = async () => {
      const clientSession = await getSession();
      // get shopping bag from session user object for registered users
      if (clientSession?.user.bag)
        return hydrateBag(JSON.parse(clientSession.user.bag));
      // look for bag in browser cookies for guest users
      if (Cookies.get('NSDS-bag'))
        hydrateBag(JSON.parse(Cookies.get('NSDS-bag')));
    };
    getClientSession();
  }, [session]);

  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
