import { FC, useContext, useEffect, useState } from "react";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { digitSymbolConfig as testConfig } from "../../config/test.config";
import { digitSymbolConfig as uiConfig } from "../../config/ui.config";
import styled from "@emotion/styled";
import { TestPhase } from "../../contexts/general.context";
import { TestContext } from "../../contexts/test.context";
import { getNextTestPhase } from "../../utils/general.utils";
import { DigitSymbolMatchingResult } from "../../contexts/types/result.type";

export const Cell = styled(Box, {
  shouldForwardProp: (prop) => prop !== "leftBox" && prop !== "rightBox" && prop !== "middleBox",
})<{ leftBox?: boolean; rightBox?: boolean; middleBox?: boolean }>(({ leftBox, rightBox }) => ({
  borderLeft: leftBox ? "2px solid black" : "1px solid black",
  borderRight: rightBox ? "2px solid black" : "1px solid black",
  borderBottom: "2px solid black",
  borderTop: "2px solid black",
}));

interface DigitSymbolMatchingMainProps {
  toTestPhase: (testPhase: TestPhase) => void;
}

export const DigitSymbolMatchingMain: FC<DigitSymbolMatchingMainProps> = ({ toTestPhase }) => {
  const testCxt = useContext(TestContext);

  const [questionIdx, setQuestionIdx] = useState(0);
  const [startTime, setStartTime] = useState<number>(0);

  const [correctIndex, setCorrectIndex] = useState(-1);

  useEffect(() => {
    if (Number(sessionStorage.getItem("testPhase")) === TestPhase.DIGIT_SYMBOL_MATCHING) {
      setQuestionIdx(Number(sessionStorage.getItem("questionNumber")));
    }

    const correctIndex = testCxt!.digitSymbolMatchingSetup[testCxt!.studyType][questionIdx];
    setCorrectIndex(correctIndex);
    setStartTime(Date.now());
  }, []);

  useEffect(() => {
    const correctIndex = testCxt!.digitSymbolMatchingSetup[testCxt!.studyType][questionIdx];
    setCorrectIndex(correctIndex);
    setStartTime(Date.now());
  }, [questionIdx]);

  const submitHandler = (input: number) => {
    const answer: DigitSymbolMatchingResult = {
      dsm_rt: Date.now() - startTime,
      dsm_correct: testConfig.symbolPairs[correctIndex].num === input,
      dsm_response: input,
    };

    if (!sessionStorage.getItem("results")) {
      sessionStorage.setItem("results", "[]");
    }
    const resultList = JSON.parse(sessionStorage.getItem("results")!);
    sessionStorage.setItem("results", JSON.stringify([...resultList, answer]));

    if (questionIdx + 1 >= testCxt!.digitSymbolMatchingSetup[testCxt!.studyType].length) {
      toTestPhase(getNextTestPhase(TestPhase.DIGIT_SYMBOL_MATCHING));
    } else {
      sessionStorage.setItem("questionNumber", String(questionIdx + 1));
      setQuestionIdx(questionIdx + 1);
    }
  };

  return (
    <Box>
      {correctIndex >= 0 && (
        <img src={testConfig.symbolPairs[correctIndex].image} style={{ marginBottom: 8, height: "calc(100vw / 6)" }} />
      )}
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
