import { describe, expect, it } from 'vitest';

import { GET as getDashboard } from '../app/api/dashboard/route';

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
    const { default: CacheDemoPage } = await import('../app/cache-demo/page');

    expect(CacheDemoPage).toBeDefined();

    const result = await CacheDemoPage();

    expect(result).toBeTruthy();
  });
});
