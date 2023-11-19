import { client } from '@/utils/client';
import ProductCard from './ProductCard';

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
  const products: Product[] = await client.fetch(`*[category == '${params.category}']{..., 'images':images[]{...,'url':asset->url}}`);

  const productsSorted = () => {
    if (searchParams && searchParams.sort) {
      switch (searchParams.sort) {
        case 'name_asc':
          return products.slice().sort((a, b) => a.name.localeCompare(b.name));
        case 'name_desc':
          return products.slice().sort((a, b) => b.name.localeCompare(a.name));
        case 'price_asc':
          return products.slice().sort((a, b) => a.price - b.price);
        case 'price_desc':
          return products.slice().sort((a, b) => b.price - a.price);
        default:
          return products;
      }
    }
    return products;
  };

  return (
    <div className='grid grid-cols-1 gap-4 mx-auto xs:grid-cols-2 xs:gap-2.5 lg:grid-cols-3'>
      {productsSorted().map((product) => (
        <ProductCard product={product} key={product._id} />
      ))}
    </div>
  );
}
