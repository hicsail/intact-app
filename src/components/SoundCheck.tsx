import { Box, Grid, Typography } from "@mui/material";
import { FC, useContext, useEffect, useState } from "react";
import { soundCheckConfig as uiConfig } from "../config/uiConfig";
import { GeneralContext, Stage } from "../contexts/general.context";
import { styled } from "@mui/system";

const AnimatedBox = styled(Box)(() => ({
  "&.fadeOut": {
    animation: "fadeOut 1s forwards",
  },
  "&.fadeIn": {
    animation: "fadeIn 1s forwards",
  },
  "@keyframes fadeOut": {
    from: { opacity: 1 },
    to: { opacity: 0 },
  },
  "@keyframes fadeIn": {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
}));

export const SoundCheck: FC = () => {
  const cxt = useContext(GeneralContext);

  const [values, setValues] = useState(Array.from({ length: 10 }).map(() => "unselected"));
  const [randomNum, setRandomNum] = useState(-1);
  const [hasSelected, setHasSelected] = useState(false);
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    setRandomNum(Math.floor(Math.random() * 9));
  }, []);

  useEffect(() => {
    if (randomNum === -1) {
      return;
    }

    console.log(randomNum + 1);
    // TODO: Add audio here
  }, [randomNum]);

  useEffect(() => {
    if (hasSelected) {
      setTimeout(() => {
        setValues(Array.from({ length: 10 }).map(() => "unselected"));
        setRandomNum(Math.floor(Math.random() * 10));
        setHasSelected(false);
        setAnimationClass("fadeIn");
      }, 2000);
    }
  }, [hasSelected]);

  const clickHandler = (index: number) => {
    if (hasSelected) {
      return;
    }

    setValues((prev) => {
      const newValues = [...prev];
      newValues[index] = index === randomNum ? "correct" : "incorrect";
      return newValues;
    });
    setHasSelected(true);

    if (index === randomNum) {
      setTimeout(() => {
        cxt?.setStage(Stage.TRANSITION);
      }, 2000);
    } else {
      setTimeout(() => {
        setAnimationClass("fadeOut");
      }, 1000);
    }
  };

  return (
    <Box marginX="auto" width="80%">
      <Typography variant="h4" textAlign="initial" fontWeight="bold" marginBottom={1}>
        Sound Check
      </Typography>
      <Typography variant="body1" fontSize={20} textAlign="initial">
        If you can hear this message, click the announced number.
      </Typography>
      <Typography variant="body1" fontSize={20} textAlign="initial">
        Otherwise, please increase your speaks volume.
      </Typography>
      <Grid container direction="column" spacing={1} marginTop={1}>
        {Array.from({ length: 3 }).map((_, rowIndex) => (
          <Grid container item spacing={1} key={rowIndex}>
            {Array.from({ length: 3 }).map((_, colIndex) => {
              const index = rowIndex * 3 + colIndex + 1;
              return (
                <Grid item key={colIndex}>
                  <AnimatedBox
                    width={uiConfig.buttonWidth}
                    height={uiConfig.buttonHeight}
                    fontSize={uiConfig.fontSize}
                    fontWeight="bold"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius={1}
                    className={animationClass}
                    sx={{
                      color: uiConfig.textColor[values[index - 1] as keyof typeof uiConfig.textColor],
                      backgroundColor: uiConfig.buttonColor[values[index - 1] as keyof typeof uiConfig.buttonColor],
                    }}
                    onClick={() => clickHandler(index - 1)}
                  >
                    {index}
                  </AnimatedBox>
                </Grid>
              );
            })}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
