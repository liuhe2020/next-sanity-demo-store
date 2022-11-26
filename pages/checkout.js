import { useState } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import Image from 'next/image';
import Link from 'next/link';
import useStore from '../store/store';
import urlFor from '../utils/image';
import Confirmation from '../components/Checkout/Confirmation';

export default function checkout() {
  const { total, items } = useStore();
  const [order, setOrder] = useState();

  // send order to backend
  const createOrder = async () => {
    const order = items.map((item) => ({
      id: item._id,
      quantity: item.quantity,
    }));

    const response = await fetch('/api/createOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });

    if (response.status !== 200) {
      console.log('Failed to submit payment to backend');
      return;
    }

    const { id } = await response.json();
    return id;
  };

  const onApprove = async (data) => {
    const response = await fetch('/api/captureOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data.orderID),
    });

    if (response.status !== 200) {
      console.log('Failed to approve payment');
      return;
    }

    const captureData = await response.json();
    console.log(captureData);
    setOrder(captureData);
  };

  if (order) return <Confirmation order={order} />;

  return (
    <div className='max-w-screen-lg mx-auto pt-16'>
      <div className='relative pt-10 grid grid-cols-1 gap-x-20 max-w-7xl mx-auto lg:px-2 lg:grid-cols-2'>
        <section className='pb-4 px-4 sm:px-6 sm:pb-10 lg:px-0 lg:pb-0 lg:row-start-1 lg:col-start-1'>
          <div className='max-w-screen-md mx-auto lg:max-w-none'>
            <h2 className='text-xl font-medium mb-2 text-stone-900'>
              Order summary
            </h2>

            <ul className='text-base font-medium text-stone-900 divide-y divide-stone-200'>
              {items.map((item) => (
                <li key={item._id} className='flex py-6 space-x-4 lg:space-x-6'>
                  <div className='flex flex-1 space-x-4'>
                    <div className='relative flex justify-center min-w-[75px] w-[75px] h-[75px] sm:w-[120px] sm:h-[120px]'>
                      <Image
                        src={urlFor(item.images[0]).url()}
                        alt=''
                        layout='fill'
                        objectFit='contain'
                        objectPosition='center'
                      />
                    </div>
                    <div className='space-y-2 mt-2 sm:mt-4'>
                      <h3>{item.name}</h3>
                      <p className='text-stone-500 text-xs'>
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className='font-medium mt-2 sm:mt-4'>
                    £{(item.price * item.quantity).toFixed(2)}
                  </p>
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

            <Link href='/shopping-bag'>
              <a className='block max-w-max pt-12 pb-4'>
                <div className='flex justify-start text-stone-500 hover:text-indigo-600'>
                  <svg className='fill-current mr-2 w-4' viewBox='0 0 448 512'>
                    <path d='M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z' />
                  </svg>
                  Back to shopping bag
                </div>
              </a>
            </Link>
          </div>
        </section>

        <div className='px-4 sm:px-6 lg:pb-16 lg:px-0 lg:row-start-1 lg:col-start-2'>
          <section>
            <div className='max-w-md mx-auto lg:max-w-none'>
              <h2 className='text-xl font-medium mb-2 text-stone-900 hidden lg:block'>
                Payment methods
              </h2>
              <div className='py-6 relative z-0'>
                <PayPalButtons
                  createOrder={createOrder}
                  onApprove={onApprove}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
