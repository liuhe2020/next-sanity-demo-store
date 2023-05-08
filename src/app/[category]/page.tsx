import { Metadata } from 'next';
import client from '@/utils/client';
import ProductCard from './ProductCard';

export async function generateStaticParams() {
  const categories: Category[] = await client.fetch(`*[_type == "category"]`);

  return categories.map((category) => ({
    category: category.slug.current,
  }));
}

export function generateMetadata({ params }: { params: { category: string } }): Metadata {
  const title = `${params.category.charAt(0).toUpperCase()}${params.category.slice(1)}`; // capitalize title

  return {
    title: `DS | ${title}`,
    description: `${title} products category page for Next Sanity Demo Store`,
  };
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const products: Product[] = await client.fetch(`*[category == '${params.category}']`);

  return (
    <section className='pt-16'>
      <div className='max-w-screen-lg grid grid-cols-1 gap-4 p-4 mx-auto min-[550px]:grid-cols-2 min-[550px]:gap-2.5 lg:grid-cols-3'>
        {products.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </section>
  );
}
