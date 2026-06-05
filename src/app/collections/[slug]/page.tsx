import { notFound } from 'next/navigation';
import { collections } from '@/lib/content';

export const revalidate = 300;

export default async function CollectionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = collections.find((item) => item.slug === slug);

  if (!collection) notFound();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-6 py-12 lg:px-10">
      <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <p className="text-sm uppercase tracking-[0.35em] text-emerald-600">ISR · 5 minute refresh</p>
        <h1 className="mt-3 text-4xl font-semibold text-zinc-950">{collection.title}</h1>
        <p className="mt-3 max-w-3xl text-zinc-600">{collection.description}</p>
      </section>
      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-3xl border border-zinc-200 bg-zinc-950 p-8 text-white shadow-sm">
          <h2 className="text-2xl font-semibold">Designer notes</h2>
          <p className="mt-4 text-zinc-300">This page uses ISR so editors can update CMS content and the live route refreshes automatically after the revalidation window.</p>
          <ul className="mt-5 space-y-3 text-zinc-200">
            <li>Style: {collection.style}</li>
            <li>Trend focus: {collection.trend}</li>
            <li>Palette: {collection.palette.join(' · ')}</li>
          </ul>
        </article>
        <article className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-zinc-950">Related architecture notes</h2>
          <p className="mt-4 text-zinc-600">ISR keeps this collection page responsive without over-relying on client-side fetching, which is ideal for editorial design content.</p>
        </article>
      </section>
    </main>
  );
}
