import { FC, useContext, useEffect } from "react";
import { SpacialMemoryMain } from "../components/SpacialMemoryMain";
import { ChoiceReactionTimeMain } from "../components/ChoiceReactionTimeMain";
import { DigitSymbolMatchingMain } from "../components/DigitSymbolMatchingMain";
import { GeneralContext, Stage, TestPhase } from "../contexts/general.context";
import { VisualPairsMemorize } from "../components/VisualPairsMemorize";
import { VisualPairsRecall } from "../components/VisualPairsRecall";
import { MemoryRecallMain } from "../components/MemoryRecallMain";
import { Transition } from "../components/Transition";
import { SoundCheck } from "../components/SoundCheck";
import { GeneralDirection } from "../components/GeneralDirection";
import { useNavigate, useParams } from "react-router-dom";
import { generalConfig } from "../config/test.config";

export const TestPage: FC = () => {
  const { participantId } = useParams<{ participantId: string }>();

  // Routing hooks
  const cxt = useContext(GeneralContext);

  const navigate = useNavigate();

  useEffect(() => {
    const localParticipantId = sessionStorage.getItem("participantId");
    if (!localParticipantId || !participantId) {
      navigate(`/${participantId}`);
      return;
    }

    if (!sessionStorage.getItem("testPhase") || !sessionStorage.getItem("stage")) {
      sessionStorage.setItem("testPhase", String(generalConfig.testOrder[0]));
      sessionStorage.setItem("stage", String(Stage.GENERAL_DIRECTION));
      sessionStorage.setItem("questionNumber", "0");
      cxt!.setTestPhase(generalConfig.testOrder[0]);
      cxt!.setStage(Stage.GENERAL_DIRECTION);
    } else {
      cxt!.setTestPhase(Number(sessionStorage.getItem("testPhase")) as TestPhase);
      cxt!.setStage(Number(sessionStorage.getItem("stage")) as Stage);
    }
  }, []);

  const testPhaseTransitionHandler = (target: TestPhase) => {
    sessionStorage.setItem("testPhase", String(target));
    sessionStorage.setItem("stage", String(Stage.TRANSITION));
    sessionStorage.setItem("questionNumber", "0");
    cxt!.setTestPhase(target);
    cxt!.setStage(Stage.TRANSITION);
  };

  const TestComponent: FC = () => (
    <>
      {cxt?.testPhase === TestPhase.MEMORY_RECALL_IMMEDIATE && (
        <MemoryRecallMain phase={TestPhase.MEMORY_RECALL_IMMEDIATE} toTestPhase={testPhaseTransitionHandler} />
      )}
      {cxt?.testPhase === TestPhase.VISUAL_PAIRS_MEMORIZE && (
        <VisualPairsMemorize toTestPhase={testPhaseTransitionHandler} />
      )}
      {cxt?.testPhase === TestPhase.VISUAL_PAIRS_RECALL && (
        <VisualPairsRecall toTestPhase={testPhaseTransitionHandler} />
      )}
      {cxt?.testPhase === TestPhase.DIGIT_SYMBOL_MATCHING && (
        <DigitSymbolMatchingMain toTestPhase={testPhaseTransitionHandler} />
      )}
      {cxt?.testPhase === TestPhase.CHOICE_REACTION_TIME && (
        <ChoiceReactionTimeMain toTestPhase={testPhaseTransitionHandler} />
      )}
      {cxt?.testPhase === TestPhase.SPACIAL_MEMORY && <SpacialMemoryMain toTestPhase={testPhaseTransitionHandler} />}
      {cxt?.testPhase === TestPhase.MEMORY_RECALL_DELAYED && (
        <MemoryRecallMain phase={TestPhase.MEMORY_RECALL_DELAYED} toTestPhase={testPhaseTransitionHandler} />
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
