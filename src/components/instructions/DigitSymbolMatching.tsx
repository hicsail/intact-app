import { Divider, Grid, Typography } from "@mui/material";
import { FC } from "react";
import { Cell } from "../tests/DigitSymbolMatchingMain";
import { digitSymbolConfig as testConfig } from "../../config/test.config";
import { generalConfig } from "../../config/test.config";
import { digitSymbolConfig as uiConfig } from "../../config/ui.config";

const DSMVisual: FC = () => (
  <Grid container spacing={0} display="flex" justifyContent="center" marginY={2}>
    {testConfig.symbolPairs.map((symbol, index) => (
      <Grid item key={index}>
        <Cell
          leftBox={index === 0}
          rightBox={index === testConfig.symbolPairs.length - 1}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <img
            src={symbol.image}
            style={{
              marginLeft: 1,
              marginRight: 1,
              marginTop: 2,
              marginBottom: 2,
              height: "8vw",
            }}
          />
          <Divider sx={{ width: "100%", borderBottom: "1px solid black" }} />
          <Typography variant="h3" margin="5px" fontSize={uiConfig.listFontSize}>
            {symbol.num}
          </Typography>
        </Cell>
      </Grid>
    ))}
  </Grid>
);

export const dsmInstructions: JSX.Element[] = [
  <>
    <DSMVisual />
    <Typography variant="body1" gutterBottom fontSize={18} textAlign="initial" marginY={2}>
      Each <strong>symbol</strong> has a <strong>number</strong>.
    </Typography>
  </>,
  <>
    <img src={testConfig.symbolPairs[0].image} style={{ marginTop: "1rem", height: "14vw" }} />
    <DSMVisual />
    <Typography variant="body1" gutterBottom fontSize={18} textAlign="initial" marginBottom={2}>
      When a symbol appears at the top, press its number on the <strong>number pad</strong> at the{" "}
      <strong>bottom</strong> of the screen (here it is 1).
    </Typography>
  </>,
  <>
    <Typography variant="body1" gutterBottom fontSize={18} textAlign="initial" marginTop={2}>
      You will see {Object.keys(generalConfig.digitSymbolAns.baseline).length} questions in this test.
    </Typography>
    <Typography variant="body1" gutterBottom fontSize={18} textAlign="initial" marginBottom={2}>
      Your scores will be based on how many correct responeses you make, so try to be <strong>accurate</strong> and{" "}
      <strong>quick</strong>!
    </Typography>
  </>,
];
