'use client';
// require('@tailwindcss/forms')
import { useEffect, useState } from 'react';
import { getCsrfToken, signIn } from 'next-auth/react';

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
                <button
                  className='w-full inline-flex justify-center items-center gap-2 py-2 px-4 border border-stone-300 rounded-md shadow-sm bg-white text-sm font-medium text-stone-500 hover:bg-stone-100'
                  onClick={() => signIn('google')}
                >
                  <svg xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' width='24' height='24' viewBox='0 0 48 48'>
                    <path
                      fill='#FFC107'
                      d='M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z'
                    ></path>
                    <path
                      fill='#FF3D00'
                      d='M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z'
                    ></path>
                    <path
                      fill='#4CAF50'
                      d='M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z'
                    ></path>
                    <path
                      fill='#1976D2'
                      d='M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z'
                    ></path>
                  </svg>
                  <span>Google</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
