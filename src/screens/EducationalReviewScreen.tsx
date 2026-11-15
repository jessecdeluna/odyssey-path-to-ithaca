import { ArrowLeft, Lock } from 'lucide-react';
import type { ReactNode } from 'react';
import { DijkstraEducation } from '../challenges/ShortestPathChallenge';
import { KnapsackEducation } from '../challenges/KnapsackChallenge';
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
        <Frame title="The Scrolls of Wisdom — Optimization Concepts">
          <div className="grid gap-4 md:grid-cols-2">
            <Concept chapter="Chapter I" title="Maximization & minimization">
              <p>
                Every optimization problem has an <strong>objective</strong>: a quantity to make as large (maximize) or as small (minimize) as possible. Compare every option’s value and pick the best.
              </p>
              <p className="text-parchment/60">Food portions → bigger is better. Travel time → smaller is better.</p>
            </Concept>
            <Concept chapter="Chapter I" title="Efficiency ratios">
              <p>
                Efficiency compares output to input: <code className="rounded bg-black/40 px-1">meals ÷ coins</code>. The best deal has the highest <em>rate</em>, even if another option has a bigger total.
              </p>
            </Concept>
            <Concept chapter="Chapter II" title="Constraints & feasibility">
              <p>
                <strong>Constraints</strong> are rules a solution must obey (≤ 5 tools, ≤ 8 water, ≤ 15 minutes). Options that satisfy all of them form the <strong>feasible set</strong>.
              </p>
              <p>An infeasible option is never optimal — no matter how good its objective looks.</p>
            </Concept>
            <Concept chapter="Chapter II" title="Objective functions & optimal feasible solutions">
              <p>
                Optimal feasible solution = the best objective value <em>within</em> the feasible set. Method: (1) eliminate infeasible options, (2) optimize among the survivors.
              </p>
            </Concept>
          </div>
          <div className="mt-4 space-y-3">
            <Expandable title="Chapter III · Resource allocation & the 0/1 knapsack" defaultOpen>
              <KnapsackEducation />
            </Expandable>
            <Expandable title="Chapter IV · Weighted graphs, shortest paths & Dijkstra" defaultOpen>
              <DijkstraEducation />
            </Expandable>
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
