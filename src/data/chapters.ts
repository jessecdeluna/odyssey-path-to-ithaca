import type { Chapter } from '../game/types';

export const CHAPTERS: Chapter[] = [
  {
    id: 1,
    numeral: 'I',
    title: 'The Island of the Lotus-Eaters',
    location: 'Lotus-Eaters',
    difficulty: 'Easy',
    focus: ['RAM', 'CPU', 'Hardware and software'],
    theme: 'lotus',
    intro: [
      'After days at sea, Odysseus and his exhausted crew reach a beautiful island filled with food and enchanted lotus flowers.',
      'The island’s inhabitants welcome the sailors.',
      'But those who consume the lotus fruit forget their desire to return home.',
      'Odysseus must gather food, rescue his crew, and escape before the island’s enchantment takes hold.',
    ],
    completion: [
      'Odysseus gathers his crew and escapes the enchanted island.',
      'The sailors are safe, but their voyage has barely begun.',
      'A rocky island appears on the horizon.',
      'Within its mountains lives a terrifying giant.',
    ],
    questionIds: [1, 2, 3],
    completionEffect: { supplies: 3 },
    completionEffectText: '+3 supplies gathered from the island',
    badge: { name: 'Computer Basics Explorer', description: 'Learned RAM, CPU, and the difference between hardware and software.', icon: 'trophy' },
  },
  {
    id: 2,
    numeral: 'II',
    title: 'Escape from the Cyclops',
    location: 'Cyclops',
    difficulty: 'Medium',
    focus: ['Python variables', 'Types and conversion', 'Conditionals'],
    theme: 'cyclops',
    intro: [
      'While searching for provisions, Odysseus and his crew discover a cave filled with livestock.',
      'But the cave belongs to Polyphemus, a monstrous Cyclops.',
      'The giant traps the sailors behind an enormous boulder.',
      'Odysseus cannot escape by strength alone.',
      'He must learn Python variables, types, and conditions to help the crew escape.',
    ],
    completion: [
      'Through clever planning, Odysseus escapes the Cyclops.',
      'His ship returns to the open sea.',
      'Soon, the crew reaches a mysterious floating island ruled by Aeolus, keeper of the winds.',
    ],
    questionIds: [4, 5, 6],
    completionEffect: { elapsedTime: 6 },
    completionEffectText: '+6 hours spent escaping the Cyclops',
    badge: { name: 'Python Apprentice', description: 'Understood variables, types, and conditionals in Python.', icon: 'lock' },
  },
  {
    id: 3,
    numeral: 'III',
    title: 'Aeolus and the Winds',
    location: 'Aeolus',
    difficulty: 'Medium',
    focus: ['Python lists', 'Loops and indentation', 'Functions and return values'],
    theme: 'aeolus',
    intro: [
      'Odysseus arrives at the floating island of Aeolus.',
      'The god of winds offers magical equipment and valuable supplies.',
      'But the ship has been damaged during its journey.',
      'Cargo space is limited.',
      'Aeolus teaches lists, loops, and functions through short Python examples.',
    ],
    completion: [
      'With the ship prepared and the winds at his back, Odysseus sails toward Ithaca.',
      'But his journey is not finished.',
      'The final waters are guarded by Scylla and Charybdis.',
      'Three small Python debugging challenges stand between the crew and home.',
    ],
    questionIds: [7, 8, 9],
    completionEffect: {},
    completionEffectText: 'The ship is loaded with Aeolus’ finest supplies',
    badge: { name: 'Python Pathfinder', description: 'Traced lists, loops, and functions in Python.', icon: 'package' },
  },
  {
    id: 4,
    numeral: 'IV',
    title: 'The Final Passage to Ithaca',
    location: 'Scylla & Charybdis',
    difficulty: 'Hard',
    focus: ['Debugging list bounds', 'Debugging loop totals', 'Debugging return values'],
    theme: 'scylla',
    intro: [
      'Ithaca is nearly within reach.',
      'But the final waters are filled with dangerous routes, hidden islands, sea monsters, and deadly whirlpools.',
      'Scylla guards the cliffs.',
      'Charybdis devours ships in an enormous whirlpool.',
      'Odysseus discovers three short Python programs with small mistakes.',
      'Use the lessons from the first three islands to spot and fix each issue.',
    ],
    completion: [
      'The last whirlpool fades behind the stern.',
      'Through the morning mist, the cliffs of Ithaca rise golden in the dawn.',
    ],
    questionIds: [10, 11, 12],
    completionEffect: {},
    completionEffectText: 'Three Python bugs fixed; the passage to Ithaca is open',
    badge: { name: 'Python Bug Finder', description: 'Fixed three small Python bugs using earlier lessons.', icon: 'compass' },
  },
];

export const TOTAL_CHAPTERS = CHAPTERS.length;

export function getChapter(id: number): Chapter {
  const c = CHAPTERS.find((ch) => ch.id === id);
  if (!c) throw new Error(`Unknown chapter ${id}`);
  return c;
}

/** Map locations, in voyage order. Index 0 = Troy, 1..4 = chapters, 5 = Ithaca. */
export const LOCATIONS = [
  { name: 'Troy', chapterId: null as number | null },
  { name: 'Lotus-Eaters', chapterId: 1 },
  { name: 'Cyclops', chapterId: 2 },
  { name: 'Aeolus', chapterId: 3 },
  { name: 'Scylla & Charybdis', chapterId: 4 },
  { name: 'Ithaca', chapterId: null as number | null },
];

export const OPENING_NARRATION = [
  'Ten years have passed since the fall of Troy.',
  'Odysseus, king of Ithaca, sails toward his homeland alongside his loyal crew.',
  'But the gods have other plans.',
  'Enchanted islands, monstrous enemies, and impossible choices stand between Odysseus and home.',
  'To survive, he must rely upon his greatest weapon.',
  'Not his sword.',
  'Not his strength.',
  'His wisdom.',
  'Every decision matters.',
  'Every resource is precious.',
  'Every choice shapes your journey home.',
];

export const VICTORY_NARRATION = [
  'After years of wandering, Odysseus finally returns home.',
  'Through enchanted islands, monstrous enemies, violent storms, and impossible choices, wisdom guided the journey.',
  'You have discovered that every great adventure is built upon decisions.',
  'You have learned computer basics, written your first Python steps, and found bugs along the way.',
];
