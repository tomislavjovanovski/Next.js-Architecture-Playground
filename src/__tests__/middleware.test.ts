import { describe, expect, it } from 'vitest';
import { NextRequest } from 'next/server';

import { middleware } from '../../middleware';

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
});
