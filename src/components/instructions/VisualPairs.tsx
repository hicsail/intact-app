import { Grid, Typography } from "@mui/material";
import { generalConfig as testConfig } from "../../config/test.config";
import { FC } from "react";

const VPVisual: FC = () => (
  <Grid container spacing={1} marginY={2} justifyContent="center">
    <Grid item component="img" height={160} src="/assets/visual-pair/example1.jpg" />
    <Grid item component="img" height={160} src="/assets/visual-pair/example2.jpg" />
  </Grid>
);

export const vpmInstructions: JSX.Element[] = [
  <>
    <VPVisual />
    <Typography variant="body1" gutterBottom fontSize={18} textAlign="initial" marginY={2}>
      You will see {Object.keys(testConfig.visualPairsAns).length} image pairs, like above. Learn which images go
      together. Later you will be tested on that.
    </Typography>
  </>,
];
