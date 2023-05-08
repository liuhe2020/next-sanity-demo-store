'use client';
import { useState } from 'react';

export default function FooterLinks({ link }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='w-full border-b-[1px] last:border-none'>
      <div onClick={() => setIsOpen((prev) => !prev)} className='cursor-pointer py-4 flex w-full justify-between font-medium'>
        <h3>{link.name}</h3>
        <svg
          className={`${isOpen && '-rotate-180 transform'} h-5 w-5 transition duration-400 delay-75`}
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='currentColor'
        >
          <path d='M16.939 7.939 12 12.879l-4.939-4.94-2.122 2.122L12 17.121l7.061-7.06z'></path>
        </svg>
      </div>
      <ul className={`${isOpen && 'max-h-64 pb-4'} px-4 space-y-4 overflow-hidden max-h-0 transition-all duration-500`}>
        {link.subLinks.map((l) => (
          <li key={l.name} className=''>
            <a href={l.href} className=''>
              {l.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
