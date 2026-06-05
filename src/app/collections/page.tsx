import Link from 'next/link';
import { collections } from '@/lib/content';

export default async function CollectionsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = '' } = await searchParams;
  const filtered = collections.filter((item) =>
    `${item.title} ${item.tagline} ${item.style}`.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-10 px-6 py-12 lg:px-10">
      <section className="rounded-3xl border border-white/10 bg-zinc-950 p-8 text-white shadow-2xl shadow-black/20">
        <p className="text-sm uppercase tracking-[0.35em] text-emerald-300">Server Components</p>
        <h1 className="mt-3 text-4xl font-semibold">Collections</h1>
        <p className="mt-3 max-w-3xl text-zinc-300">This route fetches directly on the server, demonstrates search params, and keeps the client bundle lean.</p>
      </section>

      <form className="flex gap-3 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
        <input
          name="q"
          defaultValue={q}
          className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none ring-0"
          placeholder="Search by collection, style, or vibe"
        />
        <button className="rounded-xl bg-zinc-950 px-5 py-3 text-sm font-semibold text-white">Filter</button>
      </form>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((item) => (
          <article key={item.slug} className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
            <p className="text-xs uppercase tracking-[0.35em] text-emerald-600">{item.trend}</p>
            <h2 className="mt-3 text-2xl font-semibold text-zinc-950">{item.title}</h2>
            <p className="mt-3 text-zinc-600">{item.tagline}</p>
            <p className="mt-4 text-sm text-zinc-500">Palette: {item.palette.join(' · ')}</p>
            <Link href={`/collections/${item.slug}`} className="mt-6 inline-flex rounded-full bg-zinc-950 px-4 py-2 text-sm font-semibold text-white">Open detail view</Link>
          </article>
        ))}
      </section>
    </main>
  );
}
