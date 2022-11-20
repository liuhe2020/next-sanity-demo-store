import Head from 'next/head';
import ImageGallery from 'react-image-gallery';
import mySanityClient from '../../utils/client';
import urlFor from '../../utils/image';
import useStore from '../../store/store';
import Image from 'next/image';

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
        <div className='max-w-screen-lg flex'>
          <ImageGallery
            items={images}
            showNav={false}
            showFullscreenButton={false}
            useBrowserFullscreen={false}
            showPlayButton={false}
          />
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
