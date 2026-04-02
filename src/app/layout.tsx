import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
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
  title: "Latin GCSE Vocab",
  description: "OCR GCSE Latin vocabulary revision - flashcards, quizzes, and grammar tables",
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
        <nav className="border-b border-card-border bg-card-bg/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-6">
            <Link href="/" className="text-lg font-bold text-accent tracking-tight">
              Latin GCSE
            </Link>
            <div className="flex gap-4 text-sm font-medium">
              <Link href="/flashcards" className="hover:text-accent transition-colors">
                Flashcards
              </Link>
              <Link href="/quiz" className="hover:text-accent transition-colors">
                Quiz
              </Link>
              <Link href="/declensions" className="hover:text-accent transition-colors">
                Declensions
              </Link>
              <Link href="/practice" className="hover:text-accent transition-colors">
                Practice
              </Link>
              <Link href="/grammar" className="hover:text-accent transition-colors">
                Grammar
              </Link>
              <Link href="/progress" className="hover:text-accent transition-colors">
                Progress
              </Link>
              <Link href="/conjugations" className="hover:text-accent transition-colors">
                Conjugations
              </Link>
            </div>
          </div>
        </nav>
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
