import Image from 'next/image';
import Link from 'next/link';
import ShoppingBagItem from '../components/ShoppingBagItem';
import useStore from '../store/store';

export default function ShoppingBag() {
  const { total, totalQty, items, clearBag } = useStore();

  return (
    <section className='mt-3 p-6 text-sm md:text-base'>
      <Link href='/'>
        <a>
          <div className='flex mb-10 text-indigo-600 mx-auto max-w-[600px] lg:max-w-[730px] xl:max-w-[860px]'>
            <svg className='fill-current mr-2 w-4' viewBox='0 0 448 512'>
              <path d='M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z' />
            </svg>
            Continue Shopping
          </div>
        </a>
      </Link>
      <div className='flex flex-col mx-auto max-w-[600px] lg:max-w-[730px] xl:max-w-[860px]'>
        <div className='w-full mb-20'>
          <div className='flex justify-between font-medium border-b pb-8'>
            <h1 className='text-xl'>Shopping Bag</h1>
            <h2 className='text-lg'>{totalQty}</h2>
          </div>
          {items?.map((item) => (
            <ShoppingBagItem key={item._id} item={item} />
          ))}
        </div>

        <div className='w-full'>
          <h1 className='font-medium text-xl border-b pb-8'>Order Summary</h1>
          <div className='flex justify-between mt-10 mb-5 font-medium'>
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
          </div>
        </div>
      </div>
    </section>
  );
}
