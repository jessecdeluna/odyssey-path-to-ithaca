import { useEffect, useMemo, useRef, useState } from 'react';
import { setMuted as setSfxMuted } from '../../game/sound';
import { loadSettings, saveSettings } from '../../game/storage';
import { EducationalReviewScreen } from '../../screens/EducationalReviewScreen';
import { GameHost } from '../phaser/game';
import { loadRecords } from '../save';
import { GameStore, type Screen } from '../store';
import { ChallengeOverlay, ChapterCompleteOverlay, DialoguePanel, IntroOverlay, ResultOverlay } from './Encounters';
import { HUD } from './HUD';
import { useGame } from './hooks';
import { DemoBar, InventoryPanel, PauseMenu, Toast } from './Panels';
import { GameOverScreen, HowToPlay, MainMenu, VictoryScreen } from './Screens';

/** The survival edition: a Phaser world with React overlays, all driven by one GameStore. */
export function SurvivalApp({ onClassic }: { onClassic: () => void }) {
  const campaign = useMemo(() => new GameStore({ persist: true, demo: false, muted: loadSettings().muted }), []);
  const [store, setStore] = useState<GameStore>(campaign);
  const { state, ui } = useGame(store);
  const parentRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<GameHost | null>(null);
  const [records, setRecords] = useState(() => loadRecords());
  const [reviewFrom, setReviewFrom] = useState<'victory' | 'menu'>('menu');
  const prevScreen = useRef<Screen>(ui.screen);
  const [howtoFrom, setHowtoFrom] = useState<Screen>('menu');

  useEffect(() => {
    if (ui.screen === 'howto' && prevScreen.current !== 'howto') setHowtoFrom(prevScreen.current);
    prevScreen.current = ui.screen;
  }, [ui.screen]);

  // Phaser lives for the lifetime of this component.
  useEffect(() => {
    if (!parentRef.current) return;
    const host = new GameHost(parentRef.current, campaign);
    hostRef.current = host;
    return () => {
      host.destroy();
      hostRef.current = null;
    };
  }, [campaign]);

  useEffect(() => {
    hostRef.current?.setStore(store);
  }, [store]);

  useEffect(() => {
    setSfxMuted(ui.muted);
    saveSettings({ muted: ui.muted });
  }, [ui.muted]);

  useEffect(() => {
    if (ui.screen === 'menu') setRecords(loadRecords());
  }, [ui.screen]);

  // No page scrolling while the game owns the keyboard.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Dev-only handle for automated playtesting.
  useEffect(() => {
    if (import.meta.env.DEV) (window as unknown as { __odyssey?: unknown }).__odyssey = { store, game: hostRef.current?.game };
  }, [store]);

  const toggleMute = () => store.setUI({ muted: !store.ui.muted });

  const startDemo = () => {
    const demo = new GameStore({ persist: false, demo: true, muted: ui.muted });
    demo.dispatch({ type: 'DEMO_REFILL' });
    demo.setUI({ screen: 'play', overlay: 'intro' });
    setStore(demo);
  };
  const exitDemo = () => {
    campaign.setUI({ screen: 'menu', overlay: 'none', npc: null, cinematic: 'none', muted: store.ui.muted });
    setStore(campaign);
  };

  const playing = ui.screen === 'play';

  return (
    <div className="survival-root fixed inset-0 select-none overflow-hidden bg-black">
      {/* 16:9 stage: the Phaser canvas plus in-world UI */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ width: 'min(100vw, 177.78vh)', height: 'min(100vh, 56.25vw)' }}>
        <div ref={parentRef} className="absolute inset-0" />
        {playing && state.status === 'playing' && ui.cinematic === 'none' && <HUD store={store} state={state} muted={ui.muted} onToggleMute={toggleMute} />}
        {playing && <Toast state={state} />}
        {playing && ui.overlay === 'dialogue' && ui.npc !== null && <DialoguePanel key={ui.npc} store={store} state={state} questionId={ui.npc} />}
      </div>

      {playing && ui.overlay === 'intro' && <IntroOverlay key={state.currentChapter} store={store} state={state} />}
      {playing && ui.overlay === 'challenge' && <ChallengeOverlay store={store} state={state} />}
      {playing && ui.overlay === 'result' && <ResultOverlay store={store} state={state} />}
      {playing && ui.overlay === 'chapterComplete' && <ChapterCompleteOverlay store={store} state={state} />}
      {playing && ui.overlay === 'inventory' && <InventoryPanel store={store} state={state} />}
      {playing && ui.overlay === 'pause' && (
        <PauseMenu store={store} muted={ui.muted} onToggleMute={toggleMute} onQuit={store.demo ? exitDemo : () => store.setUI({ screen: 'menu', overlay: 'none', npc: null })} />
      )}

      {ui.screen === 'menu' && !store.demo && (
        <MainMenu
          hasSave={store.hasLivingSave()}
          records={records}
          onNew={() => store.newRun()}
          onContinue={() => store.continueRun()}
          onHowTo={() => store.setUI({ screen: 'howto' })}
          onDemo={startDemo}
          onClassic={onClassic}
        />
      )}
      {ui.screen === 'howto' && <HowToPlay onBack={() => store.setUI({ screen: howtoFrom, overlay: howtoFrom === 'play' ? 'pause' : 'none' })} />}
      {ui.screen === 'gameover' && (
        <GameOverScreen
          state={state}
          onRestart={() => {
            store.newRun();
            if (store.demo) store.dispatch({ type: 'DEMO_REFILL' });
          }}
          onMenu={() => (store.demo ? exitDemo() : store.setUI({ screen: 'menu', overlay: 'none' }))}
        />
      )}
      {ui.screen === 'victory' && (
        <VictoryScreen
          state={state}
          onPlayAgain={() => store.newRun()}
          onReview={() => {
            setReviewFrom('victory');
            store.setUI({ screen: 'review' });
          }}
          onMenu={() => (store.demo ? exitDemo() : store.setUI({ screen: 'menu', overlay: 'none' }))}
        />
      )}
      {ui.screen === 'review' && (
        <div className="fixed inset-0 z-40 overflow-y-auto">
          <EducationalReviewScreen completedChapters={state.completedChapters} onBack={() => store.setUI({ screen: reviewFrom === 'victory' ? 'victory' : 'menu' })} />
        </div>
      )}

      {store.demo && <DemoBar store={store} onExit={exitDemo} />}
    </div>
  );
}
