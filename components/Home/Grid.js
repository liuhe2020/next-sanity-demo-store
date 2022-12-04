import Image from 'next/image';
import Link from 'next/link';

const data = [
  {
    title: 'Milkyway Tab X',
    subtitle: 'Imagination beyond galaxies',
    url: '/images/grid_tablet.png',
    bg: '',
  },
  {
    title: 'Buds Gen X',
    subtitle: 'Big sound in small bodies',
    url: '/images/grid_buds.png',
    bg: '',
  },
  {
    title: 'Soho Blast',
    subtitle: 'This is where the party is at',
    url: '/images/grid_speakers.png',
    bg: '',
  },
  {
    title: 'Rapid Wireless Charger',
    subtitle: 'Unleash the ultimate power',
    url: '/images/grid_charger.png',
    bg: '',
  },
];

function Grid() {
  return (
    <div className='w-full grid overflow-hidden grid-cols-1 grid-rows-4 gap-2'>
      {data.map((i) => (
        <div
          key={i.title}
          className='bg-stone-300 flex flex-col justify-between items-center h-[530px]'
        >
          <div className='flex flex-col justify-center items-center text-center my-16 md:my-24'>
            <h2 className='text-3xl font-semibold md:text-4xl lg:text-5xl'>
              {i.title}
            </h2>
            <h3 className='text-xl font-medium mt-4 md:text-2xl lg:text-3xl lg:mt-6'>
              {i.subtitle}
            </h3>
            <div className='mt-8 text-base space-x-4 lg:space-x-6 lg:mt-16 lg:font-medium'>
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
                    className='text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:from-pink-600 focus:to-orange-500 rounded-lg px-4 py-1.5 text-center lg:px-5 lg:py-2'
                  >
                    Shop now
                  </button>
                </a>
              </Link>
            </div>
          </div>
          <div className='relative mx-auto w-[250px] h-[250px]'>
            <Image src={i.url} layout='fill' objectFit='contain' />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Grid;
