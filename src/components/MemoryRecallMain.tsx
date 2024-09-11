import { FC, useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { shuffleList } from "../utils/generalUtils";
import { memoryRecallConfig as testConfig } from "../config/testConfig";
import { memoryRecallConfig as uiConfig } from "../config/uiConfig";

interface MemoryRecallMainProps {
  selected: string[];
  handleSubmit: (result: boolean) => void;
}

export const MemoryRecallMain: FC<MemoryRecallMainProps> = ({ selected, handleSubmit }) => {
  const [clickedNum, setClickedNum] = useState(0);
  const [values, setValues] = useState(Object.fromEntries(testConfig.options.map((key) => [key, "unselected"])));
  const [randomList, setRandomList] = useState<string[]>([]);

  const maxSelection = testConfig.maxSelection;

  useEffect(() => {
    setRandomList(shuffleList([...testConfig.options]));
  }, [testConfig.options]);

  useEffect(() => {
    if (clickedNum >= maxSelection) {
      setTimeout(() => {
        handleSubmit(Object.entries(values).filter(([, value]) => value === "correct").length === maxSelection);
        return;
      }, 2000);
    }
  }, [clickedNum]);

  const clickHandler = (index: number) => {
    if (clickedNum >= maxSelection) {
      return;
    }

    if (values[randomList[index]] !== "unselected") {
      return;
    }

    setClickedNum((num) => num + 1);
    setValues((prev) => {
      const newValues = { ...prev };
      const key = randomList[index];
      newValues[key] = selected.includes(key) ? "correct" : "incorrect";
      return newValues;
    });
  };

  return (
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
  );
};
