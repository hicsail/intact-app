import { Box, Button, Grid, styled } from "@mui/material";
import { FC, useEffect, useState } from "react";

const Cell = styled(Box, {
  shouldForwardProp: (prop) => prop !== "topBox" && prop !== "bottomBox" && prop !== "leftBox" && prop !== "rightBox",
})<{ topBox?: boolean; bottomBox?: boolean; leftBox?: boolean; rightBox?: boolean }>(
  ({ theme, topBox, bottomBox, leftBox, rightBox }) => ({
    width: 80,
    height: 80,
    backgroundColor: theme.palette.background.paper,
    borderTop: topBox ? "3px solid black" : "1px solid black",
    borderBottom: bottomBox ? "3px solid black" : "1px solid black",
    borderLeft: leftBox ? "3px solid black" : "1px solid black",
    borderRight: rightBox ? "3px solid black" : "1px solid black",
    transition: "background-color 0.2s ease",
  })
);

interface SpacialMemoryMainProps {
  enabled: boolean;
}

export const SpacialMemoryMain: FC<SpacialMemoryMainProps> = ({ enabled }) => {
  const [grid, setGrid] = useState(Array(4).fill(Array(4).fill(false)));

  useEffect(() => {
    const timer = setTimeout(() => {
      setGrid(Array(4).fill(Array(4).fill(false)));
    }, 3000);

    setGrid(generateRandomTreeOnGrid(4, 4, 5));

    return () => clearTimeout(timer);
  }, []);

  const toggleCell = (row: number, col: number) => {
    setGrid((grid) => {
      const newGrid = grid.map((row) => row.slice());
      newGrid[row][col] = !newGrid[row][col];
      return newGrid;
    });
  };

  return (
    <Box>
      <Grid container direction="column">
        {grid.map((row: any[], rowIndex: number) => (
          <Grid container item key={rowIndex} justifyContent="center">
            {row.map((cell: boolean, colIndex: number) => (
              <Grid item key={colIndex}>
                <Cell
                  topBox={rowIndex === 0}
                  bottomBox={rowIndex === 3}
                  leftBox={colIndex === 0}
                  rightBox={colIndex === 3}
                  sx={{ backgroundColor: cell ? "black" : "white" }}
                  onClick={() => enabled && toggleCell(rowIndex, colIndex)}
                />
              </Grid>
            ))}
          </Grid>
        ))}
        <Button variant="contained" sx={{ width: 400, marginTop: 2 }} onClick={() => console.log()}>
          Submit
        </Button>
      </Grid>
    </Box>
  );
};

const directions = [
  [-1, 0], // Up
  [1, 0], // Down
  [0, -1], // Left
  [0, 1], // Right
  [-1, -1], // Up-Left
  [-1, 1], // Up-Right
  [1, -1], // Down-Left
  [1, 1], // Down-Right
];

const isValidMove = (grid: boolean[][], row: number, col: number) => {
  return row >= 0 && row < grid.length && col >= 0 && col < grid[0].length && !grid[row][col];
};

const generateRandomTreeOnGrid = (numRows: number, numCols: number, numNodes: number) => {
  const grid = Array.from({ length: numRows }, () => Array(numCols).fill(false));
  let nodesLeft = numNodes;

  // Randomly choose a starting position
  const startRow = Math.floor(Math.random() * numRows);
  const startCol = Math.floor(Math.random() * numCols);
  grid[startRow][startCol] = true;
  nodesLeft--;

  const queue = [{ row: startRow, col: startCol }];

  while (nodesLeft > 0 && queue.length > 0) {
    const node = queue.shift();
    if (!node) break; // Safeguard against undefined node

    const { row, col } = node;

    // Get available directions
    const availableDirections = directions.filter(([dRow, dCol]) => isValidMove(grid, row + dRow, col + dCol));

    if (availableDirections.length === 0) {
      continue;
    }

    // Determine the number of children for this node
    const numChildren = Math.min(nodesLeft, Math.floor(Math.random() * availableDirections.length) + 1);

    for (let i = 0; i < numChildren; i++) {
      const [dRow, dCol] = availableDirections.splice(Math.floor(Math.random() * availableDirections.length), 1)[0];
      const newRow = row + dRow;
      const newCol = col + dCol;

      grid[newRow][newCol] = true;
      queue.push({ row: newRow, col: newCol });
      nodesLeft--;

      if (nodesLeft === 0) break;
    }
  }

  return grid;
};
