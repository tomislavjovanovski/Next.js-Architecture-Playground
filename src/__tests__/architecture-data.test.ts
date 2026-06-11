import { renderToStaticMarkup } from 'react-dom/server';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { GET as getDashboard } from '../app/api/dashboard/route';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('architecture data flows', () => {
  it('returns dashboard data with the expected structure for user-specific views', async () => {
    const response = await getDashboard();

    expect(response.status).toBe(200);

    const payload = await response.json();

    expect(payload).toEqual({
      savedCollections: ['Atelier Oak', 'Luna Terrace'],
      preferences: ['Soft modern lighting', 'Biophilic textures'],
      recentlyViewed: ['Studio Echo'],
    });
  });

  it('exposes cache strategy labels that reflect real product trade-offs', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockImplementation(async (_input, init) => {
      return new Response(
        JSON.stringify({
          cacheMode: init?.cache ?? 'revalidate',
          revalidate: init?.next?.revalidate ?? null,
        }),
        {
          status: 200,
          headers: {
            'content-type': 'application/json',
          },
        },
      );
    });

    const { default: CacheDemoPage } = await import('../app/cache-demo/page');

    expect(CacheDemoPage).toBeDefined();

    const result = await CacheDemoPage();
    const markup = renderToStaticMarkup(result);

    expect(result).toBeTruthy();
    expect(markup).toContain('Static cache');
    expect(markup).toContain('Dynamic data');
    expect(markup).toContain('ISR cache');
    expect(fetchMock).toHaveBeenCalledTimes(3);
    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      'http://localhost:3000/api/homepage',
      expect.objectContaining({ cache: 'force-cache' }),
    );
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      'http://localhost:3000/api/homepage',
      expect.objectContaining({ cache: 'no-store' }),
    );
    expect(fetchMock).toHaveBeenNthCalledWith(
      3,
      'http://localhost:3000/api/homepage',
      expect.objectContaining({ next: { revalidate: 300 } }),
    );
  });
});
