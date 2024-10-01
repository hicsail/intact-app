import { FC, useContext, useEffect, useState } from "react";
import { visualPairsConfig as testConfig } from "../../config/test.config";
import { Grid } from "@mui/material";
import { TestContext } from "../../contexts/test.context";
import { TestPhase } from "../../contexts/general.context";
import { getNextTestPhase } from "../../utils/general.utils";

interface ChoiceReactionTimeMemorizeProps {
  toTestPhase: (testPhase: TestPhase) => void;
}

export const VisualPairsMemorize: FC<ChoiceReactionTimeMemorizeProps> = ({ toTestPhase }) => {
  const testCxt = useContext(TestContext);

  const [pairIdx, setPairIdx] = useState(-1);
  const imageGroupList = Object.keys(testCxt!.visualPairSetupImageSetup);
  const idxPairs = Object.values(testCxt!.visualPairSetupImageSetup);

  useEffect(() => {
    setPairIdx(0);
  }, []);

  useEffect(() => {
    if (pairIdx >= imageGroupList.length) {
      submitHandler();
    }

    const timer = setTimeout(() => {
      setPairIdx((idx) => idx + 1);
    }, testConfig.timeToMemorize);
    return () => {
      clearTimeout(timer);
    };
  }, [pairIdx]);

  const submitHandler = () => {
    toTestPhase(getNextTestPhase(TestPhase.VISUAL_PAIRS_MEMORIZE));
  };

  return (
    <>
      {pairIdx >= 0 && pairIdx < imageGroupList.length && (
        <Grid container direction="column" spacing={3}>
          <Grid
            item
            component="img"
            src={`/assets/visual-pair/${imageGroupList[pairIdx]}${idxPairs[pairIdx][0]}.jpg`}
          />
          <Grid
            item
            component="img"
            src={`/assets/visual-pair/${imageGroupList[pairIdx]}${idxPairs[pairIdx][1]}.jpg`}
          />
        </Grid>
      )}
    </>
  );
};
