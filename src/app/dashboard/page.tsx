import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const role = cookieStore.get('demo-role')?.value ?? 'viewer';

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-6 py-12 lg:px-10">
      <section className="rounded-[28px] border border-slate-200 bg-white/90 p-8 shadow-xl shadow-slate-200/80">
        <p className="text-sm uppercase tracking-[0.35em] text-teal-700">SSR · Session-aware rendering</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">Authenticated dashboard</h1>
        <p className="mt-3 text-slate-600">This route uses cookies and dynamic rendering so the page reflects the current user context on every request. It is a strong example of SSR for fresh, role-aware, user-specific dashboard content.</p>
        <p className="mt-3 rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">Architecture use: SSR, role-based context, dynamic cookies, and session-aware content composition.</p>
        <p className="mt-3 rounded-2xl bg-teal-50 p-3 text-sm text-teal-800">Current demo session role: {role}</p>
      </section>
      <section className="grid gap-6 lg:grid-cols-3">
        {['Saved collections', 'Preferences', 'Recently viewed'].map((item) => (
          <article key={item} className="rounded-[24px] border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-200/80 transition hover:-translate-y-1 hover:border-teal-300">{item}</article>
        ))}
      </section>
    </main>
  );
}
