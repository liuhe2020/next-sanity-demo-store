import Image from 'next/image';
import Link from 'next/link';

export default function PhoneBanner() {
  return (
    <section className='relative text-stone-300 w-full h-[530px] max-w-[2560px] mx-auto flex flex-col items-center overflow-hidden md:h-[750px] lg:h-[1000px]'>
      <div className='absolute flex flex-col justify-center items-center text-center px-4 my-12 md:mt-24 md:mb-20'>
        <h3 className='text-2xl font-medium max-w-sm md:text-3xl md:max-w-md lg:text-5xl lg:mt-6 lg:max-w-2xl'>
          Who says you can't compare oranges to apples?
        </h3>
        <div className='mt-8 text-base space-x-4 lg:space-x-6 lg:mt-16 lg:font-medium'>
          <Link href='/phones'>
            <button
              type='button'
              className='text-white bg-gradient-to-r from-stone-700 to-stone-400 hover:bg-gradient-to-l focus:from-stone-800 focus:to-stone-500 rounded-lg px-4 py-1.5 text-center lg:px-5 lg:py-2'
            >
              Learn more
            </button>
          </Link>
          <Link href='/phones'>
            <button
              type='button'
              className='text-white bg-gradient-to-br from-stone-400 to-stone-700 hover:bg-gradient-to-bl focus:from-stone-500 focus:to-stone-800 rounded-lg px-4 py-1.5 text-center lg:px-5 lg:py-2'
            >
              Shop now
            </button>
          </Link>
        </div>
      </div>
      <Image
        className='object-cover w-[700px] md:w-[1000px] -z-10 lg:hidden'
        src='/images/hero_phone.jpg'
        alt='hero phone'
        fill
        sizes='100vw'
      />
      <Image
        className='object-cover object-[50% 45%] -z-10 hidden lg:block'
        src='/images/hero_phone_lg.jpg'
        alt='hero phone'
        fill
        sizes='100vw'
      />
    </section>
  );
}
