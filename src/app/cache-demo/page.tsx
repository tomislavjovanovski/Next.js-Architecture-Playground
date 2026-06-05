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

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-6 py-12 lg:px-10">
      <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <p className="text-sm uppercase tracking-[0.35em] text-emerald-600">Cache strategies</p>
        <h1 className="mt-3 text-4xl font-semibold text-zinc-950">Cache strategy examples</h1>
        <p className="mt-3 text-zinc-600">This page demonstrates three practical cache patterns: force-cache for static content, no-store for fresh user data, and ISR for periodic refreshes.</p>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {[
          { title: 'Static cache', description: 'Use force-cache for stable, evergreen content that should be reused aggressively.', example: staticExample },
          { title: 'Dynamic data', description: 'Use no-store for session-sensitive content that must always be fresh.', example: dynamicExample },
          { title: 'ISR cache', description: 'Use next.revalidate to refresh content periodically without rebuilding everything.', example: isrExample },
        ].map((item) => (
          <article key={item.title} className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.35em] text-emerald-600">{item.title}</p>
            <p className="mt-3 text-zinc-600">{item.description}</p>
            <pre className="mt-4 rounded-2xl bg-zinc-950 p-4 text-xs text-emerald-100">{JSON.stringify(item.example, null, 2)}</pre>
          </article>
        ))}
      </section>
    </main>
  );
}
