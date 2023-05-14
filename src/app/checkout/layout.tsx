import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DS | Checkout',
  description: 'Next Sanity Demo Store checkout page',
};

export default function CheckoutPageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
