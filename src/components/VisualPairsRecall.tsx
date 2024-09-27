import { Box, Grid } from "@mui/material";
import { FC } from "react";
import { randomSelectFromNumberRange, shuffleList } from "../utils/general.utils";
import { visualPairsConfig as uiConfig } from "../config/ui.config";

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
          <Grid item>
            <Box
              component="img"
              height={uiConfig.imageHeight - 2 * 3}
              src={`/assets/visual-pair/${imageTheme}${reference}.jpg`}
              border="3px solid red"
            />
          </Grid>
          <Grid item>
            <Box
              component="img"
              height={uiConfig.imageHeight}
              src={`/assets/visual-pair/${imageTheme}${options[0]}.jpg`}
              onClick={() => submitHandler(options[0])}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          {options.slice(1, 3).map((option, idx) => (
            <Grid key={idx} item>
              <Box
                component="img"
                height={uiConfig.imageHeight}
                src={`/assets/visual-pair/${imageTheme}${option}.jpg`}
                onClick={() => submitHandler(option)}
              />
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={1}>
          {options.slice(3).map((option, idx) => (
            <Grid key={idx} item>
              <Box
                component="img"
                height={uiConfig.imageHeight}
                src={`/assets/visual-pair/${imageTheme}${option}.jpg`}
                onClick={() => submitHandler(option)}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};
