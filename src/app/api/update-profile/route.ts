import client from '@/utils/client';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(request: Request) {
  if (!request.body) return NextResponse.json({ message: 'No request body.' }, { status: 400 });

  console.log(request.body);

  const requestData = await request.json();
  // get user/session
  const session = await getServerSession(authOptions);

  if (session?.user) {
    const updatedUser = await client.patch(session.user.id).set({ name: requestData.name, email: requestData.email }).commit();
    if (updatedUser) return NextResponse.json({ message: 'User updated' }, { status: 200 });
    return NextResponse.json({ message: 'Failed to update user' }, { status: 500 });
  }

  return NextResponse.json({ message: 'Failed to update user' }, { status: 400 });
}
