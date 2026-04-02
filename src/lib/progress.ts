import { supabase } from './supabase';

export async function saveQuizSession(params: {
  mode: 'quiz' | 'practice';
  direction: 'lat-eng' | 'eng-lat';
  listsUsed: number[];
  totalQuestions: number;
  correctAnswers: number;
}) {
  await supabase.from('quiz_sessions').insert({
    mode: params.mode,
    direction: params.direction,
    lists_used: params.listsUsed,
    total_questions: params.totalQuestions,
    correct_answers: params.correctAnswers,
  });
}

export async function updateWordProgress(results: { latin: string; correct: boolean }[]) {
  for (const r of results) {
    const { data } = await supabase
      .from('word_progress')
      .select('times_seen, times_correct')
      .eq('latin', r.latin)
      .single();

    if (data) {
      await supabase
        .from('word_progress')
        .update({
          times_seen: data.times_seen + 1,
          times_correct: data.times_correct + (r.correct ? 1 : 0),
          last_seen_at: new Date().toISOString(),
        })
        .eq('latin', r.latin);
    } else {
      await supabase.from('word_progress').insert({
        latin: r.latin,
        times_seen: 1,
        times_correct: r.correct ? 1 : 0,
      });
    }
  }
}

export async function getWeakWords(limit = 20) {
  const { data } = await supabase
    .from('word_progress')
    .select('*')
    .gt('times_seen', 0)
    .order('times_correct', { ascending: true })
    .order('times_seen', { ascending: false })
    .limit(limit);
  return data ?? [];
}

export async function getRecentSessions(limit = 20) {
  const { data } = await supabase
    .from('quiz_sessions')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);
  return data ?? [];
}
