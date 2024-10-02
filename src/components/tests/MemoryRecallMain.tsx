import { FC, useContext, useEffect, useState } from "react";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import { getNextTestPhase, shuffleList } from "../../utils/general.utils";
import { memoryRecallConfig as testConfig } from "../../config/test.config";
import { memoryRecallConfig as uiConfig } from "../../config/ui.config";
import { TestPhase } from "../../contexts/general.context";
import { TestContext } from "../../contexts/test.context";
import { playAudioFromS3 } from "../../utils/aws.utils";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

interface MemoryRecallMainProps {
  phase: TestPhase;
  toTestPhase: (testPhase: TestPhase) => void;
}

export const MemoryRecallMain: FC<MemoryRecallMainProps> = ({ phase, toTestPhase }) => {
  const testCxt = useContext(TestContext);

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
    playAudioFromS3("audios/memory-recall").then((audio) => {
      setTimeout(() => {
        setShowInstruction(true);
      }, 17000);
      audio!.onended = () => {
        setShowOptions(true);
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

    const selected = testCxt!.memoryRecallSetup;
    setClickedNum((num) => num + 1);
    setValues((prev) => {
      const newValues = { ...prev };
      const key = randomList[index];
      newValues[key] = selected.includes(key) ? "correct" : "incorrect";
      return newValues;
    });
  };

  const submitHandler = () => {
    const result = Object.entries(values).filter(([, value]) => value === "correct").length === maxSelection;
    if (result) {
      toTestPhase(getNextTestPhase(phase));
    }
    setValues(Object.fromEntries(testConfig.options.map((key) => [key, "unselected"])));
    setClickedNum(0);
    setShowPlayButton(true);
    setShowInstruction(false);
    setShowOptions(false);
  };

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          width: "80vw",
          top: 0,
          left: 0,
          right: 0,
          marginX: "auto",
          marginY: 4,
        }}
      >
        {!showInstruction && (
          <Typography variant="body1" align="left" width="80vw" gutterBottom>
            Please memorize these five animals until the end of the test.
          </Typography>
        )}
        {showInstruction && (
          <Typography variant="body1" align="left" gutterBottom>
            Select the five animals you have heard.
          </Typography>
        )}
      </Box>
      {showPlayButton && (
        <IconButton onClick={playHandler}>
          <PlayCircleIcon sx={{ fontSize: 100 }} />
        </IconButton>
      )}
      {showOptions && (
        <Grid container direction="column" spacing={1}>
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
                          uiConfig.buttonColor[values[randomList[index]] as keyof typeof uiConfig.buttonColor],
                        cursor: "pointer",
                      }}
                      onClick={() => clickHandler(index)}
                    >
                      <Typography
                        fontSize={uiConfig.fontSize}
                        fontWeight="bold"
                        color={uiConfig.textColor[values[randomList[index]] as keyof typeof uiConfig.textColor]}
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
