import Image from 'next/image';
import Link from 'next/link';

const bgCSS =
  'before:w-full before:h-full before:bg-stone-50 before:absolute before:bottom-0 before:left-0 before:-z-10 before:transition-all before:duration-200 before:ease-[in-out] hover:before:bg-stone-100';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/${product.category}/${product.slug.current}`}>
      <div className={`${bgCSS} relative cursor-pointer overflow-hidden rounded-2xl flex flex-col items-center px-[10%] pb-[10%] lg:p-10 h-full`}>
        <Image className='object-contain object-center' src={product.images[0].url} alt={product.name} width={420} height={420} />
        <div className='flex flex-col h-full gap-4 lg:gap-6'>
          <h3 className='font-medium text-center text-base min-[400px]:max-[549px]:text-xl md:text-lg'>{product.name}</h3>
          <p className='mt-auto text-center min-[400px]:max-[549px]:text-xl md:text-lg lg:text-base'>£{product.price.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  );
}
