import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    savedCollections: ['Atelier Oak', 'Luna Terrace'],
    preferences: ['Soft modern lighting', 'Biophilic textures'],
    recentlyViewed: ['Studio Echo'],
  });
}
