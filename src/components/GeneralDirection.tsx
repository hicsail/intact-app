import { FC, useContext } from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import { GeneralContext, Stage } from "../contexts/general.context";

export const GeneralDirection: FC = () => {
  const cxt = useContext(GeneralContext);

  const continueButtonHandler = () => {
    cxt?.setStage(Stage.TRANSITION);
  };

  return (
    <>
      <Box marginX="auto" position="absolute" top="10%" width="85%" sx={{ transform: "translateX(-50%)" }}>
        <Typography variant="h4" textAlign="initial" fontWeight="bold" marginBottom={1}>
          Directions
        </Typography>
        <Divider />
        <Typography variant="body1" gutterBottom fontSize={18} textAlign="initial" marginY={2}>
          Please do <strong>NOT</strong> use paper! Solve all questions in your mind. Click "Begin Test" to proceed.
        </Typography>
      </Box>
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
        <Button variant="contained" sx={{ fontSize: 18, padding: 1.5 }} fullWidth onClick={continueButtonHandler}>
          Begin Test
        </Button>
      </Box>
    </>
  );
};
