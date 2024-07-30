import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { shuffleList } from "../utils/generalUtils";

enum ChoiceColor {
  YELLOW = "#ffff00",
  AZUR = "#02ffff",
}

interface ChoiceReactionTimeMainProps {
  correctIndex: 0 | 1 | 2;
  correctSymbol: string;
}

export const ChoiceReactionTimeMain: FC<ChoiceReactionTimeMainProps> = ({ correctIndex, correctSymbol }) => {
  const symbols = shuffleList(["<", ">"]);
  const colors = shuffleList([ChoiceColor.YELLOW, ChoiceColor.AZUR]);

  return (
    <Box position="relative">
      <Box>
        {Array.from({ length: 3 }).map((_, index) => (
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
              backgroundColor: index === correctIndex ? colors[0] : colors[1],
            }}
          >
            <Typography variant="h2" fontWeight="bold">
              {index === correctIndex ? correctSymbol : symbols.pop()}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
