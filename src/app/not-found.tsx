import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center text-center p-4 min-h-[30vw] sm:px-6 lg:px-8'>
      <div className='max-w-md mx-auto'>
        <header className='flex flex-col items-center justify-center space-y-2'>
          <h1 className='text-3xl font-extrabold text-gray-700'>404</h1>
          <p className='text-xl font-semibold text-gray-700'>Page Not Found</p>
        </header>
        <main className='mt-6'>
          <p className='text-lg text-gray-700 text-balance'>We&apos;re sorry, the page you requested could not be found.</p>
          <Link className='mt-8 bg-indigo-600 text-white px-6 py-2.5 rounded-md inline-flex items-center justify-center hover:bg-indigo-700' href='/'>
            Back to Home
          </Link>
        </main>
      </div>
    </div>
  );
}
