import { useEffect } from 'react';
import '../styles/globals.css';
import Cookies from 'js-cookie';
import Layout from '../components/Layout';
import { useStore } from '../store/store';
import { SessionProvider } from 'next-auth/react';

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const { hydrateBag } = useStore();

  // hydrate shopping bag on load from cookies
  useEffect(() => {
    if (Cookies.get('NSDS-bag'))
      hydrateBag(JSON.parse(Cookies.get('NSDS-bag')));
  }, []);

  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
