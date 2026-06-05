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
      <section className="rounded-[28px] border border-slate-200 bg-white/90 p-8 text-slate-900 shadow-xl shadow-slate-200/80">
        <p className="text-sm uppercase tracking-[0.35em] text-teal-700">Server Components</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">Collections</h1>
        <p className="mt-3 max-w-3xl text-slate-600">This route fetches directly on the server, demonstrates search params, and keeps the client bundle lean.</p>
      </section>

      <form className="flex gap-3 rounded-[24px] border border-slate-200 bg-white/90 p-4 shadow-xl shadow-slate-200/80">
        <input
          name="q"
          defaultValue={q}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none ring-0 placeholder:text-slate-400"
          placeholder="Search by collection, style, or vibe"
        />
        <button className="rounded-xl bg-teal-700 px-5 py-3 text-sm font-semibold text-white">Filter</button>
      </form>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((item) => (
          <article key={item.slug} className="rounded-[24px] border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-200/80 transition hover:-translate-y-1 hover:border-teal-300">
            <p className="text-xs uppercase tracking-[0.35em] text-teal-700">{item.trend}</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">{item.title}</h2>
            <p className="mt-3 text-slate-600">{item.tagline}</p>
            <p className="mt-4 text-sm text-slate-500">Palette: {item.palette.join(' · ')}</p>
            <Link href={`/collections/${item.slug}`} className="mt-6 inline-flex rounded-full bg-teal-700 px-4 py-2 text-sm font-semibold text-white">Open detail view</Link>
          </article>
        ))}
      </section>
    </main>
  );
}
