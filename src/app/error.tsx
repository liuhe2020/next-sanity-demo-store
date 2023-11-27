'use client';

import Link from 'next/link';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className='flex flex-col items-center justify-center text-center p-4 pt-10 min-h-[30vw] sm:px-6 lg:px-8'>
      <div className='max-w-lg mx-auto'>
        <header className='flex flex-col items-center justify-center space-y-2'>
          <h1 className='text-4xl font-extrabold text-gray-700'>Error</h1>
        </header>
        <main className='mt-6'>
          <p className='text-lg text-gray-700 text-balance'>We&apos;re sorry, please try again later.</p>
          <div className='mt-8 flex gap-3'>
            <button
              onClick={() => reset()}
              className='w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm whitespace-nowrap text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              Try again
            </button>
            <Link
              className='w-full inline-flex justify-center py-2.5 px-4 border border-stone-300 rounded-md shadow-sm bg-white whitespace-nowrap text-base font-medium text-stone-500 hover:bg-stone-100'
              href='/'
            >
              Back to Home
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
