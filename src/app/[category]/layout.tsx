import { sanityClient } from '@/utils/client';
import { ReactNode } from 'react';

export function generateMetadata({ params }: { params: { category: string } }) {
  const title = `${params.category.charAt(0).toUpperCase()}${params.category.slice(1)}`;

  return {
    title: `DS | ${title}`,
    description: `${title} products category page for Next Sanity Demo Store`,
  };
}

export async function generateStaticParams() {
  const categories: Category[] = await sanityClient.fetch(`*[_type == "category"]`);

  return categories.map((category) => ({
    category: category.slug.current,
  }));
}

export default function CategoryLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
