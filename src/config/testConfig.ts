import symbol1 from "../assets/digit-symbol/1.gif";
import symbol2 from "../assets/digit-symbol/2.gif";
import symbol3 from "../assets/digit-symbol/3.gif";
import symbol4 from "../assets/digit-symbol/4.gif";
import symbol5 from "../assets/digit-symbol/5.gif";
import symbol6 from "../assets/digit-symbol/6.gif";
import symbol7 from "../assets/digit-symbol/7.gif";
import symbol8 from "../assets/digit-symbol/8.gif";
import symbol9 from "../assets/digit-symbol/9.gif";

export const generalConfig = {
  digitSymbolConfig: 5, // Number of questions
  spacialMemory: [4, 5, 6, 7, 8], // Number of nodes in the grid
  choiceReactionTime: 10, // Number of questions
  visualPairs: 3, // Number of questions
};

/**
 * @property rows - Number of rows in the grid
 * @property cols - Number of columns in the grid
 * @property timeToMemorize - Time in milliseconds to memorize the grid
 */
export const spacialMemoryConfig = {
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
