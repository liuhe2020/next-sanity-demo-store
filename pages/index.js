import Head from 'next/head';
import MainBanner from '../components/Home/MainBanner';

import mySanityClient from '../utils/client';

export default function Home({ products }) {
  return (
    <>
      <Head>
        <title>Fake Store</title>
      </Head>
      <MainBanner />
    </>
  );
}
