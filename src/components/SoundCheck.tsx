import { Box, Grid, Typography } from "@mui/material";
import { FC, useContext, useEffect, useState } from "react";
import { soundCheckConfig as uiConfig } from "../config/uiConfig";
import { GeneralContext, Stage } from "../contexts/general.context";
import { styled } from "@mui/system";
import { playAudioFromS3 } from "../utils/awsUtils";

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
  const [hasSelected, setHasSelected] = useState(false);
  const [animationClass, setAnimationClass] = useState("");
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setDisabled(false);
    }, 8500);
  }, []);

  useEffect(() => {
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, 10500);
  }, [hasSelected]);

  const clickHandler = (index: number) => {
    if (disabled) {
      return;
    }

    if (hasSelected) {
      return;
    }

    setValues((prev) => {
      const newValues = [...prev];
      newValues[index] = index === cxt?.soundCheckNumber ? "correct" : "incorrect";
      return newValues;
    });
    setHasSelected(true);

    if (index === cxt?.soundCheckNumber) {
      setTimeout(() => {
        cxt?.setStage(Stage.TRANSITION);
      }, 2000);
    } else {
      setTimeout(() => {
        setAnimationClass("fadeOut");
      }, 1000);

      setTimeout(() => {
        setValues(Array.from({ length: 10 }).map(() => "unselected"));
        setHasSelected(false);
        setAnimationClass("fadeIn");
      }, 2000);

      setTimeout(() => {
        playAudioFromS3("soundcheck/instructions");
      }, 2500);
      setTimeout(() => {
        cxt?.setSoundCheckNumber(() => {
          const randomNum = Math.floor(Math.random() * 9);
          playAudioFromS3(`soundcheck/number-${randomNum + 1}`);

          return randomNum;
        });
      }, 9000);
    }
  };

  return (
    <Box marginX="auto">
      <Typography variant="h4" textAlign="initial" fontWeight="bold" marginBottom={1}>
        Sound Check
      </Typography>
      <Typography variant="body1" fontSize={20} textAlign="initial" width="80vw">
        If you can hear this message, click the announced number.
      </Typography>
      <Typography variant="body1" fontSize={20} textAlign="initial" width="80vw">
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
