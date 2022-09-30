import { useEffect } from 'react';
import '../styles/globals.css';
import Cookies from 'js-cookie';
import Layout from '../components/Layout';
import { useStore } from '../store/store';

export default function MyApp({ Component, pageProps }) {
  const { hydrateBag } = useStore();

  // hydrate shopping bag on load from cookies
  useEffect(() => {
    if (Cookies.get('NSDS-bag'))
      hydrateBag(JSON.parse(Cookies.get('NSDS-bag')));
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
