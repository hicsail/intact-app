import { FC } from "react";
import { Box, Divider, Grid, Typography } from "@mui/material";

import symbol1 from "../assets/digit-symbol/1.gif";
import symbol2 from "../assets/digit-symbol/2.gif";
import symbol3 from "../assets/digit-symbol/3.gif";
import symbol4 from "../assets/digit-symbol/4.gif";
import symbol5 from "../assets/digit-symbol/5.gif";
import symbol6 from "../assets/digit-symbol/6.gif";
import symbol7 from "../assets/digit-symbol/7.gif";
import symbol8 from "../assets/digit-symbol/8.gif";
import symbol9 from "../assets/digit-symbol/9.gif";

const symbols = [
  { image: symbol1, num: 1 },
  { image: symbol2, num: 2 },
  { image: symbol3, num: 3 },
  { image: symbol4, num: 1 },
  { image: symbol5, num: 2 },
  { image: symbol6, num: 3 },
  { image: symbol7, num: 1 },
  { image: symbol8, num: 2 },
  { image: symbol9, num: 3 },
];

interface DigitSymbolCodingMainProps {
  correctIndex: number;
}

export const DigitSymbolCodingMain: FC<DigitSymbolCodingMainProps> = ({ correctIndex }) => {
  return (
    <Box>
      <img src={symbols[correctIndex].image} width={80} style={{ marginBottom: 8 }} />
      <Grid container spacing={1}>
        {symbols.map((symbol, index) => (
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
