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
          `*[_type == "user" && email == '${email}'][0]`
        );
        const user = {
          _id: userData._id,
          name: userData.name,
          email: userData.email,
          bag: userData.bag,
        };
        return user;
        // authenticate user
        // if (userData) {
        //   bcrypt.compare(password, userData.password, (err, res) => {
        //     const user = {
        //       _id: userData._id,
        //       name: userData.name,
        //       email: userData.email,
        //       bag: userData.bag,
        //     };
        //     if (res) return user;
        //     return null;
        //   });
        //   return user;
        // }
        // return null;
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
