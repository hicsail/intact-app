import { Box, Grid, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { shuffleList } from "../utils/generalUtils";

const buttonColor = {
  unselected: "#839d97",
  correct: "#1bb394",
  incorect: "#d14b31",
};

const textColor = {
  unselected: "#eeeeee",
  correct: "white",
  incorect: "white",
};

interface MemoryRecallMainProps {
  options: string[];
  selected: string[];
}

export const MemoryRecallMain: FC<MemoryRecallMainProps> = ({ options, selected }) => {
  const [clickedNum, setClickedNum] = useState(0);
  const [values, setValues] = useState(Object.fromEntries(options.map((key) => [key, "unselected"])));
  const [randomList, setRandomList] = useState<string[]>([]);

  const maxtSelection = 5;

  useEffect(() => {
    setRandomList(shuffleList([...options]));
  }, [options]);

  const clickHandler = (index: number) => {
    if (clickedNum >= maxtSelection) {
      return;
    }

    setClickedNum((num) => num + 1);
    setValues((prev) => {
      const newValues = { ...prev };
      const key = randomList[index];
      newValues[key] = selected.includes(key) ? "correct" : "incorect";
      return newValues;
    });
  };

  return (
    <Grid container direction="column" spacing={1}>
      {Array.from({ length: 4 }).map((_, rowIndex) => (
        <Grid container item spacing={1} key={rowIndex}>
          {Array.from({ length: 4 }).map((_, colIndex) => {
            const index = rowIndex * 4 + colIndex;
            return (
              <Grid item key={colIndex}>
                <Box
                  width={180}
                  height={80}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  borderRadius={1}
                  sx={{
                    backgroundColor: buttonColor[values[randomList[index]] as keyof typeof buttonColor],
                    cursor: "pointer",
                  }}
                  onClick={() => clickHandler(index)}
                >
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    color={textColor[values[randomList[index]] as keyof typeof textColor]}
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
