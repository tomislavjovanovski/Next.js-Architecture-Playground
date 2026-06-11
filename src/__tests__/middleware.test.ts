import { describe, expect, it } from 'vitest';
import { NextRequest } from 'next/server';

import { config, middleware } from '../../middleware';

describe('middleware', () => {
  it('redirects unauthenticated users away from protected dashboard pages', () => {
    const request = new NextRequest('http://localhost/dashboard');

    const response = middleware(request);

    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toBe('http://localhost/?auth=login-required');
  });

  it('redirects unauthorized users away from admin routes', () => {
    const request = new NextRequest('http://localhost/admin');

    const response = middleware(request);

    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toBe('http://localhost/?auth=forbidden');
  });

  it('redirects unauthenticated users away from protected profile pages', () => {
    const request = new NextRequest('http://localhost/profile');

    const response = middleware(request);

    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toBe('http://localhost/?auth=login-required');
  });

  it('allows authenticated users to access protected dashboard pages', () => {
    const request = new NextRequest('http://localhost/dashboard', {
      headers: {
        cookie: 'demo-role=viewer',
      },
    });

    const response = middleware(request);

    expect(response.status).toBe(200);
  });

  it('allows admin users to access protected admin routes', () => {
    const request = new NextRequest('http://localhost/admin', {
      headers: {
        cookie: 'demo-role=admin',
      },
    });

    const response = middleware(request);

    expect(response.status).toBe(200);
  });

  it('passes through API requests without blocking them', () => {
    const request = new NextRequest('http://localhost/api/homepage');

    const response = middleware(request);

    expect(response.status).toBe(200);
  });

  it('protects only the intended route groups through the middleware matcher', () => {
    expect(config.matcher).toEqual(['/dashboard/:path*', '/profile/:path*', '/admin/:path*']);
  });
});
