import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl items-center justify-center px-6 py-12 lg:px-10">
      <section className="w-full rounded-[32px] border border-slate-200 bg-white/95 p-8 shadow-2xl shadow-slate-200/80 lg:p-10">
        <p className="text-sm uppercase tracking-[0.35em] text-teal-700">Page not found</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">This route does not exist in the current architecture map.</h1>
        <p className="mt-4 max-w-2xl text-slate-600">The page you tried to open is not part of this demo. Return to the main overview or explore one of the architecture views directly.</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/" className="rounded-full bg-teal-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-teal-800">Go to overview</Link>
          <Link href="/cache-demo" className="rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-200 hover:bg-white">View cache examples</Link>
        </div>
      </section>
    </main>
  );
}
