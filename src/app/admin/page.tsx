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
      <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <p className="text-sm uppercase tracking-[0.35em] text-emerald-600">Authorization · SSR</p>
        <h1 className="mt-3 text-4xl font-semibold text-zinc-950">Admin area</h1>
        <p className="mt-3 text-zinc-600">This route demonstrates role-based access and middleware protection in a tangible way.</p>
      </section>
    </main>
  );
}
