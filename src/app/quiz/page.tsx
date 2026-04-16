'use client';

import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { vocab, VocabEntry } from '@/data/vocab';
import { vocabLists, getWordsForLists } from '@/data/lists';
import { saveQuizSession, updateWordProgress, adjustDifficultyOnQuiz, getWordsByDifficulty, getDifficultyCounts, Difficulty } from '@/lib/progress';
import WordCard from '@/components/WordCard';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickOptions(correctMeaning: string, allMeanings: string[]): string[] {
  const others = allMeanings.filter((m) => m !== correctMeaning);
  const picked = shuffle(others).slice(0, 3);
  return shuffle([correctMeaning, ...picked]);
}

const DIFF_COLORS: Record<Difficulty, string> = {
  new: 'border-blue-400 bg-blue-50 text-blue-700',
  hard: 'border-incorrect bg-incorrect/10 text-incorrect',
  medium: 'border-amber-400 bg-amber-50 text-amber-700',
  easy: 'border-correct bg-correct/10 text-correct',
};

type Source = 'lists' | 'difficulty';

export default function QuizPage() {
  const [source, setSource] = useState<Source>('lists');
  const [selectedLists, setSelectedLists] = useState<number[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('hard');
  const [diffLimit, setDiffLimit] = useState(20);
  const [counts, setCounts] = useState<Record<Difficulty, number>>({ new: 0, hard: 0, medium: 0, easy: 0 });

  const [started, setStarted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [direction, setDirection] = useState<'lat-eng' | 'eng-lat'>('lat-eng');
  const [diffWords, setDiffWords] = useState<VocabEntry[]>([]);

  useEffect(() => {
    getDifficultyCounts().then(setCounts);
  }, [started]);

  const toggleList = (id: number) => {
    setSelectedLists((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const startFromLists = () => {
    setDiffWords([]);
    setStarted(true);
  };

  const startFromDifficulty = async () => {
    const words = await getWordsByDifficulty(selectedDifficulty);
    const latinSet = new Set(words.slice(0, diffLimit).map((w: { latin: string }) => w.latin));
    const matched = shuffle(vocab.filter(v => latinSet.has(v.latin)));
    setDiffWords(matched);
    setStarted(true);
  };

  const filtered = useMemo(() => {
    if (diffWords.length > 0) return diffWords;
    const words = getWordsForLists(selectedLists);
    return shuffle(words);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, diffWords]);

  const allMeanings = useMemo(() => {
    const pool = filtered.length >= 4 ? filtered : vocab;
    return [...new Set(pool.map((v) => direction === 'lat-eng' ? v.meanings : v.latin))];
  }, [filtered, direction]);

  const finished = started && questionIndex >= filtered.length;
  const current = finished ? filtered[0] : filtered[questionIndex];
  const correctAnswer = direction === 'lat-eng' ? current?.meanings : current?.latin;
  const prompt = direction === 'lat-eng' ? current?.latin : current?.meanings;

  const options = useMemo(() => {
    if (!current) return [];
    return pickOptions(correctAnswer, allMeanings);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionIndex, current, correctAnswer, allMeanings]);

  const wordResults = useRef<{ latin: string; correct: boolean }[]>([]);

  const [idk, setIdk] = useState(false);

  const handleSelect = useCallback(
    (option: string) => {
      if (selected) return;
      setSelected(option);
      setTotal((t) => t + 1);
      const isCorrect = option === correctAnswer;
      if (isCorrect) {
        setScore((s) => s + 1);
      }
      wordResults.current.push({ latin: current.latin, correct: isCorrect });
      adjustDifficultyOnQuiz(current.latin, isCorrect);
    },
    [selected, correctAnswer, current]
  );

  const handleIdk = useCallback(() => {
    if (selected) return;
    setSelected('__idk__');
    setIdk(true);
    setTotal((t) => t + 1);
    wordResults.current.push({ latin: current.latin, correct: false });
    adjustDifficultyOnQuiz(current.latin, false);
  }, [selected, current]);

  const next = () => {
    setSelected(null);
    setIdk(false);
    const nextIdx = questionIndex + 1;
    if (nextIdx >= filtered.length) {
      const results = wordResults.current;
      const totalQ = results.length;
      const correctQ = results.filter(r => r.correct).length;
      saveQuizSession({
        mode: 'quiz',
        direction,
        listsUsed: selectedLists,
        totalQuestions: totalQ,
        correctAnswers: correctQ,
      });
      updateWordProgress(results);
    }
    setQuestionIndex(nextIdx);
  };

  const restart = () => {
    setStarted(false);
    setQuestionIndex(0);
    setScore(0);
    setTotal(0);
    setSelected(null);
    setIdk(false);
    wordResults.current = [];
    setDiffWords([]);
  };

  // Picker
  if (!started) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-accent mb-6">Multiple Choice Quiz</h1>

        {/* Source toggle */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setSource('lists')}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${source === 'lists' ? 'bg-accent text-white border-accent' : 'border-card-border bg-card-bg'}`}
          >
            By List
          </button>
          <button
            onClick={() => setSource('difficulty')}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${source === 'difficulty' ? 'bg-accent text-white border-accent' : 'border-card-border bg-card-bg'}`}
          >
            By Difficulty
          </button>
        </div>

        {source === 'lists' && (
          <>
            <p className="text-sm text-foreground/60 mb-4">
              Select lists to quiz on (leave all unchecked for all words):
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {vocabLists.map((list) => (
                <label
                  key={list.id}
                  className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedLists.includes(list.id)
                      ? 'border-accent bg-accent/5 shadow-sm'
                      : 'border-card-border bg-card-bg hover:border-accent-light'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedLists.includes(list.id)}
                    onChange={() => toggleList(list.id)}
                    className="accent-accent mt-0.5"
                  />
                  <div>
                    <span className="font-semibold">{list.label}</span>
                    <span className="block text-sm text-foreground/50">{list.range}</span>
                    <span className="block text-xs text-foreground/40">{list.words.length} words</span>
                  </div>
                </label>
              ))}
            </div>
          </>
        )}

        {source === 'difficulty' && (
          <>
            <p className="text-sm text-foreground/60 mb-4">Choose a difficulty to quiz on:</p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {(['new', 'hard', 'medium', 'easy'] as Difficulty[]).map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDifficulty(d)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    selectedDifficulty === d ? DIFF_COLORS[d] : 'border-card-border bg-card-bg hover:border-accent-light'
                  }`}
                >
                  <span className="font-semibold capitalize">{d}</span>
                  <span className="block text-sm text-foreground/50 mt-0.5">{counts[d]} words</span>
                </button>
              ))}
            </div>
            <div className="mb-6">
              <label className="text-sm text-foreground/60 block mb-2">
                How many words? <span className="font-semibold">{diffLimit}</span>
              </label>
              <input
                type="range"
                min={5}
                max={Math.max(counts[selectedDifficulty], 5)}
                value={Math.min(diffLimit, Math.max(counts[selectedDifficulty], 5))}
                onChange={(e) => setDiffLimit(Number(e.target.value))}
                className="w-full accent-accent"
              />
              <div className="flex justify-between text-xs text-foreground/40">
                <span>5</span>
                <span>{Math.max(counts[selectedDifficulty], 5)}</span>
              </div>
            </div>
          </>
        )}

        <div className="flex flex-wrap gap-3 mb-4 text-sm">
          <button
            onClick={() => { setDirection(direction === 'lat-eng' ? 'eng-lat' : 'lat-eng'); }}
            className="px-3 py-1.5 rounded-lg border border-card-border bg-card-bg hover:bg-accent-light/10"
          >
            {direction === 'lat-eng' ? 'Latin → English' : 'English → Latin'}
          </button>
        </div>

        {source === 'lists' ? (
          <button
            onClick={startFromLists}
            className="px-6 py-2.5 rounded-lg bg-accent text-white font-medium hover:bg-accent/90"
          >
            Start Quiz ({selectedLists.length === 0 ? 'all 450' : getWordsForLists(selectedLists).length} words)
          </button>
        ) : (
          <button
            onClick={startFromDifficulty}
            disabled={counts[selectedDifficulty] === 0}
            className="px-6 py-2.5 rounded-lg bg-accent text-white font-medium hover:bg-accent/90 disabled:opacity-40"
          >
            Start Quiz ({Math.min(diffLimit, counts[selectedDifficulty])} words)
          </button>
        )}
      </div>
    );
  }

  // Quiz finished
  if (finished) {
    const results = wordResults.current;
    const totalQ = results.length;
    const correctQ = results.filter(r => r.correct).length;
    const wrong = results.filter(r => !r.correct);
    return (
      <div className="max-w-2xl mx-auto px-4 py-10 text-center">
        <h1 className="text-2xl font-bold text-accent mb-4">Quiz Complete!</h1>
        <div className="rounded-xl border border-card-border bg-card-bg p-8 mb-6">
          <p className="text-5xl font-bold mb-2">{correctQ} / {totalQ}</p>
          <p className="text-lg text-foreground/60">
            {totalQ > 0 ? Math.round((correctQ / totalQ) * 100) : 0}% correct
          </p>
        </div>
        {wrong.length > 0 && (
          <div className="text-left mb-6">
            <h2 className="font-semibold mb-3">Words to revise:</h2>
            <div className="space-y-2">
              {wrong.map((r, i) => {
                const entry = filtered.find(w => w.latin === r.latin);
                return (
                  <div key={i} className="flex justify-between items-center px-4 py-2 rounded-lg border border-incorrect/20 bg-incorrect/5 text-sm">
                    <span className="font-medium">{r.latin}</span>
                    <span className="text-foreground/60">{entry?.meanings}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <button onClick={restart} className="px-6 py-2.5 rounded-lg bg-accent text-white font-medium hover:bg-accent/90">
          Try Again
        </button>
      </div>
    );
  }

  if (!current) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10">
        <p className="text-foreground/50">No words available.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={restart} className="text-sm text-accent hover:underline">
          &larr; Back to setup
        </button>
        <h1 className="text-2xl font-bold text-accent">Quiz</h1>
      </div>

      <div className="flex justify-between items-center mb-4 text-sm text-foreground/60">
        <span>Question {total + 1} / {filtered.length}</span>
        <span>
          Score: {score}/{total} {total > 0 && `(${Math.round((score / total) * 100)}%)`}
        </span>
      </div>

      <div className="rounded-xl border border-card-border bg-card-bg p-6 mb-4 text-center">
        <p className="text-sm text-foreground/50 mb-2">
          What does this {direction === 'lat-eng' ? 'Latin word' : 'English word'} mean?
        </p>
        <p className="text-3xl font-bold">{prompt}</p>
        {direction === 'lat-eng' && current.forms && current.forms !== 'indeclinable' && (
          <p className="text-sm text-foreground/40 mt-1">{current.forms}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-2 mb-4">
        {options.map((option) => {
          let bg = 'bg-card-bg hover:bg-accent-light/10';
          let border = 'border-card-border';
          if (selected) {
            if (option === correctAnswer) {
              bg = 'bg-correct/10';
              border = 'border-correct';
            } else if (option === selected && selected !== '__idk__') {
              bg = 'bg-incorrect/10';
              border = 'border-incorrect';
            }
          }
          return (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              disabled={!!selected}
              className={`w-full text-left px-4 py-3 rounded-lg border ${border} ${bg} transition-colors ${selected ? 'cursor-default' : 'cursor-pointer'}`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {/* IDK button */}
      {!selected && (
        <div className="text-center mb-4">
          <button
            onClick={handleIdk}
            className="px-4 py-2 rounded-lg border-2 border-foreground/20 text-foreground/40 text-sm font-medium hover:border-foreground/40 hover:text-foreground/60 transition-all"
          >
            I don&apos;t know
          </button>
        </div>
      )}

      {selected && (
        <div className="space-y-4">
          <div className="text-center">
            <p className={`text-sm font-medium mb-3 ${selected === correctAnswer ? 'text-correct' : 'text-incorrect'}`}>
              {selected === correctAnswer
                ? 'Correct!'
                : idk
                ? `The answer was: ${correctAnswer}`
                : `Wrong — the answer was: ${correctAnswer}`}
            </p>
          </div>

          {/* Show word card on wrong/idk answers */}
          {selected !== correctAnswer && (
            <WordCard word={current} />
          )}

          <div className="text-center">
            <button
              onClick={next}
              className="px-5 py-2 rounded-lg bg-accent text-white font-medium hover:bg-accent/90"
            >
              Next Question
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
