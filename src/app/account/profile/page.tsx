import ProfileForm from './profile-form';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/components/auth-options';
import { sanityClient } from '@/utils/client';

export default async function Profile() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) return null;

  const user = await sanityClient.fetch(`*[_type == "user" && _id == "${session.user.id}"][0]`);

  return <ProfileForm user={user} />;
}
