export const XP_PER_QUESTION = 100;
export const XP_WITH_HINT = 50;
export const QUESTIONS_PER_CHAPTER = 3;
export const MAX_CHAPTER_XP = XP_PER_QUESTION * QUESTIONS_PER_CHAPTER;
export const MAX_XP = MAX_CHAPTER_XP * 4;

/** XP for a correct answer. Incorrect answers never call this — they fail the chapter (0 XP). */
export function questionXP(usedHint: boolean): number {
  return usedHint ? XP_WITH_HINT : XP_PER_QUESTION;
}

export interface Rank {
  title: string;
  min: number;
  max: number;
  description: string;
}

export const RANKS: Rank[] = [
  { title: 'Master Strategist', min: 1100, max: 1200, description: 'Athena herself would seek your counsel.' },
  { title: 'Wise Navigator', min: 900, max: 1099, description: 'Your reasoning steers true through any storm.' },
  { title: 'Courageous Explorer', min: 600, max: 899, description: 'Bold and growing wiser with every voyage.' },
  { title: 'Aspiring Adventurer', min: 0, max: 599, description: 'Every hero’s journey begins with a first step.' },
];

export function getRank(xp: number): Rank {
  const clamped = Math.max(0, Math.min(MAX_XP, Math.floor(xp)));
  return RANKS.find((r) => clamped >= r.min && clamped <= r.max) ?? RANKS[RANKS.length - 1];
}
