import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-accent mb-3">Latin GCSE Revision</h1>
        <p className="text-lg text-foreground/70">
          OCR J282 Defined Vocabulary List &mdash; 450 words
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/flashcards"
          className="block p-6 rounded-xl border border-card-border bg-card-bg hover:shadow-md hover:border-accent-light transition-all"
        >
          <h2 className="text-xl font-semibold mb-2">Flashcards</h2>
          <p className="text-sm text-foreground/60">
            Flip through cards to learn Latin-English vocabulary. Filter by part of speech.
          </p>
        </Link>

        <Link
          href="/quiz"
          className="block p-6 rounded-xl border border-card-border bg-card-bg hover:shadow-md hover:border-accent-light transition-all"
        >
          <h2 className="text-xl font-semibold mb-2">Multiple Choice</h2>
          <p className="text-sm text-foreground/60">
            Test yourself with 4-option quizzes. Track your score as you go.
          </p>
        </Link>

        <Link
          href="/practice"
          className="block p-6 rounded-xl border border-card-border bg-card-bg hover:shadow-md hover:border-accent-light transition-all"
        >
          <h2 className="text-xl font-semibold mb-2">Typed Practice</h2>
          <p className="text-sm text-foreground/60">
            Type translations, then review your answers in a carousel. Self-mark each word.
          </p>
        </Link>

        <Link
          href="/grammar"
          className="block p-6 rounded-xl border border-card-border bg-card-bg hover:shadow-md hover:border-accent-light transition-all"
        >
          <h2 className="text-xl font-semibold mb-2">Grammar Notes</h2>
          <p className="text-sm text-foreground/60">
            20 revision notes covering nouns, adjectives, participles, subjunctive, clauses, and more.
          </p>
        </Link>

        <Link
          href="/declensions"
          className="block p-6 rounded-xl border border-card-border bg-card-bg hover:shadow-md hover:border-accent-light transition-all"
        >
          <h2 className="text-xl font-semibold mb-2">Noun Declensions</h2>
          <p className="text-sm text-foreground/60">
            Reference tables for 1st, 2nd, and 3rd declension noun endings.
          </p>
        </Link>

        <Link
          href="/conjugations"
          className="block p-6 rounded-xl border border-card-border bg-card-bg hover:shadow-md hover:border-accent-light transition-all"
        >
          <h2 className="text-xl font-semibold mb-2">Verb Conjugations</h2>
          <p className="text-sm text-foreground/60">
            Reference tables for all four conjugations plus irregular verbs.
          </p>
        </Link>
      </div>
    </div>
  );
}
