import Grid from '@/components/Grid';
import LaptopBanner from '@/components/LaptopBanner';
import PhoneBanner from '@/components/PhoneBanner';
import WatchBanner from '@/components/WatchBanner';

export default function HomePage() {
  return (
    <>
      <LaptopBanner />
      <WatchBanner />
      <PhoneBanner />
      <Grid />
    </>
  );
}
