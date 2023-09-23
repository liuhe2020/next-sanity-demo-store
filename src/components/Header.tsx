'use client';
// hamburger menu https://github.com/theMosaad/tailwindcss-delicious-hamburgers
import { Fragment, useEffect, useRef, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import useStore from '../store/store';
import classNames from '../utils/classNames';
import Image from 'next/image';
import client from '@/utils/client';
import useDebounce from '@/utils/useDebounce';
import { useQuery } from 'react-query';
import { AnimatePresence, motion } from 'framer-motion';
import useWindowSize from '@/utils/useWindowSize';
import { useNavigationEvent } from '@/utils/useNavigationEvent';

const routes = [
  { name: 'Laptops', href: '/laptops' },
  { name: 'Phones', href: '/phones' },
  { name: 'Tablets', href: '/tablets' },
  { name: 'Audio', href: '/audios' },
  { name: 'Accessories', href: '/accessories' },
];

const ease = [[0.4, 0, 0.6, 1]];

export default function Header() {
  const [isSearchToggled, setIsSearchToggled] = useState(false);
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { data: session } = useSession();
  const inputRef = useRef<HTMLInputElement>(null);
  const totalQty = useStore((state) => state.totalQty);
  const debouncedSearchTerm = useDebounce(searchTerm);
  const windowWidth = useWindowSize();

  const fetcher = async (input: string) => {
    if (!input) return undefined;
    const products: Product[] = await client.fetch(
      `*[_type == 'product' && (name match '*${input}*' || category match '*${input}*' || description match '*${input}*')]`
    );
    return products;
  };

  const { data: results } = useQuery(['search', debouncedSearchTerm], () => fetcher(debouncedSearchTerm), {
    select: (data) => data && [...data?.filter((i) => i.name.includes(debouncedSearchTerm)), ...data?.filter((i) => !i.name.includes(debouncedSearchTerm))],
    staleTime: 1000 * 60 * 60,
  });

  const handleSearchToggle = () => {
    setIsSearchToggled(!isSearchToggled);
    if (isSearchToggled) {
      setIsMenuToggled(false);
      return;
    }
    setIsMenuToggled(true);
  };

  // lock window scroll when mobile menu is open
  // useEffect(() => {
  //   if (isMenuToggled) {
  //     document.querySelector('body')?.classList.add('overflow-y-hidden');
  //   }
  //   return () => {
  //     document.querySelector('body')?.classList.remove('overflow-y-hidden');
  //   };
  // }, [isMenuToggled]);

  // focus on input when search toggled
  useEffect(() => {
    isSearchToggled && inputRef.current && inputRef.current.focus();
  }, [isSearchToggled]);

  // toggle menu and search off on route change
  useNavigationEvent(() => {
    setIsSearchToggled(false);
    setIsMenuToggled(false);
  });

  return (
    <motion.header className='fixed w-full top-0 z-10'>
      {/* nav bar */}
      <nav className={classNames(isMenuToggled ? 'bg-stone-900' : 'bg-black/[.8] backdrop-blur-lg', 'relative transition-all duration-500')}>
        <div className='relative w-full max-w-screen-lg h-16 flex flex-row-reverse gap-x-1 items-center mx-auto px-4 lg:px-2'>
          {/* hamburger menu icon*/}
          <div
            className={classNames(isMenuToggled && 'active', 'c-hamburger c-hamburger--chop', 'mr-0.5 md:hidden')}
            onClick={() => {
              setIsMenuToggled(!isMenuToggled);
              setIsSearchToggled(false);
            }}
          >
            <div className='c-hamburger-inner'>
              <span className='c-hamburger-bar'></span>
              <span className='c-hamburger-bar'></span>
              <span className='c-hamburger-bar'></span>
            </div>
          </div>

          {/* logo */}
          <Link href='/'>
            <Image className='h-7 absolute top-[18px] left-4 opacity-90' src='/images/nsds_logo.png' alt='nsds logo' width={28} height={28} />
          </Link>
          <ul className='hidden absolute left-1/2 -translate-x-1/2 md:flex space-x-8'>
            {routes.map((el, index) => (
              <li key={index} className='text-stone-300 hover:text-white font-medium'>
                <Link href={el.href}>{el.name}</Link>
              </li>
            ))}
          </ul>
          {/* nav icons */}
          <div className='flex gap-x-2 items-end md:-mr-1.5 lg:mr-0'>
            <svg
              className='hover:fill-white cursor-pointer'
              fill='#d6d3d1'
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              onClick={handleSearchToggle}
            >
              <path d='M21.172 24l-7.387-7.387c-1.388.874-3.024 1.387-4.785 1.387-4.971 0-9-4.029-9-9s4.029-9 9-9 9 4.029 9 9c0 1.761-.514 3.398-1.387 4.785l7.387 7.387-2.828 2.828zm-12.172-8c3.859 0 7-3.14 7-7s-3.141-7-7-7-7 3.14-7 7 3.141 7 7 7z' />
            </svg>
            <Menu as='div' className='relative max-h-6'>
              <Menu.Button>
                <svg className='hover:fill-white' fill='#d6d3d1' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
                  <path d='M12 2c3.032 0 5.5 2.467 5.5 5.5 0 1.458-.483 3.196-3.248 5.59 4.111 1.961 6.602 5.253 7.482 8.909h-19.486c.955-4.188 4.005-7.399 7.519-8.889-1.601-1.287-3.267-3.323-3.267-5.61 0-3.033 2.468-5.5 5.5-5.5zm0-2c-4.142 0-7.5 3.357-7.5 7.5 0 2.012.797 3.834 2.086 5.182-5.03 3.009-6.586 8.501-6.586 11.318h24c0-2.791-1.657-8.28-6.59-11.314 1.292-1.348 2.09-3.172 2.09-5.186 0-4.143-3.358-7.5-7.5-7.5z' />
                </svg>
              </Menu.Button>
              <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
              >
                <Menu.Items className='absolute left-1/2 -translate-x-1/2 z-10 mt-2 w-24 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href={session ? `/account/` : '/sign-in'}
                        className={classNames(active && 'bg-stone-100', 'block w-full text-left px-4 py-2 text-sm text-stone-700')}
                      >
                        {session ? 'Account' : 'Sign in'}
                      </Link>
                    )}
                  </Menu.Item>
                  {session && (
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => signOut()}
                          className={classNames(active && 'bg-stone-100', 'block w-full text-left px-4 py-2 text-sm text-stone-700')}
                        >
                          Sign out
                        </button>
                      )}
                    </Menu.Item>
                  )}
                </Menu.Items>
              </Transition>
            </Menu>
            <Link href='/shopping-bag'>
              <div className='cursor-pointer relative group'>
                <svg className='group-hover:fill-white' fill='#d6d3d1' xmlns='http://www.w3.org/2000/svg' width='26.5' height='26.5' viewBox='0 0 24 24'>
                  <path d='M16 6v-2c0-2.209-1.791-4-4-4s-4 1.791-4 4v2h-5v18h18v-18h-5zm-7-2c0-1.654 1.346-3 3-3s3 1.346 3 3v2h-6v-2zm10 18h-14v-14h3v1.5c0 .276.224.5.5.5s.5-.224.5-.5v-1.5h6v1.5c0 .276.224.5.5.5s.5-.224.5-.5v-1.5h3v14z' />
                </svg>
                {totalQty !== 0 && (
                  <span className='absolute text-xs font-semibold top-[10px] left-1/2 -translate-x-1/2  text-stone-300 group-hover:text-white'>
                    {totalQty > 99 ? 99 : totalQty}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </div>
      </nav>
      {/* slide down menu */}
      <AnimatePresence>
        {isMenuToggled && (
          <>
            <motion.section
              layout
              key='menu'
              className='bg-stone-900'
              initial={{ height: 0 }}
              animate={{ height: windowWidth <= 768 ? 'calc(100dvh - 64px)' : '360px' }}
              exit={{ height: 0 }}
              transition={{ duration: 0.5, ease }}
            >
              {/* mobile menu links */}
              {!isSearchToggled && (
                <ul className='flex flex-col py-4 px-12 divide-y-[1px] divide-stone-500 md:hidden'>
                  {routes.map((i, index) => (
                    <motion.li
                      key={index}
                      className='text-stone-300 hover:text-white font-medium text-center py-4'
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0, transition: { duration: 0.25, delay: 0.25 + 0.02 * index, ease } }}
                      exit={{ opacity: 0, y: -20, transition: { duration: 0.25, delay: 0, ease } }}
                    >
                      <Link
                        href={i.href}
                        onClick={() => {
                          setIsSearchToggled(false);
                          setIsMenuToggled(false);
                        }}
                      >
                        {i.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              )}
              {/* search component */}
              {isSearchToggled && (
                <div>
                  <motion.div
                    className='w-full md:max-w-[472px] md:mx-auto'
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0, transition: { duration: 0.25, delay: 0.25, ease } }}
                    exit={{ opacity: 0, y: -20, transition: { duration: 0.25, delay: 0, ease } }}
                  >
                    <div className='flex px-2 pt-4 pb-6 items-center gap-2'>
                      <input
                        type='text'
                        className='w-full bg-transparent border-none text-white text-xl font-semibold focus:ring-0 py-0 px-2'
                        ref={inputRef}
                        placeholder='Search products'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      {searchTerm && (
                        <svg
                          onClick={() => setSearchTerm('')}
                          className='hover:fill-white cursor-pointer shrink-0 mr-2 md:mr-1'
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
                    </div>
                    <ul className='text-stone-300 font-medium flex flex-col gap-y-2 px-4 pb-6 md:pb-0 md:mr-[21px] md:max-h-64 md:overflow-y-auto md:scrollbar md:scrollbar-thumb-stone-300 md:scrollbar-track-stone-700 md:scrollbar-w-1 md:scrollbar-thumb-rounded-full md:scrollbar-track-rounded-full'>
                      {results?.map((i) => (
                        <li key={i._id}>
                          <Link
                            href={`${i.category}/${i.slug.current}`}
                            className='inline-flex items-center gap-x-2 hover:text-white'
                            onClick={() => {
                              setIsSearchToggled(false);
                              setIsMenuToggled(false);
                            }}
                          >
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
                  <motion.div
                    key='overlay'
                    className='fixed w-full h-[100dvh] top-0 left-0 -z-10'
                    initial={{ backdropFilter: 'blur(0px)' }}
                    animate={{ backdropFilter: 'blur(16px)', transition: { duration: 0.3, delay: 0.2, ease } }}
                    exit={{ backdropFilter: 'blur(0px)', transition: { duration: 0.3, ease } }}
                  />
                </div>
              )}
            </motion.section>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
