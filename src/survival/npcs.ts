export type HairStyle = 'short' | 'long' | 'bald' | 'helmet' | 'hood' | 'curly';
export type Accessory = 'none' | 'staff' | 'spear' | 'scroll' | 'basket' | 'net' | 'torch' | 'map' | 'lantern';

export interface NpcLook {
  skin: string;
  hair: string;
  hairStyle: HairStyle;
  beard: 'none' | 'dark' | 'white';
  robe: string;
  robeDark: string;
  trim: string;
  accessory: Accessory;
  crest?: string;
}

export interface NpcDef {
  questionId: number;
  key: string;
  name: string;
  title: string;
  look: NpcLook;
  /** Lines spoken before the challenge. */
  intro: string[];
  /** Spoken when the player must first help someone else. */
  locked: string;
  /** Spoken after their challenge is solved this attempt. */
  done: string;
  success: string;
  failure: string;
}

const SKIN = { light: '#e8b48a', tan: '#c98d5e', deep: '#8d5a3b', pale: '#f0c9a4' };

export const NPCS: NpcDef[] = [
  // ── Chapter I ──
  {
    questionId: 1,
    key: 'thales',
    name: 'Thales',
    title: 'The Island Forager',
    look: { skin: SKIN.tan, hair: '#5b3a1e', hairStyle: 'curly', beard: 'dark', robe: '#6f9a4a', robeDark: '#4c6e31', trim: '#e0c477', accessory: 'basket' },
    intro: ["Welcome to the Lotus island. Before we sail, let us learn what a computer does.", "Start with RAM: the working memory a program uses while it runs."],
    locked: 'The sea breeze is sweet today, is it not?',
    done: "You know what RAM does. Eryon has the next lesson.",
    success: "Exactly! RAM holds the data programs are using.",
    failure: 'Hmm. That will not feed so many mouths. Count the portions again, friend.',
  },
  {
    questionId: 2,
    key: 'eryon',
    name: 'Eryon',
    title: 'The Lost Sailor',
    look: { skin: SKIN.light, hair: '#2b1a10', hairStyle: 'short', beard: 'none', robe: '#3f6f8e', robeDark: '#2a4d64', trim: '#d8af63', accessory: 'none' },
    intro: ["Captain, I remember Ithaca! Let us put that memory to work.", "Which computer part follows instructions and performs calculations?"],
    locked: 'Captain…? I… I cannot remember why we sailed here. Speak with the forager on the beach first.',
    done: "Find Melion in the village for one more computer basics lesson.",
    success: "Yes! The CPU carries out instructions.",
    failure: 'That way is too long… the enchantment grows stronger with every minute.',
  },
  {
    questionId: 3,
    key: 'melion',
    name: 'Melion',
    title: 'The Island Merchant',
    look: { skin: SKIN.deep, hair: '#1a1a1a', hairStyle: 'bald', beard: 'white', robe: '#9a4a8a', robeDark: '#6d2f61', trim: '#f0d48a', accessory: 'scroll' },
    intro: ["Welcome, captain. My next lesson separates equipment from programs.", "Can you tell hardware from software?"],
    locked: 'My stall opens only for sailors with their wits about them. Find your lost men first.',
    done: "Your computer basics are ready. The ship waits at the dock.",
    success: "Correct! A web browser is software.",
    failure: 'Ha! A generous purchase… for me. Think about what each single coin buys.',
  },
  // ── Chapter II ──
  {
    questionId: 4,
    key: 'nestor',
    name: 'Nestor',
    title: 'The Trapped Sailor',
    look: { skin: SKIN.light, hair: '#6b4426', hairStyle: 'short', beard: 'dark', robe: '#8a5a2f', robeDark: '#5e3c1e', trim: '#c9a25a', accessory: 'torch' },
    intro: ["The Cyclops has trapped us. Let us use our wits and learn a little Python.", "A variable can track supplies. Follow its value through each line."],
    locked: 'Shh! The Cyclops is stirring…',
    done: "Damon is waiting with a lesson about numbers and text.",
    success: "Good! The assignment updates the total to five.",
    failure: 'That plan breaks one of our limits, captain. Check every constraint first.',
  },
  {
    questionId: 5,
    key: 'damon',
    name: 'Damon',
    title: 'The Cave Scout',
    look: { skin: SKIN.tan, hair: '#1f140c', hairStyle: 'hood', beard: 'none', robe: '#4d5a3a', robeDark: '#333d25', trim: '#a88a4f', accessory: 'lantern' },
    intro: ["Our supply record contains text where we need a number.", "Python treats quoted text differently from integers. Which conversion helps?"],
    locked: 'Talk to Nestor first. He knows the plan.',
    done: "Leandros will show you a Python condition next.",
    success: "Yes! Convert numeric text before doing arithmetic.",
    failure: 'We would never make it on that route. Rule out what our water cannot afford.',
  },
  {
    questionId: 6,
    key: 'leandros',
    name: 'Leandros',
    title: 'The Rescue Captain',
    look: { skin: SKIN.deep, hair: '#111111', hairStyle: 'helmet', beard: 'dark', robe: '#7a2e2e', robeDark: '#521c1c', trim: '#d8af63', accessory: 'spear', crest: '#c64f4f' },
    intro: ["The crew needs a signal before we escape.", "Let us check a condition using if and else."],
    locked: 'Not yet. Damon must find us a way out first.',
    done: "The signal is ready. Head to the cave mouth.",
    success: "Ready! You followed the correct branch.",
    failure: 'Too many minutes, or too few men. The limit is fifteen — no more.',
  },
  // ── Chapter III ──
  {
    questionId: 7,
    key: 'phaedon',
    name: 'Phaedon',
    title: 'The Quartermaster',
    look: { skin: SKIN.light, hair: '#c9b18a', hairStyle: 'short', beard: 'white', robe: '#3a6d8f', robeDark: '#28506b', trim: '#f0e2bf', accessory: 'scroll' },
    intro: ["Aeolus welcomes you. Let us record the cargo in a Python list.", "Remember that Python starts counting positions at zero."],
    locked: 'The winds whisper your name, sailor. Seek the quartermaster first.',
    done: "Lysander awaits with a lesson about loops.",
    success: "Water is second in the list, at index one. Well done.",
    failure: 'That manifest will not do. Add up the values of every combination that fits.',
  },
  {
    questionId: 8,
    key: 'lysander',
    name: 'Lysander',
    title: 'The Shipwright',
    look: { skin: SKIN.tan, hair: '#3a2414', hairStyle: 'curly', beard: 'dark', robe: '#9a6b3a', robeDark: '#6d4a26', trim: '#d8af63', accessory: 'net' },
    intro: ["A steady wind repeats, much like a loop.", "Trace range(3) and count each increase of total."],
    locked: 'Phaedon has your cargo list. Go to him first.',
    done: "Lord Aeolus awaits at the high temple.",
    success: "Three repetitions, three gusts. Fine work.",
    failure: 'A full hold is not a valuable hold. Compare the totals of each combination.',
  },
  {
    questionId: 9,
    key: 'aeolus',
    name: 'Aeolus',
    title: 'Keeper of the Winds',
    look: { skin: SKIN.pale, hair: '#e8eef2', hairStyle: 'long', beard: 'white', robe: '#5fa8c4', robeDark: '#3c7f99', trim: '#f1d49a', accessory: 'staff' },
    intro: ["Your Python knowledge grows, king of Ithaca.", "A function can take an input and return a result. Trace this small example."],
    locked: 'The Keeper of the Winds receives only those who have prepared their ship.',
    done: "Go now. My winds will carry you toward home.",
    success: "Five! You followed the input and the returned result.",
    failure: 'You reached for what glitters. Consider combinations, not single gifts.',
  },
  // ── Chapter IV ──
  {
    questionId: 10,
    key: 'orion',
    name: 'Orion',
    title: 'The Cartographer',
    look: { skin: SKIN.light, hair: '#4a3020', hairStyle: 'hood', beard: 'dark', robe: '#2f4a6b', robeDark: '#1f3349', trim: '#d8af63', accessory: 'map' },
    intro: ["Three short programs need repairs before the final passage.", "This cargo reader goes one step too far. Use what you learned about lists and range."],
    locked: 'Storms on every horizon… Speak with me first, captain.',
    done: "Cassandra has the next small bug to investigate.",
    success: "You found the off-by-one error! Every cargo item can be read safely.",
    failure: 'You trusted how the route looked. Add every leg of the journey.',
  },
  {
    questionId: 11,
    key: 'cassandra',
    name: 'Cassandra',
    title: 'The Sea Oracle',
    look: { skin: SKIN.pale, hair: '#8a2d2d', hairStyle: 'long', beard: 'none', robe: '#5a3a7a', robeDark: '#3e2756', trim: '#e0c477', accessory: 'staff' },
    intro: ["I have seen a supply counter lose its earlier work.", "Trace the loop and find the assignment that erases the running total."],
    locked: 'No one listens to my warnings… Find the cartographer first.',
    done: "Athena awaits at the temple with your final challenge.",
    success: "The total is preserved! Set it once, then keep adding.",
    failure: 'I warned of this. The cheapest-looking first leg is not the cheapest journey.',
  },
  {
    questionId: 12,
    key: 'athena',
    name: 'Athena',
    title: 'Goddess of Wisdom',
    look: { skin: SKIN.pale, hair: '#3a2a1a', hairStyle: 'helmet', beard: 'none', robe: '#e8e0c8', robeDark: '#b9ad8c', trim: '#d8af63', accessory: 'spear', crest: '#2f8190' },
    intro: ["Odysseus, you have learned from every island.", "One final function prints a result but fails to return it. Find the small fix."],
    locked: 'Prove yourself to my oracle and my cartographer first, son of Laertes.',
    done: "Go home, Odysseus. Penelope waits.",
    success: "You found the missing return. Ithaca is yours!",
    failure: 'Even the wise falter. Consider the cumulative cost of every path.',
  },
];

export const NPC_BY_QUESTION: Record<number, NpcDef> = Object.fromEntries(NPCS.map((n) => [n.questionId, n]));
