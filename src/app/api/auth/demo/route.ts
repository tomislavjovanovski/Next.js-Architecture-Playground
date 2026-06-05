import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const role = searchParams.get('role') ?? 'viewer';
  const url = new URL('/', request.url);
  const response = NextResponse.redirect(url);
  response.cookies.set('demo-role', role, { httpOnly: true, sameSite: 'lax' });
  return response;
}
