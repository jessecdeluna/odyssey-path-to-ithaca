import { useState } from 'react';
import type { Answer, QuizQuestion } from '../game/types';

export function QuizChallenge({ question, disabled, onSubmit }: { question: QuizQuestion; disabled: boolean; onSubmit: (answer: Answer) => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const locked = disabled || submitted;
  return (
    <section className="rounded-2xl border border-gold/30 bg-midnight/90 p-4 md:p-6">
      <p className="text-xs font-bold uppercase tracking-widest text-gold-light">{question.difficulty} · {question.topic}</p>
      {question.code && (
        <div className="mt-4">
          <p className="mb-2 text-xs text-parchment/70">Python</p>
          <pre className="overflow-x-auto rounded-xl border border-white/20 bg-black/50 p-4 text-sm leading-7 text-parchment" tabIndex={0} aria-label="Python code"><code>{question.code}</code></pre>
        </div>
      )}
      {question.expectedBehavior && <p className="mt-3 text-sm leading-relaxed text-parchment"><strong>Expected behavior:</strong> {question.expectedBehavior}</p>}
      <fieldset className="mt-5 space-y-3" disabled={locked}>
        <legend className="mb-3 font-semibold text-parchment">{question.objectiveText}</legend>
        {question.options.map((option) => (
          <label key={option.id} className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 text-parchment focus-within:ring-2 focus-within:ring-gold ${selected === option.id ? 'border-gold bg-gold/15' : 'border-white/20 bg-white/5'} ${locked ? 'cursor-default opacity-70' : 'hover:border-gold/70'}`}>
            <input className="mt-1 shrink-0 accent-[#d8af63]" type="radio" name={`quiz-${question.id}`} value={option.id} checked={selected === option.id} onChange={() => setSelected(option.id)} />
            <span className="min-w-0 break-words text-sm leading-relaxed"><strong>{option.id}.</strong> {option.label}</span>
          </label>
        ))}
      </fieldset>
      <button type="button" className="btn btn-gold mt-5 w-full" disabled={locked || !selected} onClick={() => {
        if (!selected || locked) return;
        setSubmitted(true);
        onSubmit({ kind: 'quiz', optionId: selected });
      }}>Submit answer</button>
    </section>
  );
}
