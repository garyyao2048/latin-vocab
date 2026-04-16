import { VocabEntry } from '@/data/vocab';
import { hints } from '@/data/hints';
import { sentences } from '@/data/sentences';

export default function WordCard({ word }: { word: VocabEntry }) {
  const hint = hints[word.latin];
  const sentence = sentences[word.latin];

  return (
    <div className="rounded-xl border-2 border-accent bg-card-bg p-5">
      <div className="mb-3">
        <h3 className="text-2xl font-bold text-accent">{word.latin}</h3>
        <div className="flex flex-wrap items-center gap-2 mt-0.5">
          <span className="text-sm text-foreground/50">
            {word.partOfSpeech}{word.details ? ` ${word.details}` : ''}
          </span>
          {word.isRestricted && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-accent/10 text-accent font-medium">Restricted</span>
          )}
        </div>
      </div>

      <div className="mb-3">
        <p className="text-xs text-foreground/40 uppercase tracking-wide mb-0.5">Translation</p>
        <p className="text-lg font-semibold">{word.meanings}</p>
      </div>

      {word.forms && word.forms !== 'indeclinable' && (
        <div className="mb-3">
          <p className="text-xs text-foreground/40 uppercase tracking-wide mb-0.5">Forms</p>
          <p className="font-mono text-sm">{word.forms}</p>
        </div>
      )}

      {hint && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
          {hint.derivatives && (
            <div className="rounded-lg bg-accent/5 p-2.5">
              <p className="text-xs text-foreground/40 uppercase tracking-wide mb-0.5">Derivatives</p>
              <p className="text-sm">{hint.derivatives}</p>
            </div>
          )}
          {hint.mnemonic && (
            <div className="rounded-lg bg-amber-50 p-2.5">
              <p className="text-xs text-amber-600 uppercase tracking-wide mb-0.5">Memory Aid</p>
              <p className="text-sm text-amber-800">{hint.mnemonic}</p>
            </div>
          )}
        </div>
      )}

      {sentence && (
        <div className="rounded-lg border border-card-border p-2.5">
          <p className="text-xs text-foreground/40 uppercase tracking-wide mb-0.5">Example</p>
          <p className="text-sm font-medium italic">{sentence.latin}</p>
          <p className="text-sm text-foreground/60">{sentence.english}</p>
        </div>
      )}
    </div>
  );
}
