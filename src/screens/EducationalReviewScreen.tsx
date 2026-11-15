import { ArrowLeft, Lock } from 'lucide-react';
import type { ReactNode } from 'react';
import { DijkstraTrace, Expandable } from '../components/FeedbackPanel';
import { Frame } from '../components/Ornaments';
import { ChapterBackdrop } from '../components/Scenes';
import { WeightedGraph } from '../components/WeightedGraph';
import { CHAPTERS } from '../data/chapters';
import { getQuestion } from '../data/questions';
import { dijkstra, optimalAnswer, evaluateAnswer, formatNumber, solveChoice } from '../game/optimization';
import type { Question } from '../game/types';

function Concept({ title, chapter, children }: { title: string; chapter: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-gold/20 bg-black/25 p-5">
      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-aegean-light">{chapter}</p>
      <h3 className="font-display mt-1 text-lg font-bold text-gold-light">{title}</h3>
      <div className="mt-2 space-y-2 text-sm leading-relaxed text-parchment/85">{children}</div>
    </div>
  );
}

function SolutionSummary({ q }: { q: Question }) {
  const ev = evaluateAnswer(q, optimalAnswer(q));
  if (q.kind === 'quiz') return <p>Correct answer: <strong className="text-gold-light">{ev.optimalLabel}</strong></p>;
  if (q.kind === 'choice') {
    const sol = solveChoice(q);
    return (
      <p>
        Optimal: <strong className="text-gold-light">{ev.optimalLabel}</strong> — {formatNumber(sol.optimalValue)} {q.objective.unit}.
      </p>
    );
  }
  if (q.kind === 'knapsack') {
    return (
      <p>
        Optimal cargo: <strong className="text-gold-light">{ev.optimalLabel}</strong> — total value {ev.optimalValue}.
      </p>
    );
  }
  const r = dijkstra(q.nodes.map((n) => n.id), q.edges, q.start, q.goal);
  return (
    <div className="space-y-3">
      <p>
        Shortest route: <strong className="text-gold-light">{r.path.join(' → ')}</strong> — total cost {r.distance}.
      </p>
      <div className="parchment p-1.5">
        <WeightedGraph question={q} path={r.path} highlight={r.path} />
      </div>
      <DijkstraTrace steps={r.steps} />
    </div>
  );
}

export function EducationalReviewScreen({ completedChapters, onBack }: { completedChapters: number[]; onBack: () => void }) {
  return (
    <main className="relative min-h-screen px-3 py-6 md:px-6 md:py-10">
      <ChapterBackdrop theme="aeolus" dim={0.78} />
      <div className="mx-auto max-w-5xl">
        <button type="button" className="btn btn-ghost mb-4 px-4 py-2 text-xs" onClick={onBack} autoFocus>
          <ArrowLeft className="h-4 w-4" aria-hidden /> Back
        </button>
        <Frame title="The Scrolls of Wisdom — Computers & Python">
          <div className="grid gap-4 md:grid-cols-2">
            <Concept chapter="Chapter I · Easy" title="Computer terminology">
              <p>RAM is temporary working memory. The CPU executes instructions. Hardware is physical equipment; software is the programs it runs.</p>
            </Concept>
            <Concept chapter="Chapter II · Medium" title="Your first Python steps">
              <p>Use = to assign values, int() to convert numeric text, and == to compare. An if/else runs one branch based on its condition.</p>
            </Concept>
            <Concept chapter="Chapter III · Medium" title="Lists, loops & functions">
              <p>List indexes start at 0. range(stop) excludes stop. Indentation defines what repeats. A function uses return to send a result back to its caller.</p>
            </Concept>
            <Concept chapter="Chapter IV · Hard" title="Spot the issue">
              <p>Compare the expected result with the actual behavior. Trace a tiny example, check list bounds and indentation, and follow the returned value. Each bug uses the earlier lessons.</p>
            </Concept>
          </div>
        </Frame>

        <Frame title="Captain’s Logbook — Solved Challenges" className="mt-6">
          <div className="space-y-4">
            {CHAPTERS.map((c) => {
              const done = completedChapters.includes(c.id);
              return (
                <div key={c.id}>
                  <h3 className="font-display text-base font-bold text-parchment">
                    {c.numeral}. {c.title}
                  </h3>
                  {done ? (
                    <div className="mt-2 space-y-2">
                      {c.questionIds.map((id) => {
                        const q = getQuestion(id);
                        return (
                          <Expandable key={id} title={`Q${id} · ${q.title}`}>
                            <div className="space-y-2 text-sm text-parchment/85">
                              <p className="italic text-parchment/70">{q.objectiveText}</p>
                              {q.kind === 'quiz' && q.code && <pre className="overflow-x-auto rounded bg-black/40 p-3"><code>{q.code}</code></pre>}
                              <SolutionSummary q={q} />
                              <p>{q.lesson.explanation}</p>
                              <p className="text-parchment/60">Principle: {q.lesson.principle}</p>
                            </div>
                          </Expandable>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="mt-1 flex items-center gap-2 text-sm text-parchment/45">
                      <Lock className="h-4 w-4" aria-hidden /> Complete this chapter to unlock its solutions in the logbook.
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </Frame>
      </div>
    </main>
  );
}
