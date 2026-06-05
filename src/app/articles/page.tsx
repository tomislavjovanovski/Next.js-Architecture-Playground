import Link from 'next/link';
import { articles } from '@/lib/content';

export const dynamic = 'force-static';

export default function ArticlesPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-6 py-12 lg:px-10">
      <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <p className="text-sm uppercase tracking-[0.35em] text-emerald-600">Static Rendering</p>
        <h1 className="mt-3 text-4xl font-semibold text-zinc-950">Designer Articles</h1>
        <p className="mt-3 max-w-3xl text-zinc-600">Static pages are ideal for evergreen editorial content and SEO-friendly article listings.</p>
      </section>
      <section className="grid gap-6 md:grid-cols-2">
        {articles.map((article) => (
          <article key={article.slug} className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.35em] text-emerald-600">{article.tag}</p>
            <h2 className="mt-3 text-2xl font-semibold text-zinc-950">{article.title}</h2>
            <p className="mt-3 text-zinc-600">{article.excerpt}</p>
            <Link href={`/articles/${article.slug}`} className="mt-6 inline-flex rounded-full bg-zinc-950 px-4 py-2 text-sm font-semibold text-white">Read article</Link>
          </article>
        ))}
      </section>
    </main>
  );
}
