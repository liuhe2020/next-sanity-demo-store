import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useStore } from '../store/store';
import urlFor from '../utils/image';

export default function ShoppingBagItem({ item }) {
  // quantity local state for component level change and then update to store state
  const [quantity, setQuantity] = useState(item.quantity);
  const updateQuantity = useStore((state) => state.updateQuantity);

  console.log(item);

  const handleOnChange = (e) => {
    // convert input string to number and limit to 2 chars
    const value = parseFloat(e.target.value.slice(0, 2));
    // limit max quantity per item to 99
    if (value > 99) setQuantity(99);
    setQuantity(value);
  };

  const handleIncrement = () => {
    if (quantity < 99) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    setQuantity((prev) => prev - 1);
  };

  useEffect(() => {
    updateQuantity(item, quantity);
  }, [quantity]);

  return (
    <div className='w-full flex items-center mt-4'>
      <div className='flex flex-1 items-center mr-10'>
        <div className='relative flex justify-center w-[100px] h-[100px] sm:w-[150px] sm:h-[150px]'>
          <Image
            src={urlFor(item.images[0]).url()}
            alt=''
            layout='fill'
            objectFit='contain'
            objectPosition='center'
          />
        </div>
        <h3 className='flex-1'>{item.name}</h3>
      </div>
      <div className='flex flex-col items-end'>
        <div className='flex mb-3 mt-3'>
          <svg
            onClick={handleDecrement}
            className='fill-current text-stone-600 w-3 cursor-pointer hover:text-black'
            viewBox='0 0 448 512'
          >
            <path d='M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z' />
          </svg>
          <input
            className='mx-2 border text-center w-8'
            type='number'
            onChange={handleOnChange}
            value={quantity}
          />
          <svg
            onClick={handleIncrement}
            className='fill-current text-stone-600 w-3 cursor-pointer hover:text-black'
            viewBox='0 0 448 512'
          >
            <path d='M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z' />
          </svg>
        </div>
        <span className='font-medium text-sm'>£{item.price.toFixed(2)}</span>
      </div>
    </div>
  );
}
