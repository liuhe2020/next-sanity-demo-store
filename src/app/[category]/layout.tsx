import { type ReactNode } from 'react';
import Sort from './Sort';

export function generateMetadata({ params }: { params: { category: string } }) {
  const title = `${params.category.charAt(0).toUpperCase()}${params.category.slice(1)}`;

  return {
    title: `DS | ${title}`,
    description: `${title} products category page for Next Sanity Demo Store`,
  };
}

export default function CategoryLayout({ children }: { children: ReactNode }) {
  return (
    <section className='max-w-screen-lg pt-4 px-4 space-y-4 mx-auto md:pt-10'>
      <Sort />
      {children}
    </section>
  );
}
