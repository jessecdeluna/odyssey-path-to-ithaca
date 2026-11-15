import { ArrowRight, BookOpen, ChevronsRight, Lock, LogOut, RotateCcw, Swords } from 'lucide-react';
import { useMemo, useState } from 'react';
import { ChallengeRenderer } from '../../challenges/ChallengeRenderer';
import { DijkstraTrace, Expandable } from '../../components/FeedbackPanel';
import { HintPanel } from '../../components/HintPanel';
import { StoryPanel } from '../../components/StoryPanel';
import { WeightedGraph } from '../../components/WeightedGraph';
import { getChapter } from '../../data/chapters';
import { getQuestion } from '../../data/questions';
import type { Answer } from '../../game/types';
import { npcPortrait } from '../art/characters';
import { PENALTIES } from '../items';
import { getLevel } from '../levels';
import { NPC_BY_QUESTION } from '../npcs';
import { npcStatus } from '../reducer';
import type { GameStore } from '../store';
import type { SurvivalState } from '../types';
import { useKeys, useTypewriter } from './hooks';

const portraitCache = new Map<string, string>();
function portraitFor(questionId: number): string {
  const npc = NPC_BY_QUESTION[questionId];
  if (!portraitCache.has(npc.key)) portraitCache.set(npc.key, npcPortrait(npc.look, 6));
  return portraitCache.get(npc.key)!;
}

// ═════════════════════════════════════════════════════════════
// NPC dialogue (bottom panel, typewriter text)
// ═════════════════════════════════════════════════════════════

