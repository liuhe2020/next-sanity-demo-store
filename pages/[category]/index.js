import Head from 'next/head';
import ProductCard from '../../components/ProductCard';
import mySanityClient from '../../utils/client';

export default function index({ products, category }) {
  return (
    <>
      <Head>
        <title>{`DS | ${category[0].toUpperCase()}${category
          .slice(1)
          .toLowerCase()}`}</title>
        <link rel='shortcut icon' href='/images/favicon.ico' />
      </Head>
      <section className='pt-16'>
        <div className='max-w-screen-lg grid grid-cols-1 gap-4 p-4 mx-auto min-[550px]:grid-cols-2 min-[550px]:gap-2.5 lg:grid-cols-3'>
          {products.map((product, index) => (
            <ProductCard product={product} key={index} />
          ))}
        </div>
      </section>
    </>
  );
}

export async function getStaticPaths() {
  const categories = await mySanityClient.fetch(`*[_type == "category"]`);

  const paths = categories.map((category) => ({
    params: { category: category.slug.current },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // // alternative method if product schema does not have a string category field other than the category ref field
  // // fetch the category with name/slug matching to params from getStaticPaths
  // const categoryArray = await mySanityClient.fetch(
  //   `*[slug.current == '${params.categorySlug}' ]`
  // );

  // // fetch returns an array with only one matching category object
  // const category = categoryArray[0];

  // // use the category id(reference) to query all product with that reference/category
  // const products = await mySanityClient.fetch(
  //   `*[_type == 'product' && references('${category._id}')]`
  // );

  const category = params.category;

  const products = await mySanityClient.fetch(`*[category == '${category}']`);

  return {
    props: { products, category },
  };
}
