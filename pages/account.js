import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import client from '../utils/client';
import Orders from '../components/Account/Orders';
import Profile from '../components/Account/Profile';
import Password from '../components/Account/Password';
import classNames from '../utils/classNames';

const sideNav = [{ name: 'Orders' }, { name: 'Profile' }, { name: 'Password' }];

export default function Account() {
  const [orders, setOrders] = useState([]);
  const [view, setView] = useState('Orders');

  const { data: session, status } = useSession({
    required: true,
  });

  useEffect(() => {
    const getOrders = async () => {
      const data = await client.fetch(
        `*[_type == 'order' && user._ref == '${session?.user?._id}']{name, _createdAt, orderTotal, orderItems[]{product->,quantity}}`
      );
      setOrders(data);
    };
    getOrders();
  }, [session]);

  if (status === 'loading') {
    return null;
  }

  return (
    <>
      <Head>
        <title>{`DS | Account - ${session?.user?.name}`}</title>
        <link rel='shortcut icon' href='/images/favicon.ico' />
      </Head>
      <div className='pt-16 min-h-[80vh] relative bg-stone-50 w-full'>
        <div className='max-w-screen-lg mx-auto p-2 sm:p-4 lg:my-10'>
          <div className='bg-white rounded-lg shadow overflow-hidden'>
            <div className='divide-y divide-stone-200 md:flex md:divide-y-0 md:divide-x min-h-[80vh]'>
              <aside className='py-6 md:w-[200px]'>
                <ul className='space-y-1'>
                  {sideNav.map((item) => (
                    <li
                      onClick={(e) => setView(e.target.innerText)}
                      key={item.name}
                      className={classNames(
                        item.name === view
                          ? 'bg-indigo-50 border-indigo-600 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-700'
                          : 'border-transparent text-stone-900 hover:bg-stone-50 hover:text-stone-900',
                        'cursor-pointer group border-l-4 px-3 py-2 flex items-center text-sm md:text-base font-medium'
                      )}
                    >
                      <span className='truncate'>{item.name}</span>
                    </li>
                  ))}
                </ul>
              </aside>
              {view === 'Orders' && <Orders orders={orders} />}
              {view === 'Profile' && <Profile user={session.user} />}
              {view === 'Password' && <Password user={session.user} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
