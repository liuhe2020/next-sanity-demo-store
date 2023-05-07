import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import client from '../../../../utils/client';

export const authOptions = {
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/sign-in',
    error: '/sign-in',
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials, req) {
        // credentials is an object containing email & password from the reqeust body
        const { email, password } = credentials;
        // fetch user from sanity
        const userData = await client.fetch(`*[_type == "user" && email == '${email}'][0]{_id, name, email, password, bag}`);

        // authenticate user
        if (userData) {
          const matching = await bcrypt.compare(password, userData.password);
          if (matching) {
            const user = {
              _id: userData._id,
              name: userData.name,
              email: userData.email,
              bag: userData.bag,
              orders: userData.orders,
            };
            return user;
          }
          return null;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },
};

export default NextAuth(authOptions);
