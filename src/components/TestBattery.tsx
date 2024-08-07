import { FC, useState } from "react";
import { SpacialMemoryMain } from "./SpacialMemoryMain";
import { generalConfig } from "../config/testConfig";
import { ChoiceReactionTimeMain } from "./ChoiceReactionTimeMain";
import { randomSelectFromList } from "../utils/generalUtils";

enum TestPhase {
  CHOICE_REACTION_TIME = "CHOICE_REACTION_TIME",
  SPACIAL_MEMORY = "SPACIAL_MEMORY",
  MEMORY_RECALL = "MEMORY_RECALL",
  DIGIT_SYMBOL_CODING = "DIGIT_SYMBOL_CODING",
}

export const TestBattery: FC = () => {
  const choiceReactionTimeSetup: (0 | 1 | 2)[] = Array.from(
    { length: generalConfig.choiceReactionTime },
    () => Math.floor(Math.random() * 3) as 0 | 1 | 2
  );
  const spacialMemorySetup: number[] = generalConfig.spacialMemory;

  const [testPhase, setTestPhase] = useState(TestPhase.CHOICE_REACTION_TIME);
  const [choiceReactionTimeIdx, setChoiceReactionTimeIdx] = useState(0);
  const [spacialMemoryIdx, setSpacialMemoryIdx] = useState(0);

  const choiceReactionTimeSubmitHandler = (result: boolean) => {
    console.log(result);
    if (testPhase !== TestPhase.CHOICE_REACTION_TIME) {
      return;
    }

    if (choiceReactionTimeIdx + 1 >= choiceReactionTimeSetup.length) {
      setTestPhase(TestPhase.SPACIAL_MEMORY);
    } else {
      setChoiceReactionTimeIdx((idx) => idx + 1);
    }
  };

  const spacialMemorySubmitHandler = (result: boolean) => {
    console.log(result);
    if (testPhase !== TestPhase.SPACIAL_MEMORY) {
      return;
    }

    if (spacialMemoryIdx + 1 >= spacialMemorySetup.length) {
      setTestPhase(TestPhase.MEMORY_RECALL);
    } else {
      setSpacialMemoryIdx((idx) => idx + 1);
    }
  };

  return (
    <>
      {testPhase === TestPhase.CHOICE_REACTION_TIME && (
        <ChoiceReactionTimeMain
          correctIndex={choiceReactionTimeSetup[choiceReactionTimeIdx]}
          correctSymbol={randomSelectFromList(["<", ">"])}
          handleSubmit={choiceReactionTimeSubmitHandler}
        />
      )}
      {testPhase === TestPhase.SPACIAL_MEMORY && (
        <SpacialMemoryMain numNodes={spacialMemorySetup[spacialMemoryIdx]} handleSubmit={spacialMemorySubmitHandler} />
      )}
    </>
  );
};
