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
    title: 'Present Active Indicative',
    subtitle: '"I carry / I am carrying"',
    headers: ['', '1st (porto)', '2nd (moneo)', '3rd (rego)', '4th (audio)'],
    rows: [
      { label: '1st sg', answers: ['porto', 'moneo', 'rego', 'audio'] },
      { label: '2nd sg', answers: ['portas', 'mones', 'regis', 'audis'] },
      { label: '3rd sg', answers: ['portat', 'monet', 'regit', 'audit'] },
      { label: '1st pl', answers: ['portamus', 'monemus', 'regimus', 'audimus'] },
      { label: '2nd pl', answers: ['portatis', 'monetis', 'regitis', 'auditis'] },
      { label: '3rd pl', answers: ['portant', 'monent', 'regunt', 'audiunt'] },
    ],
  },
  {
    title: 'Future Active Indicative',
    subtitle: '"I will carry" — 1st/2nd use -bi-, 3rd/4th use -am/-es',
    headers: ['', '1st (porto)', '2nd (moneo)', '3rd (rego)', '4th (audio)'],
    rows: [
      { label: '1st sg', answers: ['portabo', 'monebo', 'regam', 'audiam'] },
      { label: '2nd sg', answers: ['portabis', 'monebis', 'reges', 'audies'] },
      { label: '3rd sg', answers: ['portabit', 'monebit', 'reget', 'audiet'] },
      { label: '1st pl', answers: ['portabimus', 'monebimus', 'regemus', 'audiemus'] },
      { label: '2nd pl', answers: ['portabitis', 'monebitis', 'regetis', 'audietis'] },
      { label: '3rd pl', answers: ['portabunt', 'monebunt', 'regent', 'audient'] },
    ],
  },
  {
    title: 'Imperfect Active Indicative',
    subtitle: '"I was carrying / I used to carry"',
    headers: ['', '1st (porto)', '2nd (moneo)', '3rd (rego)', '4th (audio)'],
    rows: [
      { label: '1st sg', answers: ['portabam', 'monebam', 'regebam', 'audiebam'] },
      { label: '2nd sg', answers: ['portabas', 'monebas', 'regebas', 'audiebas'] },
      { label: '3rd sg', answers: ['portabat', 'monebat', 'regebat', 'audiebat'] },
      { label: '1st pl', answers: ['portabamus', 'monebamus', 'regebamus', 'audiebamus'] },
      { label: '2nd pl', answers: ['portabatis', 'monebatis', 'regebatis', 'audiebatis'] },
      { label: '3rd pl', answers: ['portabant', 'monebant', 'regebant', 'audiebant'] },
    ],
  },
  {
    title: 'Perfect Active Indicative',
    subtitle: '"I carried / I have carried" — same endings for all conjugations',
    headers: ['', '1st (portav-)', '2nd (monu-)', '3rd (rex-)', '4th (audiv-)'],
    rows: [
      { label: '1st sg', answers: ['portavi', 'monui', 'rexi', 'audivi'] },
      { label: '2nd sg', answers: ['portavisti', 'monuisti', 'rexisti', 'audivisti'] },
      { label: '3rd sg', answers: ['portavit', 'monuit', 'rexit', 'audivit'] },
      { label: '1st pl', answers: ['portavimus', 'monuimus', 'reximus', 'audivimus'] },
      { label: '2nd pl', answers: ['portavistis', 'monuistis', 'rexistis', 'audivistis'] },
      { label: '3rd pl', answers: ['portaverunt', 'monuerunt', 'rexerunt', 'audiverunt'] },
    ],
  },
  {
    title: 'Pluperfect Active Indicative',
    subtitle: '"I had carried" — perfect stem + era-',
    headers: ['', '1st (portav-)', '2nd (monu-)', '3rd (rex-)', '4th (audiv-)'],
    rows: [
      { label: '1st sg', answers: ['portaveram', 'monueram', 'rexeram', 'audiveram'] },
      { label: '2nd sg', answers: ['portaveras', 'monueras', 'rexeras', 'audiveras'] },
      { label: '3rd sg', answers: ['portaverat', 'monuerat', 'rexerat', 'audiverat'] },
      { label: '1st pl', answers: ['portaveramus', 'monueramus', 'rexeramus', 'audiveramus'] },
      { label: '2nd pl', answers: ['portaveratis', 'monueratis', 'rexeratis', 'audiveratis'] },
      { label: '3rd pl', answers: ['portaverant', 'monuerant', 'rexerant', 'audiverant'] },
    ],
  },
  {
    title: 'Irregular: sum, esse (to be)',
    subtitle: 'All tenses',
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
    subtitle: 'All tenses',
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
    subtitle: 'All tenses',
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
    subtitle: 'All tenses',
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
