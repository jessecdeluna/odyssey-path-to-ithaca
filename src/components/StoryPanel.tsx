import { Lock, Target } from 'lucide-react';
import type { Question } from '../game/types';
import { Meander } from './Ornaments';

const OP_TEXT = { '<=': '≤', '>=': '≥', '==': '=' } as const;

export function StoryPanel({ question, indexLabel }: { question: Question; indexLabel: string }) {
  const constraints =
    question.kind === 'choice'
      ? question.constraints.map((c) => ({ label: c.label, math: `${c.key} ${OP_TEXT[c.op]} ${c.limit}` }))
      : question.kind === 'knapsack'
        ? [
            { label: `Total cargo weight at most ${question.capacity} units`, math: `Σ weight ≤ ${question.capacity}` },
            { label: 'Each item is loaded once or not at all', math: 'xᵢ ∈ {0, 1}' },
          ]
        : [
            { label: 'Follow the one-way sea routes (arrows)', math: 'edges are directed' },
            { label: `Begin at ${question.start} and end at ${question.goal}`, math: `${question.start} → … → ${question.goal}` },
          ];

  return (
    <article className="parchment flex flex-col gap-4 p-5 md:p-6">
      <div>
        <p className="font-display text-[11px] font-bold uppercase tracking-[0.3em] text-bronze">{indexLabel}</p>
        <h3 className="font-display mt-1 text-2xl font-bold leading-tight text-ink md:text-[1.7rem]">{question.title}</h3>
        <Meander ink className="mt-3" />
      </div>
      <div className="font-serif space-y-2 text-lg leading-snug text-ink/90 md:text-xl">
        {question.story.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <div className="rounded-xl border border-bronze/40 bg-[#f7ecd0]/70 p-3">
        <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-bronze-dark">
          <Target className="h-4 w-4" aria-hidden /> Odysseus’s objective
        </p>
        <p className="mt-1 font-sans text-base font-semibold text-ink">{question.objectiveText}</p>
      </div>
      {constraints.length > 0 && (
        <div className="rounded-xl border border-danger/30 bg-[#f3dcc4]/60 p-3">
          <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#8e3030]">
            <Lock className="h-4 w-4" aria-hidden /> Constraints
          </p>
          <ul className="mt-1.5 space-y-1">
            {constraints.map((c) => (
              <li key={c.label} className="flex flex-wrap items-baseline justify-between gap-x-3 font-sans text-sm font-medium text-ink">
                <span>• {c.label}</span>
                <code className="rounded bg-ink/10 px-1.5 text-xs text-ink/70">{c.math}</code>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
