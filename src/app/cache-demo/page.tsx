export const dynamic = 'force-dynamic';

async function fetchDemo(label: string, init: RequestInit) {
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const response = await fetch(`${origin}/api/homepage`, init);
  return { label, ok: response.ok, data: await response.json() };
}

export default async function CacheDemoPage() {
  const staticExample = await fetchDemo('Static cache', { cache: 'force-cache' });
  const dynamicExample = await fetchDemo('Dynamic data', { cache: 'no-store' });
  const isrExample = await fetchDemo('ISR cache', { next: { revalidate: 300 } });

  const cards = [
    {
      title: 'Static cache',
      badge: 'Best for evergreen content',
      description: 'Use force-cache when the page is mostly stable and should be reused aggressively across requests.',
      whyItMatters: 'Great for landing pages, editorial content, and SEO-first surfaces where freshness is less critical than speed.',
      example: staticExample,
    },
    {
      title: 'Dynamic data',
      badge: 'Best for live or user-specific content',
      description: 'Use no-store for data that must always reflect the latest session, permissions, or backend state.',
      whyItMatters: 'This is the correct choice for dashboards, protected views, and anything that cannot tolerate stale responses.',
      example: dynamicExample,
    },
    {
      title: 'ISR cache',
      badge: 'Best for periodic refreshes',
      description: 'Use next.revalidate to keep content mostly static while still refreshing it in the background at a controlled interval.',
      whyItMatters: 'This is the practical middle ground for collection pages, CMS-driven content, and frequently updated but not real-time pages.',
      example: isrExample,
    },
  ];

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-6 py-12 lg:px-10">
      <section className="rounded-[28px] border border-slate-200 bg-white/90 p-8 shadow-xl shadow-slate-200/80 lg:p-10">
        <p className="text-sm uppercase tracking-[0.35em] text-teal-700">Cache patterns · real-world reasoning</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">Cache strategy examples</h1>
        <p className="mt-3 max-w-3xl text-slate-600">This page shows how cache policy becomes an architectural decision. The same data source can be served with very different freshness and performance characteristics depending on the product requirement.</p>
        <p className="mt-3 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">Architecture focus: fetch caching, revalidation, server-side freshness, product trade-offs, and explicit use cases for static, dynamic, and ISR behavior.</p>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {cards.map((item) => (
          <article key={item.title} className="flex min-h-full flex-col rounded-[24px] border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-200/80 transition hover:-translate-y-1 hover:border-teal-300">
            <p className="text-xs uppercase tracking-[0.35em] text-teal-700">{item.badge}</p>
            <h2 className="mt-3 text-xl font-semibold text-slate-900">{item.title}</h2>
            <p className="mt-3 text-slate-600">{item.description}</p>
            <p className="mt-4 rounded-2xl bg-teal-50 p-3 text-sm text-teal-800">Why it matters: {item.whyItMatters}</p>
            <pre className="mt-4 overflow-x-auto rounded-2xl bg-slate-50 p-4 text-xs text-slate-700 whitespace-pre-wrap break-words">{JSON.stringify(item.example, null, 2)}</pre>
          </article>
        ))}
      </section>
    </main>
  );
}
