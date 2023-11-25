import { sanityClient } from '@/utils/client';
import { ReactNode } from 'react';

export async function generateStaticParams({ params }: { params: { category: string } }) {
  const products: Product[] = await sanityClient.fetch(`*[_type == 'product' && category == '${params.category}']`);

  return products.map((product) => ({
    product: product.slug.current,
  }));
}

export async function generateMetadata({ params }: { params: { product: string } }) {
  const product: Product | null = await sanityClient.fetch(`*[_type == 'product' && slug.current == '${params.product}'][0]`);

  const title = product
    ? `${params.product
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')}`
    : 'Page not found';

  return {
    title: `DS | ${title}`,
    description: `${title} product detail page for Next Sanity Demo Store`,
  };
}

export default function ProductLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
