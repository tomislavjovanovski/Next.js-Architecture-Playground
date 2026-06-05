import { NextResponse } from 'next/server';
import { articles, collections, homepage, trends } from '@/lib/content';

export async function GET() {
  return NextResponse.json({
    homepage,
    collections: collections.slice(0, 3),
    articles: articles.slice(0, 2),
    trends,
  });
}
