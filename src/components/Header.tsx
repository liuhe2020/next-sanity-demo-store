'use client';
// hamburger menu https://github.com/theMosaad/tailwindcss-delicious-hamburgers
import { Fragment, useEffect, useRef, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import useStore from '../store/store';
import classNames from '../utils/classNames';
import Image from 'next/image';
import MobileSearch from './MobileSearch';

const routes = [
  { name: 'Laptops', href: '/laptops', current: false },
  { name: 'Phones', href: '/phones', current: false },
  { name: 'Tablets', href: '/tablets', current: false },
  { name: 'Audio', href: '/audios', current: false },
  { name: 'Accessories', href: '/accessories', current: false },
];

export default function Header() {
  const [isSearchToggled, setIsSearchToggled] = useState(false);
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { data: session } = useSession();
  const inputRef = useRef<HTMLInputElement>(null);
  const totalQty = useStore((state) => state.totalQty);

  const handleMenuToggle = () => {
    if (isSearchToggled) {
      setIsMenuToggled(false);
      setIsSearchToggled(false);
      return;
    }
    setIsMenuToggled(!isMenuToggled);
  };

  // lock window scroll when mobile menu is open
  useEffect(() => {
    if (isMenuToggled) {
      document.querySelector('body')?.classList.add('overflow-y-hidden');
    }
    return () => {
      document.querySelector('body')?.classList.remove('overflow-y-hidden');
    };
  }, [isMenuToggled]);

  // focus on input when search toggled
  useEffect(() => {
    if (isSearchToggled && inputRef.current) inputRef.current.focus();
  }, [isSearchToggled]);

  return (
    <header className='fixed w-full top-0 z-10'>
      {/* mobile menu */}
      <div
        className={classNames(
          !isMenuToggled && '-translate-y-full bg-transparent',
          'absolute w-full min-h-[100dvh] bg-black top-0 pt-16 transition duration-500 ease-in-out md:hidden'
        )}
      >
        <ul className='flex flex-col py-4 px-12 divide-y-[1px] divide-stone-500'>
          {routes.map((el, index) => (
            <li key={index} className={classNames(el.current ? 'text-white' : 'text-stone-300', 'hover:text-white font-medium text-center py-4')}>
              <Link href={el.href} onClick={() => setIsMenuToggled(false)}>
                {el.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* mobile search */}
      <div
        className={classNames(
          !isSearchToggled && '-translate-y-full bg-transparent',
          'absolute w-full min-h-[100dvh] bg-black top-0 pt-16 transition duration-500 ease-in-out md:hidden'
        )}
      >
        <MobileSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      {/* desktop menu */}
      <nav className={classNames(isSearchToggled && 'bg-stone-900', 'relative bg-black/[.8] backdrop-blur-lg z-20 transition-all duration-500')}>
        <div className='relative w-full max-w-screen-lg h-16 flex flex-row-reverse gap-x-1 items-center mx-auto px-4 lg:px-2 xl:px-0'>
          {/* hamburger menu icon*/}
          <div className={classNames((isMenuToggled || isSearchToggled) && 'active', 'c-hamburger c-hamburger--chop', 'md:hidden')} onClick={handleMenuToggle}>
            <div className='c-hamburger-inner'>
              <span className='c-hamburger-bar'></span>
              <span className='c-hamburger-bar'></span>
              <span className='c-hamburger-bar'></span>
            </div>
          </div>

          {/* logo */}
          <Link href='/' onClick={() => setIsMenuToggled(false)}>
            <Image className='h-7 absolute top-[18px] left-4 opacity-90' src='/images/nsds_logo.png' alt='nsds logo' width={28} height={28} />
          </Link>

          <ul className='hidden absolute left-1/2 -translate-x-1/2 md:flex space-x-8'>
            {routes.map((el, index) => (
              <li key={index} className={classNames(el.current ? 'text-white' : 'text-stone-300', 'hover:text-white font-medium')}>
                <Link href={el.href}>{el.name}</Link>
              </li>
            ))}
          </ul>

          {/* desktop nav icons */}
          <div className='flex gap-x-2 items-end'>
            <svg
              className='hover:fill-white cursor-pointer'
              fill='#d6d3d1'
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              onClick={() => {
                setIsSearchToggled(!isSearchToggled);
                setIsMenuToggled(false);
              }}
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
            <Link href='/shopping-bag' onClick={() => setIsMenuToggled(false)}>
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
        {/* desktop search */}
        <div
          className={classNames(isSearchToggled && 'max-h-64', 'overflow-hidden max-h-0 w-full z-10 text-white transition-all duration-500 hidden md:block')}
        >
          <div className='mx-auto max-w-[440px] p-4 flex items-center gap-2'>
            <svg
              className='hover:fill-white cursor-pointer shrink-0'
              fill='#d6d3d1'
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
            >
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
                width='22'
                height='22'
                clip-rule='evenodd'
                fill-rule='evenodd'
                stroke-linejoin='round'
                stroke-miterlimit='2'
                viewBox='0 2 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z' />
              </svg>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
