import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL('/', request.url);
  const response = NextResponse.redirect(url);
  response.cookies.set('demo-role', '', { httpOnly: true, maxAge: 0 });
  return response;
}
