// export { default } from "next-auth/middleware";
import { withAuth } from 'next-auth/middleware';
// import { NextRequest, NextResponse } from 'next/server';

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    // console.log('token: ', req.nextauth.token);
    // if (req.nextUrl.pathname.startsWith('/account') && !req.nextauth.token)
    //   return NextResponse.rewrite(new URL('/auth/login?message=You Are Not Authorized!', req.url));
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ['/account/:path*'],
};
