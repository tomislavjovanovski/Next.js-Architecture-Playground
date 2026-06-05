import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  const role = request.cookies.get('demo-role')?.value;

  if (pathname.startsWith('/dashboard') || pathname.startsWith('/profile')) {
    if (!role) {
      return NextResponse.redirect(new URL('/?auth=login-required', request.url));
    }
  }

  if (pathname.startsWith('/admin') && role !== 'admin') {
    return NextResponse.redirect(new URL('/?auth=forbidden', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/admin/:path*'],
};
