import Head from 'next/head';
import ProductCard from '../../components/ProductCard';
import mySanityClient from '../../utils/client';

export default function index({ products, category }) {
  return (
    <>
      <Head>
        <title>{`Next Sanity Demo Store | ${category.name}`}</title>
      </Head>
      <div className='max-w-screen-lg grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-3 lg:gap-2.5 p-2 mx-auto my-12'>
        {products.map((product, index) => (
          <ProductCard product={product} key={index} />
        ))}
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const categories = await mySanityClient.fetch(`*[_type == "category"]`);

  const paths = categories.map((category) => ({
    params: { categorySlug: category.slug.current },
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

  const category = params.categorySlug;

  const products = await mySanityClient.fetch(`*[category == '${category}']`);

  return {
    props: { products, category },
  };
}
