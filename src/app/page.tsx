import Link from 'next/link';
import { articles, collections, homepage, trends } from '@/lib/content';

export const revalidate = 300;

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-10 px-6 py-12 lg:px-10">
      <section className="grid gap-6 rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-emerald-600">SSG + ISR · BFF architecture</p>
          <h1 className="mt-3 text-4xl font-semibold text-zinc-950 md:text-5xl">Interior Design Experience Platform</h1>
          <p className="mt-4 max-w-2xl text-zinc-600">{homepage.summary}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/collections" className="rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white">Browse collections</Link>
            <Link href="/search" className="rounded-full border border-zinc-300 px-5 py-3 text-sm font-semibold text-zinc-800">Try interactive search</Link>
            <Link href="/api/auth/demo?role=admin" className="rounded-full border border-emerald-300 px-5 py-3 text-sm font-semibold text-emerald-700">Login as admin</Link>
          </div>
        </div>
        <aside className="rounded-3xl bg-zinc-950 p-6 text-white shadow-2xl shadow-black/10">
          <p className="text-sm uppercase tracking-[0.35em] text-emerald-300">Architecture highlights</p>
          <ul className="mt-5 space-y-4 text-sm text-zinc-200">
            <li>SSR for user-specific dashboard views</li>
            <li>ISR for collection detail refreshes</li>
            <li>CSR for debounced search interactions</li>
            <li>Middleware for protected routes</li>
          </ul>
        </aside>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {collections.slice(0, 3).map((item) => (
          <article key={item.slug} className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.35em] text-emerald-600">{item.trend}</p>
            <h2 className="mt-3 text-2xl font-semibold text-zinc-950">{item.title}</h2>
            <p className="mt-3 text-zinc-600">{item.tagline}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <article className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.35em] text-emerald-600">Featured articles</p>
          {articles.slice(0, 2).map((article) => <p key={article.slug} className="mt-4 text-zinc-700">• {article.title}</p>)}
        </article>
        <article className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.35em] text-emerald-600">Trending spaces</p>
          {trends.map((trend) => <p key={trend} className="mt-4 text-zinc-700">• {trend}</p>)}
        </article>
      </section>
    </main>
  );
}
