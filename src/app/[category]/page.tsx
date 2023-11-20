import { client } from '@/utils/client';
import Products from './products';
import Skeleton from './skeleton';
import { Suspense } from 'react';
import Await from '@/utils/await';
import Sort from './sort';

export function generateMetadata({ params }: { params: { category: string } }) {
  const title = `${params.category.charAt(0).toUpperCase()}${params.category.slice(1)}`;

  return {
    title: `DS | ${title}`,
    description: `${title} products category page for Next Sanity Demo Store`,
  };
}

export async function generateStaticParams() {
  const categories: Category[] = await client.fetch(`*[_type == "category"]`);

  return categories.map((category) => ({
    category: category.slug.current,
  }));
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const promise: Promise<Product[]> = client.fetch(`*[category == '${params.category}']{..., 'images':images[]{...,'url':asset->url}}`);

  return (
    <section className='max-w-screen-lg pt-4 px-4 space-y-4 mx-auto md:pt-10' key={searchParams.sort as string}>
      <Sort />
      <Suspense fallback={<Skeleton />}>
        <Await promise={promise}>{(products) => <Products products={products} searchParams={searchParams} />}</Await>
      </Suspense>
    </section>
  );
}
