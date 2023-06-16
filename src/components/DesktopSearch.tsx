import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, stagger, useAnimate } from 'framer-motion';
import classNames from '@/utils/classNames';

type Props = {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  isSearchToggled: boolean;
  results: Product[] | undefined;
  setIsSearchToggled: Dispatch<SetStateAction<boolean>>;
};

const ease = [[0.4, 0, 0.6, 1]];

export default function DesktopSearch({ searchTerm, setSearchTerm, isSearchToggled, results, setIsSearchToggled }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    // <div className={classNames(isSearchToggled && 'max-h-fit', 'overflow-hidden max-h-0 w-full z-10 text-white transition-all duration-500 hidden md:block')}>
    <motion.div
      className='w-full z-10 text-white hidden md:block'
      animate={{ height: isSearchToggled ? '100dvh' : 0, overflow: isSearchToggled ? 'auto' : 'hidden' }}
      transition={{ duration: 0.5, ease }}
    >
      <motion.div
        className='mx-auto max-w-[440px] py-4 flex items-center gap-2'
        animate={{ y: isSearchToggled ? 0 : -20, opacity: isSearchToggled ? 1 : 0 }}
        transition={{ duration: 0.2, delay: isSearchToggled ? 0.3 : 0, ease }}
      >
        <svg className='hover:fill-white cursor-pointer shrink-0' fill='#d6d3d1' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
          <path d='M21.172 24l-7.387-7.387c-1.388.874-3.024 1.387-4.785 1.387-4.971 0-9-4.029-9-9s4.029-9 9-9 9 4.029 9 9c0 1.761-.514 3.398-1.387 4.785l7.387 7.387-2.828 2.828zm-12.172-8c3.859 0 7-3.14 7-7s-3.141-7-7-7-7 3.14-7 7 3.141 7 7 7z' />
        </svg>
        <input
          type='text'
          className='grow bg-transparent border-none text-white text-xl font-medium focus:ring-0'
          ref={inputRef}
          placeholder='Search products'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <svg
            onClick={() => setSearchTerm('')}
            className='hover:fill-white cursor-pointer shrink-0'
            fill='#d6d3d1'
            width='24'
            height='24'
            clipRule='evenodd'
            fillRule='evenodd'
            strokeLinejoin='round'
            strokeMiterlimit='2'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 8.933-2.721-2.722c-.146-.146-.339-.219-.531-.219-.404 0-.75.324-.75.749 0 .193.073.384.219.531l2.722 2.722-2.728 2.728c-.147.147-.22.34-.22.531 0 .427.35.75.751.75.192 0 .384-.073.53-.219l2.728-2.728 2.729 2.728c.146.146.338.219.53.219.401 0 .75-.323.75-.75 0-.191-.073-.384-.22-.531l-2.727-2.728 2.717-2.717c.146-.147.219-.338.219-.531 0-.425-.346-.75-.75-.75-.192 0-.385.073-.531.22z'
              fillRule='nonzero'
            />
          </svg>
        )}
      </motion.div>
    </motion.div>
  );
}
