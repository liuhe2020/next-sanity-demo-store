import { useState } from 'react';

export default function FooterLinks({ link }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div key={link.name} className='w-full'>
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className='cursor-pointer flex w-full justify-between px-4 py-2 font-medium'
      >
        <span>{link.name}</span>
        <svg
          className={`${
            isOpen && '-rotate-180 transform'
          } h-5 w-5 transition duration-300`}
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='currentColor'
        >
          <path d='M16.939 7.939 12 12.879l-4.939-4.94-2.122 2.122L12 17.121l7.061-7.06z'></path>
        </svg>
      </div>
      <ul
        className={`${
          isOpen ? 'max-h-[200px]' : 'max-h-0'
        } px-5 pt-0 overflow-hidden transition-[max-height] duration-500 ease-out`}
      >
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
