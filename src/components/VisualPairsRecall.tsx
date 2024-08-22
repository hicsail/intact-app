import { Box, Grid } from "@mui/material";
import { FC } from "react";
import { randomSelectFromNumberRange, shuffleList } from "../utils/generalUtils";
import { visualPairsConfig as uiConfig } from "../config/uiConfig";

interface VisualPairsRecallProps {
  imageTheme: string;
  reference: number;
  correct: number;
  handleSubmit: (result: boolean) => void;
}

export const VisualPairsRecall: FC<VisualPairsRecallProps> = ({ imageTheme, reference, correct, handleSubmit }) => {
  const options =
    imageTheme === "example"
      ? shuffleList([...randomSelectFromNumberRange(1, 6, 4, false, [reference, correct]), correct])
      : shuffleList([...randomSelectFromNumberRange(1, 8, 4, false, [reference, correct]), correct]);

  const submitHandler = (selected: number) => {
    handleSubmit(selected === correct);
  };

  return (
    <Box>
      <Grid container direction="column" gap={1}>
        <Grid container spacing={1}>
          <Grid
            item
            component="img"
            height={uiConfig.imageHeight}
            src={`../src/assets/visual-pair/${imageTheme}${reference}.jpg`}
          />
          {options.slice(0, 2).map((option, idx) => (
            <Grid
              key={idx}
              item
              component="img"
              height={uiConfig.imageHeight}
              src={`../src/assets/visual-pair/${imageTheme}${option}.jpg`}
              onClick={() => submitHandler(option)}
            />
          ))}
        </Grid>
        <Grid container spacing={1}>
          {options.slice(2).map((option, idx) => (
            <Grid
              key={idx}
              item
              component="img"
              height={uiConfig.imageHeight}
              src={`../src/assets/visual-pair/${imageTheme}${option}.jpg`}
              onClick={() => submitHandler(option)}
            />
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};
