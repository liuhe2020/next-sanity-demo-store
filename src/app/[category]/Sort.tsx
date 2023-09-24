'use client';

import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import classNames from '@/utils/classNames';

const list = [
  { order: 'Name - A to Z', param: 'name_asc' },
  { order: 'Name - Z to A', param: 'name_desc' },
  { order: 'Price - low to high', param: 'price_asc' },
  { order: 'Price - high to low', param: 'price_desc' },
];

export default function Sort() {
  const searchParams = useSearchParams();
  const p = searchParams.get('sort');
  const order = list.find((i) => i.param === p)?.order;
  const router = useRouter();

  return (
    <Popover className='relative flex'>
      <Popover.Button className='relative w-full cursor-pointer rounded-xl outline-none ring-1 ring-stone-100 py-2.5 px-5 text-left xs:w-[255px] xs:ml-auto lg:text-sm lg:w-[230px]'>
        <span className='block truncate'>Sort by: {order ?? 'Default'}</span>
        <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5'>
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1} stroke='currentColor' className='w-5 h-5'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9' />
          </svg>
        </span>
      </Popover.Button>
      <Transition as={Fragment} leave='transition ease-in duration-100' leaveFrom='opacity-100' leaveTo='opacity-0'>
        <Popover.Panel className='absolute z-10 top-12 max-h-60 w-full bg-white overflow-auto py-1 text-base rounded-xl shadow-lg ring-1 ring-stone-100 right-0 xs:w-[255px] lg:w-[230px] lg:text-sm'>
          {({ close }) => (
            <>
              {list.map((i) => (
                <Link
                  href={`?sort=${i.param}`}
                  replace={true}
                  key={i.order}
                  className={classNames(p === i.param && 'bg-sky-50', 'block relative select-none py-2 px-5 cursor-pointer')}
                  onClick={() => {
                    close();
                    router.refresh();
                  }}
                >
                  {i.order}
                </Link>
              ))}
            </>
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
