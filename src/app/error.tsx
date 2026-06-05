"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl items-center justify-center px-6 py-12 lg:px-10">
      <section className="rounded-3xl border border-rose-200 bg-white p-8 text-zinc-700 shadow-sm">
        <p className="text-sm uppercase tracking-[0.35em] text-rose-600">Runtime error</p>
        <h1 className="mt-3 text-3xl font-semibold text-zinc-950">Something went wrong while rendering this architecture view.</h1>
        <button onClick={() => reset()} className="mt-6 rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white">Try again</button>
      </section>
    </main>
  );
}
