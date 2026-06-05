import { NextResponse } from 'next/server';
import { collections } from '@/lib/content';

export async function GET() {
  return NextResponse.json({ collections });
}
