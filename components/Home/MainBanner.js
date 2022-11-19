import Image from 'next/image';
import Link from 'next/link';

export default function MainBanner() {
  return (
    <section className='pt-16 bg-black text-white w-full h-[530px] flex flex-col items-center overflow-hidden md:h-[750px] lg:h-[1000px]'>
      <div className='flex flex-col justify-center items-center my-16 md:my-24'>
        <h2 className='text-4xl font-semibold md:text-5xl lg:text-7xl'>
          Beast Mode
        </h2>
        <h2 className='text-3xl font-medium mt-2 lg:text-4xl lg:mt-6'>
          Productivity
        </h2>
        <div className='mt-8 text-base lg:mt-16 lg:font-medium'>
          <Link href='/laptops'>
            <a>
              <button
                type='button'
                className='text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:from-purple-600 focus:to-pink-600 rounded-lg px-4 py-1.5 text-center lg:px-5 lg:py-2'
              >
                Learn more
              </button>
            </a>
          </Link>
          <Link href='/laptops'>
            <a>
              <button
                type='button'
                className='text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:from-pink-600 focus:to-orange-500 rounded-lg px-4 py-1.5 text-center ml-4 lg:ml-6 lg:px-5 lg:py-2'
              >
                Shop now
              </button>
            </a>
          </Link>
        </div>
      </div>
      {/* <div className="relative bg-[url('/images/background/main_banner_bg.jpg')] bg-contain bg-no-repeat mx-auto w-[375px] md:w-[600px] h-full"></div> */}
      <div className='relative w-[500px] md:w-[1280px] h-full'>
        <Image
          src='/images/main_banner.jpg'
          layout='fill'
          objectFit='contain'
          objectPosition='top'
        />
      </div>
    </section>
  );
}
