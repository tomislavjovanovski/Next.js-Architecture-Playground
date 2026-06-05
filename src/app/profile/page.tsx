import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const role = cookieStore.get('demo-role')?.value ?? 'viewer';

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-8 px-6 py-12 lg:px-10">
      <section className="rounded-[28px] border border-slate-200 bg-white/90 p-8 shadow-xl shadow-slate-200/80">
        <p className="text-sm uppercase tracking-[0.35em] text-teal-700">SSR</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">Profile overview</h1>
        <p className="mt-3 text-slate-600">This profile view is rendered dynamically to reflect the current session and permission context with the same refined card treatment as the rest of the app.</p>
        <p className="mt-4 rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">Role context: {role}</p>
      </section>
      <section className="grid gap-6 md:grid-cols-2">
        {['Identity context', 'Preference summary', 'Permission-aware UI', 'Architecture notes'].map((item) => (
          <article key={item} className="rounded-[24px] border border-slate-200 bg-white/90 p-6 text-slate-700 shadow-xl shadow-slate-200/80 transition hover:-translate-y-1 hover:border-teal-300">{item}</article>
        ))}
      </section>
    </main>
  );
}
