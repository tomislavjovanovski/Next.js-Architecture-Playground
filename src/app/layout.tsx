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
  title: "Next.js Architecture Playground",
  description: "A Next.js architecture showcase for SSG, SSR, ISR, CSR, middleware, and route handlers.",
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
      <body className="min-h-full flex flex-col">
        <header className="border-b border-zinc-200 bg-white/90 backdrop-blur">
          <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-10">
            <a href="/" className="text-lg font-semibold text-zinc-950">Next.js Architecture Playground</a>
            <div className="flex flex-wrap gap-3 text-sm text-zinc-600">
              <a href="/collections">Collections</a>
              <a href="/articles">Articles</a>
              <a href="/dashboard">Dashboard</a>
              <a href="/search">Search</a>
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
