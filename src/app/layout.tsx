import './globals.css';

import { Inter } from 'next/font/google';
import ShoppingBagProvider from '@/components/shopping-bag-provider';
import { Toaster } from 'react-hot-toast';
import Footer from '@/components/footer';
import Cookie from '@/components/cookie';
import ReactQueryProvider from '@/components/reactquery-provider';
import RouteHistoryProvider from '@/components/route-history-provider';
import Header from '@/components/header';
import { getServerSession } from 'next-auth';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Next Sanity Demo Store',
  description: 'Next Sanity Demo Store',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();

  return (
    <html lang='en'>
      <body className={inter.className}>
        <RouteHistoryProvider>
          <ReactQueryProvider>
            <ShoppingBagProvider session={session}>
              <main className='flex flex-col min-h-[100svh] pt-16'>
                <Header session={session} />
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
          </ReactQueryProvider>
        </RouteHistoryProvider>
      </body>
    </html>
  );
}
