'use client';

import { useEffect, useState } from 'react';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setError('');
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error('Search request failed');
        }

        const data = await response.json();
        setResults(data.results ?? []);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setError('Search could not be completed. Please try again.');
          setResults([]);
        }
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-6 py-12 lg:px-10">
      <section className="rounded-[28px] border border-slate-200 bg-white/90 p-8 shadow-xl shadow-slate-200/80">
        <p className="text-sm uppercase tracking-[0.35em] text-teal-700">CSR · Interactive client rendering</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">Interactive search</h1>
        <p className="mt-3 text-slate-600">This route uses client-side state and debounced fetching to deliver instant search feedback without forcing the entire page to be rendered on the client. It highlights interactive UX and browser-side behavior.</p>
        <p className="mt-3 rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">Architecture use: CSR, local state, debouncing, loading/error handling, and lightweight API-driven search experiences.</p>
      </section>

      <label className="rounded-[24px] border border-slate-200 bg-white/90 p-4 text-sm shadow-xl shadow-slate-200/80">
        <span className="mb-2 block text-slate-600">Search</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="w-full bg-transparent outline-none text-slate-800 placeholder:text-slate-400"
          placeholder="Search for moods, materials, or collections"
        />
      </label>

      {loading ? <p className="text-sm text-slate-600">Searching…</p> : null}
      {error ? <p className="rounded-2xl bg-rose-50 p-4 text-sm text-rose-700">{error}</p> : null}

      {!loading && !error && results.length === 0 && query.trim() ? (
        <p className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">No matches yet. Try another phrase.</p>
      ) : null}

      <ul className="grid gap-4 md:grid-cols-2">
        {results.map((item) => (
          <li key={item} className="rounded-[24px] border border-slate-200 bg-white/90 p-4 shadow-xl shadow-slate-200/80 text-slate-700">{item}</li>
        ))}
      </ul>
    </main>
  );
}
