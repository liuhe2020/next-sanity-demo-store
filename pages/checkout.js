import { PayPalButtons } from '@paypal/react-paypal-js';

const products = [
  {
    id: 1,
    name: 'Micro Backpack',
    href: '#',
    price: '$70.00',
    color: 'Moss',
    size: '5L',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/checkout-page-04-product-01.jpg',
    imageAlt:
      'Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps.',
  },
  // More products...
];

export default function checkout() {
  const createOrder = () => {
    return fetch('/api/paypal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: [
          {
            id: 1,
            quantity: 2,
          },
          { id: 2, quantity: 3 },
        ],
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ id }) => {
        return id;
      })
      .catch((e) => {
        console.error(e.error);
      });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture();
  };

  return (
    <div className='bg-white max-w-screen-lg mx-auto you'>
      <div className='relative grid grid-cols-1 gap-x-16 max-w-7xl mx-auto lg:px-8 lg:grid-cols-2 xl:gap-x-48'>
        <h1 className='sr-only'>Order information</h1>
        <section
          aria-labelledby='summary-heading'
          className='bg-gray-50 pt-16 pb-10 px-4 sm:px-6 lg:px-0 lg:pb-16 lg:bg-transparent lg:row-start-1 lg:col-start-2'
        >
          <div className='max-w-lg mx-auto lg:max-w-none'>
            <h2
              id='summary-heading'
              className='text-lg font-medium text-gray-900'
            >
              Order summary
            </h2>

            <ul
              role='list'
              className='text-sm font-medium text-gray-900 divide-y divide-gray-200'
            >
              {products.map((product) => (
                <li
                  key={product.id}
                  className='flex items-start py-6 space-x-4'
                >
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className='flex-none w-20 h-20 rounded-md object-center object-cover'
                  />
                  <div className='flex-auto space-y-1'>
                    <h3>{product.name}</h3>
                    <p className='text-gray-500'>{product.color}</p>
                    <p className='text-gray-500'>{product.size}</p>
                  </div>
                  <p className='flex-none text-base font-medium'>
                    {product.price}
                  </p>
                </li>
              ))}
            </ul>

            <dl className='text-sm font-medium text-gray-900 space-y-6 border-t border-gray-200 pt-6 lg:block'>
              <div className='flex items-center justify-between'>
                <dt className='text-gray-600'>Subtotal</dt>
                <dd>$320.00</dd>
              </div>

              <div className='flex items-center justify-between'>
                <dt className='text-gray-600'>Shipping</dt>
                <dd>$15.00</dd>
              </div>

              <div className='flex items-center justify-between'>
                <dt className='text-gray-600'>Taxes</dt>
                <dd>$26.80</dd>
              </div>

              <div className='flex items-center justify-between border-t border-gray-200 pt-6'>
                <dt className='text-base'>Total</dt>
                <dd className='text-base'>$361.80</dd>
              </div>
            </dl>
          </div>
        </section>

        <form className='pt-16 pb-36 px-4 sm:px-6 lg:pb-16 lg:px-0 lg:row-start-1 lg:col-start-1'>
          <div className='max-w-lg mx-auto lg:max-w-none'>
            <section aria-labelledby='contact-info-heading'>
              <h2
                id='contact-info-heading'
                className='text-lg font-medium text-gray-900'
              >
                Contact details
              </h2>

              <div className='mt-6'>
                <label
                  htmlFor='name'
                  className='block text-sm font-medium text-gray-700'
                >
                  Full name
                </label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  autoComplete='name'
                  className='block mt-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
              </div>

              <div className='mt-6'>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700'
                >
                  Email address
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  autoComplete='email'
                  className='block mt-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
              </div>

              <div className='mt-6'>
                <label
                  htmlFor='phone'
                  className='block text-sm font-medium text-gray-700'
                >
                  Phone
                </label>
                <input
                  type='text'
                  id='phone'
                  name='phone'
                  autoComplete='phone'
                  className='block mt-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
              </div>
            </section>

            <section aria-labelledby='shipping-heading' className='mt-10'>
              <h2
                id='shipping-heading'
                className='text-lg font-medium text-gray-900'
              >
                Shipping address
              </h2>

              <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3'>
                <div className='sm:col-span-3'>
                  <label
                    htmlFor='company'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Company
                  </label>
                  <div className='mt-1'>
                    <input
                      type='text'
                      id='company'
                      name='company'
                      className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    />
                  </div>
                </div>

                <div className='sm:col-span-3'>
                  <label
                    htmlFor='address'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Address
                  </label>
                  <div className='mt-1'>
                    <input
                      type='text'
                      id='address'
                      name='address'
                      autoComplete='street-address'
                      className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    />
                  </div>
                </div>

                <div className='sm:col-span-3'>
                  <label
                    htmlFor='apartment'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Apartment, suite, etc.
                  </label>
                  <div className='mt-1'>
                    <input
                      type='text'
                      id='apartment'
                      name='apartment'
                      className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor='city'
                    className='block text-sm font-medium text-gray-700'
                  >
                    City
                  </label>
                  <div className='mt-1'>
                    <input
                      type='text'
                      id='city'
                      name='city'
                      autoComplete='address-level2'
                      className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor='region'
                    className='block text-sm font-medium text-gray-700'
                  >
                    State / Province
                  </label>
                  <div className='mt-1'>
                    <input
                      type='text'
                      id='region'
                      name='region'
                      autoComplete='address-level1'
                      className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor='postal-code'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Postal code
                  </label>
                  <div className='mt-1'>
                    <input
                      type='text'
                      id='postal-code'
                      name='postal-code'
                      autoComplete='postal-code'
                      className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    />
                  </div>
                </div>
              </div>
            </section>
            <PayPalButtons />
          </div>
        </form>
      </div>
    </div>
  );
}
