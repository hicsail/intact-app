import { FC, useContext } from "react";
import { GeneralContext, TestPhase } from "../contexts/general.context";
import { Button } from "@mui/material";
import { ProgressPage } from "./ProgressPage";

interface TransitionProps {
  handleTransition: () => void;
}

export const Transition: FC<TransitionProps> = ({ handleTransition }) => {
  const cxt = useContext(GeneralContext);

  return (
    <>
      {cxt?.testPhase === TestPhase.MEMORY_RECALL_IMMEDIATE && <ProgressPage id={1} onClick={handleTransition}/>}
      {cxt?.testPhase === TestPhase.VISUAL_PAIRS_MEMORIZE && <ProgressPage id={2} onClick={handleTransition}/>}
      {cxt?.testPhase === TestPhase.VISUAL_PAIRS_RECALL && <ProgressPage id={3} onClick={handleTransition}/>}
      {cxt?.testPhase === TestPhase.DIGIT_SYMBOL_MATCHING && <ProgressPage id={4} onClick={handleTransition}/>}
      {cxt?.testPhase === TestPhase.CHOICE_REACTION_TIME && <ProgressPage id={5} onClick={handleTransition}/>}
      {cxt?.testPhase === TestPhase.SPACIAL_MEMORY && <ProgressPage id={6} onClick={handleTransition}/>}
      <Button variant="contained" onClick={handleTransition}>
        Continue
      </Button>
    </>
  );
};