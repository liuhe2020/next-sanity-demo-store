import Head from 'next/head';
import { Tab } from '@headlessui/react';
import mySanityClient from '../../utils/client';
import urlFor from '../../utils/image';
import { useStore } from '../../store/store';

const classNames = (...classes) => classes.filter(Boolean).join(' ');

export default function Product({ product }) {
  const addToCart = useStore((state) => state.addTocart);

  return (
    <>
      <Head>
        <title>{`Next Sanity Demo Store | ${product.name}`}</title>
      </Head>
      <div className='max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8'>
        {/* Product details */}
        <div className='lg:max-w-lg lg:self-end'>
          <div className='mt-4'>
            <h1 className='text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
              {product.name}
            </h1>
          </div>

          <section aria-labelledby='information-heading' className='mt-4'>
            <h2 id='information-heading' className='sr-only'>
              Product information
            </h2>

            <div className='flex items-center'>
              <p className='text-lg text-gray-900 sm:text-xl'>
                {product.price}
              </p>

              <div className='ml-4 pl-4 border-l border-gray-300'>
                <h2 className='sr-only'>Reviews</h2>
                <div className='flex items-center'>
                  <div>
                    <div className='flex items-center'>
                      {/* {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            reviews.average > rating
                              ? 'text-yellow-400'
                              : 'text-gray-300',
                            'h-5 w-5 flex-shrink-0'
                          )}
                          aria-hidden='true'
                        />
                      ))} */}
                    </div>
                    <p className='sr-only'>{product.review} out of 5 stars</p>
                  </div>
                  <p className='ml-2 text-sm text-gray-500'>
                    {product.numReviews} reviews
                  </p>
                </div>
              </div>
            </div>

            <div className='mt-4 space-y-6'>
              <p className='text-base text-gray-500'>{product.description}</p>
            </div>

            <div className='mt-6 flex items-center'>
              {/* <CheckIcon
                className='flex-shrink-0 w-5 h-5 text-green-500'
                aria-hidden='true'
              /> */}
              <p className='ml-2 text-sm text-gray-500'>
                In stock and ready to ship
              </p>
            </div>
          </section>
        </div>

        {/* Image gallery */}
        <Tab.Group as='div' className='flex flex-col-reverse'>
          {/* Image selector */}
          <div className='hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none'>
            <Tab.List className='grid grid-cols-4 gap-6'>
              {product.images.map((image, index) => (
                <Tab
                  key={index}
                  className='relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50'
                >
                  {({ selected }) => (
                    <>
                      {/* <span className='sr-only'>{image.name}</span> */}
                      <span className='absolute inset-0 rounded-md overflow-hidden'>
                        <img
                          src={urlFor(product.images[0]).url()}
                          alt=''
                          className='w-full h-full object-center object-cover'
                        />
                      </span>
                      <span
                        className={classNames(
                          selected ? 'ring-indigo-500' : 'ring-transparent',
                          'absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none'
                        )}
                        aria-hidden='true'
                      />
                    </>
                  )}
                </Tab>
              ))}
            </Tab.List>
          </div>

          <Tab.Panels className='w-full aspect-w-1 aspect-h-1'>
            {product.images.map((image, index) => (
              <Tab.Panel key={index}>
                <img
                  src={urlFor(product.images[0]).url()}
                  alt=''
                  className='w-full h-full object-center object-cover sm:rounded-lg'
                />
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>

        {/* Product form */}
        <div className='mt-10 lg:max-w-lg lg:col-start-1 lg:row-start-2 lg:self-start'>
          <section aria-labelledby='options-heading'>
            <div className='mt-10'>
              <button
                onClick={() => addToCart(product)}
                className='w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500'
              >
                Add to bag
              </button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const products = await mySanityClient.fetch(`*[_type == "product"]`);

  const paths = products.map((product) => ({
    params: {
      categorySlug: product.category,
      productSlug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // fetch the product with matching slug
  const productArray = await mySanityClient.fetch(
    `*[slug.current == '${params.productSlug}']`
  );

  const product = productArray[0];

  return {
    props: { product },
  };
}
