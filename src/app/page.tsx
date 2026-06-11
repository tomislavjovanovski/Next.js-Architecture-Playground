import Link from 'next/link';
import { articles, collections, homepage, trends } from '@/lib/content';

export const revalidate = 300;

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-10 px-6 py-12 lg:px-10">
      <section className="grid gap-6 rounded-[28px] border border-slate-200 bg-white/90 p-8 shadow-xl shadow-slate-200/80 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-teal-700">Senior Next.js · architecture-first demo</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 md:text-6xl">Senior Next.js Architecture Playground</h1>
          <p className="mt-4 max-w-2xl text-slate-700">{homepage.summary}</p>
          <p className="mt-3 max-w-2xl text-sm text-slate-500">Designed to show senior-level judgment around rendering boundaries, cache strategy, middleware, auth flows, and production-minded route design.</p>
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

      <section className="grid gap-6 md:grid-cols-3">
        {[
          'App Router, route handlers, and a clear BFF layer',
          'SSR + ISR + CSR boundaries chosen intentionally for real product trade-offs',
          'Middleware, auth, and cache/revalidation patterns that reflect production architecture thinking',
        ].map((item) => (
          <article key={item} className="rounded-[24px] border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-200/80">
            <p className="text-xs uppercase tracking-[0.35em] text-teal-700">Recruiter proof point</p>
            <p className="mt-3 text-slate-700">{item}</p>
          </article>
        ))}
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
          <h3 className="mt-3 text-xl font-semibold text-slate-900">Route map & rendering decisions</h3>
          <p className="mt-3 text-sm text-slate-600">This playground intentionally splits content, user-specific views, and interactive experiences across different rendering models.</p>
          <ul className="mt-4 space-y-3 text-sm text-slate-700">
            <li><strong>/</strong> — SSG + ISR landing page for fast marketing content and cacheable entry points.</li>
            <li><strong>/collections</strong> — server-rendered collection browsing with direct server data access and lightweight filtering.</li>
            <li><strong>/collections/[slug]</strong> — ISR detail pages that refresh automatically after the revalidation window.</li>
            <li><strong>/articles</strong> and <strong>/articles/[slug]</strong> — static content pages optimized for SEO and evergreen editorial copy.</li>
            <li><strong>/dashboard</strong> and <strong>/profile</strong> — SSR views that reflect the current session, role, and permission context.</li>
            <li><strong>/admin</strong> — SSR authorization-protected route that demonstrates middleware + role-aware access.</li>
            <li><strong>/search</strong> — CSR route with debounced user input, loading, and error states for interactive search UX.</li>
            <li><strong>/cache-demo</strong> — explicit examples of force-cache, no-store, and ISR strategies in practice.</li>
            <li><strong>/api/*</strong> — BFF-style route handlers that centralize data and revalidation logic for the frontend.</li>
          </ul>
          <p className="mt-4 rounded-2xl bg-slate-50 p-3 text-xs text-slate-600">Additional focus areas: middleware, route protection, cache tuning, server/client boundary design, and content-model separation.</p>
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
