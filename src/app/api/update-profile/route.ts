import client from '@/utils/client';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  if (!request.body) return NextResponse.json('No request body.');

  console.log(await request.json());
}
