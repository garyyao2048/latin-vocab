export default function ConjugationsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-accent mb-2">Verb Conjugation Tables</h1>
      <p className="text-sm text-foreground/60 mb-8">Present, future, imperfect, perfect, future perfect, and pluperfect tenses &mdash; active indicative</p>

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

      {/* Future Active */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Future Active Indicative</h2>
        <p className="text-sm text-foreground/50 mb-3">&ldquo;I will carry&rdquo; &mdash; 1st/2nd use <span className="font-mono">-bi-</span>, 3rd/4th use <span className="font-mono">-a-/-e-</span></p>
        <ConjTable
          headers={['', '1st (porto)', '2nd (moneo)', '3rd (rego)', '4th (audio)', 'Mixed 3rd (capio)']}
          rows={[
            ['1st sg', 'port-abo', 'mon-ebo', 'reg-am', 'audi-am', 'capi-am'],
            ['2nd sg', 'port-abis', 'mon-ebis', 'reg-es', 'audi-es', 'capi-es'],
            ['3rd sg', 'port-abit', 'mon-ebit', 'reg-et', 'audi-et', 'capi-et'],
            ['1st pl', 'port-abimus', 'mon-ebimus', 'reg-emus', 'audi-emus', 'capi-emus'],
            ['2nd pl', 'port-abitis', 'mon-ebitis', 'reg-etis', 'audi-etis', 'capi-etis'],
            ['3rd pl', 'port-abunt', 'mon-ebunt', 'reg-ent', 'audi-ent', 'capi-ent'],
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

      {/* Future Perfect Active */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Future Perfect Active Indicative</h2>
        <p className="text-sm text-foreground/50 mb-3">&ldquo;I will have carried&rdquo; &mdash; perfect stem + eri- (NB: 3rd pl <span className="font-mono">-erint</span>)</p>
        <ConjTable
          headers={['', '1st (portav-)', '2nd (monu-)', '3rd (rex-)', '4th (audiv-)']}
          rows={[
            ['1st sg', 'portav-ero', 'monu-ero', 'rex-ero', 'audiv-ero'],
            ['2nd sg', 'portav-eris', 'monu-eris', 'rex-eris', 'audiv-eris'],
            ['3rd sg', 'portav-erit', 'monu-erit', 'rex-erit', 'audiv-erit'],
            ['1st pl', 'portav-erimus', 'monu-erimus', 'rex-erimus', 'audiv-erimus'],
            ['2nd pl', 'portav-eritis', 'monu-eritis', 'rex-eritis', 'audiv-eritis'],
            ['3rd pl', 'portav-erint', 'monu-erint', 'rex-erint', 'audiv-erint'],
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
          headers={['', 'Present', 'Future', 'Imperfect', 'Perfect', 'Fut. Perf.', 'Pluperfect']}
          rows={[
            ['1st sg', 'sum', 'ero', 'eram', 'fui', 'fuero', 'fueram'],
            ['2nd sg', 'es', 'eris', 'eras', 'fuisti', 'fueris', 'fueras'],
            ['3rd sg', 'est', 'erit', 'erat', 'fuit', 'fuerit', 'fuerat'],
            ['1st pl', 'sumus', 'erimus', 'eramus', 'fuimus', 'fuerimus', 'fueramus'],
            ['2nd pl', 'estis', 'eritis', 'eratis', 'fuistis', 'fueritis', 'fueratis'],
            ['3rd pl', 'sunt', 'erunt', 'erant', 'fuerunt', 'fuerint', 'fuerant'],
          ]}
        />
      </section>

      {/* possum */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Irregular: <em>possum, posse</em> (to be able)</h2>
        <ConjTable
          headers={['', 'Present', 'Future', 'Imperfect', 'Perfect', 'Fut. Perf.', 'Pluperfect']}
          rows={[
            ['1st sg', 'possum', 'potero', 'poteram', 'potui', 'potuero', 'potueram'],
            ['2nd sg', 'potes', 'poteris', 'poteras', 'potuisti', 'potueris', 'potueras'],
            ['3rd sg', 'potest', 'poterit', 'poterat', 'potuit', 'potuerit', 'potuerat'],
            ['1st pl', 'possumus', 'poterimus', 'poteramus', 'potuimus', 'potuerimus', 'potueramus'],
            ['2nd pl', 'potestis', 'poteritis', 'poteratis', 'potuistis', 'potueritis', 'potueratis'],
            ['3rd pl', 'possunt', 'poterunt', 'poterant', 'potuerunt', 'potuerint', 'potuerant'],
          ]}
        />
      </section>

      {/* eo */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Irregular: <em>eo, ire</em> (to go)</h2>
        <ConjTable
          headers={['', 'Present', 'Future', 'Imperfect', 'Perfect', 'Fut. Perf.', 'Pluperfect']}
          rows={[
            ['1st sg', 'eo', 'ibo', 'ibam', 'i(v)i', 'i(v)ero', 'i(v)eram'],
            ['2nd sg', 'is', 'ibis', 'ibas', 'i(v)isti', 'i(v)eris', 'i(v)eras'],
            ['3rd sg', 'it', 'ibit', 'ibat', 'i(v)it', 'i(v)erit', 'i(v)erat'],
            ['1st pl', 'imus', 'ibimus', 'ibamus', 'i(v)imus', 'i(v)erimus', 'i(v)eramus'],
            ['2nd pl', 'itis', 'ibitis', 'ibatis', 'i(v)istis', 'i(v)eritis', 'i(v)eratis'],
            ['3rd pl', 'eunt', 'ibunt', 'ibant', 'i(v)erunt', 'i(v)erint', 'i(v)erant'],
          ]}
        />
      </section>

      {/* fero */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Irregular: <em>fero, ferre</em> (to carry/bear)</h2>
        <ConjTable
          headers={['', 'Present', 'Future', 'Imperfect', 'Perfect', 'Fut. Perf.', 'Pluperfect']}
          rows={[
            ['1st sg', 'fero', 'feram', 'ferebam', 'tuli', 'tulero', 'tuleram'],
            ['2nd sg', 'fers', 'feres', 'ferebas', 'tulisti', 'tuleris', 'tuleras'],
            ['3rd sg', 'fert', 'feret', 'ferebat', 'tulit', 'tulerit', 'tulerat'],
            ['1st pl', 'ferimus', 'feremus', 'ferebamus', 'tulimus', 'tulerimus', 'tuleramus'],
            ['2nd pl', 'fertis', 'feretis', 'ferebatis', 'tulistis', 'tuleritis', 'tuleratis'],
            ['3rd pl', 'ferunt', 'ferent', 'ferebant', 'tulerunt', 'tulerint', 'tulerant'],
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
          <li>Future: 1st/2nd use <span className="font-mono">-bi-</span> (<span className="font-mono">-bo, -bis, -bit, -bimus, -bitis, -bunt</span>); 3rd/4th use <span className="font-mono">-am, -es, -et, -emus, -etis, -ent</span></li>
          <li>Imperfect sign: <span className="font-mono">-ba-</span> (1st/2nd), <span className="font-mono">-eba-</span> (3rd/4th)</li>
          <li>Perfect endings are the same for all conjugations: <span className="font-mono">-i, -isti, -it, -imus, -istis, -erunt</span></li>
          <li>Future perfect = perfect stem + <span className="font-mono">-ero, -eris, -erit, -erimus, -eritis, -erint</span></li>
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
