'use client';
import useStore from '@/store/store';
import toast from 'react-hot-toast';

export default function AddToBag({ product }: { product: Product }) {
  const addToBag = useStore((state) => state.addToBag);

  const handleAddToBag = () => {
    addToBag(product);
    toast(`Added ${product.name} to the bag`);
  };

  return (
    <button
      onClick={handleAddToBag}
      className='w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
    >
      Add to bag
    </button>
  );
}
