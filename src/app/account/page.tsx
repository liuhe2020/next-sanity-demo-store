'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import classNames from '@/utils/classNames';
import client from '@/utils/client';
import Orders from './Order';
import Profile from './Profile';
import { Metadata } from 'next';

const sideNav = ['Orders', 'Profile'];

export const metadata: Metadata = {
  title: 'DS | Account',
  description: 'Next Sanity Demo Store user account page',
};

export default function Account() {
  const [orders, setOrders] = useState<Order[] | []>([]);
  const [view, setView] = useState('Orders');

  const { data: session } = useSession({
    required: true,
  });

  useEffect(() => {
    const getOrders = async () => {
      const data: Order[] = await client.fetch(
        `*[_type == 'order' && user._ref == '${session?.user!.id}']{name, _createdAt, orderTotal, orderItems[]{product->,quantity}}`
      );
      setOrders(data);
    };
    getOrders();
  }, [session]);

  return (
    <div className='pt-16 min-h-[80vh] relative bg-stone-50 w-full'>
      <div className='max-w-screen-lg mx-auto p-2 sm:p-4 lg:my-10'>
        <div className='bg-white rounded-lg shadow overflow-hidden'>
          <div className='divide-y divide-stone-200 md:flex md:divide-y-0 md:divide-x min-h-[80vh]'>
            <aside className='py-6 md:w-[200px]'>
              <ul className='space-y-1'>
                {sideNav.map((item) => (
                  <li
                    onClick={(e) => setView((e.target as HTMLElement).innerText)}
                    key={item}
                    className={classNames(
                      item === view
                        ? 'bg-indigo-50 border-indigo-600 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-700'
                        : 'border-transparent text-stone-900 hover:bg-stone-50 hover:text-stone-900',
                      'cursor-pointer group border-l-4 px-3 py-2 flex items-center text-sm md:text-base font-medium'
                    )}
                  >
                    <span className='truncate'>{item}</span>
                  </li>
                ))}
              </ul>
            </aside>
            {view === 'Orders' && <Orders orders={orders} />}
            {view === 'Profile' && <Profile user={session?.user} />}
          </div>
        </div>
      </div>
    </div>
  );
}
