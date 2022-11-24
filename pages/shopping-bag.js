import Image from 'next/image';
import Link from 'next/link';
import ShoppingBagItem from '../components/ShoppingBagItem';
import useStore from '../store/store';

export default function ShoppingBag() {
  const { total, items, clearBag } = useStore();

  return (
    <section className='pt-16'>
      <div className='p-4 mx-auto max-w-screen-md lg:max-w-screen-lg'>
        <div className='w-full'>
          <h1 className='font-medium border-b pb-8 text-xl'>Shopping Bag</h1>
          <div className='divide-y-[1px] min-[400px]:px-2 sm:px-0'>
            {items?.map((item) => (
              <ShoppingBagItem key={item._id} item={item} />
            ))}
          </div>
        </div>

        <div className='w-full border-t-[1px] pt-10'>
          <div className='flex justify-between font-medium pb-8 text-xl'>
            <h2 className=''>Subtotal</h2>
            <span className=''>£{total.toFixed(2)}</span>
          </div>
          <div className='flex justify-between items-center space-x-4'>
            <Link href='/'>
              <div className='flex text-stone-500'>
                <svg className='fill-current mr-2 w-4' viewBox='0 0 448 512'>
                  <path d='M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z' />
                </svg>
                Continue Shopping
              </div>
            </Link>
            <Link href='/checkout'>
              <a className='w-48 inline-flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                Checkout
              </a>
            </Link>
          </div>
          {/* <div className='flex justify-between mt-10 mb-5 font-medium'>
            <span className=''>Subtotal</span>
            <span className=''>£{total.toFixed(2)}</span>
          </div>
          <div>
            <label className='font-medium inline-block mb-3'>Shipping</label>
            <select className='block p-2 text-stone-600 w-full'>
              <option>Standard shipping - £4.99</option>
            </select>
          </div>
          <div className='py-10'>
            <label htmlFor='promo' className='font-medium inline-block mb-3'>
              Promo Code
            </label>
            <input
              type='text'
              id='promo'
              placeholder='Enter your code'
              className='p-2 w-full'
            />
          </div>
          <button className='bg-red-500 hover:bg-red-600 px-5 py-2 text-white'>
            Apply
          </button>
          <div className='border-t mt-8'>
            <div className='flex font-medium justify-between py-6'>
              <span>Total</span>
              <span>£{total.toFixed(2)}</span>
            </div>
            <Link href='/checkout'>
              <a>
                <button className='bg-indigo-500 font-medium hover:bg-indigo-600 py-3 text-white w-full'>
                  Continue to checkout
                </button>
              </a>
            </Link>
          </div> */}
        </div>
      </div>
    </section>
  );
}
