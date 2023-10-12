import { NextResponse } from 'next/server';

export default function middleware(request) {
  const path = request.nextUrl.pathname;

  // Check if the user is trying to access a public path
  const isPublicPath = path === '/login' || path === '/signup';

  // Get the token from the 'token' cookie
  const token = request.cookies.get('token');

  // If it's a public path and the user is logged in, redirect to the homepage
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  // If it's a protected path and the user is not logged in, redirect to the login page
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  // If the user is authorized or accessing a public page, allow the request to continue
  return NextResponse.next();
}

export const config = {
  // Include all possible paths that this middleware will apply to
  matcher: [
    '/login',
    '/signup',
    '/component/:path*',
    '/templates/:path*',
  ],
};
