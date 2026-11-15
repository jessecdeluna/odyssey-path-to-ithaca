import { ArrowLeft, BookOpen, HelpCircle, Home, Map as MapIcon, Play, Presentation, RotateCcw, Sailboat } from 'lucide-react';
import { useMemo, useState } from 'react';
import { CHAPTERS, getChapter } from '../../data/chapters';
import { heroPortrait } from '../art/characters';
import { heartIcon, hungerIcon, itemDataUrl } from '../art/world';
import { PENALTIES } from '../items';
import type { Records } from '../save';
import type { SurvivalState } from '../types';
import { formatTime, useKeys } from './hooks';

const Shell = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`fixed inset-0 z-40 flex items-center justify-center overflow-y-auto p-4 ${className}`}>{children}</div>
);

export function MainMenu(props: {
  hasSave: boolean;
  records: Records;
  onNew: () => void;
  onContinue: () => void;
  onHowTo: () => void;
  onDemo: () => void;
  onClassic: () => void;
}) {
  const [confirm, setConfirm] = useState(false);
  const portrait = useMemo(() => heroPortrait(5), []);
  return (
    <Shell className="bg-gradient-to-b from-[#0a0705]/60 via-transparent to-[#0a0705]/70">
      <div className="flex w-full max-w-2xl flex-col items-center text-center">
        <img src={portrait} alt="" className="pixelated mb-3 h-[75px] w-20 drop-shadow-[4px_4px_0_#000]" />
        <h1 className="font-pixel text-5xl leading-tight text-[#f1d49a] drop-shadow-[5px_5px_0_#1a1208] md:text-7xl">ODYSSEY</h1>
        <p className="font-pixel mt-3 text-sm text-[#f0e2bf] drop-shadow-[3px_3px_0_#1a1208] md:text-lg">THE PATH TO ITHACA</p>
        <p className="font-term mt-4 text-2xl text-[#f6ead0] drop-shadow-[2px_2px_0_#000] md:text-3xl">Survive the Journey. Outsmart the Gods. Find Your Way Home.</p>
        <div className="mt-8 flex w-full max-w-xs flex-col gap-3">
          {props.hasSave && (
            <button type="button" className="px-btn" onClick={props.onContinue} autoFocus>
              <Sailboat className="h-4 w-4" /> Continue game
            </button>
          )}
          <button type="button" className={`px-btn ${props.hasSave ? 'px-btn-dark' : ''}`} onClick={() => (props.hasSave ? setConfirm(true) : props.onNew())} autoFocus={!props.hasSave}>
            <Play className="h-4 w-4" /> New game
          </button>
          <button type="button" className="px-btn px-btn-dark" onClick={props.onHowTo}>
            <HelpCircle className="h-4 w-4" /> How to play
          </button>
          <button type="button" className="px-btn px-btn-teal" onClick={props.onDemo}>
            <Presentation className="h-4 w-4" /> Demo mode
          </button>
        </div>
        {confirm && (
          <div className="px-panel mt-4 max-w-sm p-4" role="alertdialog" aria-labelledby="new-confirm">
            <p id="new-confirm" className="font-term text-xl leading-6 text-[#f0e2bf]">
              Starting a new game abandons your current voyage. This cannot be undone.
            </p>
            <div className="mt-3 flex justify-center gap-2">
              <button type="button" className="px-btn px-btn-dark !text-[9px]" onClick={() => setConfirm(false)} autoFocus>
                Keep voyage
              </button>
              <button type="button" className="px-btn px-btn-red !text-[9px]" onClick={props.onNew}>
                Start over
              </button>
            </div>
          </div>
        )}
        <p className="font-term mt-6 text-xl text-[#c9b98a] drop-shadow-[2px_2px_0_#000]">
          Best XP {props.records.bestXP} · Voyages {props.records.runs} · Homecomings {props.records.victories}
        </p>
        <button type="button" onClick={props.onClassic} className="font-pixel mt-3 flex items-center gap-2 text-[9px] text-[#c9b98a] underline-offset-4 hover:text-[#f1d49a] hover:underline">
          <MapIcon className="h-3.5 w-3.5" /> Classic map edition
        </button>
      </div>
    </Shell>
  );
}

