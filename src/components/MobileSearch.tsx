import React, { Dispatch, SetStateAction } from 'react';

type Props = {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
};

const MobileSearch = React.forwardRef<HTMLInputElement, Props>(({ searchTerm, setSearchTerm }, ref) => {
  return (
    <div className='flex p-2 items-center gap-2'>
      <input
        type='text'
        className='grow bg-transparent border-none text-white text-lg font-medium focus:ring-0'
        ref={ref}
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
          clip-rule='evenodd'
          fill-rule='evenodd'
          stroke-linejoin='round'
          stroke-miterlimit='2'
          viewBox='0 1 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 8.933-2.721-2.722c-.146-.146-.339-.219-.531-.219-.404 0-.75.324-.75.749 0 .193.073.384.219.531l2.722 2.722-2.728 2.728c-.147.147-.22.34-.22.531 0 .427.35.75.751.75.192 0 .384-.073.53-.219l2.728-2.728 2.729 2.728c.146.146.338.219.53.219.401 0 .75-.323.75-.75 0-.191-.073-.384-.22-.531l-2.727-2.728 2.717-2.717c.146-.147.219-.338.219-.531 0-.425-.346-.75-.75-.75-.192 0-.385.073-.531.22z'
            fill-rule='nonzero'
          />
        </svg>
      )}
    </div>
  );
});

export default MobileSearch;
