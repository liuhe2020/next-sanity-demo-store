import urlFor from '../../utils/image';

export default function Orders({ orders }) {
  console.log(orders[0].orderItems[0].product);
  return (
    <section className='divide-y divide-stone-200 md:flex-1'>
      <div className='py-6 px-4 sm:p-6 lg:pb-8'>
        <h2 className='text-lg leading-6 font-medium text-stone-900'>
          Order history
        </h2>
        <div className='mx-auto py-6'>
          <div className=''>
            <div className='space-y-6'>
              {orders.map((order) => (
                <div key={order.name} className='bg-stone-100 rounded-lg p-6'>
                  <dl className='space-y-3 text-sm text-stone-600 pb-6 border-b border-stone-200'>
                    <div className='flex'>
                      <dt className='w-28 font-medium'>Order number</dt>
                      <dd className='ml-2 text-stone-900'>{order.name}</dd>
                    </div>
                    <div className='flex'>
                      <dt className='w-28 font-medium'>Order date</dt>
                      <dd className='ml-2 text-stone-900'>
                        <time dateTime={order._createdAt}>
                          {order._createdAt}
                        </time>
                      </dd>
                    </div>
                    <div className='flex'>
                      <dt className='w-28 font-medium'>Order status</dt>
                      <dd className='ml-2 text-stone-900'>Processing</dd>
                    </div>
                    <div className='flex'>
                      <dt className='w-28 font-medium'>Total amount</dt>
                      <dd className='ml-2 text-stone-900'>
                        £{order.orderTotal.toFixed(2)}
                      </dd>
                    </div>
                  </dl>

                  <table className='w-full text-stone-500 mt-4'>
                    <thead className='sr-only text-sm text-stone-500 text-left sm:not-sr-only'>
                      <tr>
                        <th scope='col' className='w-11/12 py-2 font-medium'>
                          Product
                        </th>
                        <th
                          scope='col'
                          className='hidden w-1/12 py-2 font-medium sm:table-cell'
                        >
                          Price
                        </th>
                      </tr>
                    </thead>
                    <tbody className='text-sm'>
                      {order.orderItems.map((item) => (
                        <tr key={item.product._id}>
                          <td className='pt-5'>
                            <div className='flex items-center'>
                              <img
                                src={urlFor(item.product.images[0]).url()}
                                alt={item.product.name}
                                className='w-16 h-16 object-center object-contain rounded mr-6'
                              />
                              <div>
                                <div className='text-stone-900'>
                                  {item.product.name}
                                </div>
                                <div className='mt-1 sm:hidden text-stone-900'>
                                  £{item.product.price.toFixed(2)}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className='hidden pt-6 sm:table-cell text-stone-900'>
                            £{item.product.price.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
