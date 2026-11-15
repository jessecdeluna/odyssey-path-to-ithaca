import { AnimatePresence, motion } from 'motion/react';
import { Feather, Lightbulb } from 'lucide-react';

interface HintPanelProps {
  hint: string;
  used: boolean;
  disabled?: boolean;
  onUse: () => void;
  /** Demo mode has no XP stakes. */
  showCost?: boolean;
}

export function HintPanel({ hint, used, disabled, onUse, showCost = true }: HintPanelProps) {
  return (
    <div className="w-full">
      <AnimatePresence initial={false} mode="wait">
        {used ? (
          <motion.div
            key="hint"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3 rounded-xl border border-aegean-light/40 bg-aegean/15 p-3 text-sm text-parchment"
            role="status"
          >
            <Feather className="mt-0.5 h-5 w-5 shrink-0 text-aegean-light" aria-hidden />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-aegean-light">Athena whispers</p>
              <p className="mt-0.5 leading-relaxed">{hint}</p>
              {showCost && <p className="mt-1 text-xs text-parchment/50">This question is now worth up to 50 XP.</p>}
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="btn"
            type="button"
            onClick={onUse}
            disabled={disabled}
            className="btn btn-ghost px-4 py-2 text-xs"
            exit={{ opacity: 0 }}
          >
            <Lightbulb className="h-4 w-4" aria-hidden />
            Ask Athena for a hint{showCost && <span className="font-sans text-[10px] font-semibold normal-case tracking-normal text-parchment/60">(max XP 100 → 50)</span>}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
