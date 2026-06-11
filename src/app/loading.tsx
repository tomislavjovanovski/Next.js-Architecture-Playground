export default function Loading() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl items-center justify-center px-6 py-12 lg:px-10">
      <section className="w-full rounded-[32px] border border-slate-200 bg-white/90 p-8 shadow-2xl shadow-slate-200/80 lg:p-10">
        <div className="h-3 w-32 rounded-full bg-teal-100" />
        <div className="mt-4 h-10 w-3/4 rounded-2xl bg-slate-100" />
        <div className="mt-4 h-4 w-full rounded-full bg-slate-100" />
        <div className="mt-3 h-4 w-2/3 rounded-full bg-slate-100" />

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
              <div className="h-3 w-24 rounded-full bg-slate-200" />
              <div className="mt-4 h-4 w-full rounded-full bg-slate-200" />
              <div className="mt-2 h-4 w-5/6 rounded-full bg-slate-200" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
