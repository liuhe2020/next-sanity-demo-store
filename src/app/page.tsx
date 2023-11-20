import Grid from '@/components/grid';
import LaptopBanner from '@/components/laptop-banner';
import PhoneBanner from '@/components/phone-banner';
import WatchBanner from '@/components/watch-banner';

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
