'use client';
import Link from 'next/link';
import ShoppingBagItem from './shopping-bag-Item';
import useShoppingBagStore from '@/store/shopping-bag-store';
import { useQuery } from 'react-query';
import Spinner from '@/components/spinner';

export default function ShoppingBagPage() {
  const { total, items } = useShoppingBagStore();
  const { status } = useQuery('getShoppingBag', () => localStorage.getItem('nsds-shopping-bag'));

  if (status === 'loading')
    return (
      <div className='pt-10 min-h-[30vw] grid place-items-center'>
        <Spinner />
      </div>
    );

  return (
    <section className='px-4 pt-10 sm:pt-16 mx-auto max-w-screen-md lg:max-w-screen-lg'>
      {total === 0 ? (
        <div className='w-full'>
          <h1 className='font-medium text-xl'>Shopping Bag is empty.</h1>
        </div>
      ) : (
        <>
          <div className='w-full'>
            <h1 className='font-medium border-b pb-8 text-xl'>Shopping Bag</h1>
            <div className='divide-y-[1px] min-[400px]:px-2 sm:px-0'>
              {items?.map((item) => (
                <ShoppingBagItem key={item._id} item={item} />
              ))}
            </div>
          </div>
          <div className='w-full border-t-[1px] pt-12'>
            <div className='flex justify-between font-medium text-stone-900 pb-8 text-lg'>
              <h2>Subtotal</h2>
              <span>£{total.toFixed(2)}</span>
            </div>
            <div className='flex justify-between items-center space-x-4 pt-4'>
              <Link href='/'>
                <div className='flex text-stone-500 hover:text-indigo-600'>
                  <svg className='fill-current mr-2 w-4' viewBox='0 0 448 512'>
                    <path d='M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z' />
                  </svg>
                  Continue Shopping
                </div>
              </Link>
              <Link
                href='/checkout'
                className='w-60 inline-flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                Checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
