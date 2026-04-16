'use client';

import { useState } from 'react';

interface TableData {
  title: string;
  subtitle: string;
  headers: string[];
  rows: { label: string; answers: string[] }[];
}

const DECLENSION_TABLES: TableData[] = [
  {
    title: '1st Declension — puella (girl), f.',
    subtitle: 'Endings: -a, -ae',
    headers: ['Case', 'Singular', 'Plural'],
    rows: [
      { label: 'Nominative', answers: ['puella', 'puellae'] },
      { label: 'Vocative', answers: ['puella', 'puellae'] },
      { label: 'Accusative', answers: ['puellam', 'puellas'] },
      { label: 'Genitive', answers: ['puellae', 'puellarum'] },
      { label: 'Dative', answers: ['puellae', 'puellis'] },
      { label: 'Ablative', answers: ['puella', 'puellis'] },
    ],
  },
  {
    title: '2nd Declension — servus (slave), m.',
    subtitle: 'Endings: -us, -i',
    headers: ['Case', 'Singular', 'Plural'],
    rows: [
      { label: 'Nominative', answers: ['servus', 'servi'] },
      { label: 'Vocative', answers: ['serve', 'servi'] },
      { label: 'Accusative', answers: ['servum', 'servos'] },
      { label: 'Genitive', answers: ['servi', 'servorum'] },
      { label: 'Dative', answers: ['servo', 'servis'] },
      { label: 'Ablative', answers: ['servo', 'servis'] },
    ],
  },
  {
    title: '2nd Declension Neuter — bellum (war), n.',
    subtitle: 'Endings: -um, -i',
    headers: ['Case', 'Singular', 'Plural'],
    rows: [
      { label: 'Nominative', answers: ['bellum', 'bella'] },
      { label: 'Vocative', answers: ['bellum', 'bella'] },
      { label: 'Accusative', answers: ['bellum', 'bella'] },
      { label: 'Genitive', answers: ['belli', 'bellorum'] },
      { label: 'Dative', answers: ['bello', 'bellis'] },
      { label: 'Ablative', answers: ['bello', 'bellis'] },
    ],
  },
  {
    title: '3rd Declension — miles (soldier), m.',
    subtitle: 'Stem from genitive: milit-is → milit-',
    headers: ['Case', 'Singular', 'Plural'],
    rows: [
      { label: 'Nominative', answers: ['miles', 'milites'] },
      { label: 'Vocative', answers: ['miles', 'milites'] },
      { label: 'Accusative', answers: ['militem', 'milites'] },
      { label: 'Genitive', answers: ['militis', 'militum'] },
      { label: 'Dative', answers: ['militi', 'militibus'] },
      { label: 'Ablative', answers: ['milite', 'militibus'] },
    ],
  },
  {
    title: '3rd Declension Neuter — nomen (name), n.',
    subtitle: 'Stem from genitive: nomin-is → nomin-',
    headers: ['Case', 'Singular', 'Plural'],
    rows: [
      { label: 'Nominative', answers: ['nomen', 'nomina'] },
      { label: 'Vocative', answers: ['nomen', 'nomina'] },
      { label: 'Accusative', answers: ['nomen', 'nomina'] },
      { label: 'Genitive', answers: ['nominis', 'nominum'] },
      { label: 'Dative', answers: ['nomini', 'nominibus'] },
      { label: 'Ablative', answers: ['nomine', 'nominibus'] },
    ],
  },
  {
    title: '1st/2nd Adjective — bonus (good)',
    subtitle: 'Declines like servus (m), puella (f), bellum (n)',
    headers: ['Case', 'Masc. sg', 'Fem. sg', 'Neut. sg', 'Masc. pl', 'Fem. pl', 'Neut. pl'],
    rows: [
      { label: 'Nominative', answers: ['bonus', 'bona', 'bonum', 'boni', 'bonae', 'bona'] },
      { label: 'Accusative', answers: ['bonum', 'bonam', 'bonum', 'bonos', 'bonas', 'bona'] },
      { label: 'Genitive', answers: ['boni', 'bonae', 'boni', 'bonorum', 'bonarum', 'bonorum'] },
      { label: 'Dative', answers: ['bono', 'bonae', 'bono', 'bonis', 'bonis', 'bonis'] },
      { label: 'Ablative', answers: ['bono', 'bona', 'bono', 'bonis', 'bonis', 'bonis'] },
    ],
  },
  {
    title: '3rd Declension Adjective — fortis (brave)',
    subtitle: 'Declines like 3rd declension nouns',
    headers: ['Case', 'M/F sg', 'Neut. sg', 'M/F pl', 'Neut. pl'],
    rows: [
      { label: 'Nominative', answers: ['fortis', 'forte', 'fortes', 'fortia'] },
      { label: 'Accusative', answers: ['fortem', 'forte', 'fortes', 'fortia'] },
      { label: 'Genitive', answers: ['fortis', 'fortis', 'fortium', 'fortium'] },
      { label: 'Dative', answers: ['forti', 'forti', 'fortibus', 'fortibus'] },
      { label: 'Ablative', answers: ['forti', 'forti', 'fortibus', 'fortibus'] },
    ],
  },
];

type Mode = 'reference' | 'practice';

