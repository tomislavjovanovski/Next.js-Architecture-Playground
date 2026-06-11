import { afterEach, describe, expect, it, vi } from 'vitest';

const { revalidatePathMock, revalidateTagMock } = vi.hoisted(() => ({
  revalidatePathMock: vi.fn(),
  revalidateTagMock: vi.fn(),
}));

vi.mock('next/cache', () => ({
  revalidatePath: revalidatePathMock,
  revalidateTag: revalidateTagMock,
}));

import { GET as getCollections } from '../app/api/collections/route';
import { GET as getSearch } from '../app/api/search/route';
import { GET as setDemoRole } from '../app/api/auth/demo/route';
import { GET as logout } from '../app/api/auth/logout/route';
import { POST as revalidateContent } from '../app/api/revalidate/route';

afterEach(() => {
  vi.clearAllMocks();
  vi.doUnmock('@/lib/content');
});

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

  it('matches search queries case-insensitively', async () => {
    const response = await getSearch(new Request('http://localhost/api/search?q=OAK'));

    expect(response.status).toBe(200);

    const payload = await response.json();

    expect(payload.results.length).toBeGreaterThan(0);
    expect(payload.results.join(' ').toLowerCase()).toContain('oak');
  });

  it('returns the available searchable entries for an empty query without exceeding the UI cap', async () => {
    const response = await getSearch(new Request('http://localhost/api/search'));

    expect(response.status).toBe(200);

    const payload = await response.json();

    expect(payload.results).toHaveLength(5);
    expect(payload.results.length).toBeLessThanOrEqual(6);
  });

  it('caps search results at six items when many entries match', async () => {
    vi.resetModules();
    vi.doMock('@/lib/content', () => ({
      collections: Array.from({ length: 4 }, (_, index) => ({
        slug: `collection-${index}`,
        title: `Match collection ${index}`,
        tagline: 'Match-ready concept',
        description: 'Match description',
        palette: ['Ivory'],
        style: 'Match style',
        trend: 'Match trend',
      })),
      articles: Array.from({ length: 4 }, (_, index) => ({
        slug: `article-${index}`,
        title: `Match article ${index}`,
        excerpt: 'Match excerpt',
        body: 'Match body',
        tag: 'Match tag',
      })),
    }));

    const { GET } = await import('../app/api/search/route');
    const response = await GET(new Request('http://localhost/api/search?q=match'));

    expect(response.status).toBe(200);

    const payload = await response.json();

    expect(payload.results).toHaveLength(6);
  });

  it('sets the demo role cookie and redirects for the auth demo route', async () => {
    const response = await setDemoRole(new Request('http://localhost/api/auth/demo?role=admin'));

    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toBe('http://localhost/');

    const cookie = response.headers.get('set-cookie');
    expect(cookie).toContain('demo-role=admin');
    expect(cookie).toContain('HttpOnly');
    expect(cookie?.toLowerCase()).toContain('samesite=lax');
  });

  it('defaults the demo role cookie to viewer when no role is provided', async () => {
    const response = await setDemoRole(new Request('http://localhost/api/auth/demo'));

    expect(response.status).toBe(307);

    const cookie = response.headers.get('set-cookie');
    expect(cookie).toContain('demo-role=viewer');
  });

  it('clears the demo role cookie on logout', async () => {
    const response = await logout(new Request('http://localhost/api/auth/logout'));

    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toBe('http://localhost/');

    const cookie = response.headers.get('set-cookie');
    expect(cookie).toContain('demo-role=');
    expect(cookie).toContain('Max-Age=0');
    expect(cookie).toContain('HttpOnly');
  });

  it('revalidates the expected paths and tags for CMS-driven content refreshes', async () => {
    const response = await revalidateContent();

    expect(response.status).toBe(200);
    expect(revalidatePathMock).toHaveBeenNthCalledWith(1, '/');
    expect(revalidatePathMock).toHaveBeenNthCalledWith(2, '/articles');
    expect(revalidateTagMock).toHaveBeenCalledWith('cms', 'default');

    const payload = await response.json();
    expect(payload).toEqual({ revalidated: true });
  });
});
