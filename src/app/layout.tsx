import './globals.css';
import Header from '@/components/Header';
import { Inter } from 'next/font/google';
import ShoppingBagProvider from '@/components/ShoppingBagProvider';
import { Toaster } from 'react-hot-toast';
import Footer from '@/components/Footer';
import { Metadata } from 'next';
import NextAuthProvider from '@/components/NextAuthProvider';
import Cookie from '@/components/Cookie';
import ReactQueryProvider from '@/components/ReactQueryProvider';
import RouteHistoryProvider from '@/components/RouteHistoryProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next Sanity Demo Store',
  description: 'Next Sanity Demo Store',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <NextAuthProvider>
          <RouteHistoryProvider>
            <ShoppingBagProvider>
              <main className='flex flex-col min-h-[100dvh] pt-16'>
                <ReactQueryProvider>
                  <Header />
                </ReactQueryProvider>
                <div className='grow'>{children}</div>
                <Footer />
              </main>
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
          </RouteHistoryProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