export default function DeclensionsPage() {
  const [mode, setMode] = useState<Mode>('reference');
  const [selectedTable, setSelectedTable] = useState(0);
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);

  const table = DECLENSION_TABLES[selectedTable];

  const resetPractice = (idx: number) => {
    setSelectedTable(idx);
    setInputs({});
    setChecked(false);
  };

  const handleInput = (key: string, value: string) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const checkAnswers = () => setChecked(true);

  const totalCells = table.rows.length * table.rows[0].answers.length;
  const correctCells = checked
    ? table.rows.reduce((sum, row, ri) =>
        sum + row.answers.reduce((s, ans, ci) => {
          const key = `${ri}-${ci}`;
          return s + (inputs[key]?.trim().toLowerCase() === ans.toLowerCase() ? 1 : 0);
        }, 0), 0)
    : 0;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-accent mb-2">Noun Declension Tables</h1>
      <p className="text-sm text-foreground/60 mb-6">1st, 2nd, and 3rd declension endings</p>

      {/* Mode toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setMode('reference')}
          className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${mode === 'reference' ? 'bg-accent text-white border-accent' : 'border-card-border bg-card-bg'}`}
        >
          Reference Tables
        </button>
        <button
          onClick={() => { setMode('practice'); resetPractice(0); }}
          className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${mode === 'practice' ? 'bg-accent text-white border-accent' : 'border-card-border bg-card-bg'}`}
        >
          Fill-in Practice
        </button>
      </div>

      {mode === 'reference' && (
        <div className="space-y-8">
          {DECLENSION_TABLES.map((t, ti) => (
            <section key={ti}>
              <h2 className="text-lg font-semibold mb-1">{t.title}</h2>
              <p className="text-sm text-foreground/50 mb-2">{t.subtitle}</p>
              <div className="overflow-x-auto">
                <table className="text-sm border-collapse w-full">
                  <thead>
                    <tr>
                      {t.headers.map((h) => (
                        <th key={h} className="text-left px-3 py-2 border-b-2 border-accent/30 font-semibold text-accent">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {t.rows.map((row, ri) => (
                      <tr key={ri} className={ri % 2 === 0 ? 'bg-accent/[0.03]' : ''}>
                        <td className="px-3 py-2 border-b border-card-border font-medium">{row.label}</td>
                        {row.answers.map((ans, ci) => (
                          <td key={ci} className="px-3 py-2 border-b border-card-border font-mono">{ans}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ))}
        </div>
      )}

      {mode === 'practice' && (
        <>
          {/* Table selector */}
          <div className="flex flex-wrap gap-2 mb-6">
            {DECLENSION_TABLES.map((t, i) => (
              <button
                key={i}
                onClick={() => resetPractice(i)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  selectedTable === i ? 'bg-accent text-white border-accent' : 'border-card-border bg-card-bg'
                }`}
              >
                {t.title.split('—')[0].trim()}
              </button>
            ))}
          </div>

          <h2 className="text-lg font-semibold mb-1">{table.title}</h2>
          <p className="text-sm text-foreground/50 mb-4">{table.subtitle}</p>

          <div className="overflow-x-auto mb-4">
            <table className="text-sm border-collapse w-full">
              <thead>
                <tr>
                  {table.headers.map((h) => (
                    <th key={h} className="text-left px-2 py-2 border-b-2 border-accent/30 font-semibold text-accent text-xs">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row, ri) => (
                  <tr key={ri} className={ri % 2 === 0 ? 'bg-accent/[0.03]' : ''}>
                    <td className="px-2 py-1.5 border-b border-card-border font-medium text-sm">{row.label}</td>
                    {row.answers.map((ans, ci) => {
                      const key = `${ri}-${ci}`;
                      const val = inputs[key] ?? '';
                      const isCorrect = checked && val.trim().toLowerCase() === ans.toLowerCase();
                      const isWrong = checked && val.trim().toLowerCase() !== ans.toLowerCase();
                      return (
                        <td key={ci} className="px-1 py-1 border-b border-card-border">
                          <div className="relative">
                            <input
                              type="text"
                              value={val}
                              onChange={(e) => handleInput(key, e.target.value)}
                              disabled={checked}
                              className={`w-full px-2 py-1.5 rounded border text-sm font-mono ${
                                checked
                                  ? isCorrect
                                    ? 'border-correct bg-correct/10 text-correct'
                                    : 'border-incorrect bg-incorrect/10 text-incorrect'
                                  : 'border-card-border bg-card-bg focus:border-accent focus:outline-none'
                              }`}
                              placeholder="..."
                            />
                            {isWrong && (
                              <p className="text-[10px] text-correct mt-0.5 font-mono">{ans}</p>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {!checked ? (
            <button
              onClick={checkAnswers}
              className="px-6 py-2.5 rounded-lg bg-accent text-white font-medium hover:bg-accent/90"
            >
              Check Answers
            </button>
          ) : (
            <div className="flex items-center gap-4">
              <p className={`text-sm font-medium ${correctCells === totalCells ? 'text-correct' : 'text-foreground/60'}`}>
                {correctCells}/{totalCells} correct ({Math.round((correctCells / totalCells) * 100)}%)
              </p>
              <button
                onClick={() => resetPractice(selectedTable)}
                className="px-4 py-2 rounded-lg border border-card-border bg-card-bg text-sm font-medium hover:bg-accent-light/10"
              >
                Try Again
              </button>
              {selectedTable < DECLENSION_TABLES.length - 1 && (
                <button
                  onClick={() => resetPractice(selectedTable + 1)}
                  className="px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent/90"
                >
                  Next Table &rarr;
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
