import { Box, Grid } from "@mui/material";
import { FC, useContext, useEffect, useState } from "react";
import { getNextTestPhase, randomSelectFromNumberRange, shuffleList } from "../../utils/general.utils";
import { visualPairsConfig as uiConfig } from "../../config/ui.config";
import { TestContext } from "../../contexts/test.context";
import { TestPhase } from "../../contexts/general.context";
import { VisualPairedAssociatesResult } from "../../contexts/types/result.type";

interface VisualPairsRecallProps {
  toTestPhase: (testPhase: TestPhase) => void;
}

export const VisualPairsRecall: FC<VisualPairsRecallProps> = ({ toTestPhase }) => {
  const testCxt = useContext(TestContext);

  const [questionIdx, setQuestionIdx] = useState(0);
  const [startTime, setStartTime] = useState<number>(0);

  const [options, setOptions] = useState<number[]>([]);
  let imageTheme = Object.keys(testCxt!.visualPairSetupImageSetup)[questionIdx];
  let reference = Object.values(testCxt!.visualPairSetupImageSetup)[questionIdx][0];
  let correct = Object.values(testCxt!.visualPairSetupImageSetup)[questionIdx][1];

  useEffect(() => {
    if (Number(sessionStorage.getItem("testPhase")) === TestPhase.VISUAL_PAIRS_RECALL) {
      setQuestionIdx(Number(sessionStorage.getItem("questionNumber")));
    }

    setOptions(
      imageTheme === "example"
        ? shuffleList([...randomSelectFromNumberRange(1, 6, 4, false, [reference, correct]), correct])
        : shuffleList([...randomSelectFromNumberRange(1, 8, 4, false, [reference, correct]), correct])
    );
    setStartTime(Date.now());
  }, []);

  useEffect(() => {
    setOptions(
      imageTheme === "example"
        ? shuffleList([...randomSelectFromNumberRange(1, 6, 4, false, [reference, correct]), correct])
        : shuffleList([...randomSelectFromNumberRange(1, 8, 4, false, [reference, correct]), correct])
    );
    setStartTime(Date.now());
  }, [questionIdx]);

  const submitHandler = (selected: number) => {
    const answer: VisualPairedAssociatesResult = {
      vpa_rt: Date.now() - startTime,
      vpa_correct: selected === correct,
      vpa_response: `${imageTheme}${selected}.jpg`,
    };

    if (!sessionStorage.getItem("results")) {
      sessionStorage.setItem("results", "[]");
    }
    const resultList = JSON.parse(sessionStorage.getItem("results")!);
    sessionStorage.setItem("results", JSON.stringify([...resultList, answer]));

    if (questionIdx + 1 >= Object.values(testCxt!.visualPairSetupImageSetup).length) {
      toTestPhase(getNextTestPhase(TestPhase.VISUAL_PAIRS_RECALL));
    } else {
      sessionStorage.setItem("questionNumber", String(questionIdx + 1));
      setQuestionIdx((idx) => idx + 1);
    }
  };

  return (
    <Box>
      <Grid container direction="column" gap={1}>
        <Grid container spacing={1}>
          <Grid item>
            <Box
              component="img"
              height={uiConfig.imageHeight - 2 * 3}
              src={`/assets/visual-pair/${imageTheme}${reference}.jpg`}
              border="3px solid red"
            />
          </Grid>
          <Grid item>
            <Box
              component="img"
              height={uiConfig.imageHeight}
              src={`/assets/visual-pair/${imageTheme}${options[0]}.jpg`}
              onClick={() => submitHandler(options[0])}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          {options.slice(1, 3).map((option, idx) => (
            <Grid key={idx} item>
              <Box
                component="img"
                height={uiConfig.imageHeight}
                src={`/assets/visual-pair/${imageTheme}${option}.jpg`}
                onClick={() => submitHandler(option)}
              />
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={1}>
          {options.slice(3).map((option, idx) => (
            <Grid key={idx} item>
              <Box
                component="img"
                height={uiConfig.imageHeight}
                src={`/assets/visual-pair/${imageTheme}${option}.jpg`}
                onClick={() => submitHandler(option)}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};
