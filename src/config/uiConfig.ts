/**
 * @property buttonHeight - Height of the button in pixels
 * @property fontSize - Font size of the button text in pixels
 * @property numpadBg - Background color of the numpad
 * @property buttonBg - Background color of the button
 * @property buttonClickedBg - Background color of the button when clicked
 * @property textColor - Text color of the button
 */
export const digitSymbolConfig = {
  buttonHeight: 64,
  fontSize: 32,
  numpadBg: "#f0f0f0",
  buttonBg: "#d3d3d3",
  buttonClickedBg: "#a9a9a9",
  textColor: "black",
};

/**
 * @property cellSize - Size of each cell in pixels
 */
export const spacialMemoryConfig = {
  cellSize: 80,
};

/**
 * @property buttonColor - Button color configuration
 * @property textColor - Text color configuration
 */
export const memoryRecallConfig = {
  buttonColor: {
    unselected: "#839d97",
    correct: "#1bb394",
    incorrect: "#d14b31",
  },
  textColor: {
    unselected: "#eeeeee",
    correct: "#ffffff",
    incorrect: "#ffffff",
  },
};

/**
 * @property choiceColor - Color configuration for the choices
 * @property buttonColor - Color configuration for the buttons
 */
export const choiceReactionTimeConfig = {
  choiceColor: {
    color0: "#ffff00",
    color1: "#02ffff",
  },
  buttonColor: "#e7e7e7",
};

/**
 * @property imageHeight - Height of the image in pixels
 */
export const visualPairsConfig = {
  imageHeight: 170,
};
