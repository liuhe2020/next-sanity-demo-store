'use server';

import { authOptions } from '@/components/auth-options';
import { sanityClient } from '@/utils/client';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

export const getUserBag = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) return null;
    const data = await sanityClient.fetch(`*[_type == "user" && _id == "${session.user.id}"]{bag}[0]`);
    return data;
  } catch (e) {
    return null;
  }
};

export const updateUserBag = async (input: string) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) return null;
    await sanityClient.patch(session.user.id).set({ bag: input }).commit();
  } catch (e) {
    return null;
  }
};

export const getSearch = async (input: string) => {
  try {
    if (!input.length) return null;
    const products = await sanityClient.fetch(
      `*[_type == 'product' && (name match '*${input}*' || category match '*${input}*' || description match '*${input}*')]`
    );
    return products;
  } catch (e) {
    return null;
  }
};

export const updateProfile = async ({ name, email }: { name: string; email: string }) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) return null;
    const updatedUser = await sanityClient.patch(session.user.id).set({ name, email }).commit();
    return updatedUser;
  } catch (e) {
    return null;
  }
};
