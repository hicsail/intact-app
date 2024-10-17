import { FC, useContext, useEffect } from "react";
import { SpatialMemoryMain } from "../components/tests/SpatialMemoryMain";
import { ChoiceReactionTimeMain } from "../components/tests/ChoiceReactionTimeMain";
import { DigitSymbolMatchingMain } from "../components/tests/DigitSymbolMatchingMain";
import { GeneralContext, Stage, TestPhase } from "../contexts/general.context";
import { VisualPairsMemorize } from "../components/tests/VisualPairsMemorize";
import { VisualPairsRecall } from "../components/tests/VisualPairsRecall";
import { MemoryRecallMain } from "../components/tests/MemoryRecallMain";
import { Transition } from "../components/Transition";
import { SoundCheck } from "../components/SoundCheck";
import { GeneralDirection } from "../components/GeneralDirection";
import { useNavigate, useParams } from "react-router-dom";
import { generalConfig } from "../config/test.config";
import { Ending } from "../components/Ending";

export const TestPage: FC = () => {
  const { studyId } = useParams<{ studyId: string }>();

  // Routing hooks
  const cxt = useContext(GeneralContext);

  const navigate = useNavigate();

  useEffect(() => {
    const localStudyId = sessionStorage.getItem("studyId");
    if (!localStudyId || !studyId) {
      navigate(`/${studyId}`);
    }

    if (!sessionStorage.getItem("testPhase") || !sessionStorage.getItem("stage")) {
      sessionStorage.setItem("testPhase", String(generalConfig.testOrder[0]));
      sessionStorage.setItem("stage", String(Stage.SOUND_CHECK));
      sessionStorage.setItem("questionNumber", "0");
      cxt!.setTestPhase(generalConfig.testOrder[0]);
      cxt!.setStage(Stage.SOUND_CHECK);
    } else {
      cxt!.setTestPhase(Number(sessionStorage.getItem("testPhase")) as TestPhase);
      cxt!.setStage(Number(sessionStorage.getItem("stage")) as Stage);
    }
  }, []);

  const testPhaseTransitionHandler = (target: TestPhase, sendRequest: boolean = true) => {
    if (sendRequest) {
      submitResults();
    }

    sessionStorage.setItem("results", "[]");
    sessionStorage.setItem("testPhase", String(target));
    sessionStorage.setItem("questionNumber", "0");

    if (target === TestPhase.FINISHED) {
      sessionStorage.setItem("stage", String(Stage.ENDING));
      cxt!.setTestPhase(target);
      cxt!.setStage(Stage.ENDING);

      return;
    }

    sessionStorage.setItem("stage", String(Stage.TRANSITION));

    cxt!.setTestPhase(target);
    cxt!.setStage(Stage.TRANSITION);
  };

  const transitionToTestHandler = () => {
    sessionStorage.setItem("stage", String(Stage.TEST));
    cxt!.setStage(Stage.TEST);

    const startTime = new Date().toISOString();
    sessionStorage.setItem("startTime", startTime);
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
      {cxt?.testPhase === TestPhase.SPATIAL_MEMORY && <SpatialMemoryMain toTestPhase={testPhaseTransitionHandler} />}
      {cxt?.testPhase === TestPhase.MEMORY_RECALL_DELAYED && (
        <MemoryRecallMain phase={TestPhase.MEMORY_RECALL_DELAYED} toTestPhase={testPhaseTransitionHandler} />
      )}
    </>
  );

  return (
    <>
      {cxt?.stage === Stage.SOUND_CHECK && <SoundCheck />}
      {cxt?.stage === Stage.GENERAL_DIRECTION && <GeneralDirection />}
      {cxt?.stage === Stage.TRANSITION && <Transition handleTransition={transitionToTestHandler} />}
      {cxt?.stage === Stage.TEST && <TestComponent />}
      {cxt?.stage === Stage.ENDING && <Ending />}
    </>
  );
};

const submitResults = async () => {
  const timeStarted = sessionStorage.getItem("startTime");
  const results = sessionStorage.getItem("results");
  if (!timeStarted || !results) {
    throw new Error("Started time or results not found");
  }

  const timeElapsed = new Date().getTime() - new Date(timeStarted).getTime();
  const body = {
    study_id: sessionStorage.getItem("studyId"),
    time_started: timeStarted,
    time_elapsed_milliseconds: timeElapsed,
    device_info: navigator.userAgent,
    notes: "",
    result: JSON.parse(results),
  };

  // send post request to server
  const response = await fetch(import.meta.env.VITE_TEST_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (response.status !== 200) {
    const erroeMessage = await response.text();
    console.error(erroeMessage);
    throw new Error("Failed to submit results");
  }
};
