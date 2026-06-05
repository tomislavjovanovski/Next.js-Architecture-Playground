import Link from 'next/link';
import { articles, collections, homepage, trends } from '@/lib/content';

export const revalidate = 300;

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-10 px-6 py-12 lg:px-10">
      <section className="grid gap-6 rounded-[28px] border border-slate-200 bg-white/90 p-8 shadow-xl shadow-slate-200/80 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-teal-700">SSG + ISR · BFF architecture</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 md:text-6xl">Next.js Architecture Playground</h1>
          <p className="mt-4 max-w-2xl text-slate-700">{homepage.summary}</p>
          <p className="mt-3 max-w-2xl text-sm text-slate-500">A refined showcase of rendering strategy, cache design, and modern frontend architecture decisions.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/collections" className="rounded-full bg-teal-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5">Browse collections</Link>
            <Link href="/search" className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5">Try interactive search</Link>
            <Link href="/api/auth/demo?role=admin" className="rounded-full border border-teal-200 bg-teal-50 px-5 py-3 text-sm font-semibold text-teal-800 shadow-sm transition hover:-translate-y-0.5">View admin demo</Link>
          </div>
        </div>
        <aside className="rounded-[28px] border border-slate-200 bg-white/90 p-6 text-slate-900 shadow-xl shadow-slate-200/80">
          <p className="text-sm uppercase tracking-[0.35em] text-teal-700">Architecture highlights</p>
          <ul className="mt-5 space-y-4 text-sm text-slate-700">
            <li>SSR for fresh, user-specific dashboard views</li>
            <li>ISR for collection detail refreshes</li>
            <li>CSR for debounced, interactive search</li>
            <li>Middleware for protected and authorized routes</li>
          </ul>
        </aside>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {collections.slice(0, 3).map((item) => (
          <article key={item.slug} className="rounded-[24px] border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-200/80 transition hover:-translate-y-1 hover:border-teal-300">
            <p className="text-xs uppercase tracking-[0.35em] text-teal-700">{item.trend}</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">{item.title}</h2>
            <p className="mt-3 text-slate-600">{item.tagline}</p>
          </article>
        ))}
      </section>

      <section className="rounded-[28px] border border-slate-200 bg-white/90 p-8 shadow-xl shadow-slate-200/80">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-teal-700">Architecture map</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">Rendering strategy overview</h2>
            <p className="mt-3 max-w-2xl text-slate-600">Static, dynamic, and interactive layers are intentionally separated to highlight when SSR, ISR, SSG, and CSR are the right architectural choice.</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">SSG → ISR → SSR → CSR</div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {['Static marketing pages', 'Recurring content refresh', 'Session-aware views', 'Interactive search'].map((label) => (
            <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-700">{label}</div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <article className="rounded-[24px] border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-200/80 transition hover:-translate-y-1 hover:border-teal-300">
          <p className="text-xs uppercase tracking-[0.35em] text-teal-700">Architecture overview</p>
          <h3 className="mt-3 text-xl font-semibold text-slate-900">Route structure at a glance</h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-700">
            <li>• / — landing page with SSG + ISR</li>
            <li>• /collections and /collections/[slug] — server-rendered browsing + ISR detail pages</li>
            <li>• /articles and /articles/[slug] — static editorial content</li>
            <li>• /dashboard and /profile — SSR, session-aware views</li>
            <li>• /admin — SSR authorization-protected area</li>
            <li>• /search — client-side search with debounce and error states</li>
            <li>• /cache-demo — cache strategy examples for static, dynamic, and ISR flows</li>
            <li>• /api/* — route handlers acting as the BFF layer</li>
          </ul>
        </article>
        <article className="rounded-[24px] border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-200/80 transition hover:-translate-y-1 hover:border-teal-300">
          <p className="text-xs uppercase tracking-[0.35em] text-teal-700">Featured articles</p>
          {articles.slice(0, 2).map((article) => <p key={article.slug} className="mt-4 text-slate-700">• {article.title}</p>)}
        </article>
        <article className="rounded-[24px] border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-200/80 transition hover:-translate-y-1 hover:border-teal-300">
          <p className="text-xs uppercase tracking-[0.35em] text-teal-700">Trending spaces</p>
          {trends.map((trend) => <p key={trend} className="mt-4 text-slate-700">• {trend}</p>)}
        </article>
      </section>
    </main>
  );
}
