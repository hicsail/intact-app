import { FC } from "react";
import { Stepper, Typography, Step, StepLabel } from "@mui/material";
import { TestPhase } from "../contexts/general.context";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

const MemoryTestsLabels = [
  {
    name: "Memory - Immediate Recall"
  },
  {
    name: 'Visual Paired Associates - Learn'
  },
  {
    name: "Choice Reaction Time"
  },
  {
    name: 'Visual Paired Associates - Test'
  },
  {
    name: "Digit Symbol Matching"
  },
  {
    name: "Spatial Memory"
  },
  {
    name: "Memory - Delayed Recall"
  }
];

interface ProgressTrackerProps {
  id: number;
}

export const ProgressTracker: FC<ProgressTrackerProps> = (props) => {
  //check for Dark/Light Mode
  const dark_light_color = () => {
    if (window.matchMedia("(prefers-color-scheme: dark").matches) {
      return "#ffffff";
    } else {
      return "#000000";
    }
  };

  return (
    <Stepper activeStep={props.id} orientation="vertical" sx={{ padding: 2 }}>
      {MemoryTestsLabels.map((step, index) => (
        <Step key={index}>
          <StepLabel
            icon={
              props.id > index ? (
                <CheckCircleIcon fontSize="inherit" />
              ) : (
                <RadioButtonUncheckedIcon
                  fontSize="inherit"
                  sx={{ color: props.id >= index ? "#ffffff" : "#808080" }}
                />
              )
            }
            sx={{ color: props.id <= index ? "#ffffff" : "#009933" }}
          >
            <Typography
              variant="subtitle1"
              color={
                props.id <= index
                  ? props.id === index
                    ? dark_light_color
                    : "#808080"
                  : "#009933"
              }
              overflow={"visible"}
              sx={{ padding: 0.5 }}
            >
              {step.name}
            </Typography>
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};
