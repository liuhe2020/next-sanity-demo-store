import { Metadata } from 'next';
import SideNav from './side-nav';

export const metadata: Metadata = {
  title: 'DS | Account',
  description: 'Next Sanity Demo Store user account page',
};

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className='max-w-screen-lg px-4 pt-10 sm:pt-16 relative w-full mx-auto lg:px-8'>
      <div className='border border-stone-50 rounded-lg shadow overflow-hidden'>
        <div className='divide-y divide-stone-300 md:flex md:divide-y-0 md:divide-x'>
          <SideNav />
          {children}
        </div>
      </div>
    </section>
  );
}
