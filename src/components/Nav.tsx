'use client';

import Link from 'next/link';
import { useAuth } from './AuthProvider';
import { signOut } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function Nav() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) return null;

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  return (
    <nav className="border-b border-card-border bg-card-bg/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-6">
        <Link href="/" className="text-lg font-bold text-accent tracking-tight">
          Latin GCSE
        </Link>
        <div className="flex flex-wrap gap-4 text-sm font-medium flex-1">
          <Link href="/flashcards" className="hover:text-accent transition-colors">Flashcards</Link>
          <Link href="/quiz" className="hover:text-accent transition-colors">Quiz</Link>
          <Link href="/practice" className="hover:text-accent transition-colors">Practice</Link>
          <Link href="/declensions" className="hover:text-accent transition-colors">Declensions</Link>
          <Link href="/conjugations" className="hover:text-accent transition-colors">Conjugations</Link>
          <Link href="/grammar" className="hover:text-accent transition-colors">Grammar</Link>
          <Link href="/dictionary" className="hover:text-accent transition-colors">Dictionary</Link>
          <Link href="/progress" className="hover:text-accent transition-colors">Progress</Link>
        </div>
        <button
          onClick={handleSignOut}
          className="text-xs text-foreground/40 hover:text-foreground/70 transition-colors whitespace-nowrap"
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
}
