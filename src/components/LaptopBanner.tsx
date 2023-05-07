import Image from 'next/image';
import Link from 'next/link';

export default function LaptopBanner() {
  return (
    <section className='pt-16 max-w-[2560px] mx-auto bg-black text-white w-full h-[530px] flex flex-col items-center overflow-hidden md:h-[750px] lg:h-[1000px]'>
      <div className='flex flex-col justify-center items-center text-center my-16 md:my-24'>
        <h2 className='text-4xl font-semibold md:text-5xl lg:text-7xl'>
          Beast Mode
        </h2>
        <h3 className='text-2xl font-medium mt-4 md:text-3xl lg:text-3xl lg:mt-6'>
          Productivity
        </h3>
        <div className='mt-8 text-base space-x-4 lg:space-x-6 lg:mt-16 lg:font-medium'>
          <Link href='/laptops'>
            <button
              type='button'
              className='text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:from-purple-600 focus:to-pink-600 rounded-lg px-4 py-1.5 text-center lg:px-5 lg:py-2'
            >
              Learn more
            </button>
          </Link>
          <Link href='/laptops'>
            <button
              type='button'
              className='text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:from-pink-600 focus:to-orange-500 rounded-lg px-4 py-1.5 text-center lg:px-5 lg:py-2'
            >
              Shop now
            </button>
          </Link>
        </div>
      </div>
      <Image
        className='w-[500px] md:w-[1280px]'
        src='/images/hero_laptop.jpg'
        alt='hero laptop'
        width='1280'
        height='0'
      />
    </section>
  );
}
