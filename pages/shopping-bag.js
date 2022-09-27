import Image from 'next/image';
import Link from 'next/link';
import { useStore } from '../store/store';

export default function shoppingBag() {
  const handleChange = (e) => {
    console.log(e.target.value);
  };
  const shoppingBag = useStore((state) => state.items);
  console.log(shoppingBag);

  return (
    <section className='mt-3 p-6 text-sm md:text-base'>
      <Link href='/'>
        <div className='flex mb-10 text-indigo-600 mx-auto max-w-[600px] lg:max-w-[730px] xl:max-w-[860px]'>
          <svg className='fill-current mr-2 w-4' viewBox='0 0 448 512'>
            <path d='M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z' />
          </svg>
          Continue Shopping
        </div>
      </Link>

      <div className='flex flex-col mx-auto max-w-[600px] lg:max-w-[730px] xl:max-w-[860px]'>
        <div className='w-full mb-20'>
          <div className='flex justify-between font-medium border-b pb-8'>
            <h1 className='text-xl'>Shopping Bag</h1>
            <h2 className='text-lg'>3 Items</h2>
          </div>

          <div className='w-full flex items-center mt-4'>
            <div className='flex flex-1 items-center mr-10'>
              <div className='relative flex justify-center w-[100px] h-[100px] sm:w-[150px] sm:h-[150px]'>
                <Image
                  src='/images/products/alpha_f22.png'
                  alt=''
                  layout='fill'
                  objectFit='contain'
                  objectPosition='center'
                />
              </div>
              <h3 className='flex-1'>Unknown CoolBook x17 Pro</h3>
            </div>
            <div className='flex flex-col items-end'>
              <div className='flex mb-3 mt-3'>
                <svg
                  className='fill-current text-stone-600 w-3 cursor-pointer hover:text-black'
                  viewBox='0 0 448 512'
                >
                  <path d='M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z' />
                </svg>
                <input
                  className='mx-2 border text-center w-8'
                  type='text'
                  onChange={handleChange}
                />
                <svg
                  className='fill-current text-stone-600 w-3 cursor-pointer hover:text-black'
                  viewBox='0 0 448 512'
                >
                  <path d='M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z' />
                </svg>
              </div>
              <span className='font-medium text-sm'>£400.00</span>
            </div>
          </div>
        </div>

        <div className='w-full'>
          <h1 className='font-medium text-xl border-b pb-8'>Order Summary</h1>
          <div className='flex justify-between mt-10 mb-5 font-medium'>
            <span className=''>Items 3</span>
            <span className=''>£400.00</span>
          </div>
          <div>
            <label className='font-medium inline-block mb-3'>Shipping</label>
            <select className='block p-2 text-stone-600 w-full'>
              <option>Standard shipping - $10.00</option>
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
              <span>Total cost</span>
              <span>$600</span>
            </div>
            <button className='bg-indigo-500 font-medium hover:bg-indigo-600 py-3 text-white w-full'>
              Check out
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
