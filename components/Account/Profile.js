import { useState } from 'react';

export default function Profile({ user }) {
  const [isUpdate, setIsUpdate] = useState(false);

  const [values, setValues] = useState({
    name: '',
    email: '',
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
          Profile
        </h2>

        <div className='mt-10'>
          <label
            htmlFor='name'
            className='block text-sm font-medium text-stone-500'
          >
            Full name
          </label>
          {isUpdate ? (
            <input
              type='text'
              name='name'
              id='name'
              autoComplete='name'
              className='focus:ring-blue-500 focus:border-blue-500 flex-grow block w-full rounded sm:text-sm border-stone-300 mt-2 shadow-sm'
              defaultValue={user.name}
              onChange={handleChange}
            />
          ) : (
            <p className='mt-2 text-sm font-medium text-stone-700'>
              {user.name}
            </p>
          )}
        </div>

        <div className='mt-6'>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-stone-500'
          >
            Email address
          </label>
          {isUpdate ? (
            <input
              type='text'
              name='email'
              id='email'
              autoComplete='email'
              className='focus:ring-blue-500 focus:border-blue-500 flex-grow block w-full rounded sm:text-sm border-stone-300 mt-2 shadow-sm'
              defaultValue={user.email}
              onChange={handleChange}
            />
          ) : (
            <p className='mt-2 text-sm font-medium text-stone-700'>
              {user.email}
            </p>
          )}
        </div>

        {!isUpdate && (
          <button
            onClick={() => setIsUpdate(true)}
            className='w-28 mt-6 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          >
            Update
          </button>
        )}
        {isUpdate && (
          <div className='flex'>
            <button
              type='submit'
              className='w-28 mt-6 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-3'
            >
              Save
            </button>
            <button
              onClick={() => setIsUpdate(false)}
              className='w-28 mt-6 flex justify-center py-2 px-4 border border-stone-300 rounded-md shadow-sm text-sm font-medium text-stone-700 bg-stone-50 hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500'
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </form>
  );
}
