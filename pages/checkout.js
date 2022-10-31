import { PayPalButtons } from '@paypal/react-paypal-js';
import Image from 'next/image';
import useStore from '../store/store';
import urlFor from '../utils/image';

export default function checkout() {
  const { total, totalQty, items } = useStore();

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
    console.log('Payment approved');
  };

  return (
    <div className='bg-white max-w-screen-lg mx-auto you'>
      <div className='relative grid grid-cols-1 gap-x-16 max-w-7xl mx-auto lg:px-2 lg:grid-cols-2 xl:gap-x-32'>
        <h1 className='sr-only'>Order summary</h1>
        <section
          aria-labelledby='summary-heading'
          className='bg-stone-50 pt-16 pb-10 px-4 sm:px-6 lg:px-0 lg:pb-16 lg:bg-transparent lg:row-start-1 lg:col-start-1'
        >
          <div className='max-w-lg mx-auto lg:max-w-none'>
            <h2
              id='summary-heading'
              className='text-lg font-medium text-stone-900'
            >
              Order summary
            </h2>

            <ul
              role='list'
              className='text-sm font-medium text-stone-900 divide-y divide-stone-200'
            >
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

            <dl className='text-sm font-medium text-stone-900 space-y-6 border-t border-stone-200 pt-6 lg:block'>
              <div className='flex items-center justify-between'>
                <dt className='text-stone-600'>Subtotal</dt>
                <dd></dd>
              </div>

              <div className='flex items-center justify-between'>
                <dt className='text-stone-600'>Shipping</dt>
                <dd></dd>
              </div>

              <div className='flex items-center justify-between'>
                <dt className='text-stone-600'>Taxes</dt>
                <dd></dd>
              </div>

              <div className='flex items-center justify-between border-t border-stone-200 pt-6'>
                <dt className='text-base'>Total</dt>
                <dd className='text-base'>£{total.toFixed(2)}</dd>
              </div>
            </dl>
          </div>
        </section>

        <div className='pt-16 pb-36 px-4 sm:px-6 lg:pb-16 lg:px-0 lg:row-start-1 lg:col-start-2'>
          <section aria-labelledby='contact-details-heading'>
            <div className='max-w-lg mx-auto lg:max-w-none'>
              <h2
                id='contact-info-heading'
                className='text-lg font-medium text-stone-900'
              >
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
