import type { Adapter } from 'next-auth/adapters';
import { type SanityClient } from 'next-sanity';
import { getUserByIdQuery, getUserByProviderAccountIdQuery, getUserByEmailQuery, getVerificationTokenQuery } from './queries';
import { uuid } from '@sanity/uuid';

export function SanityAdapter(
  client: SanityClient,
  options = {
    schemas: {
      account: 'account',
      verificationToken: 'verification-token',
      user: 'user',
    },
  }
): Adapter {
  return {
    async createUser(profile) {
      // user's name does not existing when using magic link - use email instead for name field
      if (!profile.hasOwnProperty('name')) {
        profile = { ...profile, name: profile.email };
      }
      const { _id, ...user } = await client.create({
        _id: `user.${uuid()}`,
        _type: options.schemas.user,
        role: 'unauthorized',
        ...profile,
      });

      return {
        id: _id,
        // @ts-ignore
        emailVerified: null,
        ...user,
      };
    },

    async getUser(id) {
      const user = await client.fetch(getUserByIdQuery, {
        userSchema: options.schemas.user,
        id,
      });

      if (!user) return null;

      return {
        id: user._id,
        ...user,
      };
    },

    async linkAccount({ provider, providerAccountId, refresh_token, access_token, expires_at, userId, type }) {
      await client.create({
        _type: options.schemas.account,
        providerId: provider,
        providerType: type,
        providerAccountId: `${providerAccountId}`,
        refreshToken: refresh_token,
        accessToken: access_token,
        accessTokenExpires: expires_at,
        user: {
          _type: 'reference',
          _ref: userId,
        },
      });
    },

    async createSession() {
      return {} as any;
    },

    async updateSession() {
      return {} as any;
    },

    async deleteSession() {},

    async updateUser(user) {
      // sanity stores id as _id, so we need to format user before updating
      const { id, ...userProps } = { ...user };
      const formattedUser = { _id: user.id, ...userProps };
      const { _id, ...newUser } = await client.patch(user.id!).set(formattedUser).commit<typeof user>();

      return {
        id: _id,
        emailVerified: null,
        ...(newUser as any),
      };
    },

    async getUserByEmail(email) {
      const user = await client.fetch(getUserByEmailQuery, {
        userSchema: options.schemas.user,
        email,
      });

      if (!user) return null;

      return {
        id: user._id,
        ...user,
      };
    },

    async getUserByAccount({ provider, providerAccountId }) {
      const account = await client.fetch(getUserByProviderAccountIdQuery, {
        accountSchema: options.schemas.account,
        providerId: provider,
        providerAccountId,
      });

      if (!account) return null;

      return {
        id: account.user._id,
        emailVerified: null,
        ...account.user,
      };
    },
    async getSessionAndUser() {
      return {} as any;
    },

    async createVerificationToken({ identifier, token, expires }) {
      const verificationToken = await client.create({
        _type: options.schemas.verificationToken,
        identifier,
        token,
        expires,
      });

      return verificationToken;
    },

    async useVerificationToken({ identifier, token }) {
      const verificationToken = await client.fetch(getVerificationTokenQuery, {
        verificationTokenSchema: options.schemas.verificationToken,
        identifier,
        token,
      });

      if (!verificationToken) return null;

      await client.delete(verificationToken._id);

      return {
        id: verificationToken._id,
        ...verificationToken,
      };
    },
  };
}
