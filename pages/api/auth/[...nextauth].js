import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import mySanityClient from '../../../utils/client';

// export default async function handler(req, res) {
//   const user = await client.fetch(`*[_type == "user" && email == $email][0]`, {
//     email: req.body.email,
//   });
//   if (user && bcrypt.compareSync(req.body.password, user.password)) {
//     const token = signToken({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       isAdmin: user.isAdmin,
//     });
//     res.send();
//   } else {
//     res.status(401).send({ message: 'Invalid email or password' });
//   }
// }

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
        const user = await mySanityClient.fetch(
          `*[_type == "user" && email == '${email}'][0]`
        );
        // authenticate user
        if (user) {
          // bcrypt.compare(password, user.password, (err, res) => {
          //   if (res) return user;
          //   return null;
          // });
          return user;
        }
        return null;
      },
    }),
  ],
});
