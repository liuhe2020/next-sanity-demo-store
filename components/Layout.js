import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';
import CookieConsent from 'react-cookie-consent';
import Footer from './Footer';
import Header from './Header';

export default function Layout({ children }) {
  const [navToggle, setNavToggle] = useState(false);

  const router = useRouter();

  // close mobile nav menu when route/url changes
  useEffect(() => {
    const handleToggle = () => {
      setNavToggle(false);
    };

    router.events.on('routeChangeComplete', handleToggle);
    return () => {
      router.events.off('routeChangeComplete', handleToggle);
    };
  }, [router.events]);

  return (
    <>
      <Header navToggle={navToggle} setNavToggle={setNavToggle} />
      {children}
      <Footer />
      <Toaster
        position='bottom-center'
        toastOptions={{
          style: {
            background: 'rgb(0 0 0 / .8)',
            color: '#fff',
          },
        }}
      />
      <CookieConsent
        debug={true}
        location='bottom'
        buttonText='Ok'
        cookieName='NSDS-cookies-tc'
        disableStyles={true}
        expires={150}
        containerClasses='bg-[#333] w-full py-6 text-white text-sm fixed left-0 bottom-0 z-100'
        contentClasses='max-w-screen-lg px-4 md:px-6 xl:px-0 mx-auto'
        buttonWrapperClasses='max-w-screen-lg px-4 md:px-6 xl:px-0 pt-3 mx-auto'
        buttonClasses='w-24 flex justify-center py-1.5 px-3 border border-transparent rounded-md shadow-sm font-medium bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
      >
        This site uses cookies to store and access information on your device.
        This is essential to provide you with a secure, functioning and reliable
        website. By continuing to browse the site, you are agreeing to the use
        of cookies.
      </CookieConsent>
    </>
  );
}
