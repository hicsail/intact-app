import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { choiceReactionTimeConfig as uiConfig } from "../../config/ui.config";
import { generalConfig as testConfig } from "../../config/test.config";

const color0 = uiConfig.choiceColor.color0;
const color1 = uiConfig.choiceColor.color1;

interface CRTVisualProps {
  symbols: string[];
  colors: string[];
}

const CRTVisual: FC<CRTVisualProps> = ({ symbols, colors }) => (
  <Box display="flex" flexDirection="column" alignItems="center" marginY={2}>
    {symbols.map((symbol, index) => (
      <Box
        key={index}
        width={60}
        height={60}
        display="flex"
        alignItems="center"
        justifyContent="center"
        border={1}
        marginY={1}
        sx={{
          backgroundColor: colors[index],
        }}
      >
        <Typography variant="h3" fontWeight="bold" color="black">
          {symbol}
        </Typography>
      </Box>
    ))}
  </Box>
);

export const crtInstructions: JSX.Element[] = [
  <>
    <CRTVisual symbols={[">", "<", ">"]} colors={[color0, color1, color1]} />
    <Typography variant="body1" gutterBottom fontSize={18} textAlign="initial" marginTop={2}>
      Look at the 3 colored squares.
    </Typography>
    <Typography variant="body1" gutterBottom fontSize={18} textAlign="initial" marginBottom={2}>
      Two squares are the same color, one is different (ODD-COLOR).
    </Typography>
  </>,
  <>
    <CRTVisual symbols={[">", "<", ">"]} colors={[color0, color1, color1]} />
    <Typography variant="body1" gutterBottom fontSize={18} textAlign="initial" marginTop={2}>
      Now look at the ARROW inside the ODD-COLOR.
    </Typography>
    <Typography variant="body1" gutterBottom fontSize={18} textAlign="initial" marginBottom={2}>
      When the odd-color arrow points <strong>right</strong>, tap the <strong>RIGHT-ARROW</strong> button at the{" "}
      <strong>bottom</strong> of the screen with your <strong>right</strong> hand.
    </Typography>
  </>,
  <>
    <CRTVisual symbols={[">", "<", "<"]} colors={[color0, color0, color1]} />
    <Typography variant="body1" gutterBottom fontSize={18} textAlign="initial" marginY={2}>
      When the odd-color arrow points <strong>left</strong>, tap the <strong>LEFT-ARROW</strong> button at the{" "}
      <strong>bottom</strong> of the screen with your <strong>left</strong> hand.
    </Typography>
  </>,
  <>
    <CRTVisual symbols={[">", "<", "<"]} colors={[color0, color0, color1]} />
    <Typography variant="body1" gutterBottom fontSize={18} textAlign="initial" marginY={2}>
      You will see {Object.keys(testConfig.choiceReactionTimeAns.baseline).length} sets of ARROWS. Please respond as
      fast as you can.
    </Typography>
  </>,
];
