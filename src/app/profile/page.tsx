import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const role = cookieStore.get('demo-role')?.value ?? 'viewer';

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-8 px-6 py-12 lg:px-10">
      <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <p className="text-sm uppercase tracking-[0.35em] text-emerald-600">SSR</p>
        <h1 className="mt-3 text-4xl font-semibold text-zinc-950">Profile overview</h1>
        <p className="mt-3 text-zinc-600">This profile view is rendered dynamically to reflect the current session and permission context.</p>
        <p className="mt-4 rounded-2xl bg-zinc-100 p-3 text-sm text-zinc-700">Role context: {role}</p>
      </section>
    </main>
  );
}
