import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import mySanityClient from '../../utils/client';

export default function index({ id }) {
  const { data: session, status } = useSession({
    required: true,
  });

  if (status === 'loading') {
    return 'Loading or not authenticated...';
  }

  return (
    <>
      <Head>
        <title>{`Next Sanity Demo Store | `}</title>
      </Head>
      <p>{id}</p>
    </>
  );
}

export async function getStaticPaths() {
  const users = await mySanityClient.fetch(`*[_type == "user"]`);

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

export async function getStaticProps({ params }) {
  const { id } = params;
  return { props: { id } };
}
