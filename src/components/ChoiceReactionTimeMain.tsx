import { FC, useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { shuffleList } from "../utils/generalUtils";
import { choiceReactionTimeConfig as uiConfig } from "../config/uiConfig";
import { choiceReactionTimeConfig as testConfig } from "../config/testConfig";

interface ChoiceReactionTimeMainProps {
  correctIndex: 0 | 1 | 2;
  correctSymbol: string;
  handleSubmit: (result: boolean) => void;
}

export const ChoiceReactionTimeMain: FC<ChoiceReactionTimeMainProps> = ({
  correctIndex,
  correctSymbol,
  handleSubmit,
}) => {
  const [hide, setHide] = useState(true);

  const waitTime =
    Math.floor(Math.random() * (testConfig.waitTimeMax - testConfig.waitTimeMin)) + testConfig.waitTimeMin;
  const symbols = shuffleList(["<", ">"]);
  const colors = shuffleList([uiConfig.choiceColor.color0, uiConfig.choiceColor.color1]);

  const submitHandler = (input: string) => {
    const result = correctSymbol === input;
    setHide(true);
    handleSubmit(result);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setHide(false);
    }, waitTime);

    return () => clearTimeout(timer);
  }, [handleSubmit]);

  return (
    <Box display="flex" alignItems="center" gap={20}>
      <Button
        variant="contained"
        onClick={() => submitHandler("<")}
        sx={{
          backgroundColor: uiConfig.buttonColor,
          "&:hover": {
            backgroundColor: uiConfig.buttonColor,
          },
          width: 160,
          height: 160,
          color: "black",
          fontSize: 80,
          fontWeight: "bold",
        }}
      >
        {"<"}
      </Button>
      <Box position="relative">
        <Box>
          {hide ? (
            <Box width={82} />
          ) : (
            Array.from({ length: 3 }).map((_, index) => (
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
            ))
          )}
        </Box>
      </Box>
      <Button
        variant="contained"
        onClick={() => submitHandler(">")}
        sx={{
          backgroundColor: uiConfig.buttonColor,
          "&:hover": {
            backgroundColor: uiConfig.buttonColor,
          },
          width: 160,
          height: 160,
          color: "black",
          fontSize: 80,
          fontWeight: "bold",
        }}
      >
        {">"}
      </Button>
    </Box>
  );
};
