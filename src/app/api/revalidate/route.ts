import { NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST() {
  revalidatePath('/');
  revalidatePath('/articles');
  revalidateTag('cms', 'default');

  return NextResponse.json({ revalidated: true });
}
