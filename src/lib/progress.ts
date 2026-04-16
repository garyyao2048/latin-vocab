import { supabase, getUserId } from './supabase';

export async function saveQuizSession(params: {
  mode: 'quiz' | 'practice';
  direction: 'lat-eng' | 'eng-lat';
  listsUsed: number[];
  totalQuestions: number;
  correctAnswers: number;
}) {
  const user_id = await getUserId();
  if (!user_id) return;
  await supabase.from('quiz_sessions').insert({
    user_id,
    mode: params.mode,
    direction: params.direction,
    lists_used: params.listsUsed,
    total_questions: params.totalQuestions,
    correct_answers: params.correctAnswers,
  });
}

export async function updateWordProgress(results: { latin: string; correct: boolean }[]) {
  const user_id = await getUserId();
  if (!user_id) return;
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
        user_id,
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
  const user_id = await getUserId();
  if (!user_id) return;
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
      user_id,
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

export async function getAllWordDifficulties(): Promise<Record<string, Difficulty>> {
  const { data } = await supabase.from('word_difficulty').select('latin, difficulty');
  const map: Record<string, Difficulty> = {};
  (data ?? []).forEach((d: { latin: string; difficulty: string }) => {
    map[d.latin] = d.difficulty as Difficulty;
  });
  return map;
}

const DIFF_ORDER: Difficulty[] = ['hard', 'medium', 'easy'];

function getStreaks(): Record<string, number> {
  if (typeof window === 'undefined') return {};
  try { return JSON.parse(localStorage.getItem('latin_streaks') || '{}'); } catch { return {}; }
}

function saveStreaks(streaks: Record<string, number>) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('latin_streaks', JSON.stringify(streaks));
}

export async function adjustDifficultyOnQuiz(latin: string, correct: boolean) {
  const user_id = await getUserId();
  if (!user_id) return;
  const { data } = await supabase
    .from('word_difficulty')
    .select('difficulty')
    .eq('latin', latin)
    .single();

  const streaks = getStreaks();

  if (!data) {
    await supabase.from('word_difficulty').insert({
      user_id,
      latin,
      difficulty: correct ? 'medium' : 'hard',
    });
    streaks[latin] = correct ? 1 : 0;
    saveStreaks(streaks);
    return;
  }

  const currentDiff = data.difficulty as Difficulty;
  const streak = streaks[latin] ?? 0;

  if (!correct) {
    const currentIdx = DIFF_ORDER.indexOf(currentDiff);
    const newDiff = currentIdx <= 0 ? 'hard' : DIFF_ORDER[currentIdx - 1];
    await setWordDifficulty(latin, newDiff);
    streaks[latin] = 0;
    saveStreaks(streaks);
  } else {
    const newStreak = streak + 1;
    if (newStreak >= 3) {
      const currentIdx = DIFF_ORDER.indexOf(currentDiff);
      const newDiff = currentIdx >= DIFF_ORDER.length - 1 ? 'easy' : DIFF_ORDER[currentIdx + 1];
      await setWordDifficulty(latin, newDiff);
      streaks[latin] = 0;
    } else {
      streaks[latin] = newStreak;
    }
    saveStreaks(streaks);
  }
}
