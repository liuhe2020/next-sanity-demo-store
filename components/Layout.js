import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';
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
    </>
  );
}
