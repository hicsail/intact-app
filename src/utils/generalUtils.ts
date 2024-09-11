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

export const randomSelectFromNumberRange = (
  min: number,
  max: number,
  num: number,
  allowRepeat: boolean,
  excluding?: number[]
) => {
  const result: number[] = [];
  const range = max - min + 1;

  if (allowRepeat) {
    for (let i = 0; i < num; i++) {
      result.push(Math.floor(Math.random() * range) + min);
    }
  } else {
    const availableNumbers = Array.from({ length: range }, (_, index) => index + min).filter(
      (number) => !excluding?.includes(number)
    );

    if (availableNumbers.length < num) {
      throw new Error("Not enough available numbers in the range");
    }

    for (let i = 0; i < num; i++) {
      const randomIndex = Math.floor(Math.random() * availableNumbers.length);
      result.push(availableNumbers[randomIndex]);
      availableNumbers.splice(randomIndex, 1);
    }
  }

  return result;
};
