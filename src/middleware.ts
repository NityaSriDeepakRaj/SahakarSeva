import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('sahakar_token')?.value;
  const { pathname } = request.nextUrl;

  const isAuthRoute = pathname.startsWith('/auth');
  const isProtectedRoute = 
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/bookings') ||
    pathname.startsWith('/earnings') ||
    pathname.startsWith('/appeal') ||
    pathname.startsWith('/profile');

  // If accessing protected routes without token, redirect to /auth/signin
  if (isProtectedRoute && !token) {
    const url = new URL('/auth/signin', request.url);
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }

  // If accessing auth routes with valid token, redirect to /dashboard
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/bookings/:path*',
    '/earnings/:path*',
    '/appeal/:path*',
    '/profile/:path*',
    '/auth/:path*',
  ],
};
