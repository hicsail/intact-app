import { FC, useContext, useState } from "react";
import { GeneralContext, TestPhase } from "../contexts/general.context";
import { ProgressPage } from "./ProgressPage";
import { Box, Button, IconButton } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { playAudioFromS3 } from "../utils/awsUtils";
import { TestContext } from "../contexts/test.context";

interface TransitionProps {
  handleTransition: () => void;
}

export const Transition: FC<TransitionProps> = ({ handleTransition }) => {
  const cxt = useContext(GeneralContext);
  const testCxt = useContext(TestContext);

  const [showPlayButton, setShowPlayButton] = useState(true);
  const [disableContinue, setDisableContinue] = useState(true);

  const playAudioSequence = async (setup: string[]) => {
    setup.forEach((item, index) => {
      setTimeout(() => {
        playAudioFromS3(`memory-recall/${item.toLocaleLowerCase()}`);
      }, index * 2000 + 4000);
    });
  };

  const playHandler = () => {
    setShowPlayButton(false);
    playAudioFromS3("memory-recall/instructions");
    playAudioSequence(testCxt!.memoryRecallSetup).then(() => {
      setTimeout(() => setDisableContinue(false), 12500);
    });
  };

  return (
    <>
      {cxt?.testPhase === TestPhase.MEMORY_RECALL_IMMEDIATE && <ProgressPage id={1} onClick={handleTransition}/>}
      {cxt?.testPhase === TestPhase.VISUAL_PAIRS_MEMORIZE && <ProgressPage id={2} onClick={handleTransition}/>}
      {cxt?.testPhase === TestPhase.VISUAL_PAIRS_RECALL && <ProgressPage id={3} onClick={handleTransition}/>}
      {cxt?.testPhase === TestPhase.DIGIT_SYMBOL_MATCHING && <ProgressPage id={4} onClick={handleTransition}/>}
      {cxt?.testPhase === TestPhase.CHOICE_REACTION_TIME && <ProgressPage id={5} onClick={handleTransition}/>}
      {cxt?.testPhase === TestPhase.SPACIAL_MEMORY && <ProgressPage id={6} onClick={handleTransition}/>}

      <Box display="flex" flexDirection="column" gap={2}>
        {showPlayButton && cxt?.testPhase === TestPhase.MEMORY_RECALL_IMMEDIATE && (
          <IconButton onClick={playHandler}>
            <PlayCircleIcon sx={{ fontSize: 70 }} />
          </IconButton>
        )}
        <Button
          variant="contained"
          onClick={handleTransition}
          disabled={disableContinue && cxt?.testPhase === TestPhase.MEMORY_RECALL_IMMEDIATE}
        >
          Continue
        </Button>
      </Box>
    </>
  );
};