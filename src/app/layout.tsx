import Header from '@/components/Header';
import './globals.css';
import { Inter } from 'next/font/google';
import ShoppingBagProvider from '@/components/ShoppingBagProvider';
import { Toaster } from 'react-hot-toast';
import Footer from '@/components/Footer';
import { Metadata } from 'next';
import NextAuthProvider from '@/components/NextAuthProvider';
import Cookie from '@/components/Cookie';
import PayPalProvider from '@/components/PayPalProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next Sanity Demo Store',
  description: 'Next Sanity Demo Store',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <link rel='icon' href='/images/favicon.ico' sizes='any' />
      <body className={inter.className}>
        <NextAuthProvider>
          <ShoppingBagProvider>
            <PayPalProvider>
              <Header />
              {children}
              <Footer />
            </PayPalProvider>
            <Cookie />
            <Toaster
              position='bottom-center'
              toastOptions={{
                style: {
                  background: 'rgb(0 0 0 / .8)',
                  color: '#fff',
                },
              }}
            />
          </ShoppingBagProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
