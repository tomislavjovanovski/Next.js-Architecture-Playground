import { NextResponse } from 'next/server';
import { collections, articles } from '@/lib/content';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') ?? '';

  const haystack = [
    ...collections.map((item) => `${item.title} ${item.tagline} ${item.style} ${item.trend}`),
    ...articles.map((item) => `${item.title} ${item.excerpt} ${item.tag}`),
  ];

  const results = haystack.filter((item) => item.toLowerCase().includes(q.toLowerCase()));

  return NextResponse.json({ results: results.slice(0, 6) });
}
