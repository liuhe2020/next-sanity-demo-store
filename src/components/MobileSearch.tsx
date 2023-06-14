import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, stagger, useAnimate } from 'framer-motion';

type Props = {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  isSearchToggled: boolean;
  results: Product[] | undefined;
  setIsSearchToggled: Dispatch<SetStateAction<boolean>>;
};

const ease = [[0.4, 0, 0.6, 1]];

export default function MobileSearch({ searchTerm, setSearchTerm, isSearchToggled, results, setIsSearchToggled }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [scope, animate] = useAnimate();

  // focus on input when search toggled
  useEffect(() => {
    isSearchToggled && inputRef.current && inputRef.current.focus();

    // search toggle animation
    results &&
      animate('li', isSearchToggled ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }, {
        duration: 0.2,
        delay: isSearchToggled ? stagger(0.01, { startDelay: 0.3 }) : 0,
      });
  }, [isSearchToggled]);

  // search results change animation
  // useEffect(() => {
  //   results && animate(scope.current, { opacity: 1 }, { duration: 4 });
  // }, [results]);

  return (
    <motion.div
      layout
      className='absolute w-full top-0 bg-black overflow-hidden md:hidden'
      initial={{ height: 0 }}
      animate={{ height: isSearchToggled ? '100dvh' : 0 }}
      transition={{ duration: 0.5, ease }}
    >
      <motion.div
        className='flex px-2 py-6 items-center gap-2 mt-16'
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: isSearchToggled ? 0 : -20, opacity: isSearchToggled ? 1 : 0 }}
        transition={{ duration: 0.2, delay: isSearchToggled ? 0.3 : 0, ease }}
      >
        <input
          type='text'
          className='grow bg-transparent border-none text-white text-xl font-semibold focus:ring-0'
          ref={inputRef}
          placeholder='Search products'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <svg
            onClick={() => setSearchTerm('')}
            className='hover:fill-white cursor-pointer shrink-0 mr-2'
            fill='#d6d3d1'
            width='24'
            height='24'
            clipRule='evenodd'
            fillRule='evenodd'
            strokeLinejoin='round'
            strokeMiterlimit='2'
            viewBox='0 1 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 8.933-2.721-2.722c-.146-.146-.339-.219-.531-.219-.404 0-.75.324-.75.749 0 .193.073.384.219.531l2.722 2.722-2.728 2.728c-.147.147-.22.34-.22.531 0 .427.35.75.751.75.192 0 .384-.073.53-.219l2.728-2.728 2.729 2.728c.146.146.338.219.53.219.401 0 .75-.323.75-.75 0-.191-.073-.384-.22-.531l-2.727-2.728 2.717-2.717c.146-.147.219-.338.219-.531 0-.425-.346-.75-.75-.75-.192 0-.385.073-.531.22z'
              fillRule='nonzero'
            />
          </svg>
        )}
      </motion.div>
      <ul className='text-stone-300 font-medium flex flex-col gap-y-2 px-4 opacity-0' ref={scope}>
        {results?.map((i) => (
          <li key={i._id}>
            <Link href={`${i.category}/${i.slug.current}`} className='flex items-center gap-x-2' onClick={() => setIsSearchToggled(false)}>
              <svg
                width='16'
                height='16'
                fill='#d6d3d1'
                clipRule='evenodd'
                fillRule='evenodd'
                strokeLinejoin='round'
                strokeMiterlimit='2'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='m14.523 18.787s4.501-4.505 6.255-6.26c.146-.146.219-.338.219-.53s-.073-.383-.219-.53c-1.753-1.754-6.255-6.258-6.255-6.258-.144-.145-.334-.217-.524-.217-.193 0-.385.074-.532.221-.293.292-.295.766-.004 1.056l4.978 4.978h-14.692c-.414 0-.75.336-.75.75s.336.75.75.75h14.692l-4.979 4.979c-.289.289-.286.762.006 1.054.148.148.341.222.533.222.19 0 .378-.072.522-.215z'
                  fillRule='nonzero'
                />
              </svg>
              <span>{i.name}</span>
            </Link>
          </li>
        ))}
        {results?.length === 0 && <p>{`No result matching '${searchTerm}'.`}</p>}
      </ul>
    </motion.div>
  );
}
