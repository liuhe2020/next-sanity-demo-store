// extending nextauth interface
// add id to session.user
import { DefaultSession, DefaultUser } from 'next-auth';

interface IUser extends DefaultUser {
  id?: string;
}

declare module 'next-auth/jwt' {
  interface JWT extends IUser {}
}

declare module 'next-auth' {
  interface User extends IUser {}
  interface Session {
    user?: User;
  }
}
