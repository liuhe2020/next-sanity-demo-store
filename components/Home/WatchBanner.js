import Image from 'next/image';
import Link from 'next/link';

export default function WatchBanner() {
  return (
    <section className='pt-6 bg-white text-stone-900 w-full h-[530px] flex flex-col items-center overflow-hidden md:h-[750px] lg:h-[1000px]'>
      <div className='flex flex-col justify-center items-center my-12 md:mt-24 md:mb-20'>
        <h2 className='text-4xl text-center font-semibold md:text-5xl lg:text-7xl'>
          Unknown Explorer Watch
        </h2>
        <h2 className='text-3xl font-medium mt-2 lg:text-4xl lg:mt-6'>
          Anytime, Anywhere
        </h2>
        <div className='mt-8 text-base space-x-4 lg:space-x-6 lg:mt-16 lg:font-medium'>
          <Link href='/accessories'>
            <a>
              <button
                type='button'
                className='text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:bg-gradient-to-l focus:from-blue-600 focus:to-purple-600 rounded-lg px-4 py-1.5 text-center lg:px-5 lg:py-2'
              >
                Learn more
              </button>
            </a>
          </Link>
          <Link href='/accessories'>
            <a>
              <button
                type='button'
                className='text-white bg-gradient-to-br from-purple-500 to-pink-500 hover:bg-gradient-to-bl focus:from-purple-600 focus:to-pink-600 rounded-lg px-4 py-1.5 text-center lg:px-5 lg:py-2'
              >
                Shop now
              </button>
            </a>
          </Link>
        </div>
      </div>
      <div className='relative w-[360px] md:w-[660px] lg:w-[900px] h-full'>
        <Image
          src='/images/hero_watch.png'
          layout='fill'
          objectFit='contain'
          objectPosition='top'
        />
      </div>
    </section>
  );
}
