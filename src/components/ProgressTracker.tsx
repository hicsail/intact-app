import { FC, useEffect, useState } from "react";
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
  const [isDarkMode, setIsDarkMode] = useState<boolean>(window.matchMedia("(prefers-color-scheme: dark)").matches);

  const primaryColor = isDarkMode ? "#ffffff" : "#000000";

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const changeHandler = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    mediaQuery.addEventListener("change", changeHandler);

    return () => {
      mediaQuery.removeEventListener("change", changeHandler);
    };
  }, []);

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
                  <RadioButtonUncheckedIcon
                    fontSize="inherit"
                    sx={{ color: id === index ? primaryColor : "#808080" }}
                  />
                )
              }
              sx={{ color: id === index ? primaryColor : id > index ? "#009933" : "#808080" }}
            >
              <Typography
                variant="subtitle1"
                color={id === index ? primaryColor : id > index ? "#009933" : "#808080"}
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
