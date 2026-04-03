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

export type Difficulty = 'new' | 'hard' | 'medium' | 'easy';

export async function setWordDifficulty(latin: string, difficulty: Difficulty) {
  const { data } = await supabase
    .from('word_difficulty')
    .select('id')
    .eq('latin', latin)
    .single();

  if (data) {
    await supabase
      .from('word_difficulty')
      .update({ difficulty, updated_at: new Date().toISOString() })
      .eq('latin', latin);
  } else {
    await supabase.from('word_difficulty').insert({
      latin,
      difficulty,
    });
  }
}

export async function getWordsByDifficulty(difficulty?: Difficulty) {
  let query = supabase.from('word_difficulty').select('*').order('updated_at', { ascending: false });
  if (difficulty) query = query.eq('difficulty', difficulty);
  const { data } = await query;
  return data ?? [];
}

export async function getDifficultyCounts() {
  const { data } = await supabase.from('word_difficulty').select('difficulty');
  const counts = { new: 0, hard: 0, medium: 0, easy: 0 };
  (data ?? []).forEach((d: { difficulty: string }) => {
    if (d.difficulty in counts) counts[d.difficulty as Difficulty]++;
  });
  return counts;
}
