import { Grid, Typography } from "@mui/material";
import { FC } from "react";
import { Cell } from "../tests/SpatialMemoryMain";
import { spatialMemoryConfig as testConfig } from "../../config/test.config";

const exampleMatrix0 = [
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1],
];

const exampleMatrix1 = [
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 1],
];

interface SMVisualProps {
  matrix: number[][];
  clickPosX?: number;
  clickPosY?: number;
}

const SMVisual: FC<SMVisualProps> = ({ matrix, clickPosX, clickPosY }) => (
  <Grid container direction="column" marginY={2}>
    {matrix.map((row: any[], rowIndex: number) => (
      <Grid container item key={rowIndex} justifyContent="center">
        {row.map((cell: boolean, colIndex: number) => (
          <Grid item key={colIndex}>
            <Cell
              topBox={rowIndex === 0}
              bottomBox={rowIndex === testConfig.rows - 1}
              leftBox={colIndex === 0}
              rightBox={colIndex === testConfig.cols - 1}
              cellwidth="16vw"
              cellheight="16vw"
              sx={{ backgroundColor: cell ? "black" : "white" }}
            />
            {colIndex === clickPosX && rowIndex === clickPosY && (
              <img
                src={"/assets/click.png"}
                style={{
                  position: "absolute",
                  width: "50vw",
                  transform: "translateX(-45%) translateY(-45%)",
                }}
              />
            )}
          </Grid>
        ))}
      </Grid>
    ))}
  </Grid>
);

export const smInstructions: JSX.Element[] = [
  <>
    <SMVisual matrix={exampleMatrix0} />
    <Typography variant="body1" gutterBottom fontSize={18} textAlign="initial" marginY={2}>
      Memorize the pattern on the grid
    </Typography>
  </>,
  <>
    <SMVisual matrix={exampleMatrix1} clickPosX={2} clickPosY={2} />
    <Typography variant="body1" gutterBottom fontSize={18} textAlign="initial" marginTop={6}>
      Fill in the blank squares to recreate the pattern.
    </Typography>
  </>,
];
