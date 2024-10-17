import { FC, useContext, useState } from "react";
import { GeneralContext } from "../contexts/general.context";
import { generalConfig as testConfig } from "../config/test.config";
import { ProgressTracker } from "./ProgressTracker";
import { Box, Button } from "@mui/material";
import { InstructionContainer, instructionComponents } from "./instructions/InstructionContainer";

interface TransitionProps {
  handleTransition: () => void;
}

export const Transition: FC<TransitionProps> = ({ handleTransition }) => {
  const cxt = useContext(GeneralContext);

  const [displayInstructions, setDisplayInstructions] = useState<boolean>(false);

  return (
    <>
      {!displayInstructions && (
        <Box marginX="auto" position="absolute" top="5%" width="85%" sx={{ transform: "translateX(-50%)" }}>
          <ProgressTracker id={testConfig.testOrder.findIndex((phase) => phase === cxt!.testPhase)} />
        </Box>
      )}
      {displayInstructions && <InstructionContainer phase={cxt!.testPhase} handleTransition={handleTransition} />}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          p: 1,
        }}
      >
        {instructionComponents[cxt!.testPhase]!.length <= 0 ? (
          <Button variant="contained" sx={{ fontSize: 18, padding: 1.5 }} fullWidth onClick={handleTransition}>
            Start
          </Button>
        ) : (
          <Button
            variant="contained"
            sx={{ fontSize: 18, padding: 1.5 }}
            fullWidth
            onClick={() => setDisplayInstructions(true)}
          >
            Continue
          </Button>
        )}
      </Box>
    </>
  );
};
