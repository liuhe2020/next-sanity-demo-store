import Head from 'next/head';
import ImageGallery from 'react-image-gallery';
import mySanityClient from '../../utils/client';
import urlFor from '../../utils/image';
import useStore from '../../store/store';

const classNames = (...classes) => classes.filter(Boolean).join(' ');

export default function Product({ product }) {
  const addToBag = useStore((state) => state.addToBag);
  const images = product.images.map((image) => ({
    original: urlFor(image).url(),
    thumbnail: urlFor(image).url(),
    originalWidth: '800',
    originalHeight: '800',
  }));

  return (
    <>
      <Head>
        <title>{`Next Sanity Demo Store | ${product.name}`}</title>
      </Head>
      <section className='pt-16'>
        <div className='max-w-screen-lg mx-auto flex'>
          <div className=''>
            <h3 className='font-medium text-sm mb-4 lg:text-base lg:mb-8'>
              {product.name}
            </h3>

            <div className='flex space-x-2 text-xs lg:text-sm'>
              <div className='flex relative flex-nowrap space-x-1'>
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

            <ul className=''>
              {product.description.map((el, index) => (
                <li className='flex mb-1 lg:mb-2' key={index}>
                  <svg
                    className='mr-2 mt-1'
                    xmlns='http://www.w3.org/2000/svg'
                    width='10'
                    height='10'
                    viewBox='0 0 24 24'
                  >
                    <path d='M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 6c-3.313 0-6 2.687-6 6s2.687 6 6 6c3.314 0 6-2.687 6-6s-2.686-6-6-6z' />
                  </svg>
                  <p className='flex-1 text-xs lg:text-sm'>{el}</p>
                </li>
              ))}
            </ul>
            <p className='text-medium mt-4 lg:text-base lg:mt-6'>
              £{product.price.toFixed(2)}
            </p>
          </div>
          <div className=''>
            <ImageGallery
              items={images}
              showNav={false}
              showFullscreenButton={false}
              useBrowserFullscreen={false}
              showPlayButton={false}
            />
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
