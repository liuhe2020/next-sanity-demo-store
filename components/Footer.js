import { Disclosure } from '@headlessui/react';

export default function Footer() {
  const today = new Date();
  const year = today.getFullYear();

  return (
    <footer className=''>
      <div className='w-full px-4 pt-16'>
        <div className='mx-auto w-full max-w-md rounded-2xl bg-white p-2'>
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className='flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'>
                  <span>What is your refund policy?</span>
                  {/* <ChevronUpIcon
                    className={`${
                      open ? 'rotate-180 transform' : ''
                    } h-5 w-5 text-purple-500`}
                  /> */}
                </Disclosure.Button>
                <Disclosure.Panel className='px-4 pt-4 pb-2 text-sm text-gray-500'>
                  If you're unhappy with your purchase for any reason, email us
                  within 90 days and we'll refund you in full, no questions
                  asked.
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure as='div' className='mt-2'>
            {({ open }) => (
              <>
                <Disclosure.Button className='flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'>
                  <span>Do you offer technical support?</span>
                  {/* <ChevronUpIcon
                    className={`${
                      open ? 'rotate-180 transform' : ''
                    } h-5 w-5 text-purple-500`}
                  /> */}
                </Disclosure.Button>
                <Disclosure.Panel className='px-4 pt-4 pb-2 text-sm text-gray-500'>
                  No.
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      </div>

      <div className='max-w-screen-lg mt-20 mx-4 py-4 border-t-[1px] text-gray-500 text-xs sm:text-sm space-y-6 lg:mx-auto'>
        <p className=''>
          Disclaimer: This webiste is a demo. All displayed products are fake.
          No real transactions are taking place. This is a personal project for
          educational purposes only.
        </p>
        <p className='pt-4 pb-8 border-t-[1px]'>
          &copy; {year} Next Sanity Demo Store
        </p>
      </div>
    </footer>
  );
}
