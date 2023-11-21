import { authOptions } from '@/components/auth-options';
import { sanityClient } from '@/utils/client';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  if (!request.body) return NextResponse.json({ message: 'No request body.' }, { status: 400 });

  const requestData = await request.json();
  const session = await getServerSession(authOptions);

  if (session?.user) {
    const updatedUser = await sanityClient.patch(session.user.id).set({ name: requestData.name, email: requestData.email }).commit();
    if (updatedUser) {
      return NextResponse.json({ message: 'User updated' }, { status: 200 });
    }
    return NextResponse.json({ message: 'Failed to update user' }, { status: 500 });
  }

  return NextResponse.json({ message: 'Failed to update user' }, { status: 400 });
}
