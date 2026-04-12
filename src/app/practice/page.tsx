'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { vocabLists, getWordsForLists } from '@/data/lists';
import { VocabEntry, vocab } from '@/data/vocab';
import { saveQuizSession, updateWordProgress, getWordsByDifficulty, getDifficultyCounts, Difficulty } from '@/lib/progress';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface Answer {
  word: VocabEntry;
  typed: string;
  correct: boolean | null;
}

const DIFF_COLORS: Record<Difficulty, string> = {
  new: 'border-blue-400 bg-blue-50 text-blue-700',
  hard: 'border-incorrect bg-incorrect/10 text-incorrect',
  medium: 'border-amber-400 bg-amber-50 text-amber-700',
  easy: 'border-correct bg-correct/10 text-correct',
};

type Source = 'lists' | 'difficulty';

export default function PracticePage() {
  const [source, setSource] = useState<Source>('lists');
  const [selectedLists, setSelectedLists] = useState<number[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('hard');
  const [diffLimit, setDiffLimit] = useState(20);
  const [counts, setCounts] = useState<Record<Difficulty, number>>({ new: 0, hard: 0, medium: 0, easy: 0 });

  const [direction, setDirection] = useState<'lat-eng' | 'eng-lat'>('lat-eng');
  const [phase, setPhase] = useState<'pick' | 'type' | 'review'>('pick');
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState('');
  const [reviewIndex, setReviewIndex] = useState(0);
  const [customWords, setCustomWords] = useState<VocabEntry[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getDifficultyCounts().then(setCounts);
  }, [phase]);

  const words = useMemo(() => {
    if (customWords.length > 0) return customWords;
    return shuffle(getWordsForLists(selectedLists));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase === 'type', customWords]);

  useEffect(() => {
    if (phase === 'type') inputRef.current?.focus();
  }, [phase, currentIndex]);

  const toggleList = (id: number) => {
    setSelectedLists((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const startFromLists = () => {
    setCustomWords([]);
    setAnswers([]);
    setCurrentIndex(0);
    setInput('');
    setPhase('type');
  };

  const startFromDifficulty = async () => {
    const diffWords = await getWordsByDifficulty(selectedDifficulty);
    const latinSet = new Set(diffWords.slice(0, diffLimit).map((w: { latin: string }) => w.latin));
    const matched = shuffle(vocab.filter(v => latinSet.has(v.latin)));
    setCustomWords(matched);
    setAnswers([]);
    setCurrentIndex(0);
    setInput('');
    setPhase('type');
  };

  const submitAnswer = () => {
    const word = words[currentIndex];
    setAnswers((prev) => [...prev, { word, typed: input.trim(), correct: null }]);
    setInput('');
    if (currentIndex + 1 >= words.length) {
      setReviewIndex(0);
      setPhase('review');
    } else {
      setCurrentIndex((i) => i + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim()) {
      submitAnswer();
    }
  };

  const markAnswer = (correct: boolean) => {
    setAnswers((prev) =>
      prev.map((a, i) => (i === reviewIndex ? { ...a, correct } : a))
    );
    if (reviewIndex + 1 >= answers.length) {
      // stay on last card — show results
    } else {
      setReviewIndex((i) => i + 1);
    }
  };

  const allReviewed = answers.length > 0 && answers.every((a) => a.correct !== null);
  const correctCount = answers.filter((a) => a.correct === true).length;
  const savedRef = useRef(false);
  const currentWord = words[currentIndex];

  useEffect(() => {
    if (allReviewed && !savedRef.current) {
      savedRef.current = true;
      saveQuizSession({
        mode: 'practice',
        direction,
        listsUsed: selectedLists,
        totalQuestions: answers.length,
        correctAnswers: correctCount,
      });
      updateWordProgress(
        answers.map((a) => ({ latin: a.word.latin, correct: a.correct === true }))
      );
    }
  }, [allReviewed, direction, selectedLists, answers, correctCount]);

  // Phase: pick
  if (phase === 'pick') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-accent mb-6">Typed Practice</h1>

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
              Select lists (leave all unchecked for all words):
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
            <p className="text-sm text-foreground/60 mb-4">Choose a difficulty to practice:</p>
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
            onClick={() => setDirection(direction === 'lat-eng' ? 'eng-lat' : 'lat-eng')}
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
            Start Practice ({selectedLists.length === 0 ? 'all 450' : getWordsForLists(selectedLists).length} words)
          </button>
        ) : (
          <button
            onClick={startFromDifficulty}
            disabled={counts[selectedDifficulty] === 0}
            className="px-6 py-2.5 rounded-lg bg-accent text-white font-medium hover:bg-accent/90 disabled:opacity-40"
          >
            Start Practice ({Math.min(diffLimit, counts[selectedDifficulty])} words)
          </button>
        )}
      </div>
    );
  }

  // Phase: type answers
  if (phase === 'type' && currentWord) {
    const prompt = direction === 'lat-eng' ? currentWord.latin : currentWord.meanings;
    return (
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => { setPhase('pick'); setCustomWords([]); savedRef.current = false; }} className="text-sm text-accent hover:underline">
            &larr; Back
          </button>
          <h1 className="text-2xl font-bold text-accent">Typed Practice</h1>
        </div>

        <div className="text-sm text-foreground/50 mb-4 text-center">
          {currentIndex + 1} / {words.length}
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-8 mb-4 text-center">
          <p className="text-sm text-foreground/50 mb-2">
            Type the {direction === 'lat-eng' ? 'English' : 'Latin'} translation:
          </p>
          <p className="text-3xl font-bold mb-1">{prompt}</p>
          {direction === 'lat-eng' && currentWord.details && (
            <p className="text-sm text-foreground/40">{currentWord.partOfSpeech} {currentWord.details}</p>
          )}
        </div>

        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Your answer..."
            className="flex-1 px-4 py-3 rounded-lg border border-card-border bg-card-bg text-lg focus:outline-none focus:border-accent"
          />
          <button
            onClick={submitAnswer}
            disabled={!input.trim()}
            className="px-5 py-3 rounded-lg bg-accent text-white font-medium hover:bg-accent/90 disabled:opacity-40"
          >
            Submit
          </button>
        </div>

        <p className="text-xs text-foreground/40 mt-2 text-center">Press Enter to submit</p>
      </div>
    );
  }

  // Phase: review carousel
  if (phase === 'review') {
    const reviewItem = answers[reviewIndex];

    if (allReviewed) {
      return (
        <div className="max-w-2xl mx-auto px-4 py-10 text-center">
          <h1 className="text-2xl font-bold text-accent mb-4">Results</h1>
          <div className="rounded-xl border border-card-border bg-card-bg p-8 mb-6">
            <p className="text-5xl font-bold mb-2">
              {correctCount} / {answers.length}
            </p>
            <p className="text-lg text-foreground/60">
              {Math.round((correctCount / answers.length) * 100)}% correct
            </p>
          </div>

          {answers.filter((a) => !a.correct).length > 0 && (
            <div className="text-left mb-6">
              <h2 className="font-semibold mb-3">Words to revise:</h2>
              <div className="space-y-2">
                {answers.filter((a) => !a.correct).map((a, i) => (
                  <div key={i} className="flex justify-between items-center px-4 py-2 rounded-lg border border-incorrect/20 bg-incorrect/5 text-sm">
                    <span className="font-medium">{a.word.latin}</span>
                    <span className="text-foreground/60">
                      <span className="line-through text-incorrect/60 mr-2">{a.typed}</span>
                      {a.word.meanings}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => { setPhase('pick'); setCustomWords([]); savedRef.current = false; }}
            className="px-6 py-2.5 rounded-lg bg-accent text-white font-medium hover:bg-accent/90"
          >
            Practice Again
          </button>
        </div>
      );
    }

    const answer = direction === 'lat-eng' ? reviewItem.word.meanings : reviewItem.word.latin;
    const prompt = direction === 'lat-eng' ? reviewItem.word.latin : reviewItem.word.meanings;

    return (
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-accent mb-6">Review Your Answers</h1>

        <div className="text-sm text-foreground/50 mb-4 text-center">
          {reviewIndex + 1} / {answers.length}
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-8 mb-4">
          <div className="text-center mb-6">
            <p className="text-sm text-foreground/50 mb-1">Word:</p>
            <p className="text-2xl font-bold">{prompt}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-2">
            <div className="text-center p-4 rounded-lg bg-accent/5">
              <p className="text-xs text-foreground/50 mb-1">Your answer:</p>
              <p className="text-lg font-medium">{reviewItem.typed || <span className="text-foreground/30 italic">blank</span>}</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-correct/5">
              <p className="text-xs text-foreground/50 mb-1">Correct answer:</p>
              <p className="text-lg font-medium">{answer}</p>
            </div>
          </div>

          <p className="text-sm text-foreground/40 text-center">{reviewItem.word.forms}</p>
        </div>

        <p className="text-center text-sm text-foreground/60 mb-3">Did you get it right?</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => markAnswer(false)}
            className="px-6 py-2.5 rounded-lg border-2 border-incorrect text-incorrect font-medium hover:bg-incorrect/10"
          >
            Wrong
          </button>
          <button
            onClick={() => markAnswer(true)}
            className="px-6 py-2.5 rounded-lg border-2 border-correct text-correct font-medium hover:bg-correct/10"
          >
            Correct
          </button>
        </div>
      </div>
    );
  }

  return null;
}
