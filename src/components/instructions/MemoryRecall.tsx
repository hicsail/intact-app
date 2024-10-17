import { Typography } from "@mui/material";

export const mriInstructions: JSX.Element[] = [
  <>
    <Typography variant="body1" gutterBottom fontSize={18} textAlign="initial" marginTop={2}>
      You will need to play the audio and remember the <strong>five</strong> animals you hear. You need to memorize them
      until the end of the test.
    </Typography>
  </>,
  <>
    <Typography variant="body1" gutterBottom fontSize={18} textAlign="initial" marginTop={2}>
      For this section, you will be asked to select the animals you heard from the list after you hear the audio.
    </Typography>
  </>,
];

export const mrdInstructions: JSX.Element[] = [
  <>
    <Typography variant="body1" gutterBottom fontSize={18} textAlign="initial" marginTop={2}>
      You have heard the names of five animals at the beginning of the test. Select those <strong>five</strong> animals.
    </Typography>
  </>,
];
