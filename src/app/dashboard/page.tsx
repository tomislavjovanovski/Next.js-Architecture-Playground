import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const role = cookieStore.get('demo-role')?.value ?? 'viewer';

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-6 py-12 lg:px-10">
      <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <p className="text-sm uppercase tracking-[0.35em] text-emerald-600">SSR · Always fresh</p>
        <h1 className="mt-3 text-4xl font-semibold text-zinc-950">Authenticated dashboard</h1>
        <p className="mt-3 text-zinc-600">This route uses cookies and dynamic rendering, which makes it an ideal example for user-specific views.</p>
        <p className="mt-3 rounded-2xl bg-emerald-50 p-3 text-sm text-emerald-700">Current demo session role: {role}</p>
      </section>
      <section className="grid gap-6 lg:grid-cols-3">
        {['Saved collections', 'Preferences', 'Recently viewed'].map((item) => (
          <article key={item} className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">{item}</article>
        ))}
      </section>
    </main>
  );
}
