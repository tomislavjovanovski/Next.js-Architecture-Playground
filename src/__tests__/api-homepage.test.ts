import { describe, expect, it } from 'vitest';

import { GET } from '../app/api/homepage/route';

describe('GET /api/homepage', () => {
  it('returns homepage, collections, articles, and trends for the UI', async () => {
    const response = await GET();

    expect(response.status).toBe(200);

    const payload = await response.json();

    expect(payload.homepage).toEqual(
      expect.objectContaining({
        hero: expect.any(String),
        summary: expect.any(String),
      }),
    );
    expect(payload.collections).toHaveLength(3);
    expect(payload.articles).toHaveLength(2);
    expect(Array.isArray(payload.trends)).toBe(true);
  });
});
