'use client';

import { useState } from 'react';

const TOPICS = [
  { id: 'nouns', label: 'Nouns' },
  { id: 'adjectives', label: 'Adjectives' },
  { id: 'adverbs', label: 'Adverbs' },
  { id: 'pronouns', label: 'Pronouns' },
  { id: 'prepositions', label: 'Prepositions' },
  { id: 'verbs', label: 'Verb Basics' },
  { id: 'infinitives', label: 'Infinitives' },
  { id: 'deponents', label: 'Deponent Verbs' },
  { id: 'participles', label: 'Participles' },
  { id: 'passives', label: 'Passives' },
  { id: 'subjunctive', label: 'Subjunctive' },
  { id: 'imperatives', label: 'Imperatives' },
  { id: 'clauses', label: 'Clauses' },
  { id: 'conditionals', label: 'Conditionals' },
  { id: 'future', label: 'Future Tenses' },
  { id: 'gerundive', label: 'Gerundive' },
  { id: 'ablabs', label: 'Ablative Absolute' },
  { id: 'indirect', label: 'Indirect Speech' },
  { id: 'appendix', label: 'Quick Reference' },
] as const;

export default function GrammarPage() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-accent mb-2">Grammar Notes</h1>
      <p className="text-sm text-foreground/60 mb-6">OCR GCSE Latin grammar notes — sorted by topic</p>

      {/* Topic nav */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActive(null)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
            active === null ? 'bg-accent text-white border-accent' : 'border-card-border bg-card-bg hover:border-accent-light'
          }`}
        >
          All
        </button>
        {TOPICS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
              active === t.id ? 'bg-accent text-white border-accent' : 'border-card-border bg-card-bg hover:border-accent-light'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Notes */}
      <div className="space-y-8">
        {(!active || active === 'nouns') && <NounRevision />}
        {(!active || active === 'adjectives') && <AdjectivesOverview />}
        {(!active || active === 'adjectives') && <ComparativeAdjectives />}
        {(!active || active === 'adjectives') && <SuperlativeAdjectives />}
        {(!active || active === 'adverbs') && <AdverbsNotes />}
        {(!active || active === 'pronouns') && <PronounsNotes />}
        {(!active || active === 'prepositions') && <PrepositionsNotes />}
        {(!active || active === 'verbs') && <PersonalEndingsAndStems />}
        {(!active || active === 'infinitives') && <InfinitivesNotes />}
        {(!active || active === 'deponents') && <DeponentVerbsNotes />}
        {(!active || active === 'participles') && <PresentParticipleNotes />}
        {(!active || active === 'participles') && <PerfectPassiveParticiples />}
        {(!active || active === 'participles') && <PAPNotes />}
        {(!active || active === 'participles') && <ParticiplesTable />}
        {(!active || active === 'participles') && <ParticiplesRevision />}
        {(!active || active === 'passives') && <PassivesSummary />}
        {(!active || active === 'subjunctive') && <SubjunctiveNotes />}
        {(!active || active === 'subjunctive') && <PresentSubjunctiveNotes />}
        {(!active || active === 'subjunctive') && <PerfectSubjunctiveNotes />}
        {(!active || active === 'subjunctive') && <SubjunctiveTables />}
        {(!active || active === 'subjunctive') && <SequenceOfTenses />}
        {(!active || active === 'imperatives') && <ImperativesNotes />}
        {(!active || active === 'clauses') && <PurposeClauses />}
        {(!active || active === 'clauses') && <ResultClauses />}
        {(!active || active === 'subjunctive') && <CumSubjunctive />}
        {(!active || active === 'conditionals') && <ConditionalSentences />}
        {(!active || active === 'future') && <FutureTense />}
        {(!active || active === 'future') && <FuturePerfect />}
        {(!active || active === 'gerundive') && <GerundiveRevision />}
        {(!active || active === 'ablabs') && <AblativeAbsolute />}
        {(!active || active === 'indirect') && <IndirectCommands />}
        {(!active || active === 'indirect') && <IndirectQuestions />}
        {(!active || active === 'indirect') && <IndirectStatement />}
        {(!active || active === 'appendix') && <QuickReferenceAppendix />}
      </div>
    </div>
  );
}

/* ─── Helper Components ─── */

function Note({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-card-border bg-card-bg p-6">
      <h2 className="text-xl font-semibold text-accent mb-4">{title}</h2>
      <div className="text-sm leading-relaxed space-y-3">{children}</div>
    </section>
  );
}

function T({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto my-3">
      <table className="text-sm border-collapse">
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="text-left px-3 py-1.5 border-b-2 border-accent/30 font-semibold text-accent whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-accent/[0.03]' : ''}>
              {row.map((c, j) => (
                <td key={j} className={`px-3 py-1.5 border-b border-card-border whitespace-nowrap ${j === 0 ? 'font-medium' : 'font-mono'}`}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Ex({ children }: { children: React.ReactNode }) {
  return <div className="pl-4 border-l-2 border-accent-light/40 my-2 text-foreground/80 italic">{children}</div>;
}

/* ─── Notes ─── */

function NounRevision() {
  return (
    <Note title="Noun Revision">
      <p><strong>Cases:</strong></p>
      <T headers={['Case', 'Use']} rows={[
        ['NOMINATIVE', 'Subject'],
        ['VOCATIVE', 'Addressing someone'],
        ['ACCUSATIVE', 'Object'],
        ['GENITIVE', "'of'"],
        ['DATIVE', "'to/for'"],
        ['ABLATIVE', "'by/with/from'"],
      ]} />

      <T headers={['Case', 'GROUP 1', 'GROUP 2', 'GROUP 3']} rows={[
        ['', 'puella', 'servus', 'leo'],
        ['NOM sg', 'puella', 'servus', 'leo (no change)'],
        ['VOC sg', 'puella', 'serve', 'leo (no change)'],
        ['ACC sg', 'puellam', 'servum', 'leonem'],
        ['GEN sg', 'puellae', 'servi', 'leonis'],
        ['DAT sg', 'puellae', 'servo', 'leoni'],
        ['ABL sg', 'puella', 'servo', 'leone'],
        ['NOM pl', 'puellae', 'servi', 'leones'],
        ['VOC pl', 'puellae', 'servi', 'leones'],
        ['ACC pl', 'puellas', 'servos', 'leones'],
        ['GEN pl', 'puellarum', 'servorum', 'leonum'],
        ['DAT pl', 'puellis', 'servis', 'leonibus'],
        ['ABL pl', 'puellis', 'servis', 'leonibus'],
      ]} />

      <p><strong>First declension</strong></p>
      <T headers={['', 'Singular', 'Plural']} rows={[
        ['Nominative', 'puella', 'puellae'],
        ['Accusative', 'puellam', 'puellas'],
        ['Genitive', 'puellae', 'puellarum'],
        ['Dative', 'puellae', 'puellis'],
        ['Ablative', 'puellā', 'puellis'],
      ]} />
      <Ex>puella ancillam quaerebat</Ex>
      <Ex>ancilla puellam intellegit</Ex>
      <Ex>ancilla togam puellae ferebat</Ex>
      <Ex>ancilla puellae togam dedit</Ex>
      <Ex>ancilla, puellā excitata, surrexit</Ex>
      <Ex>puellae togas emerunt</Ex>
      <Ex>ancilla puellas conspexit</Ex>
      <Ex>ancillae togas puellarum ferebant</Ex>
      <Ex>ancillae puellis togas ferebant</Ex>
      <Ex>ancillae, puellis verberatae, lacrimabant</Ex>

      <p><strong>Second declension</strong></p>
      <T headers={['', 'Singular', 'Plural']} rows={[
        ['Nominative', 'servus', 'servi'],
        ['Accusative', 'servum', 'servos'],
        ['Genitive', 'servi', 'servorum'],
        ['Dative', 'servo', 'servis'],
        ['Ablative', 'servo', 'servis'],
      ]} />
      <Ex>servus cenam paravit</Ex>
      <Ex>dominus servum vituperavit</Ex>
      <Ex>canis servi ferociter latravit</Ex>
      <Ex>dominus servo signum dedit</Ex>
      <Ex>dominus, servo incensus, eum verberavit</Ex>
      <Ex>servi cibum emerunt</Ex>
      <Ex>dominus servos quaerebat</Ex>
      <Ex>dominus vinum servorum rapuit</Ex>
      <Ex>pueri servis vinum offerebant</Ex>
      <Ex>dominus, servis vulneratus, cecidit mortuus</Ex>

      <p><strong>Third declension</strong></p>
      <T headers={['', 'Singular', 'Plural']} rows={[
        ['Nominative', 'mercator', 'mercatores'],
        ['Accusative', 'mercatorem', 'mercatores'],
        ['Genitive', 'mercatoris', 'mercatorum'],
        ['Dative', 'mercatori', 'mercatoribus'],
        ['Ablative', 'mercatore', 'mercatoribus'],
      ]} />
      <Ex>mercator erat in foro</Ex>
      <Ex>amicus mercatorem conspexit</Ex>
      <Ex>amicus mercatoris vinum emit</Ex>
      <Ex>amicus mercatori vinum emit</Ex>
      <Ex>amicus, mercatore invitatus, villam intrat</Ex>
      <Ex>mercatores in foro ambulabant</Ex>
      <Ex>amicus mercatores salutavit</Ex>
      <Ex>amici mercatorum multum vinum emerunt</Ex>
      <Ex>amicus mercatoribus cenam paravit</Ex>
      <Ex>amicus, mercatoribus deceptus, iratissimus erat</Ex>
    </Note>
  );
}

function AdjectivesOverview() {
  return (
    <Note title="Adjectives Overview">
      <p><strong>Group 1/2 Adjective</strong></p>
      <p>bonus –a –um = good</p>
      <T headers={['Case', 'Masculine', 'Feminine', 'Neuter']} rows={[
        ['NOM sg', 'bonus', 'bona', 'bonum'],
        ['VOC sg', 'bone', 'bona', 'bonum'],
        ['ACC sg', 'bonum', 'bonam', 'bonum'],
        ['GEN sg', 'boni', 'bonae', 'boni'],
        ['DAT sg', 'bono', 'bonae', 'bono'],
        ['ABL sg', 'bono', 'bona', 'bono'],
        ['NOM pl', 'boni', 'bonae', 'bona'],
        ['VOC pl', 'boni', 'bonae', 'bona'],
        ['ACC pl', 'bonos', 'bonas', 'bona'],
        ['GEN pl', 'bonorum', 'bonarum', 'bonorum'],
        ['DAT pl', 'bonis', 'bonis', 'bonis'],
        ['ABL pl', 'bonis', 'bonis', 'bonis'],
      ]} />
      <p>Endings similar to the following nouns:</p>
      <ul className="list-disc list-inside">
        <li>Group 2: servus, annus</li>
        <li>Group 1: puella, mensa</li>
        <li>Group 2: templum, bellum</li>
      </ul>
      <p>In your vocabulary list all three genders are given for a 1/2 adjective: bonus, bona, bonum</p>

      <p className="mt-4"><strong>Group 3 Adjective</strong></p>
      <p>fortis -e = brave &nbsp;&nbsp;&nbsp; ingens, ingentis = big</p>
      <T headers={['Case', 'M&F (fortis)', 'N (forte)', 'M&F (ingens)', 'N (ingens)']} rows={[
        ['NOM sg', 'fortis', 'forte', 'ingens', 'ingens'],
        ['VOC sg', 'fortis', 'forte', 'ingens', 'ingens'],
        ['ACC sg', 'fortem', 'forte', 'ingentem', 'ingens'],
        ['GEN sg', 'fortis', 'fortis', 'ingentis', 'ingentis'],
        ['DAT sg', 'forti', 'forti', 'ingenti', 'ingenti'],
        ['ABL sg', 'forti', 'forti', 'ingenti', 'ingenti'],
        ['NOM pl', 'fortes', 'fortia', 'ingentes', 'ingentia'],
        ['VOC pl', 'fortes', 'fortia', 'ingentes', 'ingentia'],
        ['ACC pl', 'fortes', 'fortia', 'ingentes', 'ingentia'],
        ['GEN pl', 'fortium', 'fortium', 'ingentium', 'ingentium'],
        ['DAT pl', 'fortibus', 'fortibus', 'ingentibus', 'ingentibus'],
        ['ABL pl', 'fortibus', 'fortibus', 'ingentibus', 'ingentibus'],
      ]} />
      <p>Endings similar to the following nouns:</p>
      <ul className="list-disc list-inside">
        <li>Group 3: leo, rex</li>
        <li>Group 3: nomen</li>
      </ul>
      <p>In your vocabulary list, two words are given for a group 3 adjective. They are either:</p>
      <ul className="list-disc list-inside">
        <li>the Masc/Fem and Neuter form: fortis, forte</li>
        <li>or the Nominative and Genitive form: ingens, ingentis, because ingens is also used for the Neuter form.</li>
      </ul>
    </Note>
  );
}

function ComparativeAdjectives() {
  return (
    <Note title="Comparative Adjectives — 'more ___'">
      <p><strong>Comparative:</strong> The form of an adjective meaning &lsquo;more ___&rsquo; or &lsquo;___er&rsquo;. E.g. braver, more beautiful, longer.</p>
      <p><strong>Formation:</strong> adjective stem + <span className="font-mono">-ior</span> (m/f), <span className="font-mono">-ius</span> (n) — declines like 3rd declension</p>

      <T headers={['Positive', 'Meaning', 'Comparative', 'Meaning']} rows={[
        ['longus', 'long', 'longior / longius', 'longer'],
        ['fortis', 'brave', 'fortior / fortius', 'braver'],
        ['felix', 'lucky', 'felicior / felicius', 'luckier'],
        ['bonus', 'good', 'melior / melius', 'better  (IRREGULAR)'],
        ['malus', 'bad', 'peior / peius', 'worse  (IRREGULAR)'],
        ['magnus', 'great', 'maior / maius', 'greater  (IRREGULAR)'],
        ['parvus', 'small', 'minor / minus', 'smaller  (IRREGULAR)'],
        ['multus', 'many', 'plus / plures', 'more  (IRREGULAR)'],
      ]} />

      <p className="mt-3"><strong>&lsquo;Than&rsquo; — two ways:</strong> <span className="font-mono">quam</span> + same case OR ablative of comparison</p>
      <Ex>puella altior quam puer est. — The girl is taller than the boy.</Ex>
      <Ex>puella altior puero est. — The girl is taller than the boy. (ablative of comparison)</Ex>
    </Note>
  );
}

function SuperlativeAdjectives() {
  return (
    <Note title="Superlative Adjectives — 'most ___' / 'very ___'">
      <p><strong>Superlative:</strong> The form of an adjective meaning &lsquo;most ___&rsquo; or &lsquo;very ___&rsquo;. E.g. bravest, most beautiful, very long.</p>
      <p><strong>Formation:</strong> adjective stem + <span className="font-mono">-issimus/-issima/-issimum</span> — declines like <em>bonus, -a, -um</em></p>

      <T headers={['Positive', 'Superlative', 'Meaning']} rows={[
        ['longus', 'longissimus, -a, -um', 'longest / very long'],
        ['fortis', 'fortissimus, -a, -um', 'bravest / very brave'],
        ['felix', 'felicissimus, -a, -um', 'luckiest / very lucky'],
        ['bonus', 'optimus, -a, -um', 'best  (IRREGULAR)'],
        ['malus', 'pessimus, -a, -um', 'worst  (IRREGULAR)'],
        ['magnus', 'maximus, -a, -um', 'greatest  (IRREGULAR)'],
        ['parvus', 'minimus, -a, -um', 'smallest  (IRREGULAR)'],
      ]} />

      <p className="mt-3"><strong>Warning:</strong> Adjectives ending in <span className="font-mono">-er</span>: double the -r and add <span className="font-mono">-imus</span>. <em>pulcher</em> → <em>pulcherrimus</em> | <em>miser</em> → <em>miserrimus</em></p>
    </Note>
  );
}

function AdverbsNotes() {
  return (
    <Note title="Adverbs">
      <p>An <strong>adverb</strong> is a word that modifies a verb (&lsquo;he runs quickly&rsquo;), an adjective (&lsquo;very brave&rsquo;) or another adverb (&lsquo;quite slowly&rsquo;). Adverbs NEVER change their ending in Latin.</p>

      <p className="mt-3"><strong>Forming Adverbs from Adjectives</strong></p>
      <T headers={['Adjective type', 'Rule', 'Adjective', 'Adverb']} rows={[
        ['1st/2nd decl. (bonus type)', 'Change -us to -e', 'longus (long)', 'longe (far)'],
        ['1st/2nd decl. (bonus type)', 'Change -us to -e', 'lentus (slow)', 'lente (slowly)'],
        ['3rd decl. (fortis type)', 'Add -iter to stem', 'fortis (brave)', 'fortiter (bravely)'],
        ['3rd decl. ending -nt', 'Add -er to stem', 'diligens', 'diligenter (carefully)'],
      ]} />

      <p className="mt-3"><strong>Comparative &amp; Superlative Adverbs</strong></p>
      <p><strong>Comparative Adverb:</strong> &lsquo;More ___ly&rsquo;. Identical in form to the neuter comparative adjective (<span className="font-mono">-ius</span> ending). Context tells you which it is.</p>
      <p><strong>Superlative Adverb:</strong> &lsquo;Most ___ly&rsquo; / &lsquo;very ___ly&rsquo;. Take the superlative adjective and replace <span className="font-mono">-us</span> with <span className="font-mono">-e</span>.</p>

      <T headers={['Positive', 'Comparative', 'Superlative']} rows={[
        ['bene (well)', 'melius (better)', 'optime (best)'],
        ['male (badly)', 'peius (worse)', 'pessime (worst)'],
        ['fortiter (bravely)', 'fortius (more bravely)', 'fortissime (most bravely)'],
        ['longe (far)', 'longius (further)', 'longissime (furthest)'],
        ['saepe (often)', 'saepius (more often)', 'saepissime (most often)'],
      ]} />

      <p className="mt-3"><strong>Tip:</strong> Comparative adverb = neuter comparative adjective. E.g. <em>fortius</em> = &lsquo;braver&rsquo; (adj.) OR &lsquo;more bravely&rsquo; (adv.). Ask: is it describing a noun or a verb?</p>

      <p className="mt-3"><strong>Common Adverbs to Learn</strong></p>
      <T headers={['Latin', 'English', 'Latin', 'English']} rows={[
        ['statim', 'at once, immediately', 'iam', 'now, already'],
        ['mox', 'soon', 'tandem', 'at last, finally'],
        ['tum', 'then', 'deinde', 'then, next'],
        ['olim', 'once, long ago', 'iterum', 'again'],
        ['semper', 'always', 'numquam', 'never'],
        ['saepe', 'often', 'subito', 'suddenly'],
        ['tamen', 'however', 'etiam', 'also, even'],
        ['valde', 'very', 'paene', 'almost'],
        ['vix', 'hardly', 'frustra', 'in vain'],
        ['forte', 'by chance', 'satis', 'enough'],
      ]} />
    </Note>
  );
}

function PronounsNotes() {
  return (
    <Note title="Pronouns">
      <p>A <strong>pronoun</strong> is a word used instead of a noun to avoid repetition. E.g. &lsquo;The soldier fought — he won.&rsquo; &lsquo;He&rsquo; is a pronoun replacing &lsquo;the soldier&rsquo;.</p>

      <p className="mt-3"><strong>Personal Pronouns — I, you, we</strong></p>
      <T headers={['Case', 'I/me', 'you (sg.)', 'he/she/it', 'we/us', 'you (pl.)', 'they']} rows={[
        ['Nom.', 'ego', 'tu', 'is/ea/id', 'nos', 'vos', 'ei/eae/ea'],
        ['Acc.', 'me', 'te', 'eum/eam/id', 'nos', 'vos', 'eos/eas/ea'],
        ['Gen.', 'mei', 'tui', 'eius', 'nostri', 'vestri', 'eorum/earum'],
        ['Dat.', 'mihi', 'tibi', 'ei', 'nobis', 'vobis', 'eis'],
        ['Abl.', 'me', 'te', 'eo/ea/eo', 'nobis', 'vobis', 'eis'],
      ]} />
      <p><strong>Tip:</strong> Latin usually OMITS <em>ego</em> and <em>tu</em> — the verb ending tells you the person. Only use them for EMPHASIS or CONTRAST.</p>
      <Ex>ego hoc feci, non tu! — I did this, not you! (emphasis)</Ex>
      <p><strong>Note:</strong> <em>cum</em> attaches to personal pronouns: <em>mecum</em> (with me), <em>tecum</em> (with you), <em>nobiscum</em> (with us), <em>vobiscum</em> (with you all).</p>

      <p className="mt-4"><strong>Reflexive Pronouns — myself, yourself, himself</strong></p>
      <p>A <strong>reflexive pronoun</strong> is where the subject does the action TO THEMSELVES. E.g. &lsquo;The soldier killed himself.&rsquo; The action reflects back onto the subject.</p>
      <p>For 1st and 2nd person, use the same personal pronouns:</p>
      <T headers={['Person', 'Reflexive form', 'Example', 'Meaning']} rows={[
        ['I / myself', 'me', 'me video', 'I see myself'],
        ['you / yourself', 'te', 'te laudas', 'you praise yourself'],
        ['we / ourselves', 'nos', 'nos defendimus', 'we defend ourselves'],
        ['you all / yourselves', 'vos', 'vos servatis', 'you save yourselves'],
      ]} />
      <p>3rd person — <em>se</em> (dedicated reflexive pronoun):</p>
      <T headers={['Case', 'Form']} rows={[
        ['Nom.', '— (does not exist)'],
        ['Acc.', 'se'],
        ['Gen.', 'sui'],
        ['Dat.', 'sibi'],
        ['Abl.', 'se'],
      ]} />
      <Ex>miles se vulneravit. — The soldier wounded himself.</Ex>
      <Ex>puella se laudat. — The girl praises herself.</Ex>
      <Ex>milites se necaverunt. — The soldiers killed themselves.</Ex>
      <p><strong>Warning:</strong> <em>se</em> vs <em>eum/eam</em>: &lsquo;rex se interfecit&rsquo; = the king killed HIMSELF. &lsquo;rex eum interfecit&rsquo; = the king killed HIM (someone else). Same trap as <em>suus</em> vs <em>eius</em>!</p>
      <p><strong>Note:</strong> <em>cum</em> + <em>se</em> = <em>secum</em> (with himself/herself/themselves). <em>veni mecum</em> = come with me!</p>

      <p className="mt-4"><strong>Possessive Pronouns — my, your, our</strong></p>
      <p>Shows ownership. Must agree with the noun it describes in gender, number and case — just like a regular adjective.</p>
      <T headers={['Person', 'Latin', 'English']} rows={[
        ['1st sg.', 'meus, mea, meum', 'my'],
        ['2nd sg.', 'tuus, tua, tuum', 'your (one person)'],
        ['3rd (own)', 'suus, sua, suum', 'his own / her own / their own'],
        ['1st pl.', 'noster, nostra, nostrum', 'our'],
        ['2nd pl.', 'vester, vestra, vestrum', 'your (many people)'],
      ]} />
      <p><strong>Warning:</strong> <em>suus</em> vs <em>eius</em>: <em>suus</em> = his OWN (refers to subject). <em>eius</em> = his (someone else&apos;s). &lsquo;puer librum suum amat&rsquo; = the boy loves his own book. &lsquo;puer librum eius amat&rsquo; = the boy loves his (someone else&apos;s) book.</p>

      <p className="mt-4"><strong>Demonstrative Pronouns — this, that</strong></p>
      <p>Points to something — &lsquo;this&rsquo; (near me) or &lsquo;that&rsquo; (far away). Can also act as an adjective describing a noun.</p>
      <p><em>hic, haec, hoc</em> — this (near me)</p>
      <T headers={['Case', 'm.', 'f.', 'n.', 'm. pl.', 'f. pl.', 'n. pl.']} rows={[
        ['Nom.', 'hic', 'haec', 'hoc', 'hi', 'hae', 'haec'],
        ['Acc.', 'hunc', 'hanc', 'hoc', 'hos', 'has', 'haec'],
        ['Gen.', 'huius', 'huius', 'huius', 'horum', 'harum', 'horum'],
        ['Dat.', 'huic', 'huic', 'huic', 'his', 'his', 'his'],
        ['Abl.', 'hoc', 'hac', 'hoc', 'his', 'his', 'his'],
      ]} />
      <p><em>ille, illa, illud</em> — that (far away)</p>
      <T headers={['Case', 'm.', 'f.', 'n.', 'm. pl.', 'f. pl.', 'n. pl.']} rows={[
        ['Nom.', 'ille', 'illa', 'illud', 'illi', 'illae', 'illa'],
        ['Acc.', 'illum', 'illam', 'illud', 'illos', 'illas', 'illa'],
        ['Gen.', 'illius', 'illius', 'illius', 'illorum', 'illarum', 'illorum'],
        ['Dat.', 'illi', 'illi', 'illi', 'illis', 'illis', 'illis'],
        ['Abl.', 'illo', 'illa', 'illo', 'illis', 'illis', 'illis'],
      ]} />
      <Ex>hic miles fortis est. — This soldier is brave.</Ex>
      <Ex>illam feminam vidi. — I saw that woman.</Ex>

      <p className="mt-4"><strong>Relative Pronouns — who, which, that</strong></p>
      <p><em>qui, quae, quod</em> — links a subordinate clause back to a noun (the antecedent). Agrees with the antecedent in GENDER and NUMBER, but takes its CASE from its own clause.</p>
      <T headers={['Case', 'm. sg.', 'f. sg.', 'n. sg.', 'm. pl.', 'f. pl.', 'n. pl.']} rows={[
        ['Nom.', 'qui', 'quae', 'quod', 'qui', 'quae', 'quae'],
        ['Acc.', 'quem', 'quam', 'quod', 'quos', 'quas', 'quae'],
        ['Gen.', 'cuius', 'cuius', 'cuius', 'quorum', 'quarum', 'quorum'],
        ['Dat.', 'cui', 'cui', 'cui', 'quibus', 'quibus', 'quibus'],
        ['Abl.', 'quo', 'qua', 'quo', 'quibus', 'quibus', 'quibus'],
      ]} />
      <Ex>miles quem vidi fortis erat. — The soldier whom I saw was brave.</Ex>
      <Ex>puellae quas laudavi laetae erant. — The girls whom I praised were happy.</Ex>
      <p><strong>Tip:</strong> How to tackle: 1) Find the pronoun. 2) Find its antecedent. 3) Match gender &amp; number. 4) Find the case from INSIDE the relative clause.</p>

      <p className="mt-4"><strong>Interrogative Pronouns — who? what?</strong></p>
      <p><em>quis? quid?</em> — used to ask questions. Who? What?</p>
      <T headers={['Case', 'm/f (who?)', 'n (what?)']} rows={[
        ['Nom.', 'quis?', 'quid?'],
        ['Acc.', 'quem?', 'quid?'],
        ['Gen.', 'cuius?', 'cuius?'],
        ['Dat.', 'cui?', 'cui?'],
        ['Abl.', 'quo?', 'quo?'],
      ]} />
      <Ex>quis hoc fecit? — Who did this?</Ex>
      <Ex>quid dicis? — What are you saying?</Ex>
      <p>Other question words: <em>cur?</em> why? | <em>ubi?</em> where? | <em>quomodo?</em> how? | <em>quando?</em> when? | <em>quot?</em> how many?</p>
      <p><strong>Note:</strong> <em>qui/quae/quod</em> (relative) vs <em>quis/quid</em> (interrogative): relative LINKS clauses. Interrogative ASKS questions. If there&apos;s a question mark coming — interrogative!</p>
    </Note>
  );
}

function PrepositionsNotes() {
  return (
    <Note title="Prepositions">
      <p>A <strong>preposition</strong> is a word that shows the relationship between a noun and the rest of the sentence — where something is, where it&apos;s going, what it&apos;s because of. Every Latin preposition demands a specific case.</p>
      <p><strong>Key Rule:</strong> Accusative = usually MOTION (going somewhere). Ablative = usually POSITION (staying somewhere).</p>

      <p className="mt-3"><strong>Prepositions + Accusative</strong></p>
      <T headers={['Latin', 'English', 'Example', 'Translation']} rows={[
        ['ad', 'to, towards', 'ad urbem eo', 'I go to the city'],
        ['in', 'into, onto', 'in aquam cecidit', 'he fell into the water'],
        ['per', 'through', 'per vias currit', 'he runs through the streets'],
        ['post', 'after, behind', 'post bellum', 'after the war'],
        ['propter', 'because of', 'propter periculum', 'because of danger'],
        ['trans', 'across', 'trans flumen', 'across the river'],
        ['contra', 'against', 'contra hostes', 'against the enemies'],
        ['ante', 'before', 'ante portam', 'in front of the gate'],
        ['circum', 'around', 'circum muros', 'around the walls'],
        ['inter', 'among, between', 'inter milites', 'among the soldiers'],
        ['prope', 'near', 'prope urbem', 'near the city'],
        ['extra', 'outside', 'extra muros', 'outside the walls'],
        ['intra', 'inside, within', 'intra urbem', 'within the city'],
      ]} />

      <p className="mt-3"><strong>Prepositions + Ablative</strong></p>
      <T headers={['Latin', 'English', 'Example', 'Translation']} rows={[
        ['a/ab', 'from, by (person)', 'a domino laudatur', 'praised by the master'],
        ['cum', 'with', 'cum amicis', 'with friends'],
        ['de', 'from, about, down from', 'de bello', 'about the war'],
        ['e/ex', 'out of, from', 'ex oppido', 'out of the town'],
        ['in', 'in, on', 'in silva', 'in the wood'],
        ['sine', 'without', 'sine aqua', 'without water'],
        ['pro', 'on behalf of, in front of', 'pro patria', 'on behalf of the homeland'],
        ['sub', 'under', 'sub arbore', 'under the tree'],
      ]} />

      <p className="mt-3"><strong>Warning:</strong> <em>in</em> + accusative = motion INTO. <em>in</em> + ablative = position IN. These are the same word with completely different meanings!</p>
      <Ex>in urbem currit. — He runs INTO the city. (acc — motion)</Ex>
      <Ex>in urbe manet. — He stays IN the city. (abl — position)</Ex>

      <p className="mt-4"><strong>The Ablative Case — All Uses</strong></p>
      <p>The most versatile case in Latin. It has multiple uses depending on context — think of it as a Swiss Army knife.</p>
      <T headers={['Use', 'Preposition?', 'Example', 'Translation']} rows={[
        ['Instrument (by/with a thing)', 'None', 'hasta vulneratus', 'wounded by a spear'],
        ['Agent (by a person — passive)', 'a/ab', 'a milite occisus', 'killed by a soldier'],
        ['With prepositions', 'cum/ex/sine/de etc.', 'cum amicis', 'with friends'],
        ['Time when', 'None', 'prima hora', 'at the first hour'],
        ['Time within which', 'None', 'tribus diebus', 'within three days'],
        ['Manner (how)', 'cum (optional)', 'magna cum cura', 'with great care'],
        ['Separation (from)', 'None / ex/ab', 'periculo liberatus', 'freed from danger'],
        ['Description', 'None', 'vir magnae virtutis', 'a man of great courage'],
        ['Ablative Absolute', 'None', 'urbe capta', 'the city having been captured'],
      ]} />

      <p className="mt-4"><strong>Prepositions as Verb Prefixes</strong></p>
      <p>Many prepositions attach to verbs to change their meaning:</p>
      <T headers={['Prefix', 'Meaning', 'Example', 'Meaning']} rows={[
        ['ad-', 'to, towards', 'advenio', 'I arrive'],
        ['ex-', 'out', 'exeo', 'I go out'],
        ['in-', 'into', 'intro', 'I enter'],
        ['trans-', 'across', 'transeo', 'I cross'],
        ['per-', 'through', 'pervenio', 'I arrive (come through)'],
        ['re-', 'back', 'redeo', 'I return'],
        ['de-', 'down', 'descendo', 'I descend'],
        ['pro-', 'forward', 'procedo', 'I proceed'],
        ['inter-', 'between/through', 'interficio', 'I kill'],
      ]} />
    </Note>
  );
}

function PersonalEndingsAndStems() {
  return (
    <Note title="Personal Endings & Present vs Perfect Stem">
      <p><strong>The Four Conjugations</strong></p>
      <T headers={['Conjugation', 'Infinitive ending', 'Example', 'Meaning']} rows={[
        ['1st', '-are', 'amare', 'to love'],
        ['2nd', '-ere (long e)', 'monere', 'to warn'],
        ['3rd', '-ere (short e)', 'ducere', 'to lead'],
        ['4th', '-ire', 'audire', 'to hear'],
      ]} />

      <p className="mt-3"><strong>Personal Endings — Who Is Doing It</strong></p>
      <p>These endings attach to the stem and tell you the SUBJECT of the verb:</p>
      <T headers={['Ending', 'Person', 'Example (amo)', 'Meaning']} rows={[
        ['-o/-m', 'I (1st sg.)', 'amo', 'I love'],
        ['-s', 'you (2nd sg.)', 'amas', 'you love'],
        ['-t', 'he/she/it (3rd sg.)', 'amat', 'he loves'],
        ['-mus', 'we (1st pl.)', 'amamus', 'we love'],
        ['-tis', 'you all (2nd pl.)', 'amatis', 'you all love'],
        ['-nt', 'they (3rd pl.)', 'amant', 'they love'],
      ]} />

      <p className="mt-3"><strong>Present Stem vs Perfect Stem</strong></p>
      <p><strong>Present Stem:</strong> Found by taking the infinitive (2nd principal part) and removing <span className="font-mono">-re</span>. Used for: Present, Imperfect, Future.</p>
      <p><strong>Perfect Stem:</strong> Found by taking the 3rd principal part and removing <span className="font-mono">-i</span>. Used for: Perfect, Pluperfect, Future Perfect.</p>

      <T headers={['Verb', 'Infinitive', 'Present stem', '3rd part', 'Perfect stem']} rows={[
        ['amo', 'amare', 'ama-', 'amavi', 'amav-'],
        ['moneo', 'monere', 'mone-', 'monui', 'monu-'],
        ['duco', 'ducere', 'duc-', 'duxi', 'dux-'],
        ['audio', 'audire', 'audi-', 'audivi', 'audiv-'],
        ['facio', 'facere', 'faci-', 'feci', 'fec-'],
        ['venio', 'venire', 'veni-', 'veni', 'ven-'],
      ]} />

      <p className="mt-3"><strong>Warning:</strong> The perfect stem can change dramatically from the present stem — ALWAYS learn all 4 principal parts!</p>

      <p className="mt-3"><strong>The Main Tenses</strong></p>
      <T headers={['Tense', 'Stem used', 'Signal', 'English meaning', 'Example (amo, 3rd sg.)']} rows={[
        ['Present', 'Present', 'plain endings', 'I love / am loving', 'amat'],
        ['Imperfect', 'Present', '-ba-', 'I was loving / used to love', 'amabat'],
        ['Future', 'Present', '-bi-/-bo-', 'I will love', 'amabit'],
        ['Perfect', 'Perfect', '-i endings', 'I loved / have loved', 'amavit'],
        ['Pluperfect', 'Perfect', '-eram endings', 'I had loved', 'amaverat'],
      ]} />
    </Note>
  );
}

function InfinitivesNotes() {
  return (
    <Note title="Infinitives">
      <p>The <strong>infinitive</strong> is the &lsquo;to do&rsquo; form of a verb. It has no subject and no tense of its own. Used after verbs of wanting, being able, ordering etc.</p>

      <T headers={['Type', 'Formation', 'Example', 'Meaning']} rows={[
        ['Present Active', '2nd principal part', 'amare', 'to love'],
        ['Present Passive', 'replace -re with -ri (or -i for 3rd)', 'amari', 'to be loved'],
        ['Perfect Active', 'perfect stem + -isse', 'amavisse', 'to have loved'],
        ['Perfect Passive', 'PPP + esse', 'amatum esse', 'to have been loved'],
        ['Future Active', 'PPP stem + -urus esse', 'amaturum esse', 'to be about to love'],
      ]} />

      <Ex>miles cupit vincere. — The soldier desires to conquer.</Ex>
      <Ex>puella vult cantare. — The girl wants to sing.</Ex>
    </Note>
  );
}

function DeponentVerbsNotes() {
  return (
    <Note title="Deponent Verbs">
      <p>A <strong>deponent verb</strong> is a verb that looks PASSIVE in form but is ACTIVE in meaning. It has no active forms at all. Think of it as wearing a passive costume.</p>

      <T headers={['Latin', 'Principal Parts', 'Meaning', 'Type']} rows={[
        ['conor', 'conari, conatus sum', 'I try', '1st dep.'],
        ['hortor', 'hortari, hortatus sum', 'I encourage', '1st dep.'],
        ['miror', 'mirari, miratus sum', 'I wonder at, admire', '1st dep.'],
        ['loquor', 'loqui, locutus sum', 'I speak', '3rd dep.'],
        ['sequor', 'sequi, secutus sum', 'I follow', '3rd dep.'],
        ['morior', 'mori, mortuus sum', 'I die', '3rd dep.'],
        ['proficiscor', 'proficisci, profectus sum', 'I set out', '3rd dep.'],
        ['patior', 'pati, passus sum', 'I suffer, endure', '3rd dep.'],
        ['egredior', 'egredi, egressus sum', 'I go out', '3rd dep.'],
      ]} />

      <Ex>milites loquti sunt. — The soldiers spoke. (looks passive — means active!)</Ex>
    </Note>
  );
}

function PresentParticipleNotes() {
  return (
    <Note title="The Present Participle">
      <Ex>Galli in castra Romanorum irruperunt, <strong>currentes</strong>.<br/>The Gauls burst into the camp, running.</Ex>

      <p>The underlined word is a Present Participle. The Present Participle is part of a verb. Like an adjective it is used to describe a noun (currentes describes Galli).</p>

      <p>It is recognised by <strong>–ns</strong> at the end of a verb, or <strong>–nt-</strong> in the middle of a word, for example: portantes, clamans, recumbens</p>

      <p>It is translated by the English verb ending <strong>–ing</strong>. E.g. clamans = shouting.</p>

      <p>The participle has endings similar to those of leo. It must be the same number, case and gender of the noun it is describing. It may, however, have different endings to the noun it is describing if they are in different groups.</p>

      <Ex>dormientes leones stertunt. — The sleeping lions are snoring.</Ex>
      <Ex>dormientes servi stertunt. — The sleeping slaves are snoring.</Ex>
      <Ex>puerum, in horto stantem, video. — I see a boy standing in the garden.</Ex>

      <p><strong>amans = loving</strong></p>
      <T headers={['', 'Masc. & Fem.', 'Neuter']} rows={[
        ['NOM & VOC sg', 'amans', 'amans'],
        ['ACC sg', 'amantem', 'amans'],
        ['GEN sg', 'amantis', 'amantis'],
        ['DAT sg', 'amanti', 'amanti'],
        ['ABL sg', 'amanti/e', 'amanti/e'],
        ['NOM & VOC pl', 'amantes', 'amantia'],
        ['ACC pl', 'amantes', 'amantia'],
        ['GEN pl', 'amantium', 'amantium'],
        ['DAT pl', 'amantibus', 'amantibus'],
        ['ABL pl', 'amantibus', 'amantibus'],
      ]} />

      <p>The present participle can be translated in different ways:</p>
      <Ex>pueri, in villa laborantes, cantant<br/>
      The boys working in the house are singing<br/>
      The boys while working in the house are singing<br/>
      The boys who are working in the house are singing</Ex>
    </Note>
  );
}

function PerfectPassiveParticiples() {
  return (
    <Note title="Perfect Passive Participles">
      <p>ALL participles change their endings to agree with the noun they describe. They agree in <strong>case</strong>, <strong>number</strong> (singular or plural) and <strong>gender</strong> (masculine, feminine, neuter).</p>

      <p><strong>Present participle</strong> – declines like ingens and is translated as &ldquo;...ing&rdquo;</p>
      <Ex>mater filiam cantantem audivit</Ex>
      <Ex>ingens multitudo pompam per viam procedentem spectabat.</Ex>

      <p><strong>Perfect passive participle</strong> – declines like bonus and is translated as &ldquo;having been ...&rdquo;</p>
      <Ex>servus, graviter vulneratus, sub plaustro iacebat.</Ex>
      <Ex>ancilla, a domina arcessita, cubiculum intravit.</Ex>

      <p>The perfect passive participle will now appear as the fourth part of the verb when you learn your vocabulary.</p>
      <p className="font-mono">paro &nbsp;&nbsp; parare &nbsp;&nbsp; paravi &nbsp;&nbsp; paratus</p>

      <p>It can be translated in a number of ways:</p>
      <Ex>fabri, ab architecto laudati, riserunt.<br/>
      The craftsmen, having been praised by the architect, smiled.<br/>
      OR: When the craftsmen had been praised by the architect, they smiled.<br/>
      OR: The craftsmen smiled when they had been praised by the architect.</Ex>

      <p><strong>Examples:</strong></p>
      <Ex>1. faber, ab architecto laudatus, risit.</Ex>
      <Ex>2. servi, a domino arcessiti, statim ad tablinum festinaverunt.</Ex>
      <Ex>3. servi, a mercatoribus adepti, ad naves contenderunt.</Ex>
    </Note>
  );
}

function PAPNotes() {
  return (
    <Note title="Perfect Active Participle">
      <Ex>haruspex, haec verba <strong>locutus</strong>, abiit.<br/>
      The soothsayer, having spoken these words, went away.</Ex>

      <p>The Perfect Active Participle is part of a verb. Like an adjective it is used to describe a noun (locutus describes haruspex).</p>

      <p>The Perfect Active Participle (e.g. ingressus: having entered) is similar to the Perfect Passive Participle (e.g. vituperatus: having been beaten), except it does not have the word &ldquo;been&rdquo;.</p>

      <p>The Perfect Active Participle has the same endings as the Perfect Passive Participle. Because it describes a noun it must agree with it in Number, Case and Gender.</p>

      <Ex>milites, haec verba locuti, abierunt<br/>
      The soldiers, having spoken these words, went away.</Ex>

      <p>The Perfect Active Participle can be translated in a variety of ways:</p>
      <Ex>The soldiers, after they spoke/had spoken these words, went away.<br/>
      The soldiers, when they spoke/had spoken these words, went away.</Ex>

      <T headers={['English', 'Latin']} rows={[
        ['having seemed', 'visus'],
        ['having risen', 'ortus'],
        ['having used', 'usus'],
        ['having died', 'mortuus'],
        ['having suspected', 'suspicatus'],
        ['having spoken', 'locutus'],
        ['having followed', 'secutus'],
        ['having entered', 'ingressus'],
        ['having returned', 'regressus'],
        ['having urged', 'hortatus'],
        ['having advanced', 'progressus'],
        ['having gone out', 'egressus'],
        ['having set out', 'profectus'],
        ['having seen', 'conspicatus'],
        ['having prayed', 'precatus'],
        ['having embraced', 'amplexus'],
        ['having suffered', 'passus'],
        ['having obtained', 'adeptus-a-um'],
      ]} />
    </Note>
  );
}

function ParticiplesTable() {
  return (
    <Note title="Participles — Full Declension Tables">
      <p><strong>Present Participles</strong></p>
      <p>amans = loving</p>
      <T headers={['', 'Masc. & Fem.', 'Neuter']} rows={[
        ['NOM & VOC sg', 'amans', 'amans'],
        ['ACC sg', 'amantem', 'amans'],
        ['GEN sg', 'amantis', 'amantis'],
        ['DAT sg', 'amanti', 'amanti'],
        ['ABL sg', 'amanti/e', 'amanti/e'],
        ['NOM & VOC pl', 'amantes', 'amantia'],
        ['ACC pl', 'amantes', 'amantia'],
        ['GEN pl', 'amantium', 'amantium'],
        ['DAT pl', 'amantibus', 'amantibus'],
        ['ABL pl', 'amantibus', 'amantibus'],
      ]} />
      <p>*These have similar endings to the noun leo and the adjective fortis and ingens.</p>

      <p className="mt-4"><strong>Perfect Participles</strong></p>
      <p>Perfect Passive Participle: amatus = having been loved<br/>
      Perfect Active Participle: locutus = having spoken</p>
      <T headers={['', 'Masculine', 'Feminine', 'Neuter']} rows={[
        ['NOM sg', 'amatus', 'amata', 'amatum'],
        ['VOC sg', 'amate', 'amata', 'amatum'],
        ['ACC sg', 'amatum', 'amatam', 'amatum'],
        ['GEN sg', 'amati', 'amatae', 'amati'],
        ['DAT sg', 'amato', 'amatae', 'amato'],
        ['ABL sg', 'amato', 'amata', 'amato'],
        ['NOM & VOC pl', 'amati', 'amatae', 'amata'],
        ['ACC pl', 'amatos', 'amatas', 'amata'],
        ['GEN pl', 'amatorum', 'amatarum', 'amatorum'],
        ['DAT pl', 'amatis', 'amatis', 'amatis'],
        ['ABL pl', 'amatis', 'amatis', 'amatis'],
      ]} />
      <p>*These have similar endings to the nouns servus, puella and templum and the adjective bonus.</p>
    </Note>
  );
}

function ParticiplesRevision() {
  return (
    <Note title="Participles Revision">
      <p><strong>Participles we&apos;ve met so far:</strong></p>
      <ul className="list-disc list-inside">
        <li>Present active (...ing)</li>
        <li>Perfect passive (having been ...ed)</li>
        <li>Perfect active (having ...ed)</li>
      </ul>

      <p className="mt-3"><strong>Present Participles</strong> — happen at the same time as the main verb:</p>
      <Ex>astrologus in cubiculum irrupit, clamans.</Ex>
      <Ex>ancillae, prope lectum stabant, lacrimantes.</Ex>
      <Ex>Quintus fabrum laborantem in taberna invenit.</Ex>

      <p>What do present participles look like?</p>
      <T headers={['', 'Singular', 'Plural']} rows={[
        ['Nominative', 'portans', 'portantes'],
        ['Accusative', 'portantem', 'portantes'],
      ]} />
      <p>TRANSLATION: carry<strong>ING</strong><br/>
      N.B. different to portabat (he was carrying)</p>

      <p className="mt-3"><strong>Perfect Participles</strong> — take place before the main action.</p>
      <p>Mostly perfect PASSIVE: HAVING been ---------ed.<br/>
      But certain verbs ACTIVE: HAVING --------ed.</p>

      <p>You can&apos;t predict how the perfect participle will be formed (though there are some patterns), so you just need to learn them! You need masculine and feminine forms and nominative and accusative. The masculine goes like servus, the feminine like puella.</p>

      <p className="mt-3"><strong>Perfect active or perfect passive?</strong></p>
      <Ex>iuvenis, ad thermas regressus, amicum quaesivit.</Ex>
      <Ex>architectus, a Cogidubno missus, thermas maximas aedificavit.</Ex>
      <Ex>thermae, a Romanis aedificatae, maximae erant.</Ex>
      <Ex>puellae, leonem conspicatae, ad villam statim ruerunt.</Ex>
      <Ex>ancilla, deam precata, a templo discessit.</Ex>

      <p className="mt-3"><strong>Practice:</strong></p>
      <Ex>Memor, ………… , iratissimus erat.<br/>A: a liberto excitatus &nbsp; B: a liberto excitati</Ex>
      <Ex>fabri, ………… , riserunt<br/>A: ab architecto laudatus &nbsp; B: ab architecto laudati</Ex>
      <Ex>servi, ………… , per villam contenderunt<br/>A: dominum quaerens &nbsp; B: dominum quaerentes</Ex>
    </Note>
  );
}

function PassivesSummary() {
  return (
    <Note title="Passives — the Summary">
      <p><strong>Present Passive</strong> — &ldquo;I am loved / I am being loved&rdquo;</p>
      <p>Present stem plus <span className="font-mono">-r, -ris, -tur, -mur, -mini, -ntur</span></p>
      <T headers={['', 'Latin']} rows={[
        ['1st sg', 'amor'],
        ['2nd sg', 'amaris'],
        ['3rd sg', 'amatur'],
        ['1st pl', 'amamur'],
        ['2nd pl', 'amamini'],
        ['3rd pl', 'amantur'],
      ]} />

      <p><strong>Imperfect Passive</strong> — &ldquo;I was being loved&rdquo;</p>
      <p>Imperfect stem plus <span className="font-mono">-r, -ris, -tur, -mur, -mini, -ntur</span></p>
      <T headers={['', 'Latin']} rows={[
        ['1st sg', 'amabar'],
        ['2nd sg', 'amabaris'],
        ['3rd sg', 'amabatur'],
        ['1st pl', 'amabamur'],
        ['2nd pl', 'amabamini'],
        ['3rd pl', 'amabantur'],
      ]} />

      <p><strong>Perfect Passive</strong> — &ldquo;I was loved / I have been loved&rdquo;</p>
      <p>Perfect passive participle + sum</p>
      <T headers={['', 'Latin']} rows={[
        ['1st sg', 'amatus sum'],
        ['2nd sg', 'amatus es'],
        ['3rd sg', 'amatus est'],
        ['1st pl', 'amati sumus'],
        ['2nd pl', 'amati estis'],
        ['3rd pl', 'amati sunt'],
      ]} />

      <p><strong>Pluperfect Passive</strong> — &ldquo;I had been loved&rdquo;</p>
      <p>Perfect passive participle + eram</p>
      <T headers={['', 'Latin']} rows={[
        ['1st sg', 'amatus eram'],
        ['2nd sg', 'amatus eras'],
        ['3rd sg', 'amatus erat'],
        ['1st pl', 'amati eramus'],
        ['2nd pl', 'amati eratis'],
        ['3rd pl', 'amati erant'],
      ]} />

      <p><strong>Future Passive (Groups 1 &amp; 2)</strong> — &ldquo;I shall be loved&rdquo;</p>
      <p>Future stem plus <span className="font-mono">-bor, -beris, -bitur, -bimur, -bimini, -buntur</span></p>
      <T headers={['', 'Latin']} rows={[
        ['1st sg', 'amabor'],
        ['2nd sg', 'amaberis'],
        ['3rd sg', 'amabitur'],
        ['1st pl', 'amabimur'],
        ['2nd pl', 'amabimini'],
        ['3rd pl', 'amabuntur'],
      ]} />

      <p><strong>Future Passive (Group 3)</strong> — &ldquo;I shall be dragged&rdquo;</p>
      <p>Future stem plus <span className="font-mono">-ar, -eris, -etur, -emur, -emini, -entur</span></p>
      <T headers={['', 'Latin']} rows={[
        ['1st sg', 'trahar'],
        ['2nd sg', 'traheris'],
        ['3rd sg', 'trahetur'],
        ['1st pl', 'trahemur'],
        ['2nd pl', 'trahemini'],
        ['3rd pl', 'trahentur'],
      ]} />
    </Note>
  );
}

function SubjunctiveNotes() {
  return (
    <Note title="The Subjunctive">
      <p>Latin has more than one way of writing verbs. So far you&apos;ve learnt the &lsquo;indicative&rsquo; (amo, amabam, amavi, amaveram etc.). This is used most of the time, but in certain types of sentence a different type of verb is needed, and this is called the &lsquo;subjunctive&rsquo;.</p>

      <p><strong>The imperfect subjunctive</strong> is really easy to recognise as it is just the infinitive of the verb plus the person endings (m, s, t, mus, tis, nt). It is translated in the normal way.</p>
      <p>e.g. amare — to love (the infinitive)</p>
      <T headers={['', 'Latin', 'English']} rows={[
        ['1st sg', 'amarem', 'I was loving'],
        ['2nd sg', 'amares', 'you were loving'],
        ['3rd sg', 'amaret', 'he/she/it was loving'],
        ['1st pl', 'amaremus', 'we were loving'],
        ['2nd pl', 'amaretis', 'you were loving'],
        ['3rd pl', 'amarent', 'they were loving'],
      ]} />

      <p><strong>The pluperfect subjunctive</strong> is also really simple, as it is just the perfect stem + isse + the person endings (m, s, t, mus, tis, nt). It is also translated in the normal way.</p>
      <p>e.g. amavi — I loved (the perfect: stem = amav)</p>
      <T headers={['', 'Latin', 'English']} rows={[
        ['1st sg', 'amavissem', 'I had loved'],
        ['2nd sg', 'amavisses', 'you had loved'],
        ['3rd sg', 'amavisset', 'he/she/it had loved'],
        ['1st pl', 'amavissemus', 'we had loved'],
        ['2nd pl', 'amavissetis', 'you had loved'],
        ['3rd pl', 'amavissent', 'they had loved'],
      ]} />
    </Note>
  );
}

function PresentSubjunctiveNotes() {
  return (
    <Note title="Present Subjunctive">
      <p>Memory trick — <strong>&ldquo;SHE&rdquo;</strong>: 1st conjugation swaps <span className="font-mono">-a-</span> to <span className="font-mono">-e-</span>. Others add <span className="font-mono">-a-</span> after the stem.</p>

      <T headers={['Conj.', 'Present Indicative', 'Present Subjunctive', 'Pattern']} rows={[
        ['1st (amo)', 'am-a-t', 'am-e-t', '-a- swaps to -e-'],
        ['2nd (moneo)', 'mon-e-t', 'mon-e-a-t', 'add -a-'],
        ['3rd (duco)', 'duc-i-t', 'duc-a-t', 'add -a-'],
        ['4th (audio)', 'aud-i-t', 'aud-i-a-t', 'add -a-'],
      ]} />
    </Note>
  );
}

function PerfectSubjunctiveNotes() {
  return (
    <Note title="Perfect Subjunctive">
      <p><strong>Formation:</strong> perfect stem + <span className="font-mono">-eri-</span> + personal endings</p>
      <Ex>amaverim, amaveris, amaverit, amaverimus, amaveritis, amaverint — (I may have loved, you may have loved...)</Ex>
    </Note>
  );
}

function SubjunctiveTables() {
  return (
    <Note title="Subjunctive — Full Tables">
      <p><strong>Group 1 &ldquo;carry&rdquo;</strong></p>
      <T headers={['', 'Active Imp.', 'Active Plup.', 'Passive Imp.', 'Passive Plup.']} rows={[
        ['1st sg', 'portarem', 'portavissem', 'portarer', 'portatus/a/um essem'],
        ['2nd sg', 'portares', 'portavisses', 'portareris', 'portatus/a/um esses'],
        ['3rd sg', 'portaret', 'portavisset', 'portaretur', 'portatus/a/um esset'],
        ['1st pl', 'portaremus', 'portavissemus', 'portaremur', 'portati/ae/a essemus'],
        ['2nd pl', 'portaretis', 'portavissetis', 'portaremini', 'portati/ae/a essetis'],
        ['3rd pl', 'portarent', 'portavissent', 'portarentur', 'portati/ae/a essent'],
      ]} />

      <p><strong>Group 2 &ldquo;have&rdquo;</strong></p>
      <T headers={['', 'Active Imp.', 'Active Plup.', 'Passive Imp.', 'Passive Plup.']} rows={[
        ['1st sg', 'haberem', 'habuissem', 'haberer', 'habitus/a/um essem'],
        ['2nd sg', 'haberes', 'habuisses', 'habereris', 'habitus/a/um esses'],
        ['3rd sg', 'haberet', 'habuisset', 'haberetur', 'habitus/a/um esset'],
        ['1st pl', 'haberemus', 'habuissemus', 'haberemur', 'habiti/ae/a essemus'],
        ['2nd pl', 'haberetis', 'habuissetis', 'haberemini', 'habiti/ae/a essetis'],
        ['3rd pl', 'haberent', 'habuissent', 'haberentur', 'habiti/ae/a essent'],
      ]} />

      <p><strong>Group 3 &ldquo;send&rdquo;</strong></p>
      <T headers={['', 'Active Imp.', 'Active Plup.', 'Passive Imp.', 'Passive Plup.']} rows={[
        ['1st sg', 'mitterem', 'misissem', 'mitterer', 'missus/a/um essem'],
        ['2nd sg', 'mitteres', 'misisses', 'mittereris', 'missus/a/um esses'],
        ['3rd sg', 'mitteret', 'misisset', 'mitteretur', 'missus/a/um esset'],
        ['1st pl', 'mitteremus', 'misissemus', 'mitteremur', 'missi/ae/a essemus'],
        ['2nd pl', 'mitteretis', 'misissetis', 'mitteremini', 'missi/ae/a essetis'],
        ['3rd pl', 'mitterent', 'misissent', 'mitterentur', 'missi/ae/a essent'],
      ]} />

      <p><strong>Group 3 &ldquo;take&rdquo;</strong></p>
      <T headers={['', 'Active Imp.', 'Active Plup.', 'Passive Imp.', 'Passive Plup.']} rows={[
        ['1st sg', 'caperem', 'cepissem', 'caperer', 'captus/a/um essem'],
        ['2nd sg', 'caperes', 'cepisses', 'capereris', 'captus/a/um esses'],
        ['3rd sg', 'caperet', 'cepisset', 'caperetur', 'captus/a/um esset'],
        ['1st pl', 'caperemus', 'cepissemus', 'caperemur', 'capti/ae/a essemus'],
        ['2nd pl', 'caperetis', 'cepissetis', 'caperemini', 'capti/ae/a essetis'],
        ['3rd pl', 'caperent', 'cepissent', 'caperentur', 'capti/ae/a essent'],
      ]} />

      <p><strong>Group 4 &ldquo;hear&rdquo;</strong></p>
      <T headers={['', 'Active Imp.', 'Active Plup.', 'Passive Imp.', 'Passive Plup.']} rows={[
        ['1st sg', 'audirem', 'audivissem', 'audirer', 'auditus/a/um essem'],
        ['2nd sg', 'audires', 'audivisses', 'audireris', 'auditus/a/um esses'],
        ['3rd sg', 'audiret', 'audivisset', 'audiretur', 'auditus/a/um esset'],
        ['1st pl', 'audiremus', 'audivissemus', 'audiremur', 'auditi/ae/a essemus'],
        ['2nd pl', 'audiretis', 'audivissetis', 'audiremini', 'auditi/ae/a essetis'],
        ['3rd pl', 'audirent', 'audivissent', 'audirentur', 'auditi/ae/a essent'],
      ]} />

      <p className="mt-3"><strong>How they&apos;re formed:</strong></p>
      <ul className="list-disc list-inside">
        <li>Active imperfect: endings m, s, t, mus, tis, nt added to the active infinitive.</li>
        <li>Active pluperfect: endings issem etc. added to the perfect stem.</li>
        <li>Passive imperfect: endings r, ris, tur, mur, mini, ntur added to the active infinitive.</li>
        <li>Passive pluperfect: words essem etc. added to the perfect participle. [essem is the imperfect subjunctive of sum; compare the normal pluperfect passive: portatus/a/um eram]</li>
      </ul>
    </Note>
  );
}

function SequenceOfTenses() {
  return (
    <Note title="Sequence of Tenses">
      <p><strong>Sequence of Tenses:</strong> The tense of the SUBJUNCTIVE depends on the tense of the MAIN verb. Primary main verbs take primary subjunctives. Secondary main verbs take secondary subjunctives.</p>

      <T headers={['Main verb tense', 'Category', 'Subj. (same time)', 'Subj. (before main verb)']} rows={[
        ['Present, Future, Future Perfect', 'PRIMARY', 'Present Subjunctive', 'Perfect Subjunctive'],
        ['Imperfect, Perfect, Pluperfect', 'SECONDARY', 'Imperfect Subjunctive', 'Pluperfect Subjunctive'],
      ]} />

      <p className="mt-3"><strong>Shall vs Will vs May vs Might:</strong> Normal future = &lsquo;will&rsquo;. Subjunctive present = &lsquo;may/should&rsquo;. Subjunctive imperfect = &lsquo;might/would&rsquo;. Subjunctive pluperfect = &lsquo;would have/might have&rsquo;.</p>
    </Note>
  );
}

function ImperativesNotes() {
  return (
    <Note title="Imperatives / Commands">
      <p>The imperative is a part of a verb which gives an order. It is singular if you are speaking to one person and plural if you are speaking to more than one person.</p>
      <Ex>me audi, discipula! — Listen to me, pupil!<br/>
      me audite, discipulae! — Listen to me, pupils!</Ex>
      <p><strong>HINT:</strong> Look out for exclamation marks!</p>
      <T headers={['', 'Singular', 'Plural']} rows={[
        ['Group 1', 'porta!', 'portate!'],
        ['Group 2', 'doce!', 'docete!'],
        ['Group 3', 'trahe!', 'trahite!'],
        ['Group 4', 'audi!', 'audite!'],
      ]} />
      <p><strong>NEGATIVES = noli / nolite + infinitive</strong></p>
      <Ex>noli cantare, puer! — Do not sing, boy!<br/>
      nolite cantare, pueri! — Do not sing, boys!</Ex>
    </Note>
  );
}

function PurposeClauses() {
  return (
    <Note title="Purpose Clauses">
      <p>A purpose clause is used to show the purpose, aim or intention of the main sentence.</p>
      <Ex>The girl went to the harbour in order to look at the ships.</Ex>
      <ul className="list-disc list-inside">
        <li>It will begin with <strong>ut</strong> or <strong>ne</strong> or <strong>qui/quae/quod</strong></li>
        <li>There will be a verb in the subjunctive</li>
      </ul>
      <ul className="list-disc list-inside mt-2">
        <li>Translate <strong>ut</strong> or <strong>qui/quae/quod</strong> as &lsquo;in order to&rsquo;, &lsquo;so that&rsquo; or &lsquo;to&rsquo;.</li>
        <li>Translate <strong>ne</strong> as &lsquo;in order that…not&rsquo;, &lsquo;so that…not&rsquo;, &lsquo;in case&rsquo;, &lsquo;to prevent (doing)&rsquo; or &lsquo;to avoid doing&rsquo;.</li>
      </ul>
      <Ex>senator ad urbem iit ut ab imperatore laudaretur.<br/>The senator went to the city to be praised by the emperor.</Ex>
      <Ex>dux legionem misit quae urbem custodiret.<br/>The general sent the legion to guard the city.<br/>(lit. the general sent the legion who were to guard the city).</Ex>
      <Ex>nuntius epistolam incendit ne rex omnia cognosceret.<br/>The messenger burnt the letter to prevent the king finding everything out.</Ex>

      <p className="mt-3"><strong>Exercise practising purpose clauses:</strong></p>
      <Ex>pueri in via manere volebant ut puellas spectarent.</Ex>
      <Ex>Romam ire constitui ut fratrem meum viderem.</Ex>
      <Ex>milites misi qui ducem hostium necarent.</Ex>
      <Ex>femina clamavit ut ab omnibus audiretur.</Ex>
      <Ex>senator servum qui equos suos curaret emit.</Ex>
      <Ex>ancillas petere constitui quae in villa mea laborarent.</Ex>
      <Ex>servi diu laborabant ut novos muros aedificarent.</Ex>
      <Ex>in taberna manebam ne verba imperatoris audirem.</Ex>
      <Ex>senex servum habebat qui pueros scelestos terreret.</Ex>
      <Ex>rex illos custodes habuit ne ab hostibus necaretur.</Ex>
      <Ex>imperatorem tandem invenimus qui hostes vinceret.</Ex>
      <Ex>amici fideles advenerunt ut nos adiuvarent.</Ex>
      <Ex>senex pecuniam in terra celavit ne uxor inveniret.</Ex>
      <Ex>hi mortui sunt ut nos viveremus.</Ex>
      <Ex>vos docebamini ut alios doceretis.</Ex>
    </Note>
  );
}

function ResultClauses() {
  return (
    <Note title="Result Clauses">
      <p>Like indirect commands, result clauses have <strong>ut + subjunctive</strong>. You can tell the difference between them from context. A result clause indicates a result. In this type of clause &lsquo;ut&rsquo; means &lsquo;that&rsquo;.</p>
      <Ex>tanta erat multitudo ut totam viam compleret.<br/>The crowd was so great that it filled the whole street.</Ex>
      <Ex>iuvenis gladium adeo cupiebat ut pecuniam statim traderet.<br/>The young man wanted/was wanting the sword so much that he handed over the money immediately.</Ex>

      <p>There will always be a <strong>&lsquo;signal word&rsquo;</strong> before the ut in a result clause. Some of the common signal words are:</p>
      <T headers={['Latin', 'Meaning']} rows={[
        ['tam', 'so'],
        ['tot', 'so many'],
        ['tantus', 'so great'],
        ['adeo', 'so much, so greatly'],
        ['totiens', 'so often'],
        ['talis', 'such'],
        ['ita', 'in such a way'],
      ]} />
    </Note>
  );
}

function CumSubjunctive() {
  return (
    <Note title="cum + subjunctive">
      <p>When <strong>cum</strong> is followed by a subjunctive, it means <strong>when</strong>. (Do not confuse this with cum followed by a noun in the ablative, which means <strong>with</strong>).</p>
      <Ex>cum milites dormirent, captivi e carcere effugerunt.<br/>When the soldiers were sleeping, the prisoners escaped from the prison.</Ex>
      <Ex>cum Modestus ad pontem advenisset, equus constitit.<br/>When Modestus had arrived at the bridge, his horse stopped.</Ex>
    </Note>
  );
}

function ConditionalSentences() {
  return (
    <Note title="Conditional Sentences — 'If... then...'">
      <p>A <strong>conditional sentence</strong> has two parts: the <em>si</em>-clause (protasis = &lsquo;if&rsquo;) and the main clause (apodosis = &lsquo;then&rsquo;). There are three types depending on how real or hypothetical the condition is.</p>
      <p><strong>Protasis:</strong> The &lsquo;if&rsquo; part of a conditional sentence. Introduced by <em>si</em> (if) or <em>nisi</em> (unless).</p>
      <p><strong>Apodosis:</strong> The &lsquo;then&rsquo; part of a conditional sentence — the consequence or result.</p>

      <p className="mt-3"><strong>The Three Types</strong></p>
      <T headers={['Type', 'Name', 'si-clause', 'Main clause', 'Key translation words']} rows={[
        ['1', 'Open / Real', 'Indicative (any tense)', 'Indicative', "straightforward — 'if you do/did...'"],
        ['2', 'Hypothetical (present)', 'Present Subjunctive', 'Present Subjunctive', "'were to... would...'"],
        ['3', 'Contrary-to-fact (past)', 'Pluperfect Subjunctive', 'Pluperfect Subjunctive', "'had... would have...'"],
      ]} />

      <p className="mt-3"><strong>Type 1 — Open / Real</strong></p>
      <p>Both verbs in the indicative. It could genuinely happen or be true.</p>
      <Ex>si hoc facis, erras. — If you do this, you are wrong.</Ex>
      <Ex>si pluet, manebo. — If it rains, I will stay.</Ex>

      <p className="mt-3"><strong>Type 2 — Hypothetical (present)</strong></p>
      <p>Both verbs in the present subjunctive. Imagining something that isn&apos;t actually happening.</p>
      <Ex>si hoc facias, erres. — If you were to do this, you would be wrong.</Ex>
      <Ex>si dives sim, multa emam. — If I were rich, I would buy many things.</Ex>

      <p className="mt-3"><strong>Type 3 — Contrary to Fact (past)</strong></p>
      <p>Both verbs in the pluperfect subjunctive. Something that definitely did NOT happen.</p>
      <Ex>si hoc fecisses, erravisses. — If you had done this, you would have been wrong.</Ex>
      <Ex>si venisses, laetus fuissem. — If you had come, I would have been happy.</Ex>

      <p className="mt-3"><strong>Note:</strong> <em>nisi</em> = unless. Works exactly like <em>si</em> but with the condition negated. <em>nisi festinas, tardus eris</em> = Unless you hurry, you will be late.</p>
      <p><strong>Warning:</strong> In Types 2 and 3, BOTH verbs must be subjunctive — not just the <em>si</em>-clause!</p>
    </Note>
  );
}

function FutureTense() {
  return (
    <Note title="The Future Tense">
      <p><strong>Group 1</strong> — love</p>
      <T headers={['Latin', 'Meaning']} rows={[
        ['amabo', 'I shall love'],
        ['amabis', 'You will love'],
        ['amabit', 'He/She/It will love'],
        ['amabimus', 'We shall love'],
        ['amabitis', 'You will love'],
        ['amabunt', 'They will love'],
      ]} />

      <T headers={['Group 2 (have)', 'Group 3 (lead)', 'Group 4 (hear)', 'Irregular (be)']} rows={[
        ['habebo', 'ducam', 'audiam', 'ero — I shall be'],
        ['habebis', 'duces', 'audies', 'eris — You will be'],
        ['habebit', 'ducet', 'audiet', 'erit'],
        ['habebimus', 'ducemus', 'audiemus', 'erimus'],
        ['habebitis', 'ducetis', 'audietis', 'eritis'],
        ['habebunt', 'ducent', 'audient', 'erunt'],
      ]} />

      <p><strong>N.B. Group 1 and 2</strong> verbs have different future endings to <strong>group 3 and 4</strong> verbs! That is why knowing your verb groups is useful.</p>
    </Note>
  );
}

function FuturePerfect() {
  return (
    <Note title="The Future Perfect Tense">
      <p><strong>Group 1</strong> — love</p>
      <T headers={['Latin']} rows={[
        ['amavero'],
        ['amaveris'],
        ['amaverit'],
        ['amaverimus'],
        ['amaveritis'],
        ['amaverint'],
      ]} />
      <p>Groups 2, 3, 4: habu<strong>ero</strong>, dux<strong>ero</strong>, audiv<strong>ero</strong></p>

      <p className="mt-3">By itself <em>amavero</em> means &ldquo;I shall <strong>have loved</strong>&rdquo;. However it is most commonly used in &ldquo;IF Clauses&rdquo;:</p>
      <Ex>si te <strong>audivero</strong>, respondebo.<br/>If I hear you, I shall reply.</Ex>

      <p>The replying takes place in the future, so the hearing must come before the reply - you cannot reply until you have heard. In these sentences we translate the future perfect using the <strong>present tense</strong> in English. The endings of the future perfect are added on to the perfect stem.</p>

      <p className="mt-4"><strong>The Future Participle</strong></p>
      <Ex><strong>morituri</strong> te salutant.<br/>Those <strong>about to die</strong> salute you.</Ex>

      <p>The future participle means &lsquo;about to&rsquo; and <strong>–urus/a/um</strong> is added on to the end of perfect participles:</p>
      <Ex>portatus (PPP) → portat<strong>urus</strong> (FP)<br/>
      <em>having been carried</em> → <em>about to carry</em></Ex>
      <Ex>progressus (PAP) → progress<strong>urus</strong> (FP)<br/>
      <em>having advanced</em> → <em>about to advance</em></Ex>
    </Note>
  );
}

function GerundiveRevision() {
  return (
    <Note title="Gerundive Revision">
      <p>A gerundive is a part of a verb which can be used in a number of ways. You need to be aware of two of them for the exam.</p>

      <p>You can recognise a gerundive by <strong>–and-</strong>, <strong>–end-</strong>, <strong>–und-</strong> near the end of word:</p>
      <p className="font-mono">cantandum &nbsp;&nbsp; delenda &nbsp;&nbsp; eundum</p>

      <p className="mt-3"><strong>Gerundive of Obligation</strong></p>
      <Ex>fabula narranda est — The story must be told</Ex>
      <Ex>mihi fabula narranda est — The story must be told by me / I must tell the story</Ex>
      <Ex>mihi cantandum est — I must sing</Ex>

      <p>Look out for a gerundive + est.</p>
      <ul className="list-disc list-inside">
        <li>If there is a noun in the dative case, then this becomes the subject.</li>
        <li>If it is with <strong>erat</strong> (imperfect of est) or <strong>erit</strong> (future of est) then translate accordingly:</li>
      </ul>
      <Ex>mihi cantandum erat — I had to sing</Ex>
      <Ex>mihi cantandum erit — I will have to sing</Ex>

      <p className="mt-3"><strong>Gerundive of Purpose</strong></p>
      <Ex>surrexi ad cantandum — I got up (in order) to sing.</Ex>
      <Ex>surrexi ad carmina cantanda — I got up (in order) to sing songs</Ex>

      <p>Look out for <strong>ad + gerundive</strong>. You translate these like purpose clauses.</p>

      <p className="mt-3"><strong>Practice sentences:</strong></p>
      <Ex>hostes nuntios ad pacem petendam miserunt.</Ex>
      <Ex>urbs delenda est.</Ex>
      <Ex>servos in agros ad leones capiendos emisi.</Ex>
      <Ex>in hoc bello nobis pugnandum est.</Ex>
      <Ex>poeta ad versus recitandos scaenam ascendit.</Ex>
      <Ex>servis diligenter laborandum erit.</Ex>
    </Note>
  );
}

function AblativeAbsolute() {
  return (
    <Note title="The Ablative Absolute">
      <Ex>milite pulsato, Asterix discessit.<br/>When the soldier had been hit, Asterix went away.</Ex>

      <p>The Ablative Absolute consists of a noun (or pronoun) and a participle, both of which are in the ablative case. The reason for this is that they are grammatically separate from the rest of the sentence (i.e.: the noun is not the subject or the object etc of the main verb), even though they can be connected according to the context.</p>

      <p>We can translate the Ablative Absolute phrase in a number of ways:</p>

      <p><strong>Present Participle:</strong> when, while, as (i.e. at the same time as the action of the main verb)</p>
      <Ex>sole oriente, servi laborabant<br/>When the sun was rising, the slaves were working.</Ex>

      <p><strong>Perfect Participle:</strong> after, when (i.e. before the action of the main verb)</p>
      <Ex>pecunia distributa, clientes discesserunt.<br/>When the money had been handed out, the clients left.</Ex>

      <p>Sometimes with Perfect Passive Participles we can make the subject of the main verb the subject of the Ablative Absolute as well.</p>
      <Ex>E.G.: In the above sentence it is quite likely that Asterix hit the soldier, so we could say:<br/>When Asterix had hit the soldier, he went away.</Ex>
    </Note>
  );
}

function IndirectCommands() {
  return (
    <Note title="Indirect Commands">
      <p>A direct command is when someone is told to do something and is expressed by an imperative in Latin.</p>
      <Ex>redite! — Go back!<br/>pecuniam trade! — Hand over the money!</Ex>

      <p>An indirect command is when a direct command is being reported or referred to. The verb in an indirect command is usually in the subjunctive and usually follows <strong>ut</strong>.</p>
      <Ex>legatus militibus imperavit ut redirent.<br/>
      The commander ordered the soldiers that they should go back.<br/>
      or: The commander ordered the soldiers to go back.</Ex>
      <Ex>latrones mercatori imperaverunt ut pecuniam traderet.<br/>
      The robbers ordered the merchant that he should hand over the money.<br/>
      or: The robbers ordered the merchant to hand over the money.</Ex>

      <p>If the indirect command is telling you <strong>not</strong> to do something, then <strong>ne</strong> is used instead of ut.</p>
      <Ex>servos monui ne vinum in villa biberent.<br/>I warned the slaves not to drink wine in the villa.</Ex>
    </Note>
  );
}

function IndirectQuestions() {
  return (
    <Note title="Indirect Questions">
      <p>When a question is referred to, but not directly asked, we say that it is an indirect question.</p>
      <Ex>The girl asked if she could go to the forum.</Ex>
      <p>Here the direct question that the girl asked was &lsquo;can I go to the forum?&rsquo;</p>

      <p>There will be:</p>
      <ul className="list-disc list-inside">
        <li>a verb of asking, knowing, understanding etc.</li>
        <li>a question word</li>
        <li>a verb in the subjunctive</li>
      </ul>

      <p><strong>Common question words in Latin:</strong></p>
      <T headers={['Latin', 'Meaning']} rows={[
        ['cur', 'why'],
        ['num', 'if/whether'],
        ['quantus', 'how big'],
        ['qualis', 'what sort of'],
        ['quis', 'who'],
        ['quid', 'what'],
        ['quo', 'where to'],
        ['quo modo', 'how'],
        ['quot', 'how many'],
        ['ubi', 'where/when'],
        ['unde', 'where from'],
      ]} />

      <Ex>me rogavit num ulli clamores auditi essent.<br/>He asked me if any shots had been heard.</Ex>
      <Ex>parvus ursus scire voluit quis in suo lecto dormiret.<br/>The little bear wanted to know who was sleeping in his bed.</Ex>

      <p className="mt-3"><strong>Practising Direct and Indirect questions:</strong></p>
      <Ex>&lsquo;quis puerum interfecit?&rsquo;<br/>nemo sciebat quis puerum interfecisset.</Ex>
      <Ex>&lsquo;ubi pecuniam invenerunt?&rsquo;<br/>iudex me rogavit ubi pecuniam invenissent.</Ex>
      <Ex>Salvius nesciebat cur Quintus regem adiuvaret.</Ex>
      <Ex>Cogidubnus cognovit quo modo Cephalus venenum comparavisset.</Ex>
      <Ex>Quintus scire voluit quid in templo esset.</Ex>
      <Ex>Salvius tandem intellexit quo Quintus et Dumnorix fugerent.</Ex>
    </Note>
  );
}

function IndirectStatement() {
  return (
    <Note title="Indirect Statement — Accusative + Infinitive">
      <p><strong>Indirect Statement:</strong> Reports what someone says, thinks, knows or believes. In Latin, uses ACCUSATIVE + INFINITIVE (not a &lsquo;that&rsquo; clause). The subject of the reported statement goes into the accusative; the verb becomes an infinitive.</p>
      <p><strong>Direct Statement:</strong> The actual words said. E.g. &lsquo;The girl is singing.&rsquo;</p>
      <p><strong>Indirect Statement:</strong> The reported version. E.g. He says THAT the girl is singing. → <em>dicit puellam cantare.</em></p>

      <p className="mt-3"><strong>Trigger verbs</strong> (verbs that cause indirect statement): <em>dico</em> (say), <em>puto</em> (think), <em>credo</em> (believe), <em>scio</em> (know), <em>sentio</em> (feel/notice), <em>video</em> (see), <em>audio</em> (hear), <em>spero</em> (hope)</p>

      <T headers={['Infinitive type', 'When?', 'Formation', 'Example', 'Translation']} rows={[
        ['Present Active', 'Same time as main verb', 'amare', 'credo puellam cantare', 'I believe the girl is singing'],
        ['Present Passive', 'Same time', 'amari', 'dicit puellam laudari', 'He says the girl is being praised'],
        ['Perfect Active', 'Before main verb', 'amavisse', 'credo puellam cantavisse', 'I believe the girl sang'],
        ['Perfect Passive', 'Before main verb', 'amatum esse', 'credo puellam laudatam esse', 'I believe the girl was praised'],
        ['Future Active', 'After main verb', 'amaturum esse', 'credo puellam cantaturum esse', 'I believe the girl will sing'],
      ]} />

      <Ex>dicit milites esse fortes. — He says that the soldiers are brave.</Ex>
      <Ex>putabam hostes vicisse. — I thought the enemies had won.</Ex>
      <Ex>credebant regem venturum esse. — They believed the king would come.</Ex>

      <p className="mt-3"><strong>Tip:</strong> The SUBJECT of the indirect statement → ACCUSATIVE. The VERB → INFINITIVE. That&apos;s the whole formula!</p>
      <p><strong>Warning:</strong> The accusative subject of the indirect statement often looks like the object of the main verb — don&apos;t confuse them! &lsquo;dicit PUELLAM cantare&rsquo; — <em>puellam</em> is NOT the object of <em>dicit</em>, it is the subject of <em>cantare</em>.</p>
    </Note>
  );
}

function QuickReferenceAppendix() {
  return (
    <Note title="Quick Reference Appendix">
      <p><strong>All Constructions at a Glance</strong></p>
      <T headers={['Construction', 'Formula', 'Trigger', 'Example', 'Translation']} rows={[
        ['Purpose (+)', 'ut + subj.', 'motion/action verb', 'venit ut videret', 'He came to see'],
        ['Purpose (-)', 'ne + subj.', 'motion/action verb', 'fugit ne caperetur', 'He fled not to be caught'],
        ['Indirect Statement', 'acc. + infinitive', 'say/think/believe', 'dicit puellam cantare', 'He says the girl sings'],
        ['Indirect Command (+)', 'ut + subj.', 'order/ask/urge', 'iussit ut veniret', 'He ordered him to come'],
        ['Indirect Command (-)', 'ne + subj.', 'order/ask/urge', 'monuit ne fugeret', 'He warned not to flee'],
        ['Indirect Question', 'question word + subj.', 'ask/wonder/know', 'rogavit quid fecisset', 'He asked what he had done'],
        ['Open Conditional', 'si + indicative', 'si', 'si venis, laetus sum', 'If you come, I am happy'],
        ['Hypothetical', 'si + pres. subj.', 'si', 'si venias, sim', 'If you were to come...'],
        ['Contrary-to-fact', 'si + pluperf. subj.', 'si', 'si venisses, fuissem', 'If you had come...'],
        ['Ablative Absolute', 'noun + PPP (abl.)', '—', 'urbe capta, fugerunt', 'City captured, they fled'],
      ]} />

      <p className="mt-4"><strong>Sequence of Tenses</strong></p>
      <T headers={['Main Verb', 'Category', 'Same time', 'Before main verb']} rows={[
        ['Present / Future / Future Perfect', 'PRIMARY', 'Present Subjunctive', 'Perfect Subjunctive'],
        ['Imperfect / Perfect / Pluperfect', 'SECONDARY', 'Imperfect Subjunctive', 'Pluperfect Subjunctive'],
      ]} />

      <p className="mt-4"><strong>Conditional Types</strong></p>
      <T headers={['Type', 'si-clause', 'Main clause', 'Key words', 'Example']} rows={[
        ['Open/Real', 'Indicative', 'Indicative', 'if... (real)', 'si venis, laetus sum'],
        ['Hypothetical', 'Pres. Subj.', 'Pres. Subj.', 'were to... would...', 'si venias, laetus sim'],
        ['Contrary-to-fact', 'Pluperf. Subj.', 'Pluperf. Subj.', 'had... would have...', 'si venisses, fuissem'],
      ]} />

      <p className="mt-4"><strong>Irregular Verbs</strong></p>
      <T headers={['Verb', 'Principal Parts', 'Meaning']} rows={[
        ['sum', 'sum, esse, fui', 'I am'],
        ['possum', 'possum, posse, potui', 'I can, I am able'],
        ['eo', 'eo, ire, i(v)i, itum', 'I go'],
        ['fero', 'fero, ferre, tuli, latum', 'I carry, bring'],
        ['volo', 'volo, velle, volui', 'I want'],
        ['nolo', 'nolo, nolle, nolui', 'I do not want'],
        ['malo', 'malo, malle, malui', 'I prefer'],
        ['fio', 'fio, fieri, factus sum', 'I become, I am made'],
      ]} />

      <p className="mt-4"><strong>Prepositions Summary</strong></p>
      <T headers={['+ Accusative', 'Meaning', '+ Ablative', 'Meaning']} rows={[
        ['ad', 'to, towards', 'a/ab', 'from, by (person)'],
        ['in', 'into, onto', 'in', 'in, on'],
        ['per', 'through', 'cum', 'with'],
        ['post', 'after', 'de', 'from, about'],
        ['propter', 'because of', 'e/ex', 'out of'],
        ['trans', 'across', 'sine', 'without'],
        ['contra', 'against', 'pro', 'on behalf of'],
        ['ante', 'before', 'sub', 'under'],
        ['circum', 'around', '—', '—'],
        ['inter', 'among, between', '—', '—'],
      ]} />

      <p className="mt-4"><strong>Key Definitions Summary</strong></p>
      <T headers={['Term', 'Definition']} rows={[
        ['Declension', 'System of noun endings showing role in sentence. 5 declensions in Latin.'],
        ['Case', 'The grammatical role of a noun, shown by its ending. 6 cases in Latin.'],
        ['Conjugation', 'System of verb endings. 4 conjugations in Latin.'],
        ['Indicative', 'Verb mood that states facts.'],
        ['Subjunctive', 'Verb mood for purpose, hypotheticals, reported commands/questions.'],
        ['Imperative', 'Command form of a verb.'],
        ['Infinitive', "The 'to do' form of a verb. No subject or tense."],
        ['Participle', 'Verbal adjective — must agree with its noun in gender, number, case.'],
        ['Ablative Absolute', 'Noun + participle both in ablative, forming an independent phrase.'],
        ['Deponent', 'Verb passive in form but active in meaning.'],
        ['Agreement', 'Adjective must match noun in gender, number and case.'],
        ['Antecedent', 'The noun that a relative pronoun refers back to.'],
        ['Protasis', "The 'if' clause of a conditional sentence."],
        ['Apodosis', "The 'then' clause of a conditional sentence."],
        ['Sequence of Tenses', 'Rule linking subjunctive tense to main verb tense.'],
      ]} />
    </Note>
  );
}
