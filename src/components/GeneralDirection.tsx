import { FC, useContext } from "react";
import { Button } from "@mui/material";
import { GeneralContext, Stage } from "../contexts/general.context";

export const GeneralDirection: FC = () => {
  const cxt = useContext(GeneralContext);

  const continueButtonHandler = () => {
    cxt?.setStage(Stage.SOUND_CHECK);
  };

  return (
    <>
      <h2>General Direction Placeholder</h2>
      <Button variant="contained" onClick={continueButtonHandler}>
        Continue
      </Button>
    </>
  );
};
