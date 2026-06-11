import { describe, expect, it } from 'vitest';

import { GET as getCollections } from '../app/api/collections/route';
import { GET as getSearch } from '../app/api/search/route';
import { GET as setDemoRole } from '../app/api/auth/demo/route';
import { GET as logout } from '../app/api/auth/logout/route';

describe('API routes', () => {
  it('returns the collection catalog from the content model', async () => {
    const response = await getCollections();

    expect(response.status).toBe(200);

    const payload = await response.json();

    expect(payload.collections).toHaveLength(3);
    expect(payload.collections[0]).toEqual(
      expect.objectContaining({
        slug: expect.any(String),
        title: expect.any(String),
      }),
    );
  });

  it('filters search results by the provided query string', async () => {
    const response = await getSearch(new Request('http://localhost/api/search?q=oak'));

    expect(response.status).toBe(200);

    const payload = await response.json();

    expect(payload.results.length).toBeGreaterThan(0);
    expect(payload.results.join(' ').toLowerCase()).toContain('oak');
  });

  it('sets the demo role cookie and redirects for the auth demo route', async () => {
    const response = await setDemoRole(new Request('http://localhost/api/auth/demo?role=admin'));

    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toBe('http://localhost/');

    const cookie = response.headers.get('set-cookie');
    expect(cookie).toContain('demo-role=admin');
  });

  it('clears the demo role cookie on logout', async () => {
    const response = await logout(new Request('http://localhost/api/auth/logout'));

    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toBe('http://localhost/');

    const cookie = response.headers.get('set-cookie');
    expect(cookie).toContain('demo-role=');
    expect(cookie).toContain('Max-Age=0');
  });
});
