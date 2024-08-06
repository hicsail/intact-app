import { FC, useState } from "react";
import { SpacialMemoryMain } from "./SpacialMemoryMain";
import { generalConfig } from "../config/testConfig";

enum TestPhase {
  SPACIAL_MEMORY = "SPACIAL_MEMORY",
  MEMORY_RECALL = "MEMORY_RECALL",
  DIGIT_SYMBOL_CODING = "DIGIT_SYMBOL_CODING",
  CHOICE_REACTION_TIME = "CHOICE_REACTION_TIME",
}

export const TestBattery: FC = () => {
  const spacialMemorySetup: number[] = generalConfig.spacialMemory;

  const [testPhase, setTestPhase] = useState(TestPhase.SPACIAL_MEMORY);
  const [spacialMemoryIdx, setSpacialMemoryIdx] = useState(0);

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
      {testPhase === TestPhase.SPACIAL_MEMORY && (
        <SpacialMemoryMain numNodes={spacialMemorySetup[spacialMemoryIdx]} handleSubmit={spacialMemorySubmitHandler} />
      )}
    </>
  );
};
