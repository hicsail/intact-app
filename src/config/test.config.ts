import { TestPhase } from "../contexts/general.context";
import symbol1 from "/assets/digit-symbol/1.gif";
import symbol2 from "/assets/digit-symbol/2.gif";
import symbol3 from "/assets/digit-symbol/3.gif";
import symbol4 from "/assets/digit-symbol/4.gif";
import symbol5 from "/assets/digit-symbol/5.gif";
import symbol6 from "/assets/digit-symbol/6.gif";
import symbol7 from "/assets/digit-symbol/7.gif";
import symbol8 from "/assets/digit-symbol/8.gif";
import symbol9 from "/assets/digit-symbol/9.gif";

export const generalConfig = {
  testOrder: [
    TestPhase.MEMORY_RECALL_IMMEDIATE,
    TestPhase.VISUAL_PAIRS_MEMORIZE,
    TestPhase.CHOICE_REACTION_TIME,
    TestPhase.VISUAL_PAIRS_RECALL,
    TestPhase.DIGIT_SYMBOL_MATCHING,
    TestPhase.SPATIAL_MEMORY,
    TestPhase.MEMORY_RECALL_DELAYED,
    TestPhase.FINISHED,
  ],
  digitSymbolAns: [3, 8, 4, 0, 7, 0, 3, 5, 8, 2],
  choiceReactionTimeAns: [2, 2, 1, 1, 0, 2, 1, 0, 1, 0] as (0 | 1 | 2)[],
  visualPairsAns: {
    example: [3, 1],
    lobby: [1, 2],
    underwater: [8, 5],
    temple: [4, 6],
    entry: [2, 7],
  },
  memoryRecallAns: ["Cat", "Crocodile", "Elephant", "Chicken", "Eagle"],
  spatialMemoryAns: [
    [
      [0, 0, 0, 1],
      [0, 0, 0, 1],
      [0, 0, 0, 1],
      [0, 0, 0, 1],
    ],
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [1, 1, 1, 0],
    ],
    [
      [0, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 1, 1],
      [0, 0, 0, 1],
    ],
    [
      [0, 1, 0, 0],
      [1, 0, 1, 0],
      [1, 0, 1, 0],
      [0, 1, 1, 0],
    ],
    [
      [0, 1, 1, 0],
      [1, 0, 0, 0],
      [0, 1, 1, 1],
      [0, 1, 1, 0],
    ],
  ],
};

/**
 * @property rows - Number of rows in the grid
 * @property cols - Number of columns in the grid
 * @property timeToMemorize - Time in milliseconds to memorize the grid
 */
export const spatialMemoryConfig = {
  rows: 4,
  cols: 4,
  timeToMemorize: 5000,
};

/**
 * @property maxSelection - Maximum number of selections allowed
 * @property options - List of options to select from
 */
export const memoryRecallConfig = {
  maxSelection: 5,
  options: [
    "Octopus",
    "Elephant",
    "Cat",
    "Lion",
    "Squirrel",
    "Kangaroo",
    "Crocodile",
    "Pigeon",
    "Horse",
    "Fox",
    "Chicken",
    "Eagle",
    "Shark",
    "Dolphin",
    "Parrot",
    "Lizard",
  ],
};

/**
 * @property buttonColor - Color of the button based on the value
 */
export const digitSymbolConfig = {
  symbolPairs: [
    { image: symbol1, num: 1 },
    { image: symbol2, num: 2 },
    { image: symbol3, num: 3 },
    { image: symbol4, num: 1 },
    { image: symbol5, num: 2 },
    { image: symbol6, num: 3 },
    { image: symbol7, num: 1 },
    { image: symbol8, num: 2 },
    { image: symbol9, num: 3 },
  ],
};

/**
 * @property waitTimeMin - Minimum time in milliseconds to wait for the user to react
 * @property waitTimeMax - Maximum time in milliseconds to wait for the user to react
 */
export const choiceReactionTimeConfig = {
  waitTimeMin: 300,
  waitTimeMax: 1500,
};

/**
 * @property timeToMemorize - Time in milliseconds to memorize the visual pairs
 * @property imageThemes - List of image themes to select from
 */
export const visualPairsConfig = {
  timeToMemorize: 5000,
  imageThemes: [
    "bar",
    "barn",
    "bath",
    "beach",
    "bed",
    "boat",
    "buffet",
    "closet",
    "door",
    "entry",
    "example",
    "field",
    "kitchen",
    "lobby",
    "playground",
    "temple",
    "underwater",
  ],
};
