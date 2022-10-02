import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import client from '../../../utils/client';

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
//     res.send({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       isAdmin: user.isAdmin,
//       token,
//     });
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
        const { email, password } = credentials;
        if (!email || !password) throw new Error('Missing email/password');
        if (email === 'john@gmail.com' && password === 'password')
          return { username: 'John', id: '123' };
        throw new Error('Incorrect username/password');
      },
    }),
  ],
});
