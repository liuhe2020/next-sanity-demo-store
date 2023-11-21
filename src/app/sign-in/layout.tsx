import { authOptions } from '@/components/auth-options';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'DS | Sign In',
  description: 'Next Sanity Demo Store sign in page',
};

export default async function SignInPageLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  session && redirect('/account');

  return <>{children}</>;
}
