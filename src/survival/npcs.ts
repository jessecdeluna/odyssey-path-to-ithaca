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
    intro: [
      'Welcome to our shores, stranger. You have the look of a man long at sea.',
      'Traveler, your crew looks exhausted. Three methods of gathering food are available.',
      'Choose wisely. Your men need as much nourishment as possible.',
    ],
    locked: 'The sea breeze is sweet today, is it not?',
    done: 'Your men eat well tonight. Go — your companions need you in the forest.',
    success: 'The nets are full! Your men will feast on fish tonight.',
    failure: 'Hmm. That will not feed so many mouths. Count the portions again, friend.',
  },
  {
    questionId: 2,
    key: 'eryon',
    name: 'Eryon',
    title: 'The Lost Sailor',
    look: { skin: SKIN.light, hair: '#2b1a10', hairStyle: 'short', beard: 'none', robe: '#3f6f8e', robeDark: '#2a4d64', trim: '#d8af63', accessory: 'none' },
    intro: [
      'Odysseus! Thank the gods you found me. I ate only one petal… but I feel it pulling at me.',
      'The lotus enchantment is spreading. We must reach the ship before our companions forget Ithaca.',
      'Three trails lead back to the shore. Every minute counts!',
    ],
    locked: 'Captain…? I… I cannot remember why we sailed here. Speak with the forager on the beach first.',
    done: 'I remember now — Ithaca! I will gather the others. Find the merchant in the village.',
    success: 'The coastal trail! The fastest way — I can already smell the sea.',
    failure: 'That way is too long… the enchantment grows stronger with every minute.',
  },
  {
    questionId: 3,
    key: 'melion',
    name: 'Melion',
    title: 'The Island Merchant',
    look: { skin: SKIN.deep, hair: '#1a1a1a', hairStyle: 'bald', beard: 'white', robe: '#9a4a8a', robeDark: '#6d2f61', trim: '#f0d48a', accessory: 'scroll' },
    intro: [
      'Ah, a customer with gold! Few sailors still care for coin once they taste the lotus.',
      'You have six gold coins. I can offer provisions, but other merchants have different prices.',
      'Which offer gives the most food for your money?',
    ],
    locked: 'My stall opens only for sailors with their wits about them. Find your lost men first.',
    done: 'A shrewd bargain. Your ship waits at the dock — fair winds, captain.',
    success: 'Four meals for every coin! You drive a hard bargain, captain.',
    failure: 'Ha! A generous purchase… for me. Think about what each single coin buys.',
  },
  // ── Chapter II ──
  {
    questionId: 4,
    key: 'nestor',
    name: 'Nestor',
    title: 'The Trapped Sailor',
    look: { skin: SKIN.light, hair: '#6b4426', hairStyle: 'short', beard: 'dark', robe: '#8a5a2f', robeDark: '#5e3c1e', trim: '#c9a25a', accessory: 'torch' },
    intro: [
      'Captain! The giant rolled a boulder across the cave mouth. We are sealed in.',
      'We have only five tools left — and I will not leave a single man behind.',
      'We must escape as quickly as possible. Which plan do we follow?',
    ],
    locked: 'Shh! The Cyclops is stirring…',
    done: 'Under the sheep it is. Damon is scouting deeper in the cave.',
    success: 'The disguise! Within our tools and every man survives. Brilliant.',
    failure: 'That plan breaks one of our limits, captain. Check every constraint first.',
  },
  {
    questionId: 5,
    key: 'damon',
    name: 'Damon',
    title: 'The Cave Scout',
    look: { skin: SKIN.tan, hair: '#1f140c', hairStyle: 'hood', beard: 'none', robe: '#4d5a3a', robeDark: '#333d25', trim: '#a88a4f', accessory: 'lantern' },
    intro: [
      'I have scouted three ways through the mountain to the sea.',
      'But our skins hold only eight units of water. Spend more, and we die of thirst.',
      'We want the fastest route — but only one we can actually survive.',
    ],
    locked: 'Talk to Nestor first. He knows the plan.',
    done: 'Rocky Trail, then. Leandros will need your help with the rescue.',
    success: 'Fast, and within our water. The Rocky Trail it is!',
    failure: 'We would never make it on that route. Rule out what our water cannot afford.',
  },
  {
    questionId: 6,
    key: 'leandros',
    name: 'Leandros',
    title: 'The Rescue Captain',
    look: { skin: SKIN.deep, hair: '#111111', hairStyle: 'helmet', beard: 'dark', robe: '#7a2e2e', robeDark: '#521c1c', trim: '#d8af63', accessory: 'spear', crest: '#c64f4f' },
    intro: [
      'Polyphemus sleeps — for now. Some of our men are still locked in the deeper pens.',
      'We have fifteen minutes before he wakes. Not one moment more.',
      'How do we rescue as many sailors as possible?',
    ],
    locked: 'Not yet. Damon must find us a way out first.',
    done: 'Six men saved! Now — to the cave mouth, before the giant wakes!',
    success: 'Six sailors, and back before he stirs. Well judged!',
    failure: 'Too many minutes, or too few men. The limit is fifteen — no more.',
  },
  // ── Chapter III ──
  {
    questionId: 7,
    key: 'phaedon',
    name: 'Phaedon',
    title: 'The Quartermaster',
    look: { skin: SKIN.light, hair: '#c9b18a', hairStyle: 'short', beard: 'white', robe: '#3a6d8f', robeDark: '#28506b', trim: '#f0e2bf', accessory: 'scroll' },
    intro: [
      'Lord Aeolus has opened his storerooms to you. Generous — but your hull is cracked.',
      'Your ship can carry only six more units of cargo.',
      'Choose the combination of supplies with the greatest survival value.',
    ],
    locked: 'The winds whisper your name, sailor. Seek the quartermaster first.',
    done: 'Well loaded. Lysander the shipwright awaits on the far island.',
    success: 'Food and shield — eleven points of value in exactly six units. Perfect.',
    failure: 'That manifest will not do. Add up the values of every combination that fits.',
  },
  {
    questionId: 8,
    key: 'lysander',
    name: 'Lysander',
    title: 'The Shipwright',
    look: { skin: SKIN.tan, hair: '#3a2414', hairStyle: 'curly', beard: 'dark', robe: '#9a6b3a', robeDark: '#6d4a26', trim: '#d8af63', accessory: 'net' },
    intro: [
      'A storm gathers beyond the cloud-walls. Your ship needs repairs before it sails.',
      'Seven units of cargo space remain.',
      'Pick the repairs and supplies worth the most — you need not fill every unit.',
    ],
    locked: 'Phaedon has your cargo list. Go to him first.',
    done: 'The hull is sound. Lord Aeolus himself waits at the high temple.',
    success: 'Sail and medicine — fourteen value, with room to spare. Fine work.',
    failure: 'A full hold is not a valuable hold. Compare the totals of each combination.',
  },
  {
    questionId: 9,
    key: 'aeolus',
    name: 'Aeolus',
    title: 'Keeper of the Winds',
    look: { skin: SKIN.pale, hair: '#e8eef2', hairStyle: 'long', beard: 'white', robe: '#5fa8c4', robeDark: '#3c7f99', trim: '#f1d49a', accessory: 'staff' },
    intro: [
      'So — the clever king of Ithaca. My winds have carried tales of you.',
      'I grant you one final blessing. Nine units of cargo remain in your hold.',
      'Do not simply grasp the most valuable gift. Choose the best combination.',
    ],
    locked: 'The Keeper of the Winds receives only those who have prepared their ship.',
    done: 'Go now. My bag of winds will carry you toward home.',
    success: 'Water and medicine — eighteen. You understand that the whole outweighs its parts.',
    failure: 'You reached for what glitters. Consider combinations, not single gifts.',
  },
  // ── Chapter IV ──
  {
    questionId: 10,
    key: 'orion',
    name: 'Orion',
    title: 'The Cartographer',
    look: { skin: SKIN.light, hair: '#4a3020', hairStyle: 'hood', beard: 'dark', robe: '#2f4a6b', robeDark: '#1f3349', trim: '#d8af63', accessory: 'map' },
    intro: [
      'I chart these waters, captain, and I have charted many wrecks.',
      'Several passages lead toward Ithaca. One looks direct — but looks deceive.',
      'Find the route with the lowest total cost.',
    ],
    locked: 'Storms on every horizon… Speak with me first, captain.',
    done: 'Your chart is true. Cassandra waits near the whirlpool — heed her.',
    success: 'Through B and C — seven. More stops, yet the cheapest passage. Well sailed.',
    failure: 'You trusted how the route looked. Add every leg of the journey.',
  },
  {
    questionId: 11,
    key: 'cassandra',
    name: 'Cassandra',
    title: 'The Sea Oracle',
    look: { skin: SKIN.pale, hair: '#8a2d2d', hairStyle: 'long', beard: 'none', robe: '#5a3a7a', robeDark: '#3e2756', trim: '#e0c477', accessory: 'staff' },
    intro: [
      'I have seen your ship torn on Scylla’s rocks… and I have seen it pass safely. Both futures wait.',
      'Scylla and Charybdis guard two deadly passages.',
      'Compare every interconnected route before you choose.',
    ],
    locked: 'No one listens to my warnings… Find the cartographer first.',
    done: 'The future bends toward home. Athena awaits at the temple.',
    success: 'START, B, D, Ithaca — ten. The cheapest first step was a trap.',
    failure: 'I warned of this. The cheapest-looking first leg is not the cheapest journey.',
  },
  {
    questionId: 12,
    key: 'athena',
    name: 'Athena',
    title: 'Goddess of Wisdom',
    look: { skin: SKIN.pale, hair: '#3a2a1a', hairStyle: 'helmet', beard: 'none', robe: '#e8e0c8', robeDark: '#b9ad8c', trim: '#d8af63', accessory: 'spear', crest: '#2f8190' },
    intro: [
      'Odysseus. You have come far by wit, not by strength.',
      'The shoreline of Ithaca is close. One final network of dangerous routes remains.',
      'Use everything you have learned — evaluate the whole journey.',
    ],
    locked: 'Prove yourself to my oracle and my cartographer first, son of Laertes.',
    done: 'Go home, Odysseus. Penelope waits.',
    success: 'Ten — the true minimum. You did not chase the cheapest first step. Ithaca is yours.',
    failure: 'Even the wise falter. Consider the cumulative cost of every path.',
  },
];

export const NPC_BY_QUESTION: Record<number, NpcDef> = Object.fromEntries(NPCS.map((n) => [n.questionId, n]));
