import { createContext, useMemo, useState } from "react";
import { generalConfig } from "../config/test.config";

interface TestContextType {
  studyType: "baseline" | "followup";
  setStudyType: (studyType: "baseline" | "followup") => void;
  memoryRecallSetup: { [key: string]: string[] };
  digitSymbolMatchingSetup: { [key: string]: number[] };
  choiceReactionTimeSetup: { [key: string]: (0 | 1 | 2)[] };
  spatialMemorySetup: { [key: string]: boolean[][][] };
  visualPairSetupImageSetup: { [key: string]: { [key: string]: number[] } };
}

export const TestContext = createContext<TestContextType | undefined>(undefined);

export interface TestProviderProps {
  children: React.ReactNode;
}

export const TestProvider: React.FC<TestProviderProps> = ({ children }) => {
  const [studyType, setStudyType] = useState<"baseline" | "followup">("baseline");

  const memoryRecallSetup: { [key: string]: string[] } = useMemo(() => generalConfig.memoryRecallAns, []);
  const digitSymbolMatchingSetup: { [key: string]: number[] } = useMemo(() => generalConfig.digitSymbolAns, []);
  const choiceReactionTimeSetup: { [key: string]: (0 | 1 | 2)[] } = useMemo(
    () => generalConfig.choiceReactionTimeAns,
    []
  );
  const spatialMemorySetup: { [key: string]: boolean[][][] } = useMemo(() => {
    const baseline = generalConfig.spatialMemoryAns.baseline.map((layer) =>
      layer.map((row) => row.map((value) => value === 1))
    );
    const followup = generalConfig.spatialMemoryAns.followup.map((layer) =>
      layer.map((row) => row.map((value) => value === 1))
    );

    return {
      baseline,
      followup,
    };
  }, []);
  const visualPairSetupImageSetup: { [key: string]: { [key: string]: number[] } } = useMemo(
    () => generalConfig.visualPairsAns,
    []
  );

  return (
    <TestContext.Provider
      value={{
        studyType,
        setStudyType,
        memoryRecallSetup,
        digitSymbolMatchingSetup,
        choiceReactionTimeSetup,
        spatialMemorySetup,
        visualPairSetupImageSetup,
      }}
    >
      {children}
    </TestContext.Provider>
  );
};
