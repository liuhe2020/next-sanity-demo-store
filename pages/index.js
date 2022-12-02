import Head from 'next/head';
import LaptopBanner from '../components/Home/LaptopBanner';
import WatchBanner from '../components/Home/WatchBanner';

export default function Home() {
  return (
    <>
      <Head>
        <title>Fake Store</title>
      </Head>
      <LaptopBanner />
      <WatchBanner />
    </>
  );
}
