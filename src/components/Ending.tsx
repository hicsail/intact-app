import { FC, useEffect } from "react";
import { Box, Divider, Typography } from "@mui/material";

export const Ending: FC = () => {
  useEffect(() => {
    sessionStorage.clear();
  }, []);

  return (
    <>
      <Box marginX="auto" position="absolute" top="10%" width="85%" sx={{ transform: "translateX(-50%)" }}>
        <Typography variant="h4" textAlign="initial" fontWeight="bold" marginBottom={1}>
          Congratulations
        </Typography>
        <Divider />
        <Typography variant="body1" gutterBottom fontSize={18} textAlign="initial" marginY={2}>
          You have completed the test. Thank you for participating.
        </Typography>
        <Typography variant="body1" gutterBottom fontSize={18} textAlign="initial" marginY={2}>
          You may now close the tab.
        </Typography>
      </Box>
    </>
  );
};
