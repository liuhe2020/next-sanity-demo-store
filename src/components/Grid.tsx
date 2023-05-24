import Image from 'next/image';
import Link from 'next/link';

const data = [
  {
    title: 'Buds Gen X',
    subtitle: 'Big sound in small body',
    url: '/images/grid_buds.png',
    bgColor: 'bg-stone-50',
    slug: '/audios/unknown-buds-gen-x',
  },
  {
    title: 'Milkyway Tab X',
    subtitle: 'Imagination beyond galaxies',
    url: '/images/grid_tablet.png',
    bgColor: 'bg-sky-50',
    slug: '/',
  },
  {
    title: 'Soho Blast',
    subtitle: 'This is where the party is at',
    url: '/images/grid_speakers.png',
    bgColor: 'bg-orange-50',
    slug: '/',
  },
  {
    title: 'Rapid Charger',
    subtitle: 'Unleash the ultimate power',
    url: '/images/grid_charger.png',
    bgColor: 'bg-stone-50',
    slug: '/accessories/unknown-rapid-wireless-charger',
  },
];

export default function Grid() {
  return (
    <section className='max-w-[2560px] mx-auto grid overflow-hidden grid-cols-1 grid-rows-4 md:gap-3 md:grid-cols-2 md:grid-rows-2 md:py-3'>
      {data.map((i) => (
        <div key={i.title} className={`${i.bgColor} 'flex flex-col justify-between items-center'`}>
          <div className='flex flex-col justify-center items-center text-center mt-16 mb-12 md:mb-20'>
            <h2 className='text-3xl font-semibold md:text-4xl lg:text-5xl'>{i.title}</h2>
            <h3 className='text-xl font-medium mt-4 md:text-2xl lg:text-3xl lg:mt-6'>{i.subtitle}</h3>
            <div className='mt-8 text-lg font-semibold text-indigo-700 space-x-6 lg:text-xl'>
              <Link
                href={i.slug}
                className='hover:text-indigo-400 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500'
              >
                Learn more
              </Link>
              <Link
                href={i.slug}
                className='hover:text-indigo-400 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500'
              >
                Shop now
              </Link>
            </div>
          </div>
          <Image className='mx-auto w-[260px] h-[260px] xl:w-[330px] xl:h-[330px]' src={i.url} alt={i.title} width={330} height={330} />
        </div>
      ))}
    </section>
  );
}
