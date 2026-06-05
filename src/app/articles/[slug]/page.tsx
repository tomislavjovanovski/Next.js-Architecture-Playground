import { notFound } from 'next/navigation';
import { articles } from '@/lib/content';

export const dynamic = 'force-static';

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);

  if (!article) notFound();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-6 px-6 py-12 lg:px-10">
      <article className="rounded-[28px] border border-slate-200 bg-white/90 p-8 shadow-xl shadow-slate-200/80">
        <p className="text-sm uppercase tracking-[0.35em] text-teal-700">SSG · static article page</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">{article.title}</h1>
        <p className="mt-3 text-slate-600">{article.excerpt}</p>
        <p className="mt-6 text-slate-700">{article.body}</p>
      </article>
    </main>
  );
}
