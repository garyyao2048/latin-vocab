'use client';

import { useEffect, useState } from 'react';
import { getRecentSessions, getWeakWords } from '@/lib/progress';
import { vocab } from '@/data/vocab';

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

export default function ProgressPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [weakWords, setWeakWords] = useState<WordProg[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getRecentSessions(), getWeakWords()])
      .then(([s, w]) => {
        setSessions(s as Session[]);
        setWeakWords(w as WordProg[]);
      })
      .finally(() => setLoading(false));
  }, []);

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
