// require @tailwindcss/aspect-ratio for next Image to fill container responsively without setting width & height
import urlFor from '@/utils/image';
import Image from 'next/image';
import Link from 'next/link';

const bgCSS =
  'before:w-full before:h-full before:bg-stone-100 before:absolute before:bottom-0 before:left-0 before:-z-10 before:transition-all before:duration-500 before:ease-[in-out] hover:before:bg-stone-200';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/${product.category}/${product.slug.current}`}>
      <div className={`${bgCSS} relative cursor-pointer overflow-hidden rounded-2xl flex flex-col items-center px-[10%] pb-[10%] lg:p-10 h-full`}>
        <Image className='object-contain object-center' src={urlFor(product.images[0]).url()} alt={product.name} width='420' height='420' />
        <div className='flex flex-col justify-between h-full'>
          <h3 className='font-medium text-base mb-4 min-[400px]:max-[549px]:text-xl md:text-lg lg:mb-8'>{product.name}</h3>
          <ul className=''>
            {product.description.map((el, index) => (
              <li className='flex mb-1 lg:mb-2' key={index}>
                <svg className='mr-2 mt-1.5' xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24'>
                  <path d='M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 6c-3.313 0-6 2.687-6 6s2.687 6 6 6c3.314 0 6-2.687 6-6s-2.686-6-6-6z' />
                </svg>
                <p className='flex-1 text-sm min-[400px]:text-base lg:text-sm'>{el}</p>
              </li>
            ))}
          </ul>
          <p className='font-medium mt-4 min-[400px]:max-[549px]:text-xl md:text-lg lg:text-base lg:mt-6'>£{product.price.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  );
}
