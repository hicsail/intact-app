import { FC, useEffect, useState } from "react";
import { visualPairsConfig as testConfig } from "../config/testConfig";
import { Grid } from "@mui/material";

interface ChoiceReactionTimeMemorizeProps {
  imageGroupList: string[];
  idxPairs: number[][];
  handleTransition: () => void;
}

export const VisualPairsMemorize: FC<ChoiceReactionTimeMemorizeProps> = ({
  imageGroupList,
  idxPairs,
  handleTransition,
}) => {
  const [pairIdx, setPairIdx] = useState(-1);

  useEffect(() => {
    setPairIdx(0);
  }, []);

  useEffect(() => {
    if (pairIdx >= imageGroupList.length) {
      handleTransition();
    }

    const timer = setTimeout(() => {
      setPairIdx((idx) => idx + 1);
    }, testConfig.timeToMemorize);
    return () => {
      clearTimeout(timer);
    };
  }, [pairIdx]);

  return (
    <>
      {pairIdx >= 0 && pairIdx < imageGroupList.length && (
        <Grid container direction="column" spacing={3}>
          <Grid
            item
            component="img"
            src={`../src/assets/visual-pair/${imageGroupList[pairIdx]}${idxPairs[pairIdx][0]}.jpg`}
          />
          <Grid
            item
            component="img"
            src={`../src/assets/visual-pair/${imageGroupList[pairIdx]}${idxPairs[pairIdx][1]}.jpg`}
          />
        </Grid>
      )}
    </>
  );
};