export function HowToPlay({ onBack }: { onBack: () => void }) {
  useKeys({ escape: onBack });
  const icons = useMemo(() => ({ heart: heartIcon(3), hunger: hungerIcon(3), ambrosia: itemDataUrl('ambrosia', 3), bread: itemDataUrl('bread', 3) }), []);
  const controls: [string, string][] = [
    ['A / D  or  ← / →', 'Move'],
    ['SPACE / W / ↑', 'Jump (hold for higher)'],
    ['E', 'Talk to NPCs · use exits'],
    ['F', 'Eat the selected food'],
    ['Q', 'Select next food'],
    ['I', 'Inventory'],
    ['ESC', 'Pause / close'],
    ['Mouse', 'Answer challenges'],
  ];
  return (
    <Shell className="bg-[#0a0705]/80">
      <div className="px-panel w-full max-w-3xl p-5 md:p-7">
        <h2 className="font-pixel text-center text-lg text-[#f1d49a]">HOW TO PLAY</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div>
            <h3 className="font-pixel text-[10px] text-[#5fb8c4]">CONTROLS</h3>
            <dl className="mt-2 space-y-1">
              {controls.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3 border-b border-[#3a2a1a] py-1">
                  <dt className="font-pixel text-[9px] text-[#f0e2bf]">{k}</dt>
                  <dd className="font-term text-xl leading-5 text-[#c9b98a]">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="font-term space-y-2 text-xl leading-6 text-[#f0e2bf]">
            <h3 className="font-pixel text-[10px] text-[#5fb8c4]">SURVIVE</h3>
            <p>• Explore each island and find the three NPCs marked <span className="text-[#ffd166]">!</span>. Press E to talk.</p>
            <p>• Solve their computer and Python quizzes in order. Get <strong>all three right in a row</strong> to open the exit.</p>
            <p>
              • A wrong answer costs <span className="text-[#ff8a7a]">health</span> and <span className="text-[#ffb347]">hunger</span> ({Object.values(PENALTIES).join(' / ')} by chapter), resets the
              chapter streak, and sends you back to the chapter start.
            </p>
            <p className="flex items-center gap-2">
              <img src={icons.hunger} alt="" className="pixelated h-5 w-5" /> Hunger drains while you explore. At zero you starve and lose health.
            </p>
            <p className="flex items-center gap-2">
              <img src={icons.bread} alt="" className="pixelated h-5 w-5" /> Collect apples, fish and bread to eat.
              <img src={icons.ambrosia} alt="" className="pixelated h-5 w-5" /> Ambrosia heals.
            </p>
            <p className="flex items-center gap-2">
              <img src={icons.heart} alt="" className="pixelated h-5 w-5" />
              <span>
                <strong className="text-[#ff8a7a]">If health reaches zero, Odysseus dies and the whole journey restarts from Chapter I.</strong>
              </span>
            </p>
            <p>• Easy: computer terminology. Medium: beginner Python. Hard: short debugging questions based on earlier lessons.</p>
            <p>• Hints from Athena halve a challenge's XP (100 → 50) but never hurt you.</p>
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          <button type="button" className="px-btn" onClick={onBack} autoFocus>
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
        </div>
      </div>
    </Shell>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="border-2 border-[#1a1208] bg-[#2a1d14] p-2 text-center">
      <p className="font-pixel text-sm text-[#f1d49a]">{value}</p>
      <p className="font-term text-lg leading-5 text-[#c9b98a]">{label}</p>
    </div>
  );
}

export function GameOverScreen({ state, onRestart, onMenu }: { state: SurvivalState; onRestart: () => void; onMenu: () => void }) {
  const s = state.summary;
  return (
    <Shell className="bg-[#1a0606]/55">
      <div className="px-panel w-full max-w-xl !border-[#c64f4f] p-6 text-center md:p-8">
        <h2 className="font-pixel text-2xl leading-10 text-[#ff8a7a] md:text-3xl">ODYSSEUS HAS FALLEN</h2>
        <p className="font-term mt-3 text-2xl leading-7 text-[#f6ead0]">The journey home has ended. But every failed journey teaches a new lesson.</p>
        <p className="font-term mt-2 text-xl text-[#c9b98a]">
          {s?.cause === 'starvation' ? 'He starved on the road home.' : s?.cause === 'environment' ? 'The sea claimed him.' : s?.cause === 'demo' ? '(Presenter demonstration.)' : 'One unwise decision too many.'}
        </p>
        <div className="mt-5 grid grid-cols-2 gap-2 md:grid-cols-3">
          <Stat label="Chapter reached" value={s ? getChapter(s.chapterReached).numeral : '—'} />
          <Stat label="Questions solved" value={s?.questionsSolved ?? 0} />
          <Stat label="Incorrect answers" value={s?.incorrectAnswers ?? 0} />
          <Stat label="Total XP earned" value={s?.xp ?? 0} />
          <Stat label="Time survived" value={formatTime(s?.timeSurvivedMs ?? 0)} />
          <Stat label="Food eaten" value={s?.foodConsumed ?? 0} />
        </div>
        <p className="font-term mt-4 text-lg text-[#c9b98a]">Permadeath: chapters, XP and inventory are lost. The save has been cleared.</p>
        <div className="mt-5 flex flex-col items-center gap-2">
          <button type="button" className="px-btn px-btn-red" onClick={onRestart} autoFocus>
            <RotateCcw className="h-4 w-4" /> Begin a new odyssey
          </button>
          <button type="button" className="px-btn px-btn-dark !text-[9px]" onClick={onMenu}>
            <Home className="h-3.5 w-3.5" /> Main menu
          </button>
        </div>
      </div>
    </Shell>
  );
}

export function VictoryScreen({ state, onPlayAgain, onReview, onMenu }: { state: SurvivalState; onPlayAgain: () => void; onReview: () => void; onMenu: () => void }) {
  return (
    <div className="fixed inset-0 z-40 flex flex-col items-center justify-between overflow-y-auto p-3 md:p-5">
      {/* Title and narration over the sky, leaving the sunrise, palace and ship visible. */}
      <div className="max-w-3xl pt-2 text-center drop-shadow-[3px_3px_0_#1a1208] md:pt-6">
        <h2 className="font-pixel text-3xl leading-[3rem] text-[#fff1c4] md:text-5xl md:leading-[4.5rem]">ITHACA AT LAST</h2>
        <div className="font-term space-y-0.5 text-2xl leading-7 text-[#fff6e0] md:text-[1.7rem]">
          <p>Through storms, monsters, enchanted islands, and impossible decisions, Odysseus has finally returned home.</p>
          <p>His greatest weapon was not strength.</p>
          <p className="text-[#ffe08a]">It was wisdom.</p>
        </div>
      </div>
      <div className="px-panel w-full max-w-5xl px-3 py-3 text-center" style={{ animation: 'rise-in 0.5s steps(5) 3s both' }}>
        <dl className="grid grid-cols-4 gap-1.5 lg:grid-cols-8">
          {(
            [
              ['Final XP', `${state.xp}/1200`],
              ['Time survived', formatTime(state.timeSurvivedMs)],
              ['Food eaten', state.foodConsumed],
              ['Wrong answers', state.totalIncorrectAnswers],
              ['Problems solved', `${state.completedChapters.length * 3}/12`],
              ['Chapters', `${state.completedChapters.length}/${CHAPTERS.length}`],
              ['Health', `${state.health}/100`],
              ['Hunger', `${state.hunger}/100`],
            ] as [string, string | number][]
          ).map(([k, v]) => (
            <div key={k} className="border-2 border-[#1a1208] bg-[#2a1d14] px-1 py-1.5">
              <dd className="font-pixel text-[11px] text-[#f1d49a]">{v}</dd>
              <dt className="font-term text-base leading-4 text-[#c9b98a]">{k}</dt>
            </div>
          ))}
        </dl>
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          <button type="button" className="px-btn" onClick={onPlayAgain} autoFocus>
            <RotateCcw className="h-4 w-4" /> Play again
          </button>
          <button type="button" className="px-btn px-btn-teal" onClick={onReview}>
            <BookOpen className="h-4 w-4" /> Review what I learned
          </button>
          <button type="button" className="px-btn px-btn-dark" onClick={onMenu}>
            <Home className="h-4 w-4" /> Return to main menu
          </button>
        </div>
      </div>
    </div>
  );
}
