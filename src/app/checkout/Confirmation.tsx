import urlFor from '../../utils/image';

export default function Confirmation({ order }) {
  return (
    <main className='bg-white px-4 pt-16 pb-24 sm:px-6 sm:pt-24 lg:px-8 lg:py-32'>
      <div className='max-w-3xl mx-auto'>
        <div className='max-w-xl'>
          <p className='mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl'>Thank you.</p>
          <p className='mt-6 text-base text-stone-500'>We will send a confirmation and delivery update to your email address.</p>
          <p className='mt-6 text-sm font-semibold text-stone-500'>Order ID</p>
          <p className='mt-2 text-indigo-600'>{order.name}</p>
        </div>

        <section aria-labelledby='order-heading' className='mt-10 border-t border-gray-200'>
          <h2 id='order-heading' className='sr-only'>
            Your order
          </h2>

          <h3 className='sr-only'>Items</h3>
          {order.orderItems.map((item) => (
            <div key={item.product._id} className='py-10 border-b border-gray-200 flex space-x-6'>
              <img
                src={urlFor(item.product.images[0]).url()}
                alt={item.product.name}
                className='flex-none w-20 h-20 object-center object-cover bg-gray-100 rounded-lg sm:w-40 sm:h-40'
              />
              <div className='flex-auto flex flex-col'>
                <div>
                  <h4 className='font-medium text-stone-900'>
                    <a href={''}>{item.product.name}</a>
                  </h4>
                </div>
                <div className='mt-6 flex-1 flex items-end'>
                  <dl className='flex text-sm divide-x divide-gray-200 space-x-4 sm:space-x-6'>
                    <div className='flex'>
                      <dt className='font-medium text-stone-900'>Quantity</dt>
                      <dd className='ml-2 text-stone-700'>{item.quantity}</dd>
                    </div>
                    <div className='pl-4 flex sm:pl-6'>
                      <dt className='font-medium text-stone-900'>Price</dt>
                      <dd className='ml-2 text-stone-700'>£{item.product.price.toFixed(2)}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          ))}

          <div className='sm:ml-40 sm:pl-6'>
            <h3 className='sr-only'>Your information</h3>

            <h4 className='sr-only'>Addresses</h4>
            <dl className='grid grid-cols-2 gap-x-6 text-sm py-10'>
              <div>
                <dt className='font-medium text-stone-900'>Shipping address</dt>
                <dd className='mt-2 text-stone-700'>
                  <address className='not-italic'>
                    <span className='block'>{order.deliveryAddress.fullName}</span>
                    <span className='block'>{order.deliveryAddress.address.split(', ')[0]}</span>
                    <span className='block'>{order.deliveryAddress.address.split(', ')[1]}</span>
                    <span className='block'>{order.deliveryAddress.city}</span>
                    <span className='block'>{order.deliveryAddress.county}</span>
                    <span className='block'>{order.deliveryAddress.postcode}</span>
                    <span className='block'>{order.deliveryAddress.country}</span>
                  </address>
                </dd>
              </div>
              <div>
                <dt className='font-medium text-stone-900'>Billing address</dt>
                <dd className='mt-2 text-stone-700'>
                  <address className='not-italic'>
                    <span className='block'>{order.deliveryAddress.fullName}</span>
                    <span className='block'>{order.deliveryAddress.address.split(', ')[0]}</span>
                    <span className='block'>{order.deliveryAddress.address.split(', ')[1]}</span>
                    <span className='block'>{order.deliveryAddress.city}</span>
                    <span className='block'>{order.deliveryAddress.county}</span>
                    <span className='block'>{order.deliveryAddress.postcode}</span>
                    <span className='block'>{order.deliveryAddress.country}</span>
                  </address>
                </dd>
              </div>
            </dl>

            <h4 className='sr-only'>Payment</h4>
            <dl className='grid grid-cols-2 gap-x-6 border-t border-gray-200 text-sm py-10'>
              <div>
                <dt className='font-medium text-stone-900'>Payment method</dt>
                <dd className='mt-2 text-stone-700'>
                  <p>Paypal</p>
                  <p>{order.paymentDetail.paypalEmail}</p>
                  <p>
                    <span aria-hidden='true'>•••• </span>
                    <span className='sr-only'>Ending in </span>0000
                  </p>
                </dd>
              </div>
              <div>
                <dt className='font-medium text-stone-900'>Shipping method</dt>
                <dd className='mt-2 text-stone-700'>
                  <p>DHL</p>
                  <p>Takes up to 3 working days</p>
                </dd>
              </div>
            </dl>

            <h3 className='sr-only'>Summary</h3>

            <dl className='space-y-6 border-t border-gray-200 text-sm pt-10'>
              <div className='flex justify-between'>
                <dt className='font-medium text-stone-900'>Subtotal</dt>
                <dd className='text-stone-700'>£{order.orderTotal.toFixed(2)}</dd>
              </div>
              <div className='flex justify-between'>
                <dt className='font-medium text-stone-900'>Shipping</dt>
                <dd className='text-stone-700'>£0.00</dd>
              </div>
              <div className='flex justify-between'>
                <dt className='font-medium text-stone-900'>Total</dt>
                <dd className='text-stone-900'>£{order.orderTotal.toFixed(2)}</dd>
              </div>
            </dl>
          </div>
        </section>
      </div>
    </main>
  );
}
