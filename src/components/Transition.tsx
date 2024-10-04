import { FC, useContext } from "react";
import { GeneralContext } from "../contexts/general.context";
import { generalConfig as testConfig } from "../config/test.config";
import { ProgressTracker } from "./ProgressTracker";
import { Button } from "@mui/material";

interface TransitionProps {
  handleTransition: () => void;
}

export const Transition: FC<TransitionProps> = ({ handleTransition }) => {
  const cxt = useContext(GeneralContext);

  return (
    <>
      <ProgressTracker id={testConfig.testOrder.findIndex((phase) => phase === cxt!.testPhase)} />
      <Button variant="contained" onClick={handleTransition}>
        Continue
      </Button>
    </>
  );
};
