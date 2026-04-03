'use client';

import { useState, useMemo } from 'react';
import { vocab } from '@/data/vocab';

const POS_FILTERS = ['all', 'noun', 'verb', 'adjective', 'adverb', 'preposition', 'conjunction', 'pronoun'] as const;

export default function DictionaryPage() {
  const [search, setSearch] = useState('');
  const [posFilter, setPosFilter] = useState<string>('all');
  const [restrictedOnly, setRestrictedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'latin' | 'english'>('latin');

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return vocab
      .filter((v) => {
        if (posFilter !== 'all' && !v.partOfSpeech.includes(posFilter)) return false;
        if (restrictedOnly && !v.isRestricted) return false;
        if (q) {
          return (
            v.latin.toLowerCase().includes(q) ||
            v.meanings.toLowerCase().includes(q) ||
            v.forms.toLowerCase().includes(q)
          );
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'latin') return a.latin.localeCompare(b.latin);
        return a.meanings.localeCompare(b.meanings);
      });
  }, [search, posFilter, restrictedOnly, sortBy]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-accent mb-2">Dictionary</h1>
      <p className="text-sm text-foreground/60 mb-6">All 450 OCR GCSE Latin vocabulary words</p>

      {/* Search + filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          type="text"
          placeholder="Search Latin or English..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg border border-card-border bg-card-bg text-sm focus:outline-none focus:border-accent"
        />
        <select
          value={posFilter}
          onChange={(e) => setPosFilter(e.target.value)}
          className="px-3 py-2 rounded-lg border border-card-border bg-card-bg text-sm"
        >
          {POS_FILTERS.map((p) => (
            <option key={p} value={p}>
              {p === 'all' ? 'All types' : p.charAt(0).toUpperCase() + p.slice(1) + 's'}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap gap-3 mb-6 text-sm">
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input
            type="checkbox"
            checked={restrictedOnly}
            onChange={(e) => setRestrictedOnly(e.target.checked)}
            className="accent-accent"
          />
          Restricted list only
        </label>
        <button
          onClick={() => setSortBy(sortBy === 'latin' ? 'english' : 'latin')}
          className="px-3 py-1.5 rounded-lg border border-card-border bg-card-bg hover:bg-accent-light/10"
        >
          Sort: {sortBy === 'latin' ? 'A→Z Latin' : 'A→Z English'}
        </button>
        <span className="text-foreground/40 self-center">{filtered.length} words</span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-card-border">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-accent/[0.05]">
              <th className="text-left px-4 py-2.5 font-semibold text-accent border-b border-card-border">Latin</th>
              <th className="text-left px-4 py-2.5 font-semibold text-accent border-b border-card-border hidden sm:table-cell">Forms</th>
              <th className="text-left px-4 py-2.5 font-semibold text-accent border-b border-card-border">Type</th>
              <th className="text-left px-4 py-2.5 font-semibold text-accent border-b border-card-border">English</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((v, i) => (
              <tr key={v.latin + i} className={`${i % 2 === 0 ? 'bg-card-bg' : 'bg-accent/[0.02]'} hover:bg-accent-light/10 transition-colors`}>
                <td className="px-4 py-2 border-b border-card-border">
                  <span className="font-medium">{v.latin}</span>
                  {v.isRestricted && (
                    <span className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded bg-accent/10 text-accent font-medium align-middle">R</span>
                  )}
                </td>
                <td className="px-4 py-2 border-b border-card-border text-foreground/50 font-mono text-xs hidden sm:table-cell">
                  {v.forms}
                </td>
                <td className="px-4 py-2 border-b border-card-border text-foreground/50 text-xs whitespace-nowrap">
                  {v.partOfSpeech}{v.details ? ` ${v.details}` : ''}
                </td>
                <td className="px-4 py-2 border-b border-card-border">
                  {v.meanings}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-foreground/40 py-8">No words match your search.</p>
      )}
    </div>
  );
}
