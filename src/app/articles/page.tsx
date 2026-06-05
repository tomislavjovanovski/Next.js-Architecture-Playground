import Link from 'next/link';
import { articles } from '@/lib/content';

export const dynamic = 'force-static';

export default function ArticlesPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-6 py-12 lg:px-10">
      <section className="rounded-[28px] border border-slate-200 bg-white/90 p-8 shadow-xl shadow-slate-200/80">
        <p className="text-sm uppercase tracking-[0.35em] text-teal-700">Static Rendering</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">Designer Articles</h1>
        <p className="mt-3 max-w-3xl text-slate-600">Static pages are ideal for evergreen editorial content and SEO-friendly article listings.</p>
      </section>
      <section className="grid gap-6 md:grid-cols-2">
        {articles.map((article) => (
          <article key={article.slug} className="rounded-[24px] border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-200/80 transition hover:-translate-y-1 hover:border-teal-300">
            <p className="text-xs uppercase tracking-[0.35em] text-teal-700">{article.tag}</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">{article.title}</h2>
            <p className="mt-3 text-slate-600">{article.excerpt}</p>
            <Link href={`/articles/${article.slug}`} className="mt-6 inline-flex rounded-full bg-teal-700 px-4 py-2 text-sm font-semibold text-white">Read article</Link>
          </article>
        ))}
      </section>
    </main>
  );
}
