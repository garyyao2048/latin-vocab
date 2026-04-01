export default function ConjugationsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-accent mb-2">Verb Conjugation Tables</h1>
      <p className="text-sm text-foreground/60 mb-8">Present, imperfect, perfect, and pluperfect tenses &mdash; active indicative</p>

      {/* Present Active */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Present Active Indicative</h2>
        <p className="text-sm text-foreground/50 mb-3">&ldquo;I carry / I am carrying&rdquo;</p>
        <ConjTable
          headers={['', '1st (porto)', '2nd (moneo)', '3rd (rego)', '4th (audio)', 'Mixed 3rd (capio)']}
          rows={[
            ['1st sg', 'port-o', 'mone-o', 'reg-o', 'audi-o', 'capi-o'],
            ['2nd sg', 'port-as', 'mon-es', 'reg-is', 'aud-is', 'cap-is'],
            ['3rd sg', 'port-at', 'mon-et', 'reg-it', 'aud-it', 'cap-it'],
            ['1st pl', 'port-amus', 'mon-emus', 'reg-imus', 'aud-imus', 'cap-imus'],
            ['2nd pl', 'port-atis', 'mon-etis', 'reg-itis', 'aud-itis', 'cap-itis'],
            ['3rd pl', 'port-ant', 'mon-ent', 'reg-unt', 'audi-unt', 'capi-unt'],
          ]}
        />
      </section>

      {/* Imperfect Active */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Imperfect Active Indicative</h2>
        <p className="text-sm text-foreground/50 mb-3">&ldquo;I was carrying / I used to carry&rdquo;</p>
        <ConjTable
          headers={['', '1st', '2nd', '3rd', '4th', 'Mixed 3rd']}
          rows={[
            ['1st sg', 'port-abam', 'mon-ebam', 'reg-ebam', 'audi-ebam', 'capi-ebam'],
            ['2nd sg', 'port-abas', 'mon-ebas', 'reg-ebas', 'audi-ebas', 'capi-ebas'],
            ['3rd sg', 'port-abat', 'mon-ebat', 'reg-ebat', 'audi-ebat', 'capi-ebat'],
            ['1st pl', 'port-abamus', 'mon-ebamus', 'reg-ebamus', 'audi-ebamus', 'capi-ebamus'],
            ['2nd pl', 'port-abatis', 'mon-ebatis', 'reg-ebatis', 'audi-ebatis', 'capi-ebatis'],
            ['3rd pl', 'port-abant', 'mon-ebant', 'reg-ebant', 'audi-ebant', 'capi-ebant'],
          ]}
        />
      </section>

      {/* Perfect Active */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Perfect Active Indicative</h2>
        <p className="text-sm text-foreground/50 mb-3">&ldquo;I carried / I have carried&rdquo; &mdash; all conjugations use the same endings on the perfect stem</p>
        <ConjTable
          headers={['', '1st (portav-)', '2nd (monu-)', '3rd (rex-)', '4th (audiv-)']}
          rows={[
            ['1st sg', 'portav-i', 'monu-i', 'rex-i', 'audiv-i'],
            ['2nd sg', 'portav-isti', 'monu-isti', 'rex-isti', 'audiv-isti'],
            ['3rd sg', 'portav-it', 'monu-it', 'rex-it', 'audiv-it'],
            ['1st pl', 'portav-imus', 'monu-imus', 'rex-imus', 'audiv-imus'],
            ['2nd pl', 'portav-istis', 'monu-istis', 'rex-istis', 'audiv-istis'],
            ['3rd pl', 'portav-erunt', 'monu-erunt', 'rex-erunt', 'audiv-erunt'],
          ]}
        />
      </section>

      {/* Pluperfect Active */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Pluperfect Active Indicative</h2>
        <p className="text-sm text-foreground/50 mb-3">&ldquo;I had carried&rdquo; &mdash; perfect stem + era-</p>
        <ConjTable
          headers={['', '1st (portav-)', '2nd (monu-)', '3rd (rex-)', '4th (audiv-)']}
          rows={[
            ['1st sg', 'portav-eram', 'monu-eram', 'rex-eram', 'audiv-eram'],
            ['2nd sg', 'portav-eras', 'monu-eras', 'rex-eras', 'audiv-eras'],
            ['3rd sg', 'portav-erat', 'monu-erat', 'rex-erat', 'audiv-erat'],
            ['1st pl', 'portav-eramus', 'monu-eramus', 'rex-eramus', 'audiv-eramus'],
            ['2nd pl', 'portav-eratis', 'monu-eratis', 'rex-eratis', 'audiv-eratis'],
            ['3rd pl', 'portav-erant', 'monu-erant', 'rex-erant', 'audiv-erant'],
          ]}
        />
      </section>

      {/* sum */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Irregular: <em>sum, esse</em> (to be)</h2>
        <ConjTable
          headers={['', 'Present', 'Imperfect', 'Perfect', 'Pluperfect']}
          rows={[
            ['1st sg', 'sum', 'eram', 'fui', 'fueram'],
            ['2nd sg', 'es', 'eras', 'fuisti', 'fueras'],
            ['3rd sg', 'est', 'erat', 'fuit', 'fuerat'],
            ['1st pl', 'sumus', 'eramus', 'fuimus', 'fueramus'],
            ['2nd pl', 'estis', 'eratis', 'fuistis', 'fueratis'],
            ['3rd pl', 'sunt', 'erant', 'fuerunt', 'fuerant'],
          ]}
        />
      </section>

      {/* possum */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Irregular: <em>possum, posse</em> (to be able)</h2>
        <ConjTable
          headers={['', 'Present', 'Imperfect', 'Perfect', 'Pluperfect']}
          rows={[
            ['1st sg', 'possum', 'poteram', 'potui', 'potueram'],
            ['2nd sg', 'potes', 'poteras', 'potuisti', 'potueras'],
            ['3rd sg', 'potest', 'poterat', 'potuit', 'potuerat'],
            ['1st pl', 'possumus', 'poteramus', 'potuimus', 'potueramus'],
            ['2nd pl', 'potestis', 'poteratis', 'potuistis', 'potueratis'],
            ['3rd pl', 'possunt', 'poterant', 'potuerunt', 'potuerant'],
          ]}
        />
      </section>

      {/* eo */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Irregular: <em>eo, ire</em> (to go)</h2>
        <ConjTable
          headers={['', 'Present', 'Imperfect', 'Perfect', 'Pluperfect']}
          rows={[
            ['1st sg', 'eo', 'ibam', 'i(v)i', 'i(v)eram'],
            ['2nd sg', 'is', 'ibas', 'i(v)isti', 'i(v)eras'],
            ['3rd sg', 'it', 'ibat', 'i(v)it', 'i(v)erat'],
            ['1st pl', 'imus', 'ibamus', 'i(v)imus', 'i(v)eramus'],
            ['2nd pl', 'itis', 'ibatis', 'i(v)istis', 'i(v)eratis'],
            ['3rd pl', 'eunt', 'ibant', 'i(v)erunt', 'i(v)erant'],
          ]}
        />
      </section>

      {/* fero */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Irregular: <em>fero, ferre</em> (to carry/bear)</h2>
        <ConjTable
          headers={['', 'Present', 'Imperfect', 'Perfect', 'Pluperfect']}
          rows={[
            ['1st sg', 'fero', 'ferebam', 'tuli', 'tuleram'],
            ['2nd sg', 'fers', 'ferebas', 'tulisti', 'tuleras'],
            ['3rd sg', 'fert', 'ferebat', 'tulit', 'tulerat'],
            ['1st pl', 'ferimus', 'ferebamus', 'tulimus', 'tuleramus'],
            ['2nd pl', 'fertis', 'ferebatis', 'tulistis', 'tuleratis'],
            ['3rd pl', 'ferunt', 'ferebant', 'tulerunt', 'tulerant'],
          ]}
        />
      </section>

      {/* volo/nolo/malo */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Irregular: <em>volo, nolo, malo</em></h2>
        <p className="text-sm text-foreground/50 mb-3">to want / to not want / to prefer (present tense)</p>
        <ConjTable
          headers={['', 'volo', 'nolo', 'malo']}
          rows={[
            ['1st sg', 'volo', 'nolo', 'malo'],
            ['2nd sg', 'vis', 'non vis', 'mavis'],
            ['3rd sg', 'vult', 'non vult', 'mavult'],
            ['1st pl', 'volumus', 'nolumus', 'malumus'],
            ['2nd pl', 'vultis', 'non vultis', 'mavultis'],
            ['3rd pl', 'volunt', 'nolunt', 'malunt'],
          ]}
        />
      </section>

      {/* Key patterns */}
      <section className="rounded-xl border border-card-border bg-card-bg p-5">
        <h3 className="font-semibold mb-2">Key Patterns</h3>
        <ul className="text-sm text-foreground/70 space-y-1 list-disc list-inside">
          <li>Personal endings (active): <span className="font-mono">-o/-m, -s, -t, -mus, -tis, -nt</span></li>
          <li>Imperfect sign: <span className="font-mono">-ba-</span> (1st/2nd), <span className="font-mono">-eba-</span> (3rd/4th)</li>
          <li>Perfect endings are the same for all conjugations: <span className="font-mono">-i, -isti, -it, -imus, -istis, -erunt</span></li>
          <li>Pluperfect = perfect stem + <span className="font-mono">-eram, -eras, -erat, -eramus, -eratis, -erant</span></li>
        </ul>
      </section>
    </div>
  );
}

function ConjTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse mb-2">
        <thead>
          <tr>
            {headers.map((h) => (
              <th
                key={h}
                className="text-left px-3 py-2 border-b-2 border-accent/30 font-semibold text-accent whitespace-nowrap"
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
                  className={`px-3 py-2 border-b border-card-border whitespace-nowrap ${j === 0 ? 'font-medium' : 'font-mono'}`}
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
