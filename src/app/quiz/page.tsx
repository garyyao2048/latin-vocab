'use client';

import { useState, useMemo, useCallback } from 'react';
import { vocab } from '@/data/vocab';

const POS_FILTERS = ['all', 'noun', 'verb', 'adjective', 'adverb', 'preposition', 'conjunction', 'pronoun'] as const;

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

export default function QuizPage() {
  const [posFilter, setPosFilter] = useState<string>('all');
  const [restrictedOnly, setRestrictedOnly] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [direction, setDirection] = useState<'lat-eng' | 'eng-lat'>('lat-eng');

  const filtered = useMemo(() => {
    const list = vocab.filter((v) => {
      if (posFilter !== 'all' && !v.partOfSpeech.includes(posFilter)) return false;
      if (restrictedOnly && !v.isRestricted) return false;
      return true;
    });
    return shuffle(list);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posFilter, restrictedOnly]);

  const allMeanings = useMemo(() => {
    const pool = filtered.length >= 4 ? filtered : vocab;
    return [...new Set(pool.map((v) => direction === 'lat-eng' ? v.meanings : v.latin))];
  }, [filtered, direction]);

  const current = filtered[questionIndex % filtered.length];
  const correctAnswer = direction === 'lat-eng' ? current?.meanings : current?.latin;
  const prompt = direction === 'lat-eng' ? current?.latin : current?.meanings;

  const options = useMemo(() => {
    if (!current) return [];
    return pickOptions(correctAnswer, allMeanings);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionIndex, current, correctAnswer, allMeanings]);

  const handleSelect = useCallback(
    (option: string) => {
      if (selected) return;
      setSelected(option);
      setTotal((t) => t + 1);
      if (option === correctAnswer) {
        setScore((s) => s + 1);
      }
    },
    [selected, correctAnswer]
  );

  const next = () => {
    setSelected(null);
    setQuestionIndex((i) => i + 1);
  };

  const restart = () => {
    setQuestionIndex(0);
    setScore(0);
    setTotal(0);
    setSelected(null);
  };

  if (!current) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-accent mb-6">Multiple Choice Quiz</h1>
        <p className="text-foreground/50">No words match your filters.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-accent mb-6">Multiple Choice Quiz</h1>

      {/* Controls */}
      <div className="flex flex-wrap gap-3 mb-6 text-sm">
        <select
          value={posFilter}
          onChange={(e) => { setPosFilter(e.target.value); restart(); }}
          className="px-3 py-1.5 rounded-lg border border-card-border bg-card-bg"
        >
          {POS_FILTERS.map((p) => (
            <option key={p} value={p}>{p === 'all' ? 'All parts of speech' : p.charAt(0).toUpperCase() + p.slice(1) + 's'}</option>
          ))}
        </select>

        <label className="flex items-center gap-1.5 cursor-pointer">
          <input
            type="checkbox"
            checked={restrictedOnly}
            onChange={(e) => { setRestrictedOnly(e.target.checked); restart(); }}
            className="accent-accent"
          />
          Restricted list only
        </label>

        <button
          onClick={() => { setDirection(direction === 'lat-eng' ? 'eng-lat' : 'lat-eng'); restart(); }}
          className="px-3 py-1.5 rounded-lg border border-card-border bg-card-bg hover:bg-accent-light/10"
        >
          {direction === 'lat-eng' ? 'Latin → English' : 'English → Latin'}
        </button>
      </div>

      {/* Score */}
      <div className="flex justify-between items-center mb-4 text-sm text-foreground/60">
        <span>Question {total + 1}</span>
        <span>
          Score: {score}/{total} {total > 0 && `(${Math.round((score / total) * 100)}%)`}
        </span>
      </div>

      {/* Question */}
      <div className="rounded-xl border border-card-border bg-card-bg p-6 mb-4 text-center">
        <p className="text-sm text-foreground/50 mb-2">
          What does this {direction === 'lat-eng' ? 'Latin word' : 'English word'} mean?
        </p>
        <p className="text-3xl font-bold">{prompt}</p>
        {direction === 'lat-eng' && current.forms && current.forms !== 'indeclinable' && (
          <p className="text-sm text-foreground/40 mt-1">{current.forms}</p>
        )}
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 gap-2 mb-4">
        {options.map((option) => {
          let bg = 'bg-card-bg hover:bg-accent-light/10';
          let border = 'border-card-border';
          if (selected) {
            if (option === correctAnswer) {
              bg = 'bg-correct/10';
              border = 'border-correct';
            } else if (option === selected) {
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

      {/* Next */}
      {selected && (
        <div className="text-center">
          <p className={`text-sm font-medium mb-3 ${selected === correctAnswer ? 'text-correct' : 'text-incorrect'}`}>
            {selected === correctAnswer ? 'Correct!' : `Wrong — the answer was: ${correctAnswer}`}
          </p>
          <button
            onClick={next}
            className="px-5 py-2 rounded-lg bg-accent text-white font-medium hover:bg-accent/90"
          >
            Next Question
          </button>
        </div>
      )}
    </div>
  );
}
