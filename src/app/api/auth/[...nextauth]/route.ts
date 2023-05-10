import NextAuth, { type NextAuthOptions } from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import client from '@/utils/client';
import { SanityAdapter } from '@/nextauth-sanity-adapter';

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  adapter: SanityAdapter(client),
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  pages: {
    signIn: '/sign-in',
  },
  session: {
    strategy: 'jwt',
  },
  // callbacks: {
  //   async jwt({ token }) {
  //     // add user role to jwt. note: user is only available on first call when user sign in, not on subsequent calls

  //     return token;
  //   },
  //   async session({ session }) {
  //     // add user role to session

  //     return session;
  //   },
  // },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
