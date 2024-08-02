import { FC } from "react";
import { Box, Typography } from "@mui/material";
import { shuffleList } from "../utils/generalUtils";
import { choiceReactionTimeConfig as uiConfig } from "../config/uiConfig";

interface ChoiceReactionTimeMainProps {
  correctIndex: 0 | 1 | 2;
  correctSymbol: string;
}

export const ChoiceReactionTimeMain: FC<ChoiceReactionTimeMainProps> = ({ correctIndex, correctSymbol }) => {
  const symbols = shuffleList(["<", ">"]);
  const colors = shuffleList([uiConfig.choiceColor.color0, uiConfig.choiceColor.color1]);

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
