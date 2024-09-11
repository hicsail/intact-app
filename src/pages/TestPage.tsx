import { FC, useContext, useEffect, useState } from "react";
import { SpacialMemoryMain } from "../components/SpacialMemoryMain";
import { ChoiceReactionTimeMain } from "../components/ChoiceReactionTimeMain";
import { randomSelectFromList } from "../utils/generalUtils";
import { DigitSymbolMatchingMain } from "../components/DigitSymbolMatchingMain";
import { GeneralContext, Stage, TestPhase } from "../contexts/general.context";
import { VisualPairsMemorize } from "../components/VisualPairsMemorize";
import { TestContext } from "../contexts/test.context";
import { VisualPairsRecall } from "../components/VisualPairsRecall";
import { MemoryRecallMain } from "../components/MemoryRecallMain";
import { Transition } from "../components/Transition";
import { SoundCheck } from "../components/SoundCheck";
import { GeneralDirection } from "../components/GeneralDirection";
import { useNavigate, useParams } from "react-router-dom";

export const TestPage: FC = () => {
  const { participantId } = useParams<{ participantId: string }>();

  // Routing hooks
  const cxt = useContext(GeneralContext);

  // Test setup
  const testCxt = useContext(TestContext);

  const navigate = useNavigate();

  const [digitSymbolMatchingIdx, setDigitSymbolMatchingIdx] = useState(0);
  const [choiceReactionTimeIdx, setChoiceReactionTimeIdx] = useState(0);
  const [spacialMemoryIdx, setSpacialMemoryIdx] = useState(0);
  const [visualPairsIdx, setVisualPairsIdx] = useState(0);

  useEffect(() => {
    const localParticipantId = sessionStorage.getItem("participantId");
    if (!localParticipantId || !participantId) {
      navigate(`/${participantId}`);
      return;
    }

    if (!sessionStorage.getItem("testPhase") || !sessionStorage.getItem("stage")) {
      sessionStorage.setItem("testPhase", String(TestPhase.MEMORY_RECALL_IMMEDIATE));
      sessionStorage.setItem("stage", String(Stage.GENERAL_DIRECTION));
      sessionStorage.setItem("questionNumber", "0");
      cxt!.setTestPhase(TestPhase.MEMORY_RECALL_IMMEDIATE);
      cxt!.setStage(Stage.GENERAL_DIRECTION);
    } else {
      cxt!.setTestPhase(Number(sessionStorage.getItem("testPhase")) as TestPhase);
      cxt!.setStage(Number(sessionStorage.getItem("stage")) as Stage);

      switch (Number(sessionStorage.getItem("testPhase"))) {
        case TestPhase.DIGIT_SYMBOL_MATCHING:
          setDigitSymbolMatchingIdx(Number(sessionStorage.getItem("questionNumber")));
          break;
        case TestPhase.CHOICE_REACTION_TIME:
          setChoiceReactionTimeIdx(Number(sessionStorage.getItem("questionNumber")));
          break;
        case TestPhase.SPACIAL_MEMORY:
          setSpacialMemoryIdx(Number(sessionStorage.getItem("questionNumber")));
          break;
        case TestPhase.VISUAL_PAIRS_RECALL:
          setVisualPairsIdx(Number(sessionStorage.getItem("questionNumber")));
          break;
        default:
          break;
      }
    }
  }, []);

  // Transition from Memory Recall Test
  const memoryRecallSubmitHandler = (result: boolean) => {
    console.log(result);
    if (cxt!.testPhase !== TestPhase.MEMORY_RECALL_IMMEDIATE) {
      return;
    }

    sessionStorage.setItem("testPhase", String(TestPhase.VISUAL_PAIRS_MEMORIZE));
    sessionStorage.setItem("stage", String(Stage.TRANSITION));
    cxt!.setTestPhase(TestPhase.VISUAL_PAIRS_MEMORIZE);
    cxt!.setStage(Stage.TRANSITION);
  };

  // Transition from Digit Symbol Matching Test
  const digitSymbolMatchingSubmitHandler = (result: boolean) => {
    console.log(result);
    if (cxt!.testPhase !== TestPhase.DIGIT_SYMBOL_MATCHING) {
      return;
    }

    if (digitSymbolMatchingIdx + 1 >= testCxt!.digitSymbolMatchingSetup.length) {
      sessionStorage.setItem("testPhase", String(TestPhase.SPACIAL_MEMORY));
      sessionStorage.setItem("stage", String(Stage.TRANSITION));
      sessionStorage.setItem("questionNumber", "0");
      cxt!.setTestPhase(TestPhase.SPACIAL_MEMORY);
      cxt!.setStage(Stage.TRANSITION);
    } else {
      sessionStorage.setItem("questionNumber", String(digitSymbolMatchingIdx + 1));
      setDigitSymbolMatchingIdx((idx) => idx + 1);
    }
  };

  // Transition from Choice Reaction Time Test
  const choiceReactionTimeSubmitHandler = (result: boolean) => {
    console.log(result);
    if (cxt!.testPhase !== TestPhase.CHOICE_REACTION_TIME) {
      return;
    }

    if (choiceReactionTimeIdx + 1 >= testCxt!.choiceReactionTimeSetup.length) {
      sessionStorage.setItem("testPhase", String(TestPhase.VISUAL_PAIRS_RECALL));
      sessionStorage.setItem("stage", String(Stage.TRANSITION));
      sessionStorage.setItem("questionNumber", "0");
      cxt!.setTestPhase(TestPhase.VISUAL_PAIRS_RECALL);
      cxt!.setStage(Stage.TRANSITION);
    } else {
      sessionStorage.setItem("questionNumber", String(choiceReactionTimeIdx + 1));
      setChoiceReactionTimeIdx((idx) => idx + 1);
    }
  };

  // Transition from Spacial Memory Test
  const spacialMemorySubmitHandler = (result: boolean) => {
    console.log(result);
    if (cxt!.testPhase !== TestPhase.SPACIAL_MEMORY) {
      return;
    }

    if (spacialMemoryIdx + 1 >= testCxt!.spacialMemorySetup.length) {
      sessionStorage.setItem("testPhase", String(TestPhase.MEMORY_RECALL_DELAYED));
      sessionStorage.setItem("stage", String(Stage.TRANSITION));
      sessionStorage.setItem("questionNumber", "0");
      cxt!.setTestPhase(TestPhase.MEMORY_RECALL_DELAYED);
      cxt!.setStage(Stage.TRANSITION);
    } else {
      sessionStorage.setItem("questionNumber", String(spacialMemoryIdx + 1));
      setSpacialMemoryIdx((idx) => idx + 1);
    }
  };

  // Transition from Visual Paired Associates Test - Memorize
  const visualPairsTransitionHandler = () => {
    sessionStorage.setItem("testPhase", String(TestPhase.CHOICE_REACTION_TIME));
    sessionStorage.setItem("stage", String(Stage.TRANSITION));
    cxt!.setTestPhase(TestPhase.CHOICE_REACTION_TIME);
    cxt!.setStage(Stage.TRANSITION);
  };

  // Transition from Visual Paired Associates Test - Recall
  const visualPairsSubmitHandler = (result: boolean) => {
    console.log(result);
    if (cxt!.testPhase !== TestPhase.VISUAL_PAIRS_RECALL) {
      return;
    }

    if (visualPairsIdx + 1 >= testCxt!.visualPairSetupImageList.length) {
      sessionStorage.setItem("testPhase", String(TestPhase.DIGIT_SYMBOL_MATCHING));
      sessionStorage.setItem("stage", String(Stage.TRANSITION));
      sessionStorage.setItem("questionNumber", "0");
      cxt!.setTestPhase(TestPhase.DIGIT_SYMBOL_MATCHING);
      cxt!.setStage(Stage.TRANSITION);
    } else {
      sessionStorage.setItem("questionNumber", String(visualPairsIdx + 1));
      setVisualPairsIdx((idx) => idx + 1);
    }
  };

  const TestComponent: FC = () => (
    <>
      {cxt?.testPhase === TestPhase.MEMORY_RECALL_IMMEDIATE && (
        <MemoryRecallMain selected={testCxt!.memoryRecallSetup} handleSubmit={memoryRecallSubmitHandler} />
      )}
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
      {cxt?.testPhase === TestPhase.DIGIT_SYMBOL_MATCHING && (
        <DigitSymbolMatchingMain
          correctIndex={testCxt!.digitSymbolMatchingSetup[digitSymbolMatchingIdx]}
          handleSubmit={digitSymbolMatchingSubmitHandler}
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
      {cxt?.testPhase === TestPhase.MEMORY_RECALL_DELAYED && (
        <MemoryRecallMain selected={testCxt!.memoryRecallSetup} handleSubmit={memoryRecallSubmitHandler} />
      )}
    </>
  );

  return (
    <>
      {cxt?.stage === Stage.GENERAL_DIRECTION && <GeneralDirection />}
      {cxt?.stage === Stage.SOUND_CHECK && <SoundCheck />}
      {cxt?.stage === Stage.TRANSITION && <Transition handleTransition={() => cxt!.setStage(Stage.TEST)} />}
      {cxt?.stage === Stage.TEST && <TestComponent />}
    </>
  );
};
