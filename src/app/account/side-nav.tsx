'use client';

import cn from '@/utils/cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const sideNav = [
  { name: 'Orders', url: '/account/orders' },
  { name: 'Profile', url: '/account/profile' },
];

export default function SideNav() {
  const pathname = usePathname();

  return (
    <aside className='py-6 md:w-48'>
      <ul className='space-y-1'>
        {sideNav.map((item) => (
          <Link
            href={item.url}
            key={item.name}
            className={cn(
              item.url === pathname
                ? 'bg-indigo-50 border-indigo-600 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-700'
                : 'border-transparent text-stone-900 hover:bg-stone-50 hover:text-stone-900',
              'cursor-pointer group border-l-4 px-3 py-2 flex items-center text-sm md:text-base font-medium'
            )}
          >
            <span className='truncate'>{item.name}</span>
          </Link>
        ))}
      </ul>
    </aside>
  );
}
