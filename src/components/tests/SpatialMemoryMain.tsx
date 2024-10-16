import { FC, useContext, useEffect, useState } from "react";
import { Box, Button, Grid, styled } from "@mui/material";
import { spatialMemoryConfig as testConfig } from "../../config/test.config";
import { spatialMemoryConfig as uiConfig } from "../../config/ui.config";
import { TestContext } from "../../contexts/test.context";
import { TestPhase } from "../../contexts/general.context";
import { SpatialMemoryResult } from "../../contexts/types/result.type";

const Cell = styled(Box, {
  shouldForwardProp: (prop) => prop !== "topBox" && prop !== "bottomBox" && prop !== "leftBox" && prop !== "rightBox",
})<{ topBox?: boolean; bottomBox?: boolean; leftBox?: boolean; rightBox?: boolean }>(
  ({ theme, topBox, bottomBox, leftBox, rightBox }) => ({
    width: uiConfig.cellSize,
    height: uiConfig.cellSize,
    backgroundColor: theme.palette.background.paper,
    borderTop: topBox ? "3px solid black" : "1px solid black",
    borderBottom: bottomBox ? "3px solid black" : "1px solid black",
    borderLeft: leftBox ? "3px solid black" : "1px solid black",
    borderRight: rightBox ? "3px solid black" : "1px solid black",
    transition: "background-color 0.2s ease",
  })
);

interface SpatialMemoryMainProps {
  toTestPhase: (testPhase: TestPhase) => void;
}

export const SpatialMemoryMain: FC<SpatialMemoryMainProps> = ({ toTestPhase }) => {
  const testCxt = useContext(TestContext);

  const [questionIdx, setQuestionIdx] = useState(0);
  const [startTime, setStartTime] = useState<number>(0);

  const [grid, setGrid] = useState(Array(testConfig.rows).fill(Array(testConfig.cols).fill(false)));
  const [correct, setCorrect] = useState(Array(testConfig.rows).fill(Array(testConfig.cols).fill(false)));
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (Number(sessionStorage.getItem("testPhase")) === TestPhase.SPATIAL_MEMORY) {
      setQuestionIdx(Number(sessionStorage.getItem("questionNumber")));
    }

    const timer = setTimeout(() => {
      setGrid(Array(testConfig.rows).fill(Array(testConfig.cols).fill(false)));
      setEnabled(true);
    }, testConfig.timeToMemorize);

    const questionGrid = testCxt!.spatialMemorySetup[questionIdx];
    setCorrect(questionGrid);
    setGrid(questionGrid);
    setEnabled(false);
    setStartTime(Date.now() + testConfig.timeToMemorize);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setGrid(Array(testConfig.rows).fill(Array(testConfig.cols).fill(false)));
      setEnabled(true);
    }, testConfig.timeToMemorize);

    const questionGrid = testCxt!.spatialMemorySetup[questionIdx];
    setCorrect(questionGrid);
    setGrid(questionGrid);
    setEnabled(false);
    setStartTime(Date.now() + testConfig.timeToMemorize);

    return () => clearTimeout(timer);
  }, [questionIdx]);

  const toggleCell = (row: number, col: number) => {
    setGrid((grid) => {
      const newGrid = grid.map((row) => row.slice());
      newGrid[row][col] = !newGrid[row][col];
      return newGrid;
    });
  };

  const submitHandler = () => {
    const answer: SpatialMemoryResult = {
      sm_rt: Date.now() - startTime,
      sm_correct: grid.every((row: boolean[], rowIndex: number) =>
        row.every((cell: boolean, colIndex: number) => cell === correct[rowIndex][colIndex])
      ),
    };

    if (!sessionStorage.getItem("results")) {
      sessionStorage.setItem("results", "[]");
    }
    const resultList = JSON.parse(sessionStorage.getItem("results")!);
    sessionStorage.setItem("results", JSON.stringify([...resultList, answer]));

    if (questionIdx + 1 >= testCxt!.spatialMemorySetup.length) {
      toTestPhase(TestPhase.MEMORY_RECALL_DELAYED);
    } else {
      sessionStorage.setItem("questionNumber", String(questionIdx + 1));
      setQuestionIdx(questionIdx + 1);
    }
  };

  return (
    <>
      <Grid container direction="column">
        {grid.map((row: any[], rowIndex: number) => (
          <Grid container item key={rowIndex} justifyContent="center">
            {row.map((cell: boolean, colIndex: number) => (
              <Grid item key={colIndex}>
                <Cell
                  topBox={rowIndex === 0}
                  bottomBox={rowIndex === testConfig.rows - 1}
                  leftBox={colIndex === 0}
                  rightBox={colIndex === testConfig.cols - 1}
                  sx={{ backgroundColor: cell ? "black" : "white" }}
                  onClick={() => enabled && toggleCell(rowIndex, colIndex)}
                />
              </Grid>
            ))}
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
          p: 1,
        }}
      >
        <Button
          variant="contained"
          sx={{ fontSize: 20, padding: 1.5 }}
          fullWidth
          disabled={!enabled}
          onClick={submitHandler}
        >
          Submit
        </Button>
      </Box>
    </>
  );
};
