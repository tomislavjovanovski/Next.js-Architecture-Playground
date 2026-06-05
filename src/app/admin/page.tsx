import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const cookieStore = await cookies();
  const role = cookieStore.get('demo-role')?.value;

  if (role !== 'admin') {
    redirect('/');
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-6 py-12 lg:px-10">
      <section className="rounded-[28px] border border-slate-200 bg-white/90 p-8 shadow-xl shadow-slate-200/80">
        <p className="text-sm uppercase tracking-[0.35em] text-teal-700">SSR · Authorization pattern</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">Admin area</h1>
        <p className="mt-3 max-w-3xl text-slate-600">This route demonstrates role-based access and middleware protection in a tangible way. It shows how server-rendered pages can enforce access rules before the UI is even rendered.</p>
        <p className="mt-3 rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">Architecture use: SSR, middleware enforcement, role-aware access control, and protected route design.</p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        {[
          'Protected route enforcement',
          'Role-aware rendering decisions',
          'Middleware policy at the edge',
          'Architecture review ready summary',
        ].map((item) => (
          <article key={item} className="rounded-[24px] border border-slate-200 bg-white/90 p-6 text-slate-700 shadow-xl shadow-slate-200/80 transition hover:-translate-y-1 hover:border-teal-300">{item}</article>
        ))}
      </section>
    </main>
  );
}
