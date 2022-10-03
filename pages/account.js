import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Router from 'next/router';

export default function account() {
  const { data: session, status } = useSession();

  console.log(session);

  useEffect(() => {
    if (status === 'unauthenticated') Router.replace('/sign-in');
  }, [status]);

  if (status === 'authenticated') return <>account</>;

  return <div>account</div>;
}
