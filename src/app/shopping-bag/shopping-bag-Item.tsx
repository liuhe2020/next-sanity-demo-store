'use client';

import { useState, type ChangeEvent, type FocusEvent } from 'react';
import Image from 'next/image';
import useShoppingBagStore from '@/store/shopping-bag-store';

export default function ShoppingBagItem({ item }: { item: ShoppingBagItem }) {
  // quantity local state for component level change and then update to store state
  const [quantity, setQuantity] = useState<number | string>(item.quantity);
  const { addToBag, reduceFromBag, updateQuantity } = useShoppingBagStore();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    // e.target.value is type string when there is no input
    if (e.target.value === '') return setQuantity('');
    // convert input string to number and limit to 2 chars
    const value = parseFloat(e.target.value.slice(0, 2));
    // limit max quantity per item to 99
    if (value > 99) return setQuantity(99);
    setQuantity(value);
  };

  const handleOnBlur = (e: FocusEvent<HTMLInputElement>) => {
    // show previous quantity if there isn't a number in the input field
    if (e.target.value === '') return setQuantity(item.quantity);
    updateQuantity(item, parseInt(String(quantity))); // parseInt accepts string only hence the conversion
  };

  const handleIncrement = async () => {
    if (parseInt(String(quantity)) < 99) {
      setQuantity((prev) => parseInt(String(prev)) + 1);
      addToBag(item);
    }
  };

  const handleDecrement = () => {
    setQuantity((prev) => parseInt(String(prev)) - 1);
    reduceFromBag(item);
  };

  return (
    <div className='w-full py-6 grid grid-cols-2 grid-rows-3 min-[450px]:grid-cols-4 min-[450px]:grid-rows-2'>
      <h3 className='text-base font-medium text-stone-900 col-span-2 self-center min-[450px]:row-span-2 min-[450px]:justify-self-start'>{item.name}</h3>
      <Image
        className='object-contain object-center row-span-2 w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] min-[450px]:col-span-1 min-[450px]:row-start-1'
        src={item.image.url}
        alt={item.name}
        width='150'
        height='150'
      />
      <div className='flex place-self-end'>
        <svg onClick={handleDecrement} className='fill-current text-stone-600 w-3 cursor-pointer hover:text-stone-900' viewBox='0 0 448 512'>
          <path d='M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z' />
        </svg>
        <input
          className='mx-2 border border-stone-600 text-center w-8 p-0 rounded'
          type='number'
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          value={quantity}
        />
        <svg onClick={handleIncrement} className='fill-current text-stone-600 w-3 cursor-pointer hover:text-stone-900' viewBox='0 0 448 512'>
          <path d='M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z' />
        </svg>
      </div>

      <span className='font-medium text-sm text-stone-900 text-right self-center'>£{(item.price * item.quantity).toFixed(2)}</span>
    </div>
  );
}
