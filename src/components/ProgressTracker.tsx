import { FC } from "react";
import { Stepper, Typography, Step, StepLabel } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { TestPhase } from "../contexts/general.context";
import { generalConfig as testConfig } from "../config/test.config";

const progressMapping: { [key in TestPhase]?: string } = {
  [TestPhase.MEMORY_RECALL_IMMEDIATE]: "Memory - Immediate Recall",
  [TestPhase.VISUAL_PAIRS_MEMORIZE]: "Visual Paired Associates - Learn",
  [TestPhase.CHOICE_REACTION_TIME]: "Choice Reaction Time",
  [TestPhase.VISUAL_PAIRS_RECALL]: "Visual Paired Associates - Test",
  [TestPhase.DIGIT_SYMBOL_MATCHING]: "Digit Symbol Matching",
  [TestPhase.SPATIAL_MEMORY]: "Spatial Memory",
  [TestPhase.MEMORY_RECALL_DELAYED]: "Memory - Delayed Recall",
};

interface ProgressTrackerProps {
  id: number;
}

export const ProgressTracker: FC<ProgressTrackerProps> = ({ id }) => {
  //check for Dark/Light Mode
  const dark_light_color = () => {
    if (window.matchMedia("(prefers-color-scheme: dark").matches) {
      return "#ffffff";
    } else {
      return "#000000";
    }
  };

  return (
    <Stepper activeStep={id} orientation="vertical" sx={{ padding: 2 }}>
      {testConfig.testOrder
        .filter((item) => item !== TestPhase.FINISHED)
        .map((test: TestPhase, index) => (
          <Step key={index}>
            <StepLabel
              icon={
                id > index ? (
                  <CheckCircleIcon fontSize="inherit" />
                ) : (
                  <RadioButtonUncheckedIcon fontSize="inherit" sx={{ color: id >= index ? "#ffffff" : "#808080" }} />
                )
              }
              sx={{ color: id <= index ? "#ffffff" : "#009933" }}
            >
              <Typography
                variant="subtitle1"
                color={id <= index ? (id === index ? dark_light_color : "#808080") : "#009933"}
                overflow={"visible"}
                sx={{ padding: 0.5 }}
              >
                {progressMapping[test]}
              </Typography>
            </StepLabel>
          </Step>
        ))}
    </Stepper>
  );
};
