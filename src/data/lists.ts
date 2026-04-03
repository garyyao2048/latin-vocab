import { vocab, VocabEntry } from './vocab';

export interface VocabList {
  id: number;
  label: string;
  range: string;
  words: VocabEntry[];
}

const CHUNK_SIZE = 45;

export const vocabLists: VocabList[] = Array.from({ length: 10 }, (_, i) => {
  const start = i * CHUNK_SIZE;
  const words = vocab.slice(start, start + CHUNK_SIZE);
  const first = words[0]?.latin.split(',')[0].split(' ')[0] ?? '';
  const last = words[words.length - 1]?.latin.split(',')[0].split(' ')[0] ?? '';
  return {
    id: i + 1,
    label: `List ${i + 1}`,
    range: `${first} – ${last}`,
    words,
  };
});

export function getWordsForLists(ids: number[]): VocabEntry[] {
  if (ids.length === 0) return vocab;
  return vocabLists.filter((l) => ids.includes(l.id)).flatMap((l) => l.words);
}

const restrictedWords = vocab.filter((v) => v.isRestricted);
const R_CHUNK_SIZE = Math.ceil(restrictedWords.length / 6);

export const restrictedLists: VocabList[] = Array.from({ length: 6 }, (_, i) => {
  const start = i * R_CHUNK_SIZE;
  const words = restrictedWords.slice(start, start + R_CHUNK_SIZE);
  const first = words[0]?.latin.split(',')[0].split(' ')[0] ?? '';
  const last = words[words.length - 1]?.latin.split(',')[0].split(' ')[0] ?? '';
  return {
    id: 100 + i + 1,
    label: `Restricted ${i + 1}`,
    range: `${first} – ${last}`,
    words,
  };
});

export function getWordsForRestrictedLists(ids: number[]): VocabEntry[] {
  if (ids.length === 0) return restrictedWords;
  return restrictedLists.filter((l) => ids.includes(l.id)).flatMap((l) => l.words);
}
