import ProfileForm from './profile-form';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/components/auth-options';

export default async function Profile() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) return null;

  return <ProfileForm user={session.user} />;
}
