import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DS | Sign In',
  description: 'Next Sanity Demo Store sign in page',
};

export default function SignInPageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
