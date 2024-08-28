import { FC, useContext } from "react";
import { GeneralContext, TestPhase } from "../contexts/general.context";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const TransitionPage: FC = () => {
  const cxt = useContext(GeneralContext);
  const navigate = useNavigate();

  return (
    <>
      {cxt?.testPhase === TestPhase.MEMORY_RECALL_IMMEDIATE && <h2>Memory Recall Placeholder</h2>}
      {cxt?.testPhase === TestPhase.VISUAL_PAIRS_MEMORIZE && <h2>Visual Pairs Memorize Placeholder</h2>}
      {cxt?.testPhase === TestPhase.VISUAL_PAIRS_RECALL && <h2>Visual Pairs Recall Placeholder</h2>}
      {cxt?.testPhase === TestPhase.DIGIT_SYMBOL_MATCHING && <h2>Digit Symbol Coding Placeholder</h2>}
      {cxt?.testPhase === TestPhase.CHOICE_REACTION_TIME && <h2>Choice Reaction Time Placeholder</h2>}
      {cxt?.testPhase === TestPhase.SPACIAL_MEMORY && <h2>Spacial Memory Placeholder</h2>}
      <Button variant="contained" onClick={() => navigate("/assessments")}>
        Continue
      </Button>
    </>
  );
};
