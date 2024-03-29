'use client';

import { updateProfile } from '@/app/actions';
import { useRouter } from 'next/navigation';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import toast from 'react-hot-toast';

export default function ProfileForm({ user }: { user: SanityUser }) {
  const [isUpdate, setIsUpdate] = useState(false);
  const [values, setValues] = useState({
    name: user.name,
    email: user.email,
  });
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await updateProfile(values);
    if (!success) {
      toast('Failed to update, please try again later');
      return;
    }
    setIsUpdate(false);
    toast('Updated profile');
    router.refresh();
  };

  return (
    <form className='divide-y divide-stone-300 md:flex-1' onSubmit={handleSubmit}>
      {/* Profile section */}
      <div className='py-6 px-4 sm:p-6 lg:pb-8'>
        <h2 className='text-lg leading-6 font-medium text-stone-900'>Profile</h2>

        <div className='mt-10'>
          <label htmlFor='name' className='block text-sm font-medium text-stone-500'>
            Full name
          </label>
          {isUpdate ? (
            <input
              type='text'
              name='name'
              id='name'
              autoComplete='name'
              className='focus:ring-indigo-500 focus:border-indigo-500 flex-grow block w-full rounded sm:text-sm border-stone-300 mt-2 shadow-sm'
              value={values.name}
              onChange={handleChange}
              required
            />
          ) : (
            <p className='mt-2 text-sm font-medium text-stone-700'>{user.name}</p>
          )}
        </div>

        <div className='mt-6'>
          <label htmlFor='email' className='block text-sm font-medium text-stone-500'>
            Email address
          </label>
          {isUpdate ? (
            <input
              type='text'
              name='email'
              id='email'
              autoComplete='email'
              className='focus:ring-indigo-500 focus:border-indigo-500 flex-grow block w-full rounded sm:text-sm border-stone-300 mt-2 shadow-sm'
              value={values.email}
              onChange={handleChange}
              required
            />
          ) : (
            <p className='mt-2 text-sm font-medium text-stone-700'>{user.email}</p>
          )}
        </div>

        {!isUpdate && (
          <button
            onClick={() => setIsUpdate(true)}
            className='w-28 mt-6 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            Update
          </button>
        )}
        {isUpdate && (
          <div className='flex'>
            <button
              type='submit'
              className='w-28 mt-6 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3'
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
