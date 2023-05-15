'use client';
// require('@tailwindcss/forms')
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCsrfToken } from 'next-auth/react';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    const getToken = async () => {
      const token = await getCsrfToken();
      token && setToken(token);
    };
    getToken();
  }, []);

  return (
    <section className='flex flex-col justify-center px-4 pt-10 sm:pt-16 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <h2 className='text-center text-2xl sm:text-3xl font-extrabold text-stone-800'>Sign in to Next Sanity Demo Store</h2>
      </div>
      <div className='mt-10 sm:mt-16 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='border border-stone-50 px-4 py-8 shadow sm:rounded-lg sm:p-10'>
          <form method='post' action='/api/auth/signin/email'>
            <input name='csrfToken' type='hidden' defaultValue={token} />
            <div>
              <label htmlFor='email' className='block text-sm font-medium text-stone-700'>
                Email address
              </label>
              <div className='mt-3'>
                <input
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  required
                  value={email}
                  className='appearance-none block w-full px-3 py-2 border border-stone-300 rounded-md shadow-sm placeholder-stone-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className='mt-6'>
              <button className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                Sign in &nbsp; | &nbsp; Sign up
              </button>
            </div>
          </form>

          <div className='mt-6'>
            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t border-stone-300' />
              </div>
              <div className='relative flex justify-center text-sm'>
                <span className='px-2 bg-white text-stone-500'>Or continue with</span>
              </div>
            </div>

            <div className='mt-6'>
              <div className='mt-6'>
                <Link
                  href='/register'
                  className='w-full inline-flex justify-center py-2 px-4 border border-stone-300 rounded-md shadow-sm bg-white text-sm font-medium text-stone-500 hover:bg-stone-100'
                >
                  Google
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
