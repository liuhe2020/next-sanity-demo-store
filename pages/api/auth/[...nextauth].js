import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import mySanityClient from '../../../utils/client';

export default NextAuth({
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
        const userData = await mySanityClient.fetch(
          `*[_type == "user" && email == '${email}'][0]{_id, name, email, password, bag, orders[]->}`
        );

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
});
