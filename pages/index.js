import Head from 'next/head';
import Grid from '../components/Home/Grid';
import LaptopBanner from '../components/Home/LaptopBanner';
import PhoneBanner from '../components/Home/PhoneBanner';
import WatchBanner from '../components/Home/WatchBanner';

export default function Home() {
  return (
    <>
      <Head>
        <title>Fake Store</title>
      </Head>
      <LaptopBanner />
      <WatchBanner />
      <PhoneBanner />
      <Grid />
    </>
  );
}
