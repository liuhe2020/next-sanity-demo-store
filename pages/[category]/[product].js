import Head from 'next/head';
import Link from 'next/link';
import ImageGallery from 'react-image-gallery';
import mySanityClient from '../../utils/client';
import urlFor from '../../utils/image';
import useStore from '../../store/store';
import toast from 'react-hot-toast';

export default function Product({ product }) {
  const addToBag = useStore((state) => state.addToBag);
  const images = product.images.map((image) => ({
    original: urlFor(image).url(),
    thumbnail: urlFor(image).url(),
    originalWidth: '800',
    originalHeight: '800',
  }));

  const handleAddToBag = () => {
    addToBag(product);
    toast(`Added ${product.name} to the bag`);
  };

  return (
    <>
      <Head>
        <title>{`DS | ${product.name}`}</title>
        <link rel='shortcut icon' href='/images/favicon.ico' />
      </Head>
      <section className='pt-16'>
        <div className='max-w-screen-lg py-4 px-4 space-y-12 lg:space-y-0 lg:flex lg:mx-auto lg:space-x-6 lg:p-10'>
          <div className='flex-1 max-w-xl mx-auto'>
            <ImageGallery
              items={images}
              showNav={false}
              showFullscreenButton={false}
              useBrowserFullscreen={false}
              showPlayButton={false}
            />
          </div>

          <div className='flex-1 max-w-xl mx-auto'>
            <div className='w-full h-full flex flex-col lg:pt-[9%] lg:pl-[10%]'>
              <h3 className='font-medium text-xl mb-1 min-[400px]:max-[1023px]:mx-4 lg:text-2xl lg:mb-2'>
                {product.name}
              </h3>

              <div className='flex space-x-2 mb-8 text-xs min-[400px]:max-[1023px]:mx-4 lg:text-sm lg:mb-10'>
                <div
                  className='flex relative flex-nowrap space-x-1'
                  title={product.rating}
                >
                  {[1, 2, 3, 4, 5].map((el) => (
                    <svg
                      key={el}
                      className='text-yellow-400 h-[18px] w-[18px]'
                      fill='currentColor'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='2.57 2.24 14.87 14.24'
                    >
                      <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
                    </svg>
                  ))}
                  <div
                    style={{ width: `${(1 - product.rating / 5) * 100}%` }}
                    className='absolute top-0 right-0 h-full bg-white mix-blend-color'
                  ></div>
                </div>
                <span className=''>{`(${product.numReviews})`}</span>
              </div>

              <ul className='min-[400px]:max-[1023px]:mx-4'>
                {product.description.map((el, index) => (
                  <li className='flex mb-1 lg:mb-2' key={index}>
                    <svg
                      className='mr-2 mt-1.5'
                      xmlns='http://www.w3.org/2000/svg'
                      width='10'
                      height='10'
                      viewBox='0 0 24 24'
                    >
                      <path d='M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 6c-3.313 0-6 2.687-6 6s2.687 6 6 6c3.314 0 6-2.687 6-6s-2.686-6-6-6z' />
                    </svg>
                    <p className='flex-1 text-base'>{el}</p>
                  </li>
                ))}
              </ul>

              <p className='text-xl font-medium mt-8 min-[400px]:max-[1023px]:mx-4 lg:text-2xl lg:mt-10'>
                ??{product.price.toFixed(2)}
              </p>

              <div className='mt-8 space-y-3 min-[450px]:flex min-[450px]:space-y-0 min-[450px]:space-x-3 lg:mt-10'>
                <button
                  onClick={handleAddToBag}
                  className='w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  Add to bag
                </button>
                <Link href='/checkout'>
                  <a className='w-full inline-flex justify-center py-2.5 px-4 border border-stone-300 rounded-md shadow-sm bg-white text-base font-medium text-stone-500 hover:bg-stone-100'>
                    Go to checkout
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticPaths() {
  const products = await mySanityClient.fetch(`*[_type == "product"]`);

  const paths = products.map((product) => ({
    params: {
      category: product.category,
      product: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // fetch the product with matching slug
  const product = await mySanityClient.fetch(
    `*[slug.current == '${params.product}'][0]`
  );

  return {
    props: { product },
  };
}
