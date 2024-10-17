import { FC, useState } from "react";
import { TestPhase } from "../../contexts/general.context";
import { Box, Button, Divider, Typography } from "@mui/material";
import { vpmInstructions, vprInstructions } from "./VisualPairs";
import { crtInstructions } from "./ChoiceReactionTime";

const titleMapping: { [key in TestPhase]?: string } = {
  [TestPhase.MEMORY_RECALL_IMMEDIATE]: "Memory - Immediate Recall",
  [TestPhase.VISUAL_PAIRS_MEMORIZE]: "Visual Paired Associates - Learn",
  [TestPhase.CHOICE_REACTION_TIME]: "Choice Reaction Time",
  [TestPhase.VISUAL_PAIRS_RECALL]: "Visual Paired Associates - Test",
  [TestPhase.DIGIT_SYMBOL_MATCHING]: "Digit Symbol Matching",
  [TestPhase.SPATIAL_MEMORY]: "Spatial Memory",
  [TestPhase.MEMORY_RECALL_DELAYED]: "Memory - Delayed Recall",
};

export const instructionComponents: { [key in TestPhase]?: JSX.Element[] } = {
  [TestPhase.MEMORY_RECALL_IMMEDIATE]: [],
  [TestPhase.VISUAL_PAIRS_MEMORIZE]: vpmInstructions,
  [TestPhase.CHOICE_REACTION_TIME]: crtInstructions,
  [TestPhase.VISUAL_PAIRS_RECALL]: vprInstructions,
  [TestPhase.DIGIT_SYMBOL_MATCHING]: [],
  [TestPhase.SPATIAL_MEMORY]: [],
  [TestPhase.MEMORY_RECALL_DELAYED]: [],
};

interface InstructionContainerProps {
  phase: TestPhase;
  handleTransition: () => void;
}

export const InstructionContainer: FC<InstructionContainerProps> = ({ phase, handleTransition }) => {
  const [instructionIdx, setInstructionIdx] = useState<number>(0);

  return (
    <>
      <Box marginX="auto" position="absolute" top="10%" width="85%" sx={{ transform: "translateX(-50%)" }}>
        <Typography variant="h5" textAlign="initial" fontWeight="bold" marginBottom={1}>
          {titleMapping[phase]}
        </Typography>
        <Divider />
        {instructionComponents[phase]![instructionIdx]}
      </Box>
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          p: 1,
          zIndex: 100,
        }}
      >
        {instructionIdx + 1 < instructionComponents[phase]!.length ? (
          <Button
            variant="contained"
            color="inherit"
            sx={{ fontSize: 18, padding: 1.5 }}
            fullWidth
            onClick={() => setInstructionIdx((idx) => idx + 1)}
          >
            Tap here to Continue
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            sx={{ fontSize: 18, padding: 1.5 }}
            fullWidth
            onClick={handleTransition}
          >
            Start the Test
          </Button>
        )}
      </Box>
    </>
  );
};
