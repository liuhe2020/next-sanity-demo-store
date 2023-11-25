import { sanityClient } from '@/utils/client';
import Products from './products';
import Skeleton from './skeleton';
import { Suspense } from 'react';
import Await from '@/utils/await';
import Sort from './sort';
import { notFound } from 'next/navigation';

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const categories: Category[] = await sanityClient.fetch(`*[_type == "category"]`);
  const hasParam = categories.find((c) => c.slug.current === params.category);

  if (!hasParam) return notFound();

  const promise: Promise<Product[]> = sanityClient.fetch(`*[category == '${params.category}']{..., 'images':images[]{...,'url':asset->url}}`);

  return (
    <section className='max-w-screen-lg pt-4 px-4 space-y-4 mx-auto md:pt-10' key={searchParams.sort as string}>
      <Sort />
      <Suspense fallback={<Skeleton />}>
        <Await promise={promise}>{(products) => <Products products={products} searchParams={searchParams} />}</Await>
      </Suspense>
    </section>
  );
}
