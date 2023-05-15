'use client';
import { useEffect, useState } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import Image from 'next/image';
import Link from 'next/link';
import Confirmation from './Confirmation';
import useStore from '@/store/store';
import urlFor from '@/utils/image';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { total, items } = useStore();
  const [order, setOrder] = useState<ConfirmationOrder>();
  const router = useRouter();

  // send order to backend
  const createOrder = async () => {
    const order = items.map((item) => ({
      id: item._id,
      quantity: item.quantity,
    }));

    const response = await fetch('/api/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });

    if (response.status !== 200) {
      console.log('Failed to create paypal order.');
      return;
    }

    const { id } = await response.json();
    return id;
  };

  const onApprove = async (data: { orderID: string }) => {
    const response = await fetch('/api/capture-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data.orderID),
    });

    if (!response.ok) {
      console.log('Failed to approve payment.');
      return;
    }

    const captureData = await response.json();
    // toggle order confirmation after purchase
    setOrder(captureData);
  };

  if (total === 0) {
    router.push('/shopping-bag');
    return null;
  }

  if (order) return <Confirmation order={order} />;

  return (
    <div className='max-w-screen-lg mx-auto pt-10 sm:pt-16'>
      <div className='relative grid grid-cols-1 gap-x-20 max-w-7xl mx-auto lg:px-2 lg:grid-cols-2'>
        <section className='pb-4 px-4 sm:px-6 sm:pb-10 lg:px-0 lg:pb-0 lg:row-start-1 lg:col-start-1'>
          <div className='max-w-screen-md mx-auto lg:max-w-none'>
            <h2 className='text-xl font-medium mb-2 text-stone-900'>Order summary</h2>

            <ul className='text-base font-medium text-stone-900 divide-y divide-stone-200'>
              {items.map((item) => (
                <li key={item._id} className='flex py-6 space-x-4 lg:space-x-6'>
                  <div className='flex flex-1 space-x-4'>
                    <Image
                      className='object-contain object-center w-[75px] h-[75px] sm:w-[120px] sm:h-[120px]'
                      src={urlFor(item.image).url()}
                      alt={item.name}
                      width='120'
                      height='120'
                    />
                    <div className='space-y-2 mt-2 sm:mt-4'>
                      <h3>{item.name}</h3>
                      <p className='text-stone-500 text-xs'>Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className='font-medium mt-2 sm:mt-4'>£{(item.price * item.quantity).toFixed(2)}</p>
                </li>
              ))}
            </ul>

            <dl className='text-lg font-medium text-stone-900 space-y-6 border-t border-stone-200 pt-6 lg:block'>
              <div className='flex items-center justify-between'>
                <dt>Subtotal</dt>
                <dd>£{total.toFixed(2)}</dd>
              </div>

              <div className='flex items-center justify-between'>
                <dt>Shipping</dt>
                <dd>Free</dd>
              </div>

              <div className='flex items-center justify-between border-t border-stone-200 pt-6'>
                <dt>Total</dt>
                <dd>£{total.toFixed(2)}</dd>
              </div>
            </dl>

            <Link href='/shopping-bag' className='block max-w-max pt-12 pb-4'>
              <div className='flex justify-start text-stone-500 hover:text-indigo-600'>
                <svg className='fill-current mr-2 w-4' viewBox='0 0 448 512'>
                  <path d='M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z' />
                </svg>
                Back to shopping bag
              </div>
            </Link>
          </div>
        </section>

        <div className='px-4 sm:px-6 lg:pb-16 lg:px-0 lg:row-start-1 lg:col-start-2'>
          <section>
            <div className='max-w-md mx-auto lg:max-w-none'>
              <h2 className='text-xl font-medium mb-2 text-stone-900 hidden lg:block'>Payment methods</h2>
              <div className='py-6 relative z-0'>
                <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
