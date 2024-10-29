import { Box, Grid, Typography } from "@mui/material";
import { generalConfig as testConfig } from "../../config/test.config";
import { FC } from "react";

const VPVisual0: FC = () => (
  <Grid container spacing={1} marginY={2} justifyContent="center">
    <Grid item component="img" height={160} src="/assets/visual-pair/example1.jpg" />
    <Grid item component="img" height={160} src="/assets/visual-pair/example2.jpg" />
  </Grid>
);

const VPVisual1: FC = () => (
  <Grid container direction="column" marginY={2}>
    <Grid container spacing={1} justifyContent="center">
      <Grid item>
        <Box component="img" height={84} src={`/assets/visual-pair/example1.jpg`} border="3px solid red" />
      </Grid>
      <Grid item>
        <Box component="img" height={90} src={`/assets/visual-pair/example2.jpg`} />
      </Grid>
    </Grid>
    <Grid container spacing={1} justifyContent="center">
      {[3, 4].map((option, idx) => (
        <Grid key={idx} item>
          <Box component="img" height={90} src={`/assets/visual-pair/example${option}.jpg`} />
        </Grid>
      ))}
    </Grid>
    <Grid container spacing={1} justifyContent="center">
      {[5, 6].map((option, idx) => (
        <Grid key={idx} item>
          <Box component="img" height={90} src={`/assets/visual-pair/example${option}.jpg`} />
        </Grid>
      ))}
    </Grid>
  </Grid>
);

export const vpmInstructions: JSX.Element[] = [
  <>
    <VPVisual0 />
    <Typography variant="body1" gutterBottom fontSize={18} textAlign="initial" marginY={2}>
      You will see {Object.keys(testConfig.visualPairsAns).length} image pairs, like above. Learn which images go
      together. Later you will be tested on that.
    </Typography>
  </>,
];

export const vprInstructions: JSX.Element[] = [
  <>
    <VPVisual0 />
    <Typography variant="body1" gutterBottom fontSize={18} textAlign="initial" marginTop={2}>
      Let's test your memory from the images you learned a few minutes ago.
    </Typography>
  </>,
  <>
    <VPVisual1 />
    <Typography variant="body1" gutterBottom fontSize={18} textAlign="initial" marginBottom={2}>
      You will need to select the image that goes together with the image with <strong>red outline</strong> at the{" "}
      <strong>top left</strong> corner.
    </Typography>
  </>,
  <>
    <Typography variant="body1" fontSize={18} textAlign="initial" marginY={2}>
      You will be asked to recall all {Object.keys(testConfig.visualPairsAns).length} pairs of images. Let's start!
    </Typography>
  </>,
];
