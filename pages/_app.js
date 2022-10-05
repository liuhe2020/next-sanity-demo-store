import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import Layout from '../components/Layout';
import StoreProvider from '../store/StoreProvider';

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <StoreProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </StoreProvider>
    </SessionProvider>
  );
}
