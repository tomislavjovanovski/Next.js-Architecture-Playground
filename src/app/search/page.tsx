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
      <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <p className="text-sm uppercase tracking-[0.35em] text-emerald-600">CSR</p>
        <h1 className="mt-3 text-4xl font-semibold text-zinc-950">Interactive search</h1>
        <p className="mt-3 text-zinc-600">This client-side route now uses debounced input, loading feedback, and graceful errors to demonstrate modern client architecture more clearly.</p>
      </section>

      <label className="rounded-2xl border border-zinc-200 bg-white p-4 text-sm shadow-sm">
        <span className="mb-2 block text-zinc-500">Search</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="w-full bg-transparent outline-none text-zinc-950"
          placeholder="Search for moods, materials, or collections"
        />
      </label>

      {loading ? <p className="text-sm text-zinc-500">Searching…</p> : null}
      {error ? <p className="rounded-2xl bg-rose-50 p-4 text-sm text-rose-700">{error}</p> : null}

      {!loading && !error && results.length === 0 && query.trim() ? (
        <p className="rounded-2xl bg-zinc-100 p-4 text-sm text-zinc-600">No matches yet. Try another phrase.</p>
      ) : null}

      <ul className="grid gap-4 md:grid-cols-2">
        {results.map((item) => (
          <li key={item} className="rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm">{item}</li>
        ))}
      </ul>
    </main>
  );
}
