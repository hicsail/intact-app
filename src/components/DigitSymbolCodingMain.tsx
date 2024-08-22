import { FC } from "react";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { digitSymbolConfig as testConfig } from "../config/testConfig";
import { digitSymbolConfig as uiConfig } from "../config/uiConfig";

interface DigitSymbolCodingMainProps {
  correctIndex: number;
  handleSubmit: (result: boolean) => void;
}

export const DigitSymbolCodingMain: FC<DigitSymbolCodingMainProps> = ({ correctIndex, handleSubmit }) => {
  const submitHandler = (input: number) => {
    const result = testConfig.symbolPairs[correctIndex].num === input;
    handleSubmit(result);
  };

  return (
    <Box>
      <img src={testConfig.symbolPairs[correctIndex].image} width={80} style={{ marginBottom: 8 }} />
      <Grid container spacing={1} marginBottom={8}>
        {testConfig.symbolPairs.map((symbol, index) => (
          <Grid item key={index}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              border="2px solid black"
            >
              <img src={symbol.image} width={50} style={{ margin: 5 }} />
              <Divider sx={{ width: "100%", borderBottom: "2px solid black" }} />
              <Typography variant="h3" margin="5px">
                {symbol.num}
              </Typography>
            </Box>
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
                fontSize: uiConfig.fontSize,
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
                fontSize: uiConfig.fontSize,
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
                fontSize: uiConfig.fontSize,
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
