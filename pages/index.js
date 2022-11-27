import Head from 'next/head';
import MainBanner from '../components/Home/MainBanner';

export default function Home() {
  return (
    <>
      <Head>
        <title>Fake Store</title>
      </Head>
      <MainBanner />
    </>
  );
}
