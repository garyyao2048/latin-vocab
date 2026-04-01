export default function DeclensionsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-accent mb-2">Noun Declension Tables</h1>
      <p className="text-sm text-foreground/60 mb-8">1st, 2nd, and 3rd declension endings</p>

      {/* 1st Declension */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-1">1st Declension (mostly feminine)</h2>
        <p className="text-sm text-foreground/50 mb-3">
          e.g. <em>puella, puellae</em> (f) &mdash; girl
        </p>
        <Table
          headers={['Case', 'Singular', 'Plural']}
          rows={[
            ['Nominative', '-a', '-ae'],
            ['Vocative', '-a', '-ae'],
            ['Accusative', '-am', '-as'],
            ['Genitive', '-ae', '-arum'],
            ['Dative', '-ae', '-is'],
            ['Ablative', '-a', '-is'],
          ]}
        />
      </section>

      {/* 2nd Declension */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-1">2nd Declension (mostly masculine/neuter)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-foreground/50 mb-3">
              <strong>Masculine</strong> &mdash; e.g. <em>dominus, domini</em> (m) &mdash; master
            </p>
            <Table
              headers={['Case', 'Singular', 'Plural']}
              rows={[
                ['Nominative', '-us', '-i'],
                ['Vocative', '-e', '-i'],
                ['Accusative', '-um', '-os'],
                ['Genitive', '-i', '-orum'],
                ['Dative', '-o', '-is'],
                ['Ablative', '-o', '-is'],
              ]}
            />
            <p className="text-xs text-foreground/40 mt-2">
              Note: some 2nd declension masculines end in <em>-er</em> (e.g. <em>puer, pueri</em>; <em>ager, agri</em>)
            </p>
          </div>
          <div>
            <p className="text-sm text-foreground/50 mb-3">
              <strong>Neuter</strong> &mdash; e.g. <em>bellum, belli</em> (n) &mdash; war
            </p>
            <Table
              headers={['Case', 'Singular', 'Plural']}
              rows={[
                ['Nominative', '-um', '-a'],
                ['Vocative', '-um', '-a'],
                ['Accusative', '-um', '-a'],
                ['Genitive', '-i', '-orum'],
                ['Dative', '-o', '-is'],
                ['Ablative', '-o', '-is'],
              ]}
            />
          </div>
        </div>
      </section>

      {/* 3rd Declension */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-1">3rd Declension (m/f/n)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-foreground/50 mb-3">
              <strong>Masculine/Feminine</strong> &mdash; e.g. <em>rex, regis</em> (m) &mdash; king
            </p>
            <Table
              headers={['Case', 'Singular', 'Plural']}
              rows={[
                ['Nominative', '(varies)', '-es'],
                ['Vocative', '(varies)', '-es'],
                ['Accusative', '-em', '-es'],
                ['Genitive', '-is', '-um'],
                ['Dative', '-i', '-ibus'],
                ['Ablative', '-e', '-ibus'],
              ]}
            />
          </div>
          <div>
            <p className="text-sm text-foreground/50 mb-3">
              <strong>Neuter</strong> &mdash; e.g. <em>nomen, nominis</em> (n) &mdash; name
            </p>
            <Table
              headers={['Case', 'Singular', 'Plural']}
              rows={[
                ['Nominative', '(varies)', '-a'],
                ['Vocative', '(varies)', '-a'],
                ['Accusative', '(= nom.)', '-a'],
                ['Genitive', '-is', '-um'],
                ['Dative', '-i', '-ibus'],
                ['Ablative', '-e', '-ibus'],
              ]}
            />
          </div>
        </div>
        <p className="text-xs text-foreground/40 mt-3">
          Note: i-stem nouns (e.g. <em>civis, mare</em>) have some variant endings: gen. pl. <em>-ium</em>, abl. sg. <em>-i</em> (neuter), nom./acc. pl. <em>-ia</em> (neuter).
        </p>
      </section>

      {/* Tips */}
      <section className="rounded-xl border border-card-border bg-card-bg p-5">
        <h3 className="font-semibold mb-2">Quick Tips</h3>
        <ul className="text-sm text-foreground/70 space-y-1 list-disc list-inside">
          <li>Neuter rule: nominative, vocative, and accusative are always identical.</li>
          <li>Neuter plurals: nom/voc/acc always end in <em>-a</em>.</li>
          <li>Dative and ablative plurals are always identical within any declension.</li>
          <li>The genitive singular identifies the declension: <em>-ae</em> (1st), <em>-i</em> (2nd), <em>-is</em> (3rd).</li>
        </ul>
      </section>
    </div>
  );
}

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            {headers.map((h) => (
              <th
                key={h}
                className="text-left px-3 py-2 border-b-2 border-accent/30 font-semibold text-accent"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-accent/[0.03]' : ''}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`px-3 py-2 border-b border-card-border ${j === 0 ? 'font-medium' : 'font-mono'}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
