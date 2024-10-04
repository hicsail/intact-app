import { FC, useContext, useEffect, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { getNextTestPhase, randomSelectFromList, shuffleList } from "../../utils/general.utils";
import { choiceReactionTimeConfig as uiConfig } from "../../config/ui.config";
import { choiceReactionTimeConfig as testConfig } from "../../config/test.config";
import { TestContext } from "../../contexts/test.context";
import { TestPhase } from "../../contexts/general.context";
import { ChoiceReactionTimeResult } from "../../contexts/types/result.type";

interface ChoiceReactionTimeMainProps {
  toTestPhase: (testPhase: TestPhase) => void;
}

export const ChoiceReactionTimeMain: FC<ChoiceReactionTimeMainProps> = ({ toTestPhase }) => {
  const testCxt = useContext(TestContext);

  const [questionIdx, setQuestionIdx] = useState(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [pressTime, setPressTime] = useState<number>(0);

  const [hide, setHide] = useState(true);
  const [symbols, setSymbols] = useState<string[]>([]);
  const [correctSymbol, setCorrectSymbol] = useState<string>("");
  const [colors, setColors] = useState<string[]>([]);
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    if (Number(sessionStorage.getItem("testPhase")) === TestPhase.CHOICE_REACTION_TIME) {
      setQuestionIdx(Number(sessionStorage.getItem("questionNumber")));
    }

    const correctSymbol = randomSelectFromList(["<", ">"], 1)[0];
    setCorrectSymbol(correctSymbol);

    let otherSymbols = shuffleList(["<", ">"]);
    otherSymbols.splice(testCxt!.choiceReactionTimeSetup[questionIdx], 0, correctSymbol);
    setSymbols(otherSymbols);
    setColors(shuffleList([uiConfig.choiceColor.color0, uiConfig.choiceColor.color1]));

    const waitTime =
      Math.floor(Math.random() * (testConfig.waitTimeMax - testConfig.waitTimeMin)) + testConfig.waitTimeMin;
    setStartTime(Date.now() + waitTime);
    const timer = setTimeout(() => {
      setHide(false);
      setDisable(false);
    }, waitTime);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const correctSymbol = randomSelectFromList(["<", ">"], 1)[0];
    setCorrectSymbol(correctSymbol);

    let otherSymbols = shuffleList(["<", ">"]);
    otherSymbols.splice(testCxt!.choiceReactionTimeSetup[questionIdx], 0, correctSymbol);
    setSymbols(otherSymbols);
    setColors(shuffleList([uiConfig.choiceColor.color0, uiConfig.choiceColor.color1]));

    const waitTime =
      Math.floor(Math.random() * (testConfig.waitTimeMax - testConfig.waitTimeMin)) + testConfig.waitTimeMin;
    setStartTime(Date.now() + waitTime);
    const timer = setTimeout(() => {
      setHide(false);
      setDisable(false);
    }, waitTime);

    return () => {
      clearTimeout(timer);
    };
  }, [questionIdx]);

  const touchHandler = () => {
    setPressTime(Date.now());
  };

  const submitHandler = (input: string) => {
    const anwser: ChoiceReactionTimeResult = {
      crt_rt: pressTime - startTime,
      crt_dwell: Date.now() - pressTime,
      crt_correct: correctSymbol === input,
      crt_response: input === "<" ? "left" : "right",
    };

    if (!sessionStorage.getItem("results")) {
      sessionStorage.setItem("results", "[]");
    }
    const resultList = JSON.parse(sessionStorage.getItem("results")!);
    sessionStorage.setItem("results", JSON.stringify([...resultList, anwser]));

    setHide(true);
    setDisable(true);
    if (questionIdx + 1 >= testCxt!.choiceReactionTimeSetup.length) {
      toTestPhase(getNextTestPhase(TestPhase.CHOICE_REACTION_TIME));
    } else {
      sessionStorage.setItem("questionNumber", String(questionIdx + 1));
      setQuestionIdx(questionIdx + 1);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={5}>
      <Box position="relative">
        <Box>
          {hide ? (
            <Box width={82} />
          ) : (
            symbols.map((symbol, index) => (
              <Box
                key={index}
                width={80}
                height={80}
                display="flex"
                alignItems="center"
                justifyContent="center"
                border={1}
                marginY={2}
                sx={{
                  backgroundColor: index === testCxt!.choiceReactionTimeSetup[questionIdx] ? colors[0] : colors[1],
                }}
              >
                <Typography variant="h2" fontWeight="bold" color="black">
                  {symbol}
                </Typography>
              </Box>
            ))
          )}
        </Box>
      </Box>
      <Box sx={{ position: "fixed", bottom: 10, left: 0, right: 0, display: "flex", justifyContent: "center", p: 1 }}>
        <Grid container spacing={3} sx={{ width: "100%" }}>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="contained"
              onTouchStart={touchHandler}
              onTouchEnd={() => submitHandler("<")}
              disabled={disable}
              sx={{
                backgroundColor: uiConfig.buttonColor,
                "&:hover": {
                  backgroundColor: uiConfig.buttonColor,
                },
                height: "15vh",
                color: "black",
                fontSize: 80,
                fontWeight: "bold",
              }}
            >
              {"<"}
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="contained"
              onTouchStart={touchHandler}
              onTouchEnd={() => submitHandler(">")}
              disabled={disable}
              sx={{
                backgroundColor: uiConfig.buttonColor,
                "&:hover": {
                  backgroundColor: uiConfig.buttonColor,
                },
                height: "15vh",
                color: "black",
                fontSize: 80,
                fontWeight: "bold",
              }}
            >
              {">"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
