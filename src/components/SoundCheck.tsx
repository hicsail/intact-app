import { Box, Divider, Grid, IconButton, Typography } from "@mui/material";
import { FC, useContext, useEffect, useState } from "react";
import { soundCheckConfig as uiConfig } from "../config/ui.config";
import { GeneralContext, Stage } from "../contexts/general.context";
import { styled } from "@mui/system";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

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

const OverlayWrapper = styled(Box)(() => ({
  position: "relative",
  width: "100%",
  height: "100%",
}));

const Overlay = styled(Box)(() => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(255, 255, 255, 0.6)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 10,
}));

export const SoundCheck: FC = () => {
  const cxt = useContext(GeneralContext);

  const [values, setValues] = useState(Array.from({ length: 10 }).map(() => "unselected"));
  const [hasSelected, setHasSelected] = useState(false);
  const [animationClass, setAnimationClass] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    setDisabled(true);
  }, [hasSelected]);

  const playHandler = () => {
    setHide(true);
    const audioUrl = import.meta.env.VITE_SOUND_CHECK_AUDIO_URL;
    const audio = new Audio(audioUrl.replace("{number}", String(cxt!.soundCheckNumber + 1)));

    audio
      .play()
      .then(() => {
        audio.onended = () => {
          setDisabled(false);
        };
      })
      .catch((error) => {
        console.error("Error playing audio", error);
      });
  };

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
        cxt?.setStage(Stage.GENERAL_DIRECTION);
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
        cxt?.setSoundCheckNumber(() => {
          const randomNum = Math.floor(Math.random() * 9);
          const newAudioUrl = import.meta.env.VITE_SOUND_CHECK_AUDIO_URL.replace("{number}", String(randomNum + 1));
          const newAudio = new Audio(newAudioUrl);

          newAudio
            .play()
            .then(() => {
              newAudio.onended = () => {
                setDisabled(false);
              };
            })
            .catch((error) => {
              console.error("Error playing audio", error);
            });

          return randomNum;
        });
      }, 2500);
    }
  };

  return (
    <Box marginX="auto" position="absolute" top="10%" width="85%" sx={{ transform: "translateX(-50%)" }}>
      <Typography variant="h4" textAlign="initial" fontWeight="bold" marginBottom={1}>
        Sound Check
      </Typography>
      <Divider />
      <Typography variant="body1" fontSize={18} textAlign="initial" marginTop={2}>
        If you can hear this message, press the announced number.
      </Typography>
      <Typography variant="body1" fontSize={18} textAlign="initial" marginBottom={2}>
        Otherwise, please increase your speakers volume.
      </Typography>
      <OverlayWrapper>
        <Grid container direction="column" spacing={1} marginTop={1} marginX="auto">
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
        {!hide && (
          <Overlay className={animationClass}>
            <IconButton onClick={playHandler}>
              <PlayCircleIcon sx={{ fontSize: 90 }} />
            </IconButton>
          </Overlay>
        )}
      </OverlayWrapper>
    </Box>
  );
};
