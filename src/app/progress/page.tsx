'use client';

import { useEffect, useState } from 'react';
import { getRecentSessions, getWeakWords, getDifficultyCounts, getWordsByDifficulty, Difficulty } from '@/lib/progress';
import { vocab } from '@/data/vocab';
import Link from 'next/link';

interface Session {
  id: string;
  created_at: string;
  mode: string;
  direction: string;
  lists_used: number[];
  total_questions: number;
  correct_answers: number;
  score_pct: number;
}

interface WordProg {
  latin: string;
  times_seen: number;
  times_correct: number;
  last_seen_at: string;
}

const DIFF_COLORS: Record<Difficulty, string> = {
  new: 'border-blue-400 bg-blue-50 text-blue-700',
  hard: 'border-incorrect bg-incorrect/10 text-incorrect',
  medium: 'border-amber-400 bg-amber-50 text-amber-700',
  easy: 'border-correct bg-correct/10 text-correct',
};

export default function ProgressPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [weakWords, setWeakWords] = useState<WordProg[]>([]);
  const [diffCounts, setDiffCounts] = useState<Record<Difficulty, number>>({ new: 0, hard: 0, medium: 0, easy: 0 });
  const [expandedDiff, setExpandedDiff] = useState<Difficulty | null>(null);
  const [diffWords, setDiffWords] = useState<{ latin: string; updated_at: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getRecentSessions(), getWeakWords(), getDifficultyCounts()])
      .then(([s, w, dc]) => {
        setSessions(s as Session[]);
        setWeakWords(w as WordProg[]);
        setDiffCounts(dc);
      })
      .finally(() => setLoading(false));
  }, []);

  const toggleDiffExpand = async (d: Difficulty) => {
    if (expandedDiff === d) { setExpandedDiff(null); return; }
    const words = await getWordsByDifficulty(d);
    setDiffWords(words as { latin: string; updated_at: string }[]);
    setExpandedDiff(d);
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-accent mb-6">Progress</h1>
        <p className="text-foreground/50">Loading...</p>
      </div>
    );
  }

  const totalSessions = sessions.length;
  const avgScore = totalSessions > 0
    ? Math.round(sessions.reduce((sum, s) => sum + Number(s.score_pct), 0) / totalSessions)
    : 0;
  const totalWords = sessions.reduce((sum, s) => sum + s.total_questions, 0);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-accent mb-6">Progress</h1>

      {/* Overview stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="rounded-xl border border-card-border bg-card-bg p-4 text-center">
          <p className="text-3xl font-bold">{totalSessions}</p>
          <p className="text-xs text-foreground/50">Sessions</p>
        </div>
        <div className="rounded-xl border border-card-border bg-card-bg p-4 text-center">
          <p className="text-3xl font-bold">{avgScore}%</p>
          <p className="text-xs text-foreground/50">Avg Score</p>
        </div>
        <div className="rounded-xl border border-card-border bg-card-bg p-4 text-center">
          <p className="text-3xl font-bold">{totalWords}</p>
          <p className="text-xs text-foreground/50">Words Tested</p>
        </div>
      </div>

      {/* Difficulty sections */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Words by Difficulty</h2>
          <Link href="/flashcards" className="text-sm text-accent hover:underline">
            Revisit in Flashcards &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-4 gap-3 mb-3">
          {(['new', 'hard', 'medium', 'easy'] as Difficulty[]).map((d) => (
            <button
              key={d}
              onClick={() => toggleDiffExpand(d)}
              className={`p-3 rounded-xl border-2 text-center transition-all cursor-pointer ${
                expandedDiff === d ? DIFF_COLORS[d] : 'border-card-border bg-card-bg hover:border-accent-light'
              }`}
            >
              <p className="text-2xl font-bold">{diffCounts[d]}</p>
              <p className="text-xs capitalize">{d}</p>
            </button>
          ))}
        </div>
        {expandedDiff && diffWords.length > 0 && (
          <div className="rounded-xl border border-card-border bg-card-bg p-4">
            <h3 className="font-medium capitalize mb-2">{expandedDiff} words ({diffWords.length})</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-sm">
              {diffWords.map((w) => {
                const entry = vocab.find(v => v.latin === w.latin);
                return (
                  <div key={w.latin} className="px-2 py-1 rounded bg-accent/[0.03]">
                    <span className="font-medium">{w.latin}</span>
                    {entry && <span className="text-foreground/40 ml-1">— {entry.meanings.split(',')[0]}</span>}
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {expandedDiff && diffWords.length === 0 && (
          <p className="text-sm text-foreground/40 text-center py-2">No words in this category yet.</p>
        )}
      </section>

      {/* Weak words */}
      {weakWords.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3">Words to Focus On</h2>
          <div className="space-y-2">
            {weakWords.map((w) => {
              const entry = vocab.find((v) => v.latin === w.latin);
              const pct = w.times_seen > 0 ? Math.round((w.times_correct / w.times_seen) * 100) : 0;
              return (
                <div key={w.latin} className="flex items-center justify-between px-4 py-2 rounded-lg border border-card-border bg-card-bg text-sm">
                  <div>
                    <span className="font-medium">{w.latin}</span>
                    {entry && <span className="text-foreground/50 ml-2">— {entry.meanings}</span>}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`font-mono ${pct < 50 ? 'text-incorrect' : pct < 75 ? 'text-accent' : 'text-correct'}`}>
                      {pct}%
                    </span>
                    <span className="text-xs text-foreground/40">{w.times_correct}/{w.times_seen}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Recent sessions */}
      <section>
        <h2 className="text-lg font-semibold mb-3">Recent Sessions</h2>
        {sessions.length === 0 ? (
          <p className="text-foreground/50 text-sm">No sessions yet. Complete a quiz or practice to see your history.</p>
        ) : (
          <div className="space-y-2">
            {sessions.map((s) => (
              <div key={s.id} className="flex items-center justify-between px-4 py-3 rounded-lg border border-card-border bg-card-bg text-sm">
                <div>
                  <span className="font-medium capitalize">{s.mode}</span>
                  <span className="text-foreground/40 ml-2">
                    {s.direction} &middot; {s.lists_used.length > 0 ? `Lists ${s.lists_used.join(', ')}` : 'All words'}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`font-bold ${Number(s.score_pct) >= 75 ? 'text-correct' : Number(s.score_pct) >= 50 ? 'text-accent' : 'text-incorrect'}`}>
                    {s.score_pct}%
                  </span>
                  <span className="text-xs text-foreground/40">
                    {s.correct_answers}/{s.total_questions}
                  </span>
                  <span className="text-xs text-foreground/30">
                    {new Date(s.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
