export default function Orders() {
  const orders = [
    {
      number: 'WU88191111',
      date: 'January 22, 2021',
      datetime: '2021-01-22',
      invoiceHref: '#',
      total: '$238.00',
      products: [
        {
          id: 1,
          name: 'Machined Pen and Pencil Set',
          href: '#',
          price: '$70.00',
          status: 'Delivered Jan 25, 2021',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/order-history-page-02-product-01.jpg',
          imageAlt:
            'Detail of mechanical pencil tip with machined black steel shaft and chrome lead tip.',
        },
        // More products...
      ],
    },
    // More orders...
  ];

  return (
    <section className='divide-y divide-stone-200 md:flex-1'>
      {/* Profile section */}
      <div className='py-6 px-4 sm:p-6 lg:pb-8'>
        <h2 className='text-lg leading-6 font-medium text-stone-900'>Orders</h2>
        <div className='mx-auto py-16 px-2 lg:pb-24'>
          <div className=''>
            <div className='space-y-20'>
              {orders.map((order) => (
                <div key={order.number} className='bg-stone-100 rounded-lg p-6'>
                  <div className='sm:flex sm:items-center sm:justify-between'>
                    <dl className='space-y-3 text-sm text-stone-600'>
                      <div className='flex'>
                        <dt className='font-medium'>Order number</dt>
                        <dd className='ml-2'>{order.number}</dd>
                      </div>
                      <div className='flex'>
                        <dt className='font-medium'>Order date</dt>
                        <dd className='ml-2'>
                          <time dateTime={order.datetime}>{order.date}</time>
                        </dd>
                      </div>
                      <div className='flex'>
                        <dt className='font-medium'>Order status</dt>
                        <dd className='ml-2'>Processing</dd>
                      </div>
                      <div className='flex'>
                        <dt>Total amount</dt>
                        <dd className='ml-2'>{order.total}</dd>
                      </div>
                    </dl>
                  </div>

                  <table className='mt-4 w-full text-stone-500 sm:mt-6'>
                    <thead className='sr-only text-sm text-stone-500 text-left sm:not-sr-only'>
                      <tr>
                        <th
                          scope='col'
                          className='sm:w-2/5 lg:w-1/3 pr-8 py-3 font-normal'
                        >
                          Product
                        </th>
                        <th
                          scope='col'
                          className='hidden w-1/5 pr-8 py-3 font-normal sm:table-cell'
                        >
                          Price
                        </th>
                      </tr>
                    </thead>
                    <tbody className='border-b border-stone-200 divide-y divide-stone-200 text-sm sm:border-t'>
                      {order.products.map((product) => (
                        <tr key={product.id}>
                          <td className='py-6 pr-8'>
                            <div className='flex items-center'>
                              <img
                                src={product.imageSrc}
                                alt={product.imageAlt}
                                className='w-16 h-16 object-center object-cover rounded mr-6'
                              />
                              <div>
                                <div className='font-medium text-stone-900'>
                                  {product.name}
                                </div>
                                <div className='mt-1 sm:hidden'>
                                  {product.price}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className='hidden py-6 pr-8 sm:table-cell'>
                            {product.price}
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
