// hamburger menu https://github.com/theMosaad/tailwindcss-delicious-hamburgers

import { Fragment, useEffect, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import Link from 'next/link';

const navigation = [
  { name: 'Laptops', href: '/laptops', current: false },
  { name: 'Phones', href: '/phones', current: false },
  { name: 'Tablets', href: '/tablets', current: false },
  { name: 'Audio', href: '/audios', current: false },
  { name: 'Accessories', href: '/accessories', current: false },
];

// tailwind class name helper
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Header({ navToggle, setNavToggle }) {
  // lock window scroll when mobile menu is open
  useEffect(() => {
    if (navToggle)
      document.querySelector('body').classList.add('overflow-y-hidden');
    return () => {
      document.querySelector('body').classList.remove('overflow-y-hidden');
    };
  }, [navToggle]);

  return (
    <header className='sticky top-0 bg-black h-16 z-10'>
      {/* mobile menu */}
      <ul
        className={classNames(
          !navToggle && '-translate-y-full',
          'absolute w-full h-[calc(100vh-64px)] z-10 bg-black flex flex-col top-16 transition-all duration-500 ease-in-out p-8 md:hidden'
        )}
      >
        {navigation.map((el, index) => (
          <li
            key={index}
            className={classNames(
              el.current ? 'text-white' : 'text-stone-300',
              index !== navigation.length - 1 && 'border-b-[1px]',
              'hover:text-white font-medium text-center py-4 px-4 border-stone-500'
            )}
          >
            <Link href={el.href}>{el.name}</Link>
          </li>
        ))}
      </ul>

      <nav className='relative bg-black md:max-w-screen-lg h-full flex justify-between items-center mx-auto z-20 px-4 lg:px-2'>
        {/* hamburger menu */}
        <div
          className={classNames(
            navToggle && 'active',
            'c-hamburger c-hamburger--chop',
            'md:hidden'
          )}
          onClick={() => setNavToggle((prev) => !prev)}
        >
          <div className='c-hamburger-inner'>
            <span className='c-hamburger-bar'></span>
            <span className='c-hamburger-bar'></span>
            <span className='c-hamburger-bar'></span>
          </div>
        </div>

        {/* logo */}
        <Link href='/'>
          <img
            className='h-7 cursor-pointer absolute top-5 left-0 right-0 mx-auto md:static md:mx-0 opacity-90'
            src='/images/nsds_logo.png'
            alt='nsds logo'
          ></img>
        </Link>

        {/* desktop menu */}
        <ul className='hidden md:flex'>
          {navigation.map((el, index) => (
            <li
              key={index}
              className={classNames(
                el.current ? 'text-white' : 'text-stone-300',
                index !== navigation.length - 1 && 'mr-8',
                'hover:text-white font-medium'
              )}
            >
              <Link href={el.href}>{el.name}</Link>
            </li>
          ))}
        </ul>

        <div className='flex mt-1.5'>
          <Menu as='div' className='relative'>
            <div>
              <Menu.Button className=''>
                <span className='sr-only'>Open user menu</span>
                <svg
                  className='hover:fill-white mt-[2.5px]'
                  fill='#d6d3d1'
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                >
                  <path d='M12 2c3.032 0 5.5 2.467 5.5 5.5 0 1.458-.483 3.196-3.248 5.59 4.111 1.961 6.602 5.253 7.482 8.909h-19.486c.955-4.188 4.005-7.399 7.519-8.889-1.601-1.287-3.267-3.323-3.267-5.61 0-3.033 2.468-5.5 5.5-5.5zm0-2c-4.142 0-7.5 3.357-7.5 7.5 0 2.012.797 3.834 2.086 5.182-5.03 3.009-6.586 8.501-6.586 11.318h24c0-2.791-1.657-8.28-6.59-11.314 1.292-1.348 2.09-3.172 2.09-5.186 0-4.143-3.358-7.5-7.5-7.5z' />
                </svg>
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter='transition ease-out duration-100'
              enterFrom='transform opacity-0 scale-95'
              enterTo='transform opacity-100 scale-100'
              leave='transition ease-in duration-75'
              leaveFrom='transform opacity-100 scale-100'
              leaveTo='transform opacity-0 scale-95'
            >
              <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href='#'
                      className={classNames(
                        active ? 'bg-stone-100' : '',
                        'block px-4 py-2 text-sm text-stone-700'
                      )}
                    >
                      Your Profile
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href='#'
                      className={classNames(
                        active ? 'bg-stone-100' : '',
                        'block px-4 py-2 text-sm text-stone-700'
                      )}
                    >
                      Settings
                    </a>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
          <Link href='/basket'>
            <div className='cursor-pointer ml-1.5'>
              <svg
                className='hover:fill-white'
                fill='#d6d3d1'
                xmlns='http://www.w3.org/2000/svg'
                width='26.5'
                height='26.5'
                viewBox='0 0 24 24'
              >
                <path d='M16 6v-2c0-2.209-1.791-4-4-4s-4 1.791-4 4v2h-5v18h18v-18h-5zm-7-2c0-1.654 1.346-3 3-3s3 1.346 3 3v2h-6v-2zm10 18h-14v-14h3v1.5c0 .276.224.5.5.5s.5-.224.5-.5v-1.5h6v1.5c0 .276.224.5.5.5s.5-.224.5-.5v-1.5h3v14z' />
              </svg>
            </div>
          </Link>
        </div>
      </nav>
    </header>
  );
}
