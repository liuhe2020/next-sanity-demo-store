import { useState } from 'react';

export default function Password({ user }) {
  const [values, setValues] = useState({
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form
      className='divide-y divide-stone-200 md:flex-1'
      onSubmit={handleSubmit}
    >
      {/* Profile section */}
      <div className='py-6 px-4 sm:p-6 lg:pb-8'>
        <h2 className='text-lg leading-6 font-medium text-stone-900'>
          Password
        </h2>

        <div className='mt-10'>
          <label
            htmlFor='name'
            className='block text-sm font-medium text-stone-500'
          >
            New password
          </label>
          <input
            type='password'
            name='password'
            id='password'
            autoComplete='current-password'
            className='focus:ring-blue-500 focus:border-blue-500 flex-grow block w-full rounded sm:text-sm border-stone-300 mt-2 shadow-sm'
            onChange={handleChange}
          />
        </div>

        <div className='mt-6'>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-stone-500'
          >
            Confirm password
          </label>
          <input
            type='password'
            name='confirmPassword'
            id='confirmPassword'
            autoComplete='current-password'
            className='focus:ring-blue-500 focus:border-blue-500 flex-grow block w-full rounded sm:text-sm border-stone-300 mt-2 shadow-sm'
            onChange={handleChange}
          />
        </div>

        <button
          type='submit'
          className='w-28 mt-6 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
        >
          Update
        </button>
      </div>
    </form>
  );
}
