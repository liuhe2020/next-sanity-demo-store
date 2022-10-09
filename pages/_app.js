import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import Layout from '../components/Layout';
import StoreProvider from '../store/StoreProvider';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <StoreProvider>
        <PayPalScriptProvider
          options={{
            'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
            components: 'buttons',
            currency: 'GBP',
          }}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PayPalScriptProvider>
      </StoreProvider>
    </SessionProvider>
  );
}
