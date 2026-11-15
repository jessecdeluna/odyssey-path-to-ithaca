// ─────────────────────────────────────────────────────────────
// Core domain types for ODYSSEY: THE PATH TO ITHACA
// ─────────────────────────────────────────────────────────────

export type ScreenId =
  | 'title'
  | 'howToPlay'
  | 'intro'
  | 'map'
  | 'chapterIntro'
  | 'challenge'
  | 'correct'
  | 'failure'
  | 'chapterComplete'
  | 'victory'
  | 'review'
  | 'demo';

export type ChapterTheme = 'lotus' | 'cyclops' | 'aeolus' | 'scylla';

export type ObjectiveSense = 'maximize' | 'minimize';

/** Names an icon in the UI icon registry (kept as a string so data stays framework-free). */
export type IconKey = string;

// ── Multiple-choice optimization ─────────────────────────────

export interface AttributeDef {
  key: string;
  label: string;
  unit: string;
  icon: IconKey;
}

export type Metric =
  | { kind: 'attribute'; key: string }
  | { kind: 'ratio'; numerator: string; denominator: string };

export interface Objective {
  sense: ObjectiveSense;
  metric: Metric;
  /** e.g. "food portions", "meals per coin" */
  label: string;
  unit: string;
}

export type ConstraintOp = '<=' | '>=' | '==';

export interface Constraint {
  key: string;
  op: ConstraintOp;
  limit: number;
  label: string;
}

export interface ChoiceOption {
  id: string;
  label: string;
  description: string;
  icon: IconKey;
  attributes: Record<string, number>;
}

export interface Lesson {
  explanation: string;
  hint: string;
  principle: string;
  nextTime: string;
}

interface QuestionBase {
  id: number;
  chapterId: number;
  title: string;
  story: string[];
  objectiveText: string;
  lesson: Lesson;
}

export interface MultipleChoiceQuestion extends QuestionBase {
  kind: 'choice';
  visual: 'cards' | 'trails';
  objective: Objective;
  attributes: AttributeDef[];
  constraints: Constraint[];
  options: ChoiceOption[];
}

// ── 0/1 Knapsack ─────────────────────────────────────────────

export interface KnapsackItem {
  id: string;
  name: string;
  weight: number;
  value: number;
  icon: IconKey;
  flavor: string;
}

export interface KnapsackQuestion extends QuestionBase {
  kind: 'knapsack';
  capacity: number;
  items: KnapsackItem[];
}

// ── Shortest path ────────────────────────────────────────────

export interface GraphNode {
  id: string;
  label: string;
  subtitle?: string;
  x: number;
  y: number;
  role: 'start' | 'island' | 'goal';
}

export interface GraphEdge {
  from: string;
  to: string;
  weight: number;
  /** Perpendicular bend of the drawn curve (pixels). Purely visual. */
  curve?: number;
  /** Where along the edge to draw the weight label (0..1). Purely visual. */
  labelT?: number;
}

export interface GraphHazard {
  kind: 'scylla' | 'charybdis' | 'rocks';
  x: number;
  y: number;
}

export interface ShortestPathQuestion extends QuestionBase {
  kind: 'graph';
  nodes: GraphNode[];
  edges: GraphEdge[];
  start: string;
  goal: string;
  hazards?: GraphHazard[];
}

export type Question = MultipleChoiceQuestion | KnapsackQuestion | ShortestPathQuestion;
export type QuestionKind = Question['kind'];

// ── Answers ──────────────────────────────────────────────────

export type Answer =
  | { kind: 'choice'; optionId: string }
  | { kind: 'knapsack'; itemIds: string[] }
  | { kind: 'graph'; path: string[] };

// ── Evaluation (pure, JSON-serialisable) ─────────────────────

export interface BreakdownRow {
  label: string;
  metric: string;
  feasible: boolean;
  optimal: boolean;
  selected: boolean;
  note: string;
}

export interface DijkstraUpdate {
  node: string;
  from: number | null;
  to: number;
}

export interface DijkstraStep {
  /** Node finalized in this step. */
  visit: string;
  distance: number;
  updates: DijkstraUpdate[];
  /** Tentative distances after the step (Infinity encoded as null). */
  table: Record<string, number | null>;
}

export interface Evaluation {
  correct: boolean;
  /** Human-readable description of what the player submitted. */
  selectedLabel: string;
  headline: string;
  /** Why the answer is correct, or exactly which requirement it failed. */
  reason: string;
  /** Like `reason`, but never names the optimal answer (used where failures must not spoil the solution). */
  discreetReason: string;
  principle: string;
  nextTime: string;
  explanation: string;
  optimalLabel: string;
  optimalValue: number;
  playerValue: number | null;
  unit: string;
  breakdown: BreakdownRow[];
  dijkstra?: DijkstraStep[];
  optimalPath?: string[];
}

// ── Chapters ─────────────────────────────────────────────────

export interface ResourceEffect {
  supplies?: number;
  elapsedTime?: number;
  crew?: number;
}

export interface Chapter {
  id: number;
  numeral: string;
  title: string;
  location: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  focus: string[];
  theme: ChapterTheme;
  intro: string[];
  completion: string[];
  questionIds: [number, number, number];
  completionEffect: ResourceEffect;
  completionEffectText: string;
  badge: { name: string; description: string; icon: IconKey };
}

// ── Game state ───────────────────────────────────────────────

export interface Resources {
  crew: number;
  supplies: number;
  elapsedTime: number;
}

export interface QuestionResult {
  questionId: number;
  xp: number;
  usedHint: boolean;
}

export interface ChapterRecord {
  xp: number;
  hintsUsed: number;
  attemptsToComplete: number;
}

export interface Outcome {
  questionId: number;
  chapterId: number;
  questionIndex: number;
  correct: boolean;
  evaluation: Evaluation;
  xpEarned: number;
  usedHint: boolean;
  attemptNumber: number;
  /** Streak value before this answer was evaluated. */
  streakBefore: number;
  /** For failures: temporary XP that was discarded. */
  temporaryXPLost: number;
  /** For correct answers that finish a chapter. */
  chapterCompleted: boolean;
  chapterXPAwarded: number;
  resourceDelta: ResourceEffect;
  replay: boolean;
}

export interface GameState {
  version: 1;
  screen: ScreenId;
  previousScreen: ScreenId;
  currentChapter: number;
  currentQuestion: number;
  completedChapters: number[];
  currentStreak: number;
  chapterAttempts: Record<number, number>;
  permanentXP: number;
  temporaryXP: number;
  crew: number;
  supplies: number;
  elapsedTime: number;
  chapterStartResources: Resources;
  hintsUsed: Record<number, boolean>;
  totalHintsUsed: number;
  totalFailures: number;
  completedQuestionIds: number[];
  attemptResults: QuestionResult[];
  chapterRecords: Record<number, ChapterRecord>;
  lastOutcome: Outcome | null;
  pendingShipMove: { from: number; to: number } | null;
  isReplay: boolean;
  introSeen: boolean;
}
