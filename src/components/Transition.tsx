import { FC, useContext } from "react";
import { GeneralContext, TestPhase } from "../contexts/general.context";
import { ProgressTracker } from "./ProgressTracker";
import { Button } from "@mui/material";

interface TransitionProps {
  handleTransition: () => void;
}

export const Transition: FC<TransitionProps> = ({ handleTransition }) => {
  const cxt = useContext(GeneralContext);

  return (
    <>
      {cxt?.testPhase === TestPhase.MEMORY_RECALL_IMMEDIATE && <ProgressTracker id={0} />}
      {cxt?.testPhase === TestPhase.VISUAL_PAIRS_MEMORIZE && <ProgressTracker id={1} />}
      {cxt?.testPhase === TestPhase.CHOICE_REACTION_TIME && <ProgressTracker id={2} />}
      {cxt?.testPhase === TestPhase.VISUAL_PAIRS_RECALL && <ProgressTracker id={3} />}
      {cxt?.testPhase === TestPhase.DIGIT_SYMBOL_MATCHING && <ProgressTracker id={4} />}
      {cxt?.testPhase === TestPhase.SPATIAL_MEMORY && <ProgressTracker id={5} />}

      <Button variant="contained" onClick={handleTransition}>
        Continue
      </Button>
    </>
  );
};
