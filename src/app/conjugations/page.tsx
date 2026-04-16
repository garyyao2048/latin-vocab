'use client';

import { useState } from 'react';

interface ConjTable {
  title: string;
  subtitle: string;
  headers: string[];
  rows: { label: string; answers: string[] }[];
}

const CONJ_TABLES: ConjTable[] = [
  {
    title: 'Present Active Endings',
    subtitle: '"I love / I am loving" — endings added to present stem',
    headers: ['', '1st (-a-)', '2nd (-e-)', '3rd (-)', '4th (-i-)'],
    rows: [
      { label: '1st sg', answers: ['o', 'eo', 'o', 'io'] },
      { label: '2nd sg', answers: ['as', 'es', 'is', 'is'] },
      { label: '3rd sg', answers: ['at', 'et', 'it', 'it'] },
      { label: '1st pl', answers: ['amus', 'emus', 'imus', 'imus'] },
      { label: '2nd pl', answers: ['atis', 'etis', 'itis', 'itis'] },
      { label: '3rd pl', answers: ['ant', 'ent', 'unt', 'iunt'] },
    ],
  },
  {
    title: 'Future Active Endings',
    subtitle: '"I will love" — 1st/2nd use -bi-, 3rd/4th use -am/-es',
    headers: ['', '1st/2nd', '3rd/4th'],
    rows: [
      { label: '1st sg', answers: ['bo', 'am'] },
      { label: '2nd sg', answers: ['bis', 'es'] },
      { label: '3rd sg', answers: ['bit', 'et'] },
      { label: '1st pl', answers: ['bimus', 'emus'] },
      { label: '2nd pl', answers: ['bitis', 'etis'] },
      { label: '3rd pl', answers: ['bunt', 'ent'] },
    ],
  },
  {
    title: 'Imperfect Active Endings',
    subtitle: '"I was loving" — 1st/2nd: stem + -ba-, 3rd/4th: stem + -eba-',
    headers: ['', '1st/2nd', '3rd/4th'],
    rows: [
      { label: '1st sg', answers: ['bam', 'ebam'] },
      { label: '2nd sg', answers: ['bas', 'ebas'] },
      { label: '3rd sg', answers: ['bat', 'ebat'] },
      { label: '1st pl', answers: ['bamus', 'ebamus'] },
      { label: '2nd pl', answers: ['batis', 'ebatis'] },
      { label: '3rd pl', answers: ['bant', 'ebant'] },
    ],
  },
  {
    title: 'Perfect Active Endings',
    subtitle: '"I loved / I have loved" — same endings for ALL conjugations, added to perfect stem',
    headers: ['', 'Ending'],
    rows: [
      { label: '1st sg', answers: ['i'] },
      { label: '2nd sg', answers: ['isti'] },
      { label: '3rd sg', answers: ['it'] },
      { label: '1st pl', answers: ['imus'] },
      { label: '2nd pl', answers: ['istis'] },
      { label: '3rd pl', answers: ['erunt'] },
    ],
  },
  {
    title: 'Pluperfect Active Endings',
    subtitle: '"I had loved" — perfect stem + era- + personal endings',
    headers: ['', 'Ending'],
    rows: [
      { label: '1st sg', answers: ['eram'] },
      { label: '2nd sg', answers: ['eras'] },
      { label: '3rd sg', answers: ['erat'] },
      { label: '1st pl', answers: ['eramus'] },
      { label: '2nd pl', answers: ['eratis'] },
      { label: '3rd pl', answers: ['erant'] },
    ],
  },
  {
    title: 'Future Perfect Endings',
    subtitle: '"I will have loved" — perfect stem + eri-',
    headers: ['', 'Ending'],
    rows: [
      { label: '1st sg', answers: ['ero'] },
      { label: '2nd sg', answers: ['eris'] },
      { label: '3rd sg', answers: ['erit'] },
      { label: '1st pl', answers: ['erimus'] },
      { label: '2nd pl', answers: ['eritis'] },
      { label: '3rd pl', answers: ['erint'] },
    ],
  },
  {
    title: 'Irregular: sum, esse (to be)',
    subtitle: 'Full forms — must be memorised',
    headers: ['', 'Present', 'Future', 'Imperfect', 'Perfect', 'Pluperfect'],
    rows: [
      { label: '1st sg', answers: ['sum', 'ero', 'eram', 'fui', 'fueram'] },
      { label: '2nd sg', answers: ['es', 'eris', 'eras', 'fuisti', 'fueras'] },
      { label: '3rd sg', answers: ['est', 'erit', 'erat', 'fuit', 'fuerat'] },
      { label: '1st pl', answers: ['sumus', 'erimus', 'eramus', 'fuimus', 'fueramus'] },
      { label: '2nd pl', answers: ['estis', 'eritis', 'eratis', 'fuistis', 'fueratis'] },
      { label: '3rd pl', answers: ['sunt', 'erunt', 'erant', 'fuerunt', 'fuerant'] },
    ],
  },
  {
    title: 'Irregular: possum, posse (to be able)',
    subtitle: 'Full forms — must be memorised',
    headers: ['', 'Present', 'Future', 'Imperfect', 'Perfect', 'Pluperfect'],
    rows: [
      { label: '1st sg', answers: ['possum', 'potero', 'poteram', 'potui', 'potueram'] },
      { label: '2nd sg', answers: ['potes', 'poteris', 'poteras', 'potuisti', 'potueras'] },
      { label: '3rd sg', answers: ['potest', 'poterit', 'poterat', 'potuit', 'potuerat'] },
      { label: '1st pl', answers: ['possumus', 'poterimus', 'poteramus', 'potuimus', 'potueramus'] },
      { label: '2nd pl', answers: ['potestis', 'poteritis', 'poteratis', 'potuistis', 'potueratis'] },
      { label: '3rd pl', answers: ['possunt', 'poterunt', 'poterant', 'potuerunt', 'potuerant'] },
    ],
  },
  {
    title: 'Irregular: eo, ire (to go)',
    subtitle: 'Full forms — must be memorised',
    headers: ['', 'Present', 'Future', 'Imperfect', 'Perfect', 'Pluperfect'],
    rows: [
      { label: '1st sg', answers: ['eo', 'ibo', 'ibam', 'ii', 'ieram'] },
      { label: '2nd sg', answers: ['is', 'ibis', 'ibas', 'iisti', 'ieras'] },
      { label: '3rd sg', answers: ['it', 'ibit', 'ibat', 'iit', 'ierat'] },
      { label: '1st pl', answers: ['imus', 'ibimus', 'ibamus', 'iimus', 'ieramus'] },
      { label: '2nd pl', answers: ['itis', 'ibitis', 'ibatis', 'iistis', 'ieratis'] },
      { label: '3rd pl', answers: ['eunt', 'ibunt', 'ibant', 'ierunt', 'ierant'] },
    ],
  },
  {
    title: 'Irregular: fero, ferre (to carry/bear)',
    subtitle: 'Full forms — must be memorised',
    headers: ['', 'Present', 'Future', 'Imperfect', 'Perfect', 'Pluperfect'],
    rows: [
      { label: '1st sg', answers: ['fero', 'feram', 'ferebam', 'tuli', 'tuleram'] },
      { label: '2nd sg', answers: ['fers', 'feres', 'ferebas', 'tulisti', 'tuleras'] },
      { label: '3rd sg', answers: ['fert', 'feret', 'ferebat', 'tulit', 'tulerat'] },
      { label: '1st pl', answers: ['ferimus', 'feremus', 'ferebamus', 'tulimus', 'tuleramus'] },
      { label: '2nd pl', answers: ['fertis', 'feretis', 'ferebatis', 'tulistis', 'tuleratis'] },
      { label: '3rd pl', answers: ['ferunt', 'ferent', 'ferebant', 'tulerunt', 'tulerant'] },
    ],
  },
];

