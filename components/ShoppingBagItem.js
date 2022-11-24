import { useState } from 'react';
import Image from 'next/image';
import useStore from '../store/store';
import urlFor from '../utils/image';

export default function ShoppingBagItem({ item }) {
  // quantity local state for component level change and then update to store state
  const [quantity, setQuantity] = useState(item.quantity);
  const { addToBag, reduceFromBag, updateQuantity } = useStore();

  const handleOnChange = (e) => {
    // e.target.value is type string, need to work with numbers, but react can't parse NaN hence setQuantity to empty string to stop error
    if (e.target.value === '') return setQuantity('');
    // convert input string to number and limit to 2 chars
    const value = parseFloat(e.target.value.slice(0, 2));
    // limit max quantity per item to 99
    if (value > 99) return setQuantity(99);
    setQuantity(value);
  };

  const handleOnBlur = (e) => {
    // show previous quantity if there isn't a number in the input field
    if (e.target.value === '') return setQuantity(item.quantity);
    updateQuantity(item, quantity);
  };

  const handleIncrement = async () => {
    if (quantity < 99) {
      setQuantity((prev) => prev + 1);
      addToBag(item);
    }
  };

  const handleDecrement = () => {
    setQuantity((prev) => prev - 1);
    reduceFromBag(item);
  };

  return (
    <div className='w-full py-6 grid grid-cols-2 grid-rows-3 min-[450px]:grid-cols-4 min-[450px]:grid-rows-2'>
      <h3 className='text-base col-span-2 self-center min-[450px]:row-span-2 min-[450px]:justify-self-start'>
        {item.name}
      </h3>

      <div className='row-span-2 relative flex justify-center w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] min-[450px]:col-span-1 min-[450px]:row-start-1'>
        <Image
          src={urlFor(item.images[0]).url()}
          alt=''
          layout='fill'
          objectFit='contain'
          objectPosition='center'
        />
      </div>

      <div className='flex place-self-end'>
        <svg
          onClick={handleDecrement}
          className='fill-current text-stone-600 w-3 cursor-pointer hover:text-black'
          viewBox='0 0 448 512'
        >
          <path d='M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z' />
        </svg>
        <input
          className='mx-2 border border-stone-600 text-center w-8 p-0 rounded'
          type='number'
          onBlur={handleOnBlur}
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

      <span className='font-medium text-sm text-right self-center'>
        £{(item.price * item.quantity).toFixed(2)}
      </span>
    </div>
  );
}
