'use client';
import Grid from '@/components/Grid';
import LaptopBanner from '@/components/LaptopBanner';
import PhoneBanner from '@/components/PhoneBanner';
import WatchBanner from '@/components/WatchBanner';

export default function HomePage() {
  return (
    <>
      {/* <Head>
        <title>Next Sanity Demo Store</title>
        <link rel='shortcut icon' href='/images/favicon.ico' />
      </Head> */}
      <LaptopBanner />
      <WatchBanner />
      <PhoneBanner />
      <Grid />
    </>
  );
}
