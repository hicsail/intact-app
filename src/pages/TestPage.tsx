import { FC, useContext, useEffect, useState } from "react";
import { SpacialMemoryMain } from "../components/SpacialMemoryMain";
import { ChoiceReactionTimeMain } from "../components/ChoiceReactionTimeMain";
import { randomSelectFromList } from "../utils/generalUtils";
import { DigitSymbolCodingMain } from "../components/DigitSymbolCodingMain";
import { GeneralContext } from "../contexts/general.context";
import { VisualPairsMemorize } from "../components/VisualPairsMemorize";
import { TestContext } from "../contexts/test.context";
import { VisualPairsRecall } from "../components/VisualPairsRecall";

enum TestPhase {
  CHOICE_REACTION_TIME = "choice-reaction-time",
  SPACIAL_MEMORY = "spacial-memory",
  MEMORY_RECALL = "memory-recall",
  DIGIT_SYMBOL_CODING = "digit-symbol-coding",
  VISUAL_PAIRS_MEMORIZE = "visual-pairs-memorize",
  VISUAL_PAIRS_RECALL = "visual-pairs-recall",
}

export const TestPage: FC = () => {
  // Routing hooks
  const cxt = useContext(GeneralContext);

  // Test setup
  const testCxt = useContext(TestContext);

  const [digitSymbolCodingIdx, setDigitSymbolCodingIdx] = useState(0);
  const [choiceReactionTimeIdx, setChoiceReactionTimeIdx] = useState(0);
  const [spacialMemoryIdx, setSpacialMemoryIdx] = useState(0);
  const [visualPairsIdx, setVisualPairsIdx] = useState(0);

  useEffect(() => {
    if (!cxt!.testPhase) {
      cxt!.setTestPhase(TestPhase.VISUAL_PAIRS_MEMORIZE);
    }
  }, []);

  const digitSymbolCodingSubmitHandler = (result: boolean) => {
    console.log(result);
    if (cxt!.testPhase !== TestPhase.DIGIT_SYMBOL_CODING) {
      return;
    }

    if (digitSymbolCodingIdx + 1 >= testCxt!.digitSymbolCodingSetup.length) {
      cxt!.setTestPhase(TestPhase.CHOICE_REACTION_TIME);
    } else {
      setDigitSymbolCodingIdx((idx) => idx + 1);
    }
  };
  const choiceReactionTimeSubmitHandler = (result: boolean) => {
    console.log(result);
    if (cxt!.testPhase !== TestPhase.CHOICE_REACTION_TIME) {
      return;
    }

    if (choiceReactionTimeIdx + 1 >= testCxt!.choiceReactionTimeSetup.length) {
      cxt!.setTestPhase(TestPhase.SPACIAL_MEMORY);
    } else {
      setChoiceReactionTimeIdx((idx) => idx + 1);
    }
  };

  const spacialMemorySubmitHandler = (result: boolean) => {
    console.log(result);
    if (cxt!.testPhase !== TestPhase.SPACIAL_MEMORY) {
      return;
    }

    if (spacialMemoryIdx + 1 >= testCxt!.spacialMemorySetup.length) {
      cxt!.setTestPhase(TestPhase.MEMORY_RECALL);
    } else {
      setSpacialMemoryIdx((idx) => idx + 1);
    }
  };

  const visualPairsTransitionHandler = () => {
    cxt!.setTestPhase(TestPhase.VISUAL_PAIRS_RECALL);
    console.log("Transitioning to recall phase");
  };

  const visualPairsSubmitHandler = (result: boolean) => {
    console.log(result);
    if (cxt!.testPhase !== TestPhase.VISUAL_PAIRS_RECALL) {
      return;
    }

    if (visualPairsIdx + 1 >= testCxt!.visualPairSetupImageList.length) {
      cxt!.setTestPhase(TestPhase.DIGIT_SYMBOL_CODING);
    } else {
      setVisualPairsIdx((idx) => idx + 1);
    }
  };

  return (
    <>
      {cxt?.testPhase === TestPhase.VISUAL_PAIRS_MEMORIZE && (
        <VisualPairsMemorize
          imageGroupList={testCxt!.visualPairSetupImageList}
          idxPairs={testCxt!.visualPairSetupIdxPairs}
          handleTransition={visualPairsTransitionHandler}
        />
      )}
      {cxt?.testPhase === TestPhase.VISUAL_PAIRS_RECALL && (
        <VisualPairsRecall
          imageTheme={testCxt!.visualPairSetupImageList[visualPairsIdx]}
          reference={testCxt!.visualPairSetupIdxPairs[visualPairsIdx][0]}
          correct={testCxt!.visualPairSetupIdxPairs[visualPairsIdx][1]}
          handleSubmit={visualPairsSubmitHandler}
        />
      )}
      {cxt?.testPhase === TestPhase.DIGIT_SYMBOL_CODING && (
        <DigitSymbolCodingMain
          correctIndex={testCxt!.digitSymbolCodingSetup[digitSymbolCodingIdx]}
          handleSubmit={digitSymbolCodingSubmitHandler}
        />
      )}
      {cxt?.testPhase === TestPhase.CHOICE_REACTION_TIME && (
        <ChoiceReactionTimeMain
          correctIndex={testCxt!.choiceReactionTimeSetup[choiceReactionTimeIdx]}
          correctSymbol={randomSelectFromList(["<", ">"])}
          handleSubmit={choiceReactionTimeSubmitHandler}
        />
      )}
      {cxt?.testPhase === TestPhase.SPACIAL_MEMORY && (
        <SpacialMemoryMain
          numNodes={testCxt!.spacialMemorySetup[spacialMemoryIdx]}
          handleSubmit={spacialMemorySubmitHandler}
        />
      )}
    </>
  );
};
