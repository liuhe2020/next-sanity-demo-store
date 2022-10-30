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
          className='bg-stone-50 pt-16 pb-10 px-4 sm:px-6 lg:px-0 lg:pb-16 lg:bg-transparent lg:row-start-1 lg:col-start-2'
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

        <form className='pt-16 pb-36 px-4 sm:px-6 lg:pb-16 lg:px-0 lg:row-start-1 lg:col-start-1'>
          <div className='max-w-lg mx-auto lg:max-w-none'>
            <section aria-labelledby='contact-details-heading'>
              <h2
                id='contact-info-heading'
                className='text-lg font-medium text-stone-900'
              >
                Contact details
              </h2>

              <div className='mt-6'>
                <label
                  htmlFor='name'
                  className='block text-sm font-medium text-stone-700'
                >
                  Full name
                </label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  autoComplete='name'
                  className='block mt-2 w-full border-stone-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
              </div>

              <div className='mt-6'>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-stone-700'
                >
                  Email address
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  autoComplete='email'
                  className='block mt-2 w-full border-stone-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
              </div>

              <div className='mt-6'>
                <label
                  htmlFor='phone'
                  className='block text-sm font-medium text-stone-700'
                >
                  Phone
                </label>
                <input
                  type='text'
                  id='phone'
                  name='phone'
                  autoComplete='phone'
                  className='block mt-2 w-full border-stone-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
              </div>
            </section>

            <section aria-labelledby='shipping-heading' className='mt-10'>
              <h2
                id='shipping-heading'
                className='text-lg font-medium text-stone-900'
              >
                Shipping address
              </h2>

              <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3'>
                <div className='sm:col-span-3'>
                  <label
                    htmlFor='company'
                    className='block text-sm font-medium text-stone-700'
                  >
                    Company
                  </label>
                  <div className='mt-1'>
                    <input
                      type='text'
                      id='company'
                      name='company'
                      className='block w-full border-stone-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    />
                  </div>
                </div>

                <div className='sm:col-span-3'>
                  <label
                    htmlFor='address'
                    className='block text-sm font-medium text-stone-700'
                  >
                    Address
                  </label>
                  <div className='mt-1'>
                    <input
                      type='text'
                      id='address'
                      name='address'
                      autoComplete='street-address'
                      className='block w-full border-stone-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    />
                  </div>
                </div>

                <div className='sm:col-span-3'>
                  <label
                    htmlFor='apartment'
                    className='block text-sm font-medium text-stone-700'
                  >
                    Apartment, suite, etc.
                  </label>
                  <div className='mt-1'>
                    <input
                      type='text'
                      id='apartment'
                      name='apartment'
                      className='block w-full border-stone-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor='city'
                    className='block text-sm font-medium text-stone-700'
                  >
                    City
                  </label>
                  <div className='mt-1'>
                    <input
                      type='text'
                      id='city'
                      name='city'
                      autoComplete='address-level2'
                      className='block w-full border-stone-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor='region'
                    className='block text-sm font-medium text-stone-700'
                  >
                    State / Province
                  </label>
                  <div className='mt-1'>
                    <input
                      type='text'
                      id='region'
                      name='region'
                      autoComplete='address-level1'
                      className='block w-full border-stone-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor='postal-code'
                    className='block text-sm font-medium text-stone-700'
                  >
                    Postal code
                  </label>
                  <div className='mt-1'>
                    <input
                      type='text'
                      id='postal-code'
                      name='postal-code'
                      autoComplete='postal-code'
                      className='block w-full border-stone-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    />
                  </div>
                </div>
              </div>
            </section>
            <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
          </div>
        </form>
      </div>
    </div>
  );
}
