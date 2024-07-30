export const shuffleList: <T>(array: T[]) => T[] = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
};

export const randomSelectFromList: <T>(array: T[]) => T = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};
