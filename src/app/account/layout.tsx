import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DS | Account',
  description: 'Next Sanity Demo Store user account page',
};

export default function AccountPageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
