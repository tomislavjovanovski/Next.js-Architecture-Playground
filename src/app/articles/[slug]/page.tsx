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
      <article className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <p className="text-sm uppercase tracking-[0.35em] text-emerald-600">{article.tag}</p>
        <h1 className="mt-3 text-4xl font-semibold text-zinc-950">{article.title}</h1>
        <p className="mt-3 text-zinc-600">{article.excerpt}</p>
        <p className="mt-6 text-zinc-700">{article.body}</p>
      </article>
    </main>
  );
}
