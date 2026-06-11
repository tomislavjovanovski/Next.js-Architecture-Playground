import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Senior Next.js Architecture Playground",
  description: "A recruiter-friendly Next.js 15 showcase of SSR, SSG, ISR, CSR, middleware, auth, caching, and BFF patterns.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-slate-900">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/85 backdrop-blur-xl">
          <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-10">
            <a href="/" className="text-lg font-semibold tracking-[0.18em] text-teal-700 uppercase">Next.js Architecture Playground</a>
            <div className="flex flex-wrap gap-3 text-sm text-slate-700">
              <a href="/collections">Collections</a>
              <a href="/articles">Articles</a>
              <a href="/dashboard">Dashboard</a>
              <a href="/search">Search</a>
              <a href="/cache-demo">Cache Demo</a>
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
