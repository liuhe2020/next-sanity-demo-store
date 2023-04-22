import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import client from '../../utils/client';
import Orders from '../../components/Account/Orders';
import Profile from '../../components/Account/Profile';
import Password from '../../components/Account/Password';

const sideNav = [{ name: 'Orders' }, { name: 'Profile' }, { name: 'Password' }];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Account({ id, orders }) {
  const [view, setView] = useState('Orders');
  const router = useRouter();

  const handleView = (e) => {
    setView(e.target.innerText);
  };

  const { data: session, status } = useSession({
    required: true,
  });

  if (status === 'loading') {
    return 'Loading or not authenticated...';
  }

  // redirect user to the correct signed in user
  if (session.user._id !== id) {
    router.replace(`/account/${session.user._id}`);
  }

  return (
    <>
      <Head>
        <title>{`DS | Account - ${session.user.name}`}</title>
        <link rel='shortcut icon' href='/images/favicon.ico' />
      </Head>
      <div className='pt-16 min-h-[80vh] relative bg-stone-50 w-full'>
        <div className='max-w-screen-lg mx-auto p-2 sm:p-4 lg:my-10'>
          <div className='bg-white rounded-lg shadow overflow-hidden'>
            <div className='divide-y divide-stone-200 md:flex md:divide-y-0 md:divide-x min-h-[80vh]'>
              <aside className='py-6 md:w-[200px]'>
                <ul className='space-y-1'>
                  {sideNav.map((item) => (
                    <li
                      onClick={handleView}
                      key={item.name}
                      className={classNames(
                        item.name === view
                          ? 'bg-indigo-50 border-indigo-600 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-700'
                          : 'border-transparent text-stone-900 hover:bg-stone-50 hover:text-stone-900',
                        'cursor-pointer group border-l-4 px-3 py-2 flex items-center text-sm md:text-base font-medium'
                      )}
                    >
                      {/* <item.icon
                        className={classNames(
                          item.current
                            ? 'text-indigo-500 group-hover:text-indigo-500'
                            : 'text-stone-400 group-hover:text-stone-500',
                          'flex-shrink-0 -ml-1 mr-3 h-6 w-6'
                        )}
                        aria-hidden='true'
                      /> */}
                      <span className='truncate'>{item.name}</span>
                    </li>
                  ))}
                </ul>
              </aside>
              {view === 'Orders' && <Orders orders={orders} />}
              {view === 'Profile' && <Profile user={session.user} />}
              {view === 'Password' && <Password user={session.user} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// using getStaticPaths to generate all users routes
export async function getStaticPaths() {
  const users = await client.fetch(`*[_type == 'user']`);

  const paths = users.map((user) => ({
    params: {
      id: user._id,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

// return only user id from getStaticProps which is used for client side checks
export async function getStaticProps({ params }) {
  const { id } = params;
  const orders = await client.fetch(`*[_type == 'order' && user._ref == '${id}']{name, _createdAt, orderTotal, orderItems[]{product->,quantity}}`);

  return { props: { id, orders } };
}
