'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { VocabEntry, vocab } from '@/data/vocab';
import { vocabLists, restrictedLists } from '@/data/lists';
import { setWordDifficulty, getWordsByDifficulty, getDifficultyCounts, Difficulty } from '@/lib/progress';
import { hints } from '@/data/hints';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const DIFF_COLORS: Record<Difficulty, string> = {
  new: 'border-blue-400 bg-blue-50 text-blue-700 hover:bg-blue-100',
  hard: 'border-incorrect bg-incorrect/10 text-incorrect hover:bg-incorrect/20',
  medium: 'border-amber-400 bg-amber-50 text-amber-700 hover:bg-amber-100',
  easy: 'border-correct bg-correct/10 text-correct hover:bg-correct/20',
};

type Mode = 'pick-list' | 'study' | 'pick-revisit' | 'revisit';

type WordSet = 'normal' | 'restricted';

export default function FlashcardsPage() {
  const [mode, setMode] = useState<Mode>('pick-list');
  const [wordSet, setWordSet] = useState<WordSet>('normal');
  const [selectedList, setSelectedList] = useState<number | null>(null);
  const [direction, setDirection] = useState<'lat-eng' | 'eng-lat'>('lat-eng');
  const [flipped, setFlipped] = useState(false);
  const [index, setIndex] = useState(0);
  const [shuffled, setShuffled] = useState(false);
  const [rated, setRated] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Revisit state
  const [counts, setCounts] = useState<Record<Difficulty, number>>({ new: 0, hard: 0, medium: 0, easy: 0 });
  const [revisitDifficulty, setRevisitDifficulty] = useState<Difficulty>('hard');
  const [revisitLimit, setRevisitLimit] = useState(10);
  const [revisitWords, setRevisitWords] = useState<VocabEntry[]>([]);

  useEffect(() => {
    getDifficultyCounts().then(setCounts);
  }, [mode]);

  const filtered = useMemo(() => {
    if (mode === 'revisit') return revisitWords;
    if (selectedList === null) return [];
    const allLists = wordSet === 'restricted' ? restrictedLists : vocabLists;
    const list = allLists.find((l) => l.id === selectedList)!.words;
    return shuffled ? shuffle(list) : list;
  }, [selectedList, shuffled, mode, revisitWords, wordSet]);

  const card: VocabEntry | undefined = filtered[index];

  const go = useCallback(
    (delta: number) => {
      setFlipped(false);
      setRated(false);
      setShowHint(false);
      setIndex((i) => {
        const next = i + delta;
        if (next < 0) return filtered.length - 1;
        if (next >= filtered.length) return 0;
        return next;
      });
    },
    [filtered.length]
  );

  const handleDifficulty = async (difficulty: Difficulty) => {
    if (!card || rated) return;
    setRated(true);
    await setWordDifficulty(card.latin, difficulty);
    // Auto-advance after a short delay
    setTimeout(() => go(1), 500);
  };

  const resetIndex = () => { setIndex(0); setFlipped(false); setRated(false); setShowHint(false); };

  const goBack = () => { setMode('pick-list'); setSelectedList(null); resetIndex(); };

  const startRevisit = async () => {
    const words = await getWordsByDifficulty(revisitDifficulty);
    const latinSet = new Set(words.slice(0, revisitLimit).map(w => w.latin));
    const matched = vocab.filter(v => latinSet.has(v.latin));
    setRevisitWords(shuffle(matched));
    setIndex(0);
    setFlipped(false);
    setRated(false);
    setMode('revisit');
  };

  // List picker + revisit picker
  if (mode === 'pick-list' || mode === 'pick-revisit') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-accent mb-6">Flashcards</h1>

        {/* Tab toggle */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setMode('pick-list')}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${mode === 'pick-list' ? 'bg-accent text-white border-accent' : 'border-card-border bg-card-bg'}`}
          >
            Study by List
          </button>
          <button
            onClick={() => setMode('pick-revisit')}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${mode === 'pick-revisit' ? 'bg-accent text-white border-accent' : 'border-card-border bg-card-bg'}`}
          >
            Revisit by Difficulty
          </button>
        </div>

        {mode === 'pick-list' && (
          <>
            {/* Word set toggle */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setWordSet('normal')}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${wordSet === 'normal' ? 'bg-foreground text-background border-foreground' : 'border-card-border bg-card-bg hover:border-accent-light'}`}
              >
                All Words (10 lists)
              </button>
              <button
                onClick={() => setWordSet('restricted')}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${wordSet === 'restricted' ? 'bg-foreground text-background border-foreground' : 'border-card-border bg-card-bg hover:border-accent-light'}`}
              >
                Restricted List (6 lists)
              </button>
            </div>
            <p className="text-sm text-foreground/60 mb-4">
              {wordSet === 'restricted'
                ? 'Restricted list — words you need for English → Latin translation:'
                : 'Choose a list to study:'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(wordSet === 'restricted' ? restrictedLists : vocabLists).map((list) => (
                <button
                  key={list.id}
                  onClick={() => { setSelectedList(list.id); setMode('study'); }}
                  className="text-left p-4 rounded-xl border border-card-border bg-card-bg hover:shadow-md hover:border-accent-light transition-all"
                >
                  <span className="font-semibold">{list.label}</span>
                  <span className="block text-sm text-foreground/50 mt-0.5">{list.range}</span>
                  <span className="block text-xs text-foreground/40 mt-0.5">{list.words.length} words</span>
                </button>
              ))}
            </div>
          </>
        )}

        {mode === 'pick-revisit' && (
          <>
            <p className="text-sm text-foreground/60 mb-4">Choose a difficulty to revisit:</p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {(['new', 'hard', 'medium', 'easy'] as Difficulty[]).map((d) => (
                <button
                  key={d}
                  onClick={() => setRevisitDifficulty(d)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    revisitDifficulty === d ? DIFF_COLORS[d] : 'border-card-border bg-card-bg hover:border-accent-light'
                  }`}
                >
                  <span className="font-semibold capitalize">{d}</span>
                  <span className="block text-sm text-foreground/50 mt-0.5">{counts[d]} words</span>
                </button>
              ))}
            </div>

            <div className="mb-6">
              <label className="text-sm text-foreground/60 block mb-2">
                How many words? <span className="font-semibold">{revisitLimit}</span>
              </label>
              <input
                type="range"
                min={5}
                max={Math.max(counts[revisitDifficulty], 5)}
                value={Math.min(revisitLimit, Math.max(counts[revisitDifficulty], 5))}
                onChange={(e) => setRevisitLimit(Number(e.target.value))}
                className="w-full accent-accent"
              />
              <div className="flex justify-between text-xs text-foreground/40">
                <span>5</span>
                <span>{Math.max(counts[revisitDifficulty], 5)}</span>
              </div>
            </div>

            <button
              onClick={startRevisit}
              disabled={counts[revisitDifficulty] === 0}
              className="px-6 py-2.5 rounded-lg bg-accent text-white font-medium hover:bg-accent/90 disabled:opacity-40"
            >
              Start Revisit ({Math.min(revisitLimit, counts[revisitDifficulty])} words)
            </button>
          </>
        )}
      </div>
    );
  }

  // Study / Revisit mode
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={goBack} className="text-sm text-accent hover:underline">
          &larr; Back
        </button>
        <h1 className="text-2xl font-bold text-accent">
          {mode === 'revisit'
            ? `Revisit: ${revisitDifficulty.charAt(0).toUpperCase() + revisitDifficulty.slice(1)}`
            : vocabLists.find((l) => l.id === selectedList)?.label}
        </h1>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-3 mb-6 text-sm">
        {mode === 'study' && (
          <button
            onClick={() => { setShuffled(!shuffled); resetIndex(); }}
            className="px-3 py-1.5 rounded-lg border border-card-border bg-card-bg hover:bg-accent-light/10"
          >
            {shuffled ? 'Unshuffle' : 'Shuffle'}
          </button>
        )}
        <button
          onClick={() => { setDirection(direction === 'lat-eng' ? 'eng-lat' : 'lat-eng'); setFlipped(false); }}
          className="px-3 py-1.5 rounded-lg border border-card-border bg-card-bg hover:bg-accent-light/10"
        >
          {direction === 'lat-eng' ? 'Latin → English' : 'English → Latin'}
        </button>
      </div>

      {/* Card */}
      {card ? (() => {
        const hint = hints[card.latin];
        return (
        <>
          <div className="text-sm text-foreground/50 mb-2 text-center">
            {index + 1} / {filtered.length}
          </div>
          <div
            className="flip-card w-full h-64 cursor-pointer select-none"
            onClick={() => setFlipped(!flipped)}
          >
            <div className={`flip-card-inner relative w-full h-full ${flipped ? 'flipped' : ''}`}>
              <div className="flip-card-front absolute inset-0 flex flex-col items-center justify-center rounded-xl border border-card-border bg-card-bg shadow-sm p-6">
                <span className="text-3xl font-bold mb-2">
                  {direction === 'lat-eng' ? card.latin : card.meanings}
                </span>
                {direction === 'lat-eng' && card.details && (
                  <span className="text-sm text-foreground/50">
                    {card.partOfSpeech} {card.details}
                  </span>
                )}
                <span className="text-xs text-foreground/30 mt-4">tap to flip</span>
              </div>
              <div className="flip-card-back absolute inset-0 flex flex-col items-center justify-center rounded-xl border border-accent-light bg-accent/5 shadow-sm p-6">
                <span className="text-2xl font-bold mb-2">
                  {direction === 'lat-eng' ? card.meanings : card.latin}
                </span>
                <span className="text-sm text-foreground/60 mb-1">{card.forms}</span>
                <span className="text-xs text-foreground/40">
                  {card.partOfSpeech}{card.details ? ` ${card.details}` : ''}
                </span>
              </div>
            </div>
          </div>

          {/* Difficulty buttons — show after flipping */}
          {flipped && (
            <div className="mt-4">
              <p className="text-xs text-foreground/40 text-center mb-2">
                {rated ? 'Rated! Press Next.' : 'How well did you know this?'}
              </p>
              <div className="flex justify-center gap-2">
                {(['new', 'hard', 'medium', 'easy'] as Difficulty[]).map((d) => (
                  <button
                    key={d}
                    onClick={() => handleDifficulty(d)}
                    disabled={rated}
                    className={`px-4 py-2 rounded-lg border-2 text-sm font-medium capitalize transition-all ${
                      rated ? 'opacity-40 cursor-default' : ''
                    } ${DIFF_COLORS[d]}`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Hint button (only when not flipped) */}
          {!flipped && hint && (
            <div className="mt-4 text-center">
              {!showHint ? (
                <button
                  onClick={() => setShowHint(true)}
                  className="px-4 py-1.5 rounded-lg border border-amber-300 bg-amber-50 text-amber-700 text-sm font-medium hover:bg-amber-100"
                >
                  💡 Show Hint
                </button>
              ) : (
                <div className="px-4 py-3 rounded-lg border border-amber-300 bg-amber-50 text-sm text-left max-w-md mx-auto">
                  {hint.derivatives ? (
                    <>
                      <p className="font-medium text-amber-700 mb-1">English derivatives:</p>
                      <p className="text-foreground/70">{hint.derivatives}</p>
                    </>
                  ) : hint.mnemonic ? (
                    <>
                      <p className="font-medium text-amber-700 mb-1">Memory aid:</p>
                      <p className="text-foreground/70">{hint.mnemonic}</p>
                    </>
                  ) : null}
                </div>
              )}
            </div>
          )}

          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={() => go(-1)}
              className="px-5 py-2 rounded-lg border border-card-border bg-card-bg hover:bg-accent-light/10 font-medium"
            >
              &larr; Prev
            </button>
            <button
              onClick={() => go(1)}
              className="px-5 py-2 rounded-lg border border-card-border bg-card-bg hover:bg-accent-light/10 font-medium"
            >
              Next &rarr;
            </button>
          </div>
        </>
        );
      })() : (
        <p className="text-center text-foreground/50 mt-10">
          {mode === 'revisit' ? 'No words in this difficulty category yet.' : 'No words match your filters.'}
        </p>
      )}
    </div>
  );
}
