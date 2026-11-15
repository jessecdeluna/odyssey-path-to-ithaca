import type { Question, QuizQuestion } from '../game/types';

/** Four islands, three lessons each. Debugging only uses Python taught on islands II–III. */
export const QUESTIONS: QuizQuestion[] = [
  {
    id: 1, chapterId: 1, kind: 'quiz', difficulty: 'Easy', topic: 'Computer terminology',
    title: 'What is RAM?',
    story: ['Thales welcomes the crew to the Lotus island with a lesson about a computer’s working memory.'],
    teaching: 'Hardware means the physical parts of a computer. Some parts hold information temporarily while programs run; others keep files after shutdown.',
    objectiveText: 'What does RAM do in a computer?',
    options: [
      { id: 'A', label: 'Stores all your files permanently', explanation: 'Permanent file storage is the job of a drive, such as an SSD.' },
      { id: 'B', label: 'Temporarily holds data used by running programs', explanation: 'RAM is Random Access Memory: fast, temporary working memory.' },
      { id: 'C', label: 'Displays images on the screen', explanation: 'A monitor displays images; RAM provides working memory.' },
    ], correctOptionId: 'B',
    lesson: {
      hint: 'Think of a desk used while working, rather than a cupboard that stores things long term.',
      explanation: 'RAM (Random Access Memory) temporarily holds data that active programs need. Its contents are normally lost when the computer powers off.',
      principle: 'RAM is temporary working memory; storage keeps saved files.',
      nextTime: 'Ask whether the information must remain after the computer turns off.',
    },
  },
  {
    id: 2, chapterId: 1, kind: 'quiz', difficulty: 'Easy', topic: 'Computer terminology',
    title: 'Meet the CPU', story: ['Eryon wants to know which part carries out a computer’s instructions.'],
    teaching: 'A computer uses instructions to do work. Its processor performs calculations and follows those instructions, while memory holds the data it needs.',
    objectiveText: 'What is the main job of the CPU (Central Processing Unit)?',
    options: [
      { id: 'A', label: 'Execute instructions and perform calculations', explanation: 'The CPU is the processor that carries out program instructions.' },
      { id: 'B', label: 'Supply electrical power', explanation: 'The power supply provides electricity.' },
      { id: 'C', label: 'Keep files permanently', explanation: 'An SSD or hard drive stores saved files.' },
    ], correctOptionId: 'A',
    lesson: {
      hint: 'CPU is another name for the processor.',
      explanation: 'The CPU executes instructions, including calculations and comparisons. It works with RAM to run your programs.',
      principle: 'The CPU processes instructions; RAM holds active data.',
      nextTime: 'Separate the roles of processing, memory, and storage.',
    },
  },
  {
    id: 3, chapterId: 1, kind: 'quiz', difficulty: 'Easy', topic: 'Hardware and software',
    title: 'Hardware or Software?', story: ['Melion sorts the ship’s equipment and programs before the crew sails.'],
    teaching: 'Hardware is physical equipment you can touch. Software is a set of instructions, such as an app or an operating system. Python lets us write software.',
    objectiveText: 'Which of these is software?',
    options: [
      { id: 'A', label: 'A keyboard', explanation: 'A keyboard is a physical input device: hardware.' },
      { id: 'B', label: 'A monitor', explanation: 'A monitor is physical display hardware.' },
      { id: 'C', label: 'A web browser', explanation: 'A browser is an application: software.' },
    ], correctOptionId: 'C',
    lesson: {
      hint: 'Which option is an application rather than a physical device?',
      explanation: 'A web browser is software. A keyboard and monitor are hardware. Next, you will learn how Python instructions work.',
      principle: 'Hardware is the equipment; software provides instructions.',
      nextTime: 'Think about whether you can touch the item or run it as a program.',
    },
  },
  {
    id: 4, chapterId: 2, kind: 'quiz', difficulty: 'Medium', topic: 'Python variables',
    title: 'Count the Supplies', story: ['In the Cyclops’s cave, Nestor uses Python to track supplies.'],
    teaching: 'A variable is a name for a value. In Python, = assigns a value. Adding an integer (a whole number) to another integer gives a numeric total. print() displays a value.',
    code: 'supplies = 3\nsupplies = supplies + 2\nprint(supplies)',
    objectiveText: 'What does this code print?',
    options: [
      { id: 'A', label: '3', explanation: 'The second line updates supplies; it does not stay at 3.' },
      { id: 'B', label: '5', explanation: '3 + 2 is 5, and that value is assigned back to supplies.' },
      { id: 'C', label: '32', explanation: 'These values are integers, so + adds them rather than joining text.' },
    ], correctOptionId: 'B',
    lesson: {
      hint: 'Read the assignment on the second line as: take the old value, add 2, then save the result.',
      explanation: 'supplies starts at 3. The next line calculates 3 + 2 and assigns 5 to supplies, so print(supplies) displays 5.',
      principle: 'Assignment updates a variable with the value of the expression on the right.',
      nextTime: 'Track each variable’s value one line at a time.',
    },
  },
  {
    id: 5, chapterId: 2, kind: 'quiz', difficulty: 'Medium', topic: 'Python types',
    title: 'Numbers or Text?', story: ['Damon records the number of water flasks as text.'],
    teaching: 'Quotes make a string (text): "4" is different from the integer 4. int("4") converts that numeric text into an integer so you can do arithmetic.',
    code: 'flasks = "4"\n# We want one more flask.',
    objectiveText: 'Which expression produces the integer 5?',
    options: [
      { id: 'A', label: 'int(flasks) + 1', explanation: 'int(flasks) converts "4" to 4, and 4 + 1 gives 5.' },
      { id: 'B', label: 'flasks + "1"', explanation: 'Adding strings joins the text, producing "41".' },
      { id: 'C', label: 'flasks + 1', explanation: 'Python cannot directly add a string and an integer; this raises TypeError.' },
    ], correctOptionId: 'A',
    lesson: {
      hint: 'Convert the text to a whole number before adding.',
      explanation: 'int(flasks) + 1 evaluates to 5. "4" + "1" joins strings into "41", while "4" + 1 raises a TypeError.',
      principle: 'Check types before arithmetic: numeric text needs conversion.',
      nextTime: 'Look for quotes, and use int() when numeric text must become a whole number.',
    },
  },
  {
    id: 6, chapterId: 2, kind: 'quiz', difficulty: 'Medium', topic: 'Python conditionals',
    title: 'Check the Escape Signal', story: ['Leandros writes a condition to signal when the crew is ready.'],
    teaching: 'An if statement runs its indented block only when its condition is True. == compares values; = assigns a value. A colon starts the block, and indentation groups its instructions.',
    code: 'crew = 3\nif crew == 3:\n    print("Ready")\nelse:\n    print("Wait")',
    objectiveText: 'What does this code print?',
    options: [
      { id: 'A', label: 'Wait', explanation: 'crew == 3 is True, so the else block is skipped.' },
      { id: 'B', label: 'Ready, then Wait', explanation: 'Only one branch of an if/else runs.' },
      { id: 'C', label: 'Ready', explanation: 'crew equals 3, so Python runs the if block.' },
    ], correctOptionId: 'C',
    lesson: {
      hint: 'Check whether crew == 3 is True, then follow just that branch.',
      explanation: 'crew is 3, so crew == 3 is True. Python prints Ready and skips the else block.',
      principle: 'Use == for comparison, and indentation to define a conditional block.',
      nextTime: 'Evaluate the condition first, then trace the branch that actually runs.',
    },
  },
  {
    id: 7, chapterId: 3, kind: 'quiz', difficulty: 'Medium', topic: 'Python lists',
    title: 'Read the Cargo List', story: ['Phaedon keeps the ship’s supplies in a Python list.'],
    teaching: 'A list holds an ordered collection of values. Python indexes start at 0: items[0] is the first item, items[1] is the second. len(items) gives the number of items.',
    code: 'cargo = ["rope", "water", "bread"]\nprint(cargo[1])',
    objectiveText: 'Which item is printed?',
    options: [
      { id: 'A', label: 'rope', explanation: 'rope is at index 0, not index 1.' },
      { id: 'B', label: 'water', explanation: 'water is the second item, at index 1.' },
      { id: 'C', label: 'bread', explanation: 'bread is at index 2.' },
    ], correctOptionId: 'B',
    lesson: {
      hint: 'Label the three positions 0, 1, 2.',
      explanation: 'cargo[1] is water. For a three-item list, the valid nonnegative indexes are 0, 1, and 2; index 3 is out of range.',
      principle: 'For a nonempty list, the last nonnegative index is len(list) - 1.',
      nextTime: 'Start counting list positions at zero.',
    },
  },
  {
    id: 8, chapterId: 3, kind: 'quiz', difficulty: 'Medium', topic: 'Python loops',
    title: 'Count the Wind Gusts', story: ['Lysander uses a loop to count three gusts before sailing.'],
    teaching: 'A for loop repeats its indented block. range(n) produces whole numbers from 0 up to, but not including, n. total = total + 1 increases total by one each time.',
    code: 'total = 0\nfor gust in range(3):\n    total = total + 1\nprint(total)',
    objectiveText: 'What does this code print?',
    options: [
      { id: 'A', label: '3', explanation: 'The loop runs for gust values 0, 1, and 2: three iterations.' },
      { id: 'B', label: '2', explanation: '2 is the last gust value, but total counts all three iterations.' },
      { id: 'C', label: '4', explanation: 'range(3) excludes 3, so the loop runs three times, not four.' },
    ], correctOptionId: 'A',
    lesson: {
      hint: 'List the values from range(3), then count how many times total increases.',
      explanation: 'range(3) produces 0, 1, 2. total increases from 0 to 1 to 2 to 3. The unindented print runs after the loop finishes.',
      principle: 'range(stop) excludes stop; indentation determines what repeats.',
      nextTime: 'Trace every iteration and watch which lines sit inside the loop.',
    },
  },
  {
    id: 9, chapterId: 3, kind: 'quiz', difficulty: 'Medium', topic: 'Python functions',
    title: 'Return a Wind Blessing', story: ['Aeolus turns a small calculation into a reusable function.'],
    teaching: 'def defines a function. A parameter receives the input when you call it. return sends a result back to the caller; print only displays it. A function without a return value gives back None.',
    code: 'def add_wind(speed):\n    return speed + 2\n\nprint(add_wind(3))',
    objectiveText: 'What does this code print?',
    options: [
      { id: 'A', label: '3', explanation: 'The function adds 2 to its input before returning it.' },
      { id: 'B', label: 'None', explanation: 'This function has a return statement, so it returns the calculated value.' },
      { id: 'C', label: '5', explanation: 'speed is 3, so return speed + 2 sends back 5.' },
    ], correctOptionId: 'C',
    lesson: {
      hint: 'Replace speed with the argument 3, then evaluate the return expression.',
      explanation: 'add_wind(3) returns 3 + 2, which is 5. The outer print displays that returned value.',
      principle: 'return provides a reusable result; print displays a value.',
      nextTime: 'Follow the input into the function, then follow the returned value back out.',
    },
  },
  {
    id: 10, chapterId: 4, kind: 'quiz', difficulty: 'Hard', topic: 'Python debugging · list bounds',
    title: 'Spot the Issue: One Step Too Far', story: ['Orion’s short cargo reader crashes. Use the list and loop rules from Aeolus’s island to fix it.'],
    teaching: 'Debugging means comparing intended behavior with what the code actually does. Trace a tiny input, note the first line that fails, and choose the smallest fix.',
    code: 'cargo = ["rope", "water", "bread"]\nfor i in range(len(cargo) + 1):\n    print(cargo[i])',
    expectedBehavior: 'Print rope, water, and bread once each, without an error.',
    objectiveText: 'Can you spot the issue in this Python code? Which change fixes it?',
    options: [
      { id: 'A', label: 'Change the loop to range(len(cargo))', explanation: 'The indexes become 0, 1, 2, so every item is printed safely.' },
      { id: 'B', label: 'Change the loop to range(1, len(cargo))', explanation: 'This skips index 0, so rope is never printed.' },
      { id: 'C', label: 'Change cargo[i] to cargo[0]', explanation: 'This repeatedly prints rope instead of reading each item.' },
    ], correctOptionId: 'A',
    lesson: {
      hint: 'A three-item list ends at index 2. What values does range(4) produce?',
      explanation: 'len(cargo) is 3. range(4) includes index 3, which raises IndexError. Use range(len(cargo)) to visit only indexes 0, 1, and 2.',
      principle: 'Avoid off-by-one errors: range(len(items)) stays within the list’s bounds.',
      nextTime: 'Check the first and last index produced by a loop against the list’s valid indexes.',
    },
  },
  {
    id: 11, chapterId: 4, kind: 'quiz', difficulty: 'Hard', topic: 'Python debugging · indentation',
    title: 'Spot the Issue: A Vanishing Total', story: ['Cassandra’s supply counter returns the wrong result. Trace the assignments and indentation you already learned.'],
    teaching: 'A line inside a loop runs on every iteration. When accumulating a total, think about which values should be set once and which should change repeatedly.',
    code: 'supplies = [2, 3, 4]\ntotal = 0\nfor amount in supplies:\n    total = 0\n    total = total + amount\nprint(total)',
    expectedBehavior: 'Print 9, the sum of all three supply amounts.',
    objectiveText: 'Can you spot the issue in this Python code? Why does it print 4 instead of 9?',
    options: [
      { id: 'A', label: 'The list must start at index 1', explanation: 'This loop reads list values directly; changing indexes would not fix the total.' },
      { id: 'B', label: 'total resets on every iteration; remove the indented total = 0', explanation: 'Keep the initialization before the loop so each amount adds to the running total.' },
      { id: 'C', label: 'Move print(total) inside the loop', explanation: 'This displays partial values but leaves the reset bug in place.' },
    ], correctOptionId: 'B',
    lesson: {
      hint: 'Track total for amounts 2, 3, and 4. Which line erases the previous work?',
      explanation: 'The indented total = 0 discards the previous sum each time. Remove that line and keep total = 0 before the loop: the running totals become 2, 5, and 9.',
      principle: 'Initialize an accumulator once, before the loop that updates it.',
      nextTime: 'Trace a small list and check whether any assignment inside the loop erases earlier results.',
    },
  },
  {
    id: 12, chapterId: 4, kind: 'quiz', difficulty: 'Hard', topic: 'Python debugging · return values',
    title: 'Spot the Issue: The Missing Result', story: ['Athena’s final challenge combines functions and arithmetic. One small fix will let the crew sail home.'],
    teaching: 'A caller can only use the value a function returns. Seeing the right number on screen does not mean the function gave that number back to the caller.',
    code: 'def add_supplies(current, extra):\n    print(current + extra)\n\ntotal = add_supplies(3, 2)\nprint(total + 1)',
    expectedBehavior: 'Store 5 in total, then print 6 on the last line.',
    objectiveText: 'Can you spot the issue in this Python code? Which fix prevents the TypeError?',
    options: [
      { id: 'A', label: 'Change the last line to print(total)', explanation: 'That prints None; the function still does not return the sum.' },
      { id: 'B', label: 'Change the call to add_supplies("3", "2")', explanation: 'Those strings join into "32", and the function still returns None.' },
      { id: 'C', label: 'Replace print(current + extra) with return current + extra', explanation: 'The function returns 5, allowing total + 1 to evaluate to 6.' },
    ], correctOptionId: 'C',
    lesson: {
      hint: 'What does a function return when it only calls print()?',
      explanation: 'The function displays 5 but returns None. Adding 1 to None raises TypeError. Replace the inner print with return current + extra: total becomes 5 and the last line prints 6.',
      principle: 'Use return when the caller needs a result for later calculations.',
      nextTime: 'Check the returned value, not just what appears on screen.',
    },
  },
];

export function getQuestion(id: number): Question {
  const question = QUESTIONS.find((q) => q.id === id);
  if (!question) throw new Error(`Unknown question ${id}`);
  return question;
}
