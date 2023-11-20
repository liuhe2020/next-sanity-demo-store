'use client';

import { useLayoutEffect, useState } from 'react';

export default function useWindowSize() {
  const [size, setSize] = useState<number>(0);

  useLayoutEffect(() => {
    const handleResize = () => setSize(window.innerWidth);

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return size;
}
