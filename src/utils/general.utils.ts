import { TestPhase } from "../contexts/general.context";
import { generalConfig as testConfig } from "../config/test.config";

export const validateStudyId = async (id: string | undefined) => {
  if (!id || id === "undefined") {
    return false;
  }

  const response = await fetch(`${import.meta.env.VITE_VALIDATE_ENDPOINT}/${id}`, {
    method: "GET",
  });

  if (response.status !== 200) {
    return false;
  }

  const data = await response.json();
  sessionStorage.setItem("studyType", data.study_type);

  return true;
};

export const getNextTestPhase = (currentPhase: TestPhase) => {
  const currentIndex = testConfig.testOrder.indexOf(currentPhase);
  if (currentIndex === -1) {
    throw new Error("Invalid test phase");
  }

  return testConfig.testOrder[currentIndex + 1];
};

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

export const randomSelectFromList = <T>(array: T[], x: number): T[] => {
  if (x > array.length) {
    throw new Error("x cannot be greater than the length of the array.");
  }

  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray.slice(0, x);
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