type Mode = 'reference' | 'practice';

export default function ConjugationsPage() {
  const [mode, setMode] = useState<Mode>('reference');
  const [selectedTable, setSelectedTable] = useState(0);
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);

  const table = CONJ_TABLES[selectedTable];

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
      <h1 className="text-2xl font-bold text-accent mb-2">Verb Conjugation Tables</h1>
      <p className="text-sm text-foreground/60 mb-6">All tenses — active indicative + irregular verbs</p>

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
          {CONJ_TABLES.map((t, ti) => (
            <section key={ti}>
              <h2 className="text-lg font-semibold mb-1">{t.title}</h2>
              <p className="text-sm text-foreground/50 mb-2">{t.subtitle}</p>
              <div className="overflow-x-auto">
                <table className="text-sm border-collapse w-full">
                  <thead>
                    <tr>
                      {t.headers.map((h) => (
                        <th key={h} className="text-left px-3 py-2 border-b-2 border-accent/30 font-semibold text-accent whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {t.rows.map((row, ri) => (
                      <tr key={ri} className={ri % 2 === 0 ? 'bg-accent/[0.03]' : ''}>
                        <td className="px-3 py-2 border-b border-card-border font-medium">{row.label}</td>
                        {row.answers.map((ans, ci) => (
                          <td key={ci} className="px-3 py-2 border-b border-card-border font-mono whitespace-nowrap">{ans}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ))}

          {/* Key patterns */}
          <section className="rounded-xl border border-card-border bg-card-bg p-5">
            <h3 className="font-semibold mb-2">Key Patterns</h3>
            <ul className="text-sm text-foreground/70 space-y-1 list-disc list-inside">
              <li>Personal endings (active): <span className="font-mono">-o/-m, -s, -t, -mus, -tis, -nt</span></li>
              <li>Future: 1st/2nd use <span className="font-mono">-bi-</span>; 3rd/4th use <span className="font-mono">-am, -es, -et, -emus, -etis, -ent</span></li>
              <li>Imperfect sign: <span className="font-mono">-ba-</span> (1st/2nd), <span className="font-mono">-eba-</span> (3rd/4th)</li>
              <li>Perfect endings are the same for all: <span className="font-mono">-i, -isti, -it, -imus, -istis, -erunt</span></li>
              <li>Pluperfect = perfect stem + <span className="font-mono">-eram, -eras, -erat, -eramus, -eratis, -erant</span></li>
            </ul>
          </section>
        </div>
      )}

      {mode === 'practice' && (
        <>
          <div className="flex flex-wrap gap-2 mb-6">
            {CONJ_TABLES.map((t, i) => (
              <button
                key={i}
                onClick={() => resetPractice(i)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  selectedTable === i ? 'bg-accent text-white border-accent' : 'border-card-border bg-card-bg'
                }`}
              >
                {t.title.length > 25 ? t.title.split('—')[0].split(':').pop()?.trim() || t.title.slice(0, 20) : t.title.slice(0, 25)}
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
                    <th key={h} className="text-left px-2 py-2 border-b-2 border-accent/30 font-semibold text-accent text-xs whitespace-nowrap">{h}</th>
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
              {selectedTable < CONJ_TABLES.length - 1 && (
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
