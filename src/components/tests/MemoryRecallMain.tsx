import { FC, useContext, useEffect, useState } from "react";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import { getNextTestPhase, shuffleList } from "../../utils/general.utils";
import { memoryRecallConfig as testConfig } from "../../config/test.config";
import { memoryRecallConfig as uiConfig } from "../../config/ui.config";
import { TestPhase } from "../../contexts/general.context";
import { TestContext } from "../../contexts/test.context";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { DelayedRecallResult, ImmediateRecallResult } from "../../contexts/types/result.type";

interface MemoryRecallMainProps {
  phase: TestPhase;
  toTestPhase: (testPhase: TestPhase) => void;
}

export const MemoryRecallMain: FC<MemoryRecallMainProps> = ({ phase, toTestPhase }) => {
  const testCxt = useContext(TestContext);

  const [startTime, setStartTime] = useState<number>(0);
  const [trail, setTrail] = useState<number>(0);

  const [showPlayButton, setShowPlayButton] = useState<boolean>(true);
  const [showInstruction, setShowInstruction] = useState<boolean>(false);
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const [clickedNum, setClickedNum] = useState<number>(0);
  const [values, setValues] = useState<{ [key: string]: string }>(
    Object.fromEntries(testConfig.options.map((key) => [key, "unselected"]))
  );
  const [randomList, setRandomList] = useState<string[]>([]);

  const maxSelection = testConfig.maxSelection;

  useEffect(() => {
    if (phase === TestPhase.MEMORY_RECALL_DELAYED) {
      setShowInstruction(true);
      setTimeout(() => {
        setShowOptions(true);
      }, 2000);

      return;
    }

    if (!sessionStorage.getItem("immediateRecallTrial")) {
      sessionStorage.setItem("immediateRecallTrial", "0");
    }
    setTrail(Number(sessionStorage.getItem("immediateRecallTrial")));
  }, []);

  useEffect(() => {
    setRandomList(shuffleList([...testConfig.options]));
  }, [testConfig.options]);

  useEffect(() => {
    if (clickedNum >= maxSelection) {
      setTimeout(() => {
        submitHandler();
        return;
      }, 2000);
    }
  }, [clickedNum]);

  const playHandler = () => {
    setShowPlayButton(false);
    const audioUrl = import.meta.env.VITE_RECALL_INST_AUDIO_URL;
    const audio = new Audio(audioUrl.replace("{type}", testCxt!.studyType));
    audio.play().then(() => {
      setTimeout(() => {
        setShowInstruction(true);
      }, 16500);
      audio.onended = () => {
        setShowOptions(true);
        setStartTime(Date.now());
      };
    });
  };

  const clickHandler = (index: number) => {
    if (clickedNum >= maxSelection) {
      return;
    }

    if (values[randomList[index]] !== "unselected") {
      return;
    }

    const selected = testCxt!.memoryRecallSetup[testCxt!.studyType];
    setClickedNum((num) => num + 1);
    setValues((prev) => {
      const newValues = { ...prev };
      const key = randomList[index];
      newValues[key] = selected.includes(key) ? "correct" : "incorrect";
      return newValues;
    });
  };

  const submitHandler = () => {
    const result =
      Object.entries(values).filter(([, value]) => value === "correct").length === maxSelection;
    if (phase === TestPhase.MEMORY_RECALL_DELAYED) {
      const answer = {
        dr_rt: Date.now() - startTime,
        dr_score: Object.entries(values).filter(([, value]) => value === "correct").length,
      } as DelayedRecallResult;

      sessionStorage.setItem("results", JSON.stringify(answer));
      toTestPhase(getNextTestPhase(phase));
      return;
    }

    if (!sessionStorage.getItem("results")) {
      sessionStorage.setItem("results", "{}");
    }

    const answer = JSON.parse(sessionStorage.getItem("results")!);
    answer["ir_score"] = 0;
    if (trail === 0) {
      answer["ir_rt_first"] = Date.now() - startTime;
      answer["ir_rt_second"] = null;
    }

    if (trail === 1) {
      answer["ir_rt_second"] = Date.now() - startTime;
    }

    sessionStorage.setItem("results", JSON.stringify(answer as ImmediateRecallResult));

    if (result || trail >= testConfig.maxTrial - 1) {
      if (trail === 0) {
        answer["ir_score"] = 2;
      } else if (trail === 1) {
        answer["ir_score"] = 1;
      }

      sessionStorage.setItem("results", JSON.stringify(answer as ImmediateRecallResult));
      sessionStorage.removeItem("immediateRecallTrial");
      toTestPhase(getNextTestPhase(phase));
      return;
    }

    setValues(Object.fromEntries(testConfig.options.map((key) => [key, "unselected"])));
    setClickedNum(0);
    setShowPlayButton(true);
    setShowInstruction(false);
    setShowOptions(false);
    setTrail((trail) => trail + 1);
    sessionStorage.setItem("immediateRecallTrial", String(trail + 1));
  };

  return (
    <>
      <Box
        sx={{
          width: "85vw",
          marginX: "auto",
        }}
      >
        {!showInstruction && phase === TestPhase.MEMORY_RECALL_IMMEDIATE && (
          <Typography variant="body1" align="left" gutterBottom fontSize={18}>
            Please memorize these five animals until the end of the test.
          </Typography>
        )}
        {showInstruction && (
          <Typography variant="body1" align="left" gutterBottom fontSize={18}>
            Select the five animals you have heard.
          </Typography>
        )}
      </Box>
      {showPlayButton && phase === TestPhase.MEMORY_RECALL_IMMEDIATE && (
        <IconButton onClick={playHandler}>
          <PlayCircleIcon sx={{ fontSize: 100 }} />
        </IconButton>
      )}
      {showOptions && (
        <Grid container direction="column" spacing={1} paddingX={2}>
          {Array.from({ length: 8 }).map((_, rowIndex) => (
            <Grid container item spacing={1} key={rowIndex}>
              {Array.from({ length: 2 }).map((_, colIndex) => {
                const index = rowIndex * 2 + colIndex;
                return (
                  <Grid item key={colIndex}>
                    <Box
                      width={uiConfig.buttonWidth}
                      height={uiConfig.buttonHeight}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      borderRadius={1}
                      sx={{
                        backgroundColor:
                          uiConfig.buttonColor[
                            values[randomList[index]] as keyof typeof uiConfig.buttonColor
                          ],
                        cursor: "pointer",
                      }}
                      onClick={() => clickHandler(index)}
                    >
                      <Typography
                        fontSize={uiConfig.fontSize}
                        fontWeight="bold"
                        color={
                          uiConfig.textColor[
                            values[randomList[index]] as keyof typeof uiConfig.textColor
                          ]
                        }
                      >
                        {randomList[index]}
                      </Typography>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};
