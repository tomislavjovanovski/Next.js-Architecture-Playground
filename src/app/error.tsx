"use client";

import Link from 'next/link';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl items-center justify-center px-6 py-12 lg:px-10">
      <section className="w-full rounded-[32px] border border-rose-200 bg-white/95 p-8 shadow-2xl shadow-rose-100 lg:p-10">
        <p className="text-sm uppercase tracking-[0.35em] text-rose-600">Runtime error</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">This architecture view failed to render cleanly.</h1>
        <p className="mt-4 max-w-2xl text-slate-600">The page hit an unexpected runtime issue. You can retry the request or return to the main architecture overview.</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={() => reset()}
            className="rounded-full bg-teal-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-teal-800"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-200 hover:bg-white"
          >
            Return home
          </Link>
        </div>
      </section>
    </main>
  );
}
