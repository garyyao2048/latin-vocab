'use client';

import { useState, useMemo, useCallback } from 'react';
import { VocabEntry } from '@/data/vocab';
import { vocabLists } from '@/data/lists';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function FlashcardsPage() {
  const [selectedList, setSelectedList] = useState<number | null>(null);
  const [direction, setDirection] = useState<'lat-eng' | 'eng-lat'>('lat-eng');
  const [flipped, setFlipped] = useState(false);
  const [index, setIndex] = useState(0);
  const [shuffled, setShuffled] = useState(false);

  const filtered = useMemo(() => {
    if (selectedList === null) return [];
    const list = vocabLists.find((l) => l.id === selectedList)!.words;
    return shuffled ? shuffle(list) : list;
  }, [selectedList, shuffled]);

  const card: VocabEntry | undefined = filtered[index];

  const go = useCallback(
    (delta: number) => {
      setFlipped(false);
      setIndex((i) => {
        const next = i + delta;
        if (next < 0) return filtered.length - 1;
        if (next >= filtered.length) return 0;
        return next;
      });
    },
    [filtered.length]
  );

  const resetIndex = () => { setIndex(0); setFlipped(false); };

  // List picker
  if (selectedList === null) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-accent mb-6">Flashcards</h1>
        <p className="text-sm text-foreground/60 mb-4">Choose a list to study:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {vocabLists.map((list) => (
            <button
              key={list.id}
              onClick={() => setSelectedList(list.id)}
              className="text-left p-4 rounded-xl border border-card-border bg-card-bg hover:shadow-md hover:border-accent-light transition-all"
            >
              <span className="font-semibold">{list.label}</span>
              <span className="block text-sm text-foreground/50 mt-0.5">{list.range}</span>
              <span className="block text-xs text-foreground/40 mt-0.5">{list.words.length} words</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => { setSelectedList(null); resetIndex(); }}
          className="text-sm text-accent hover:underline"
        >
          &larr; Back to lists
        </button>
        <h1 className="text-2xl font-bold text-accent">
          {vocabLists.find((l) => l.id === selectedList)!.label}
        </h1>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-3 mb-6 text-sm">
        <button
          onClick={() => { setShuffled(!shuffled); resetIndex(); }}
          className="px-3 py-1.5 rounded-lg border border-card-border bg-card-bg hover:bg-accent-light/10"
        >
          {shuffled ? 'Unshuffle' : 'Shuffle'}
        </button>

        <button
          onClick={() => { setDirection(direction === 'lat-eng' ? 'eng-lat' : 'lat-eng'); setFlipped(false); }}
          className="px-3 py-1.5 rounded-lg border border-card-border bg-card-bg hover:bg-accent-light/10"
        >
          {direction === 'lat-eng' ? 'Latin → English' : 'English → Latin'}
        </button>
      </div>

      {/* Card */}
      {card && (
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

          <div className="flex justify-center gap-4 mt-6">
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
      )}
    </div>
  );
}
