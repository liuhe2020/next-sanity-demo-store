'use client';

import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';

const list = [{ order: 'Name - A to Z' }, { order: 'Name - Z to A' }, { order: 'Price - low to high' }, { order: 'Price - high to low' }];

export default function Sort() {
  const [selected, setSelected] = useState(list[0]);

  return (
    <div className=''>
      <Listbox value={selected} onChange={setSelected}>
        <div className='relative flex'>
          <Listbox.Button className='relative w-full cursor-pointer rounded-xl ring-1 ring-stone-100 p-2.5 text-left xs:px-5 xs:w-[245px] xs:ml-auto lg:text-sm'>
            <span className='block truncate'>Sort by: {selected.order}</span>
            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
              {/* <ChevronUpDownIcon className='h-5 w-5 text-gray-400' aria-hidden='true' /> */}
            </span>
          </Listbox.Button>
          <Transition as={Fragment} leave='transition ease-in duration-100' leaveFrom='opacity-100' leaveTo='opacity-0'>
            <Listbox.Options className='absolute z-10 top-12 max-h-60 w-full bg-white overflow-auto py-1 text-base rounded-xl shadow ring-1 ring-stone-100 xs:w-[245px] right-0 lg:text-sm'>
              {list.map((i) => (
                <Listbox.Option
                  key={i.order}
                  className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'}`}
                  value={i}
                >
                  {({ selected }) => (
                    <>
                      <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{i.order}</span>
                      {selected ? (
                        <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600'>
                          {/* <CheckIcon className='h-5 w-5' aria-hidden='true' /> */}
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