export function DialoguePanel({ store, state, questionId }: { store: GameStore; state: SurvivalState; questionId: number }) {
  const npc = NPC_BY_QUESTION[questionId];
  const status = npcStatus(state, questionId);
  const lines = status === 'next' ? npc.intro : status === 'done' ? [npc.done] : [npc.locked];
  const [i, setI] = useState(0);
  const [shown, done, skip] = useTypewriter(lines[Math.min(i, lines.length - 1)]);
  const last = i >= lines.length - 1;

  const close = () => store.setUI({ overlay: 'none', npc: null });
  const accept = () => {
    store.dispatch({ type: 'OPEN_CHALLENGE', questionId });
    if (store.state.activeChallenge?.questionId === questionId) store.setUI({ overlay: 'challenge' });
  };
  const advance = () => {
    if (!done) return skip();
    if (!last) return setI((v) => v + 1);
    if (status === 'next') accept();
    else close();
  };

  useKeys({ e: advance, enter: advance, ' ': advance, escape: close });

  return (
    <div className="absolute inset-x-3 bottom-3 z-30 md:inset-x-[8%]" role="dialog" aria-label={`${npc.name} speaks`}>
      <div className="px-panel flex gap-4 p-3 md:p-4">
        <img src={portraitFor(questionId)} alt="" className="pixelated hidden h-[90px] w-24 shrink-0 border-2 border-[#d8af63] bg-[#3a2a1a] object-cover object-top sm:block" />
        <div className="min-w-0 flex-1">
          <p className="font-pixel text-[11px] text-[#f1d49a]">
            {npc.name} <span className="text-[#c9b98a]">· {npc.title}</span>
          </p>
          <p className="font-term mt-1 min-h-[3.2em] text-2xl leading-7 text-[#f6ead0]" aria-live="polite">
            {shown}
            {!done && <span className="blink">▌</span>}
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-end gap-2">
            {status === 'locked' && (
              <span className="font-pixel mr-auto flex items-center gap-1 text-[9px] text-[#9aa3ad]">
                <Lock className="h-3 w-3" /> Help the others in order first
              </span>
            )}
            {!done && (
              <button type="button" className="px-btn px-btn-dark !text-[9px]" onClick={skip}>
                <ChevronsRight className="h-3.5 w-3.5" /> Skip text
              </button>
            )}
            <button type="button" className="px-btn px-btn-dark !text-[9px]" onClick={close}>
              Leave
            </button>
            {done && !last && (
              <button type="button" className="px-btn !text-[9px]" onClick={advance}>
                Continue <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}
            {done && last && status === 'next' && (
              <button type="button" className="px-btn px-btn-red !text-[9px]" onClick={accept} autoFocus>
                <Swords className="h-3.5 w-3.5" /> Accept challenge
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// The optimization puzzle (parchment modal)
// ═════════════════════════════════════════════════════════════

export function ChallengeOverlay({ store, state }: { store: GameStore; state: SurvivalState }) {
  const open = state.activeChallenge;
  if (!open) return null;
  const question = getQuestion(open.questionId);
  const npc = NPC_BY_QUESTION[open.questionId];
  const index = getChapter(question.chapterId).questionIds.indexOf(question.id);
  const penalty = PENALTIES[question.chapterId];

  const submit = (answer: Answer) => {
    store.dispatch({ type: 'SUBMIT', questionId: open.questionId, token: open.token, answer });
    // A fatal answer goes straight to the death cinematic (the scene takes over).
    if (store.state.status === 'dead') return;
    store.setUI({ overlay: 'result' });
  };
  const stepAway = () => {
    store.dispatch({ type: 'CLOSE_CHALLENGE' });
    store.setUI({ overlay: 'none', npc: null });
  };

  return (
    <div className="fixed inset-0 z-40 overflow-y-auto bg-[#0a0705]/80 p-2 backdrop-blur-[2px] md:p-5" role="dialog" aria-modal="true" aria-label={question.title}>
      <div className="mx-auto max-w-6xl">
        <div className="px-panel mb-3 flex flex-wrap items-center gap-3 px-4 py-2.5">
          <img src={portraitFor(open.questionId)} alt="" className="pixelated h-12 w-12 border-2 border-[#d8af63] bg-[#3a2a1a] object-cover object-top" />
          <div className="min-w-0 flex-1">
            <p className="font-pixel text-[10px] text-[#f1d49a]">
              {npc.name}'s challenge · {index + 1} of 3
            </p>
            <p className="font-term text-xl leading-5 text-[#c9b98a]">
              Streak {state.currentStreak}/3 · A wrong answer costs <span className="text-[#ff8a7a]">−{penalty} health</span> and{' '}
              <span className="text-[#ffb347]">−{penalty} hunger</span> and resets the chapter.
            </p>
          </div>
          <button type="button" className="px-btn px-btn-dark !text-[9px]" onClick={stepAway}>
            <LogOut className="h-3.5 w-3.5" /> Step away
          </button>
        </div>
        <div className={`grid gap-3 lg:gap-5 ${question.kind === 'graph' ? 'lg:grid-cols-[300px_1fr]' : 'lg:grid-cols-[340px_1fr]'}`}>
          <div className="flex flex-col gap-3">
            <StoryPanel question={question} indexLabel={`Question ${question.id} of 12`} />
            <HintPanel
              hint={question.lesson.hint}
              used={!!state.hintsUsed[question.id]}
              onUse={() => store.dispatch({ type: 'USE_HINT', questionId: question.id })}
              showCost={!store.demo}
            />
          </div>
          <div className="rounded-2xl bg-[#101b2d]/95 p-3 md:p-4">
            <ChallengeRenderer key={`${open.token}`} question={question} disabled={false} onSubmit={submit} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// Result: OPTIMAL SOLUTION! / AN UNWISE DECISION!
// ═════════════════════════════════════════════════════════════

export function ResultOverlay({ store, state }: { store: GameStore; state: SurvivalState }) {
  const r = state.lastResult;
  const close = () => {
    if (r?.correct && r.chapterCompleted) {
      if (state.status === 'victory') store.setUI({ screen: 'victory', overlay: 'none', npc: null });
      else store.setUI({ overlay: 'chapterComplete', npc: null });
    } else {
      store.setUI({ overlay: 'none', npc: null });
    }
  };
  useKeys({ enter: close, escape: close });
  if (!r) return null;
  const npc = NPC_BY_QUESTION[r.questionId];
  const question = getQuestion(r.questionId);
  const ev = r.evaluation;

  return (
    <div className="fixed inset-0 z-40 flex items-start justify-center overflow-y-auto bg-[#0a0705]/80 p-3 md:items-center" role="dialog" aria-modal="true" aria-labelledby="result-title">
      <div className={`${r.correct ? 'px-panel' : 'px-panel !border-[#c64f4f]'} my-4 w-full max-w-2xl p-5 md:p-6`}>
        <h2 id="result-title" className={`font-pixel text-center text-xl md:text-2xl ${r.correct ? 'text-[#f1d49a]' : 'text-[#ff8a7a]'}`}>
          {r.correct ? 'OPTIMAL SOLUTION!' : 'AN UNWISE DECISION!'}
        </h2>
        <div className="mt-4 flex items-start gap-3">
          <img src={portraitFor(r.questionId)} alt="" className="pixelated h-14 w-14 shrink-0 border-2 border-[#d8af63] bg-[#3a2a1a] object-cover object-top" />
          <p className="font-term text-2xl leading-7 text-[#f6ead0]">
            <span className="text-[#f1d49a]">{npc.name}:</span> “{r.correct ? npc.success : npc.failure}”
          </p>
        </div>

        <div className="mt-4 space-y-3 font-sans text-sm text-[#f0e2bf]/90">
          <p>
            <span className="text-[#c9b98a]">Your answer:</span> <strong>{ev.selectedLabel}</strong>
          </p>
          {r.correct ? (
            <>
              <p className="text-base">{ev.explanation}</p>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="border-2 border-[#1a1208] bg-[#2a1d14] p-2">
                  <p className="font-pixel text-base text-[#f1d49a]">{r.xpEarned ? `+${r.xpEarned}` : '—'}</p>
                  <p className="font-term text-lg leading-5 text-[#c9b98a]">XP {r.usedHint ? '(hint)' : ''}</p>
                </div>
                <div className="border-2 border-[#1a1208] bg-[#2a1d14] p-2">
                  <p className="font-pixel text-base text-[#f1d49a]">{r.streakAfter}/3</p>
                  <p className="font-term text-lg leading-5 text-[#c9b98a]">Challenge streak</p>
                </div>
                <div className="border-2 border-[#1a1208] bg-[#2a1d14] p-2">
                  <p className="font-pixel text-[11px] leading-5 text-[#7ee08a]">
                    ♥ {state.health} · 🍖 {state.hunger}
                  </p>
                  <p className="font-term text-lg leading-5 text-[#c9b98a]">Health · Hunger</p>
                </div>
              </div>
              {question.kind === 'graph' && ev.optimalPath && (
                <Expandable title="See the optimal route & Dijkstra's trace" defaultOpen>
                  <div className="parchment mb-3 rounded-lg p-1">
                    <WeightedGraph question={question} path={ev.optimalPath} highlight={ev.optimalPath} />
                  </div>
                  {ev.dijkstra && <DijkstraTrace steps={ev.dijkstra} path={ev.optimalPath} />}
                </Expandable>
              )}
              {r.chapterCompleted && (
                <p className="font-pixel text-center text-[11px] leading-5 text-[#7ee08a]">
                  Three in a row! {r.chapterXP} XP is now permanent.
                </p>
              )}
            </>
          ) : (
            <>
              <div className="border-l-4 border-[#c64f4f] bg-[#c64f4f]/15 px-3 py-2">
                <p className="font-pixel text-[9px] text-[#ff9d8f]">WHY IT FAILED — {ev.headline.toUpperCase()}</p>
                <p className="mt-1 text-base">{ev.discreetReason}</p>
              </div>
              <div className="border-l-4 border-[#5fb8c4] bg-[#2f8190]/15 px-3 py-2">
                <p className="font-pixel text-[9px] text-[#5fb8c4]">THE PRINCIPLE</p>
                <p className="mt-1">{ev.principle}</p>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="border-2 border-[#1a1208] bg-[#3a1414] p-2">
                  <p className="font-pixel text-base text-[#ff8a7a]">-{r.healthLost}</p>
                  <p className="font-term text-lg leading-5 text-[#c9b98a]">Health</p>
                </div>
                <div className="border-2 border-[#1a1208] bg-[#3a2414] p-2">
                  <p className="font-pixel text-base text-[#ffb347]">-{r.hungerLost}</p>
                  <p className="font-term text-lg leading-5 text-[#c9b98a]">Hunger</p>
                </div>
                <div className="border-2 border-[#1a1208] bg-[#2a1d14] p-2">
                  <p className="font-pixel text-base text-[#f0e2bf]">0/3</p>
                  <p className="font-term text-lg leading-5 text-[#c9b98a]">Chapter streak reset</p>
                </div>
              </div>
              <p className="font-term text-xl leading-6 text-[#c9b98a]">
                Health {state.health}/100 · Hunger {state.hunger}/100. Eat before you try again — the next mistake will cost the same. All three challenges of
                this chapter must now be solved again, in order.
              </p>
            </>
          )}
        </div>

        <div className="mt-5 flex justify-center">
          <button type="button" className={`px-btn ${r.correct ? '' : 'px-btn-red'}`} onClick={close} autoFocus>
            {r.correct ? (
              <>
                Continue <ArrowRight className="h-4 w-4" />
              </>
            ) : (
              <>
                <RotateCcw className="h-4 w-4" /> Return to chapter start
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// Chapter story intro & completion
// ═════════════════════════════════════════════════════════════

export function IntroOverlay({ store, state }: { store: GameStore; state: SurvivalState }) {
  const level = getLevel(state.currentChapter);
  const chapter = getChapter(state.currentChapter);
  const text = level.story.join(' ');
  const [shown, done, skip] = useTypewriter(text, 60);
  const begin = () => {
    store.dispatch({ type: 'SEE_INTRO', chapterId: state.currentChapter });
    store.setUI({ overlay: 'none' });
  };
  useKeys({ enter: () => (done ? begin() : skip()), ' ': () => (done ? begin() : skip()), e: () => (done ? begin() : skip()) });

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-[#0a0705]/75 p-4" role="dialog" aria-modal="true" aria-labelledby="intro-title">
      <div className="px-panel w-full max-w-2xl p-6 text-center md:p-8">
        <p className="font-pixel text-[10px] text-[#5fb8c4]">
          CHAPTER {chapter.numeral} · {chapter.difficulty.toUpperCase()}
        </p>
        <h2 id="intro-title" className="font-pixel mt-3 text-lg leading-8 text-[#f1d49a] md:text-2xl md:leading-10">
          {chapter.title}
        </h2>
        <p className="font-term mt-4 min-h-[6.5em] text-2xl leading-7 text-[#f6ead0]" aria-live="polite">
          {shown}
          {!done && <span className="blink">▌</span>}
        </p>
        <p className="font-term mt-3 text-xl leading-6 text-[#c9b98a]">
          Find the three challenge-givers marked with <span className="text-[#ffd166]">!</span>. Solve all three in a row to open the way onward.
        </p>
        <div className="mt-5 flex justify-center gap-3">
          {!done && (
            <button type="button" className="px-btn px-btn-dark" onClick={skip}>
              <ChevronsRight className="h-4 w-4" /> Skip text
            </button>
          )}
          <button type="button" className="px-btn" onClick={begin} autoFocus>
            Begin <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function ChapterCompleteOverlay({ store, state }: { store: GameStore; state: SurvivalState }) {
  const level = getLevel(state.currentChapter);
  const chapter = getChapter(state.currentChapter);
  const xp = state.chapterXP[state.currentChapter] ?? 0;
  const close = () => store.setUI({ overlay: 'none' });
  useKeys({ enter: close, escape: close });
  const badgeIcon = useMemo(() => chapter.badge.name, [chapter]);
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-[#0a0705]/70 p-4" role="dialog" aria-modal="true" aria-labelledby="cc-title">
      <div className="px-panel w-full max-w-xl p-6 text-center md:p-8">
        <p className="font-pixel text-[10px] text-[#7ee08a]">THREE IN A ROW</p>
        <h2 id="cc-title" className="font-pixel mt-3 text-xl leading-9 text-[#f1d49a]">
          CHAPTER {chapter.numeral} COMPLETE
        </h2>
        <p className="font-term mt-1 text-2xl text-[#f0e2bf]">{chapter.title}</p>
        <div className="font-term mt-4 space-y-1 text-2xl leading-7 text-[#f6ead0]">
          {level.completion.map((l) => (
            <p key={l}>{l}</p>
          ))}
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2">
          <div className="border-2 border-[#1a1208] bg-[#2a1d14] p-2">
            <p className="font-pixel text-base text-[#f1d49a]">+{xp}</p>
            <p className="font-term text-lg leading-5 text-[#c9b98a]">XP committed</p>
          </div>
          <div className="border-2 border-[#1a1208] bg-[#2a1d14] p-2">
            <p className="font-pixel text-[10px] leading-5 text-[#f1d49a]">{badgeIcon}</p>
            <p className="font-term text-lg leading-5 text-[#c9b98a]">Badge earned</p>
          </div>
        </div>
        <button type="button" className="px-btn mt-6" onClick={close} autoFocus>
          <BookOpen className="h-4 w-4" /> To the exit
        </button>
      </div>
    </div>
  );
}
