import { FC } from "react";
import { Box, Divider, Grid, Typography } from "@mui/material";
import { digitSymbolConfig as testConfig } from "../config/testConfig";

interface DigitSymbolCodingMainProps {
  correctIndex: number;
}

export const DigitSymbolCodingMain: FC<DigitSymbolCodingMainProps> = ({ correctIndex }) => {
  return (
    <Box>
      <img src={testConfig.symbolPairs[correctIndex].image} width={80} style={{ marginBottom: 8 }} />
      <Grid container spacing={1}>
        {testConfig.symbolPairs.map((symbol, index) => (
          <Grid item key={index}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              border="2px solid black"
            >
              <img src={symbol.image} width={60} style={{ margin: 5 }} />
              <Divider sx={{ width: "100%", borderBottom: "2px solid black" }} />
              <Typography variant="h3" margin="5px">
                {symbol.num}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
