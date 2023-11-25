'use server';

import { authOptions } from '@/components/auth-options';
import { sanityClient } from '@/utils/client';
import { getServerSession } from 'next-auth';

export const getUserBag = async () => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) return null;
  const data = await sanityClient.fetch(`*[_type == "user" && _id == "${session.user.id}"]{bag}[0]`);
  return data;
};

export const updateUserBag = async (input: string) => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) return null;
  await sanityClient.patch(session.user.id).set({ bag: input }).commit();
};

export const getSearch = async (input: string) => {
  if (!input.length) return null;
  const products = await sanityClient.fetch(
    `*[_type == 'product' && (name match '*${input}*' || category match '*${input}*' || description match '*${input}*')]`
  );
  return products;
};
