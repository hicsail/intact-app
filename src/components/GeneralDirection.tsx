import { FC, useContext } from "react";
import { Button } from "@mui/material";
import { GeneralContext, Stage } from "../contexts/general.context";
import { playAudioFromS3 } from "../utils/awsUtils";

export const GeneralDirection: FC = () => {
  const cxt = useContext(GeneralContext);

  const continueButtonHandler = () => {
    cxt?.setStage(Stage.SOUND_CHECK);

    setTimeout(() => {
      playAudioFromS3("soundcheck/instructions");
    }, 1000);

    setTimeout(() => {
      playAudioFromS3(`soundcheck/number-${cxt!.soundCheckNumber + 1}`);
    }, 7500);
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
