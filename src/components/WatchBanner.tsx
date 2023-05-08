'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function WatchBanner() {
  return (
    <section className='pt-4 max-w-[2560px] mx-auto bg-stone-50 text-stone-900 w-full h-[550px] flex flex-col items-center overflow-hidden md:h-[750px] lg:h-[1000px]'>
      <div className='flex flex-col justify-center items-center text-center px-4 mt-12 mb-8 md:mt-24 md:mb-8'>
        <h2 className='text-4xl font-semibold md:text-5xl lg:text-7xl'>Unknown Explorer Watch</h2>
        <h3 className='text-2xl font-medium mt-4 md:text-3xl lg:text-4xl lg:mt-6'>Anytime, Anywhere</h3>
        <div className='mt-8 text-base space-x-4 lg:space-x-6 lg:mt-16 lg:font-medium'>
          <Link href='/accessories'>
            <button
              type='button'
              className='text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:bg-gradient-to-l focus:from-blue-600 focus:to-purple-600 rounded-lg px-4 py-1.5 text-center lg:px-5 lg:py-2'
            >
              Learn more
            </button>
          </Link>
          <Link href='/accessories'>
            <button
              type='button'
              className='text-white bg-gradient-to-br from-purple-500 to-pink-500 hover:bg-gradient-to-bl focus:from-purple-600 focus:to-pink-600 rounded-lg px-4 py-1.5 text-center lg:px-5 lg:py-2'
            >
              Shop now
            </button>
          </Link>
        </div>
      </div>
      <div className='w-[360px] md:w-[660px] lg:w-[900px]'>
        <Image className='object-contain object-top' src='/images/hero_watch.png' alt='hero watch' width='900' height='0' />
      </div>
    </section>
  );
}
