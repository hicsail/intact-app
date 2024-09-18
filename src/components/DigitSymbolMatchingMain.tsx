import { FC } from "react";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { digitSymbolConfig as testConfig } from "../config/testConfig";
import { digitSymbolConfig as uiConfig } from "../config/uiConfig";
import styled from "@emotion/styled";

const Cell = styled(Box, {
  shouldForwardProp: (prop) => prop !== "leftBox" && prop !== "rightBox" && prop !== "middleBox",
})<{ leftBox?: boolean; rightBox?: boolean; middleBox?: boolean }>(({ leftBox, rightBox }) => ({
  borderLeft: leftBox ? "2px solid black" : "1px solid black",
  borderRight: rightBox ? "2px solid black" : "1px solid black",
  borderBottom: "2px solid black",
  borderTop: "2px solid black",
}));

interface DigitSymbolMatchingMainProps {
  correctIndex: number;
  handleSubmit: (result: boolean) => void;
}

export const DigitSymbolMatchingMain: FC<DigitSymbolMatchingMainProps> = ({ correctIndex, handleSubmit }) => {
  const submitHandler = (input: number) => {
    const result = testConfig.symbolPairs[correctIndex].num === input;
    handleSubmit(result);
  };

  return (
    <Box>
      <img src={testConfig.symbolPairs[correctIndex].image} style={{ marginBottom: 8, height: "calc(100vw / 6)" }} />
      <Grid container spacing={0} marginBottom={8}>
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
                  height: "calc(100vw / 10 - 1px)",
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
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          bgcolor: uiConfig.numpadBg,
          borderTop: "1px solid",
          borderColor: "divider",
          p: 1,
        }}
      >
        <Grid container spacing={1.5} sx={{ width: "100%" }}>
          <Grid item xs={4}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => submitHandler(1)}
              sx={{
                height: uiConfig.buttonHeight,
                backgroundColor: uiConfig.buttonBg,
                color: uiConfig.textColor,
                fontSize: uiConfig.bubttonFontSize,
                "&:active": {
                  backgroundColor: uiConfig.buttonClickedBg,
                },
                "&:hover": {
                  backgroundColor: uiConfig.buttonBg,
                },
              }}
            >
              1
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => submitHandler(2)}
              sx={{
                height: uiConfig.buttonHeight,
                backgroundColor: uiConfig.buttonBg,
                color: uiConfig.textColor,
                fontSize: uiConfig.bubttonFontSize,
                "&:active": {
                  backgroundColor: uiConfig.buttonClickedBg,
                },
                "&:hover": {
                  backgroundColor: uiConfig.buttonBg,
                },
              }}
            >
              2
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => submitHandler(3)}
              sx={{
                height: uiConfig.buttonHeight,
                backgroundColor: uiConfig.buttonBg,
                color: uiConfig.textColor,
                fontSize: uiConfig.bubttonFontSize,
                "&:active": {
                  backgroundColor: uiConfig.buttonClickedBg,
                },
                "&:hover": {
                  backgroundColor: uiConfig.buttonBg,
                },
              }}
            >
              3
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
