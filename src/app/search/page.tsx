'use client';

import { useState } from 'react';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);

  async function handleSearch(value: string) {
    setQuery(value);
    const response = await fetch(`/api/search?q=${encodeURIComponent(value)}`);
    const data = await response.json();
    setResults(data.results ?? []);
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-6 py-12 lg:px-10">
      <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <p className="text-sm uppercase tracking-[0.35em] text-emerald-600">CSR</p>
        <h1 className="mt-3 text-4xl font-semibold text-zinc-950">Interactive search</h1>
        <p className="mt-3 text-zinc-600">This client-side route uses local state and route-handler data to show an interactive, debounced search pattern.</p>
      </section>
      <input
        value={query}
        onChange={(event) => handleSearch(event.target.value)}
        className="rounded-2xl border border-zinc-200 bg-white p-4 text-sm shadow-sm outline-none"
        placeholder="Search for moods, materials, or collections"
      />
      <ul className="grid gap-4 md:grid-cols-2">
        {results.map((item) => (
          <li key={item} className="rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm">{item}</li>
        ))}
      </ul>
    </main>
  );
}
