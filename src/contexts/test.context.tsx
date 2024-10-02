import { createContext, useMemo } from "react";
import { generalConfig } from "../config/test.config";

interface TestContextType {
  memoryRecallSetup: string[];
  digitSymbolMatchingSetup: number[];
  choiceReactionTimeSetup: (0 | 1 | 2)[];
  spatialMemorySetup: boolean[][][];
  visualPairSetupImageSetup: { [key: string]: number[] };
}

export const TestContext = createContext<TestContextType | undefined>(undefined);

export interface TestProviderProps {
  children: React.ReactNode;
}

export const TestProvider: React.FC<TestProviderProps> = ({ children }) => {
  const memoryRecallSetup: string[] = useMemo(() => generalConfig.memoryRecallAns, []);
  const digitSymbolMatchingSetup: number[] = useMemo(() => generalConfig.digitSymbolAns, []);
  const choiceReactionTimeSetup: (0 | 1 | 2)[] = useMemo(() => generalConfig.choiceReactionTimeAns, []);
  const spatialMemorySetup: boolean[][][] = useMemo(
    () => generalConfig.spatialMemoryAns.map((layer) => layer.map((row) => row.map((value) => value === 1))),
    []
  );
  const visualPairSetupImageSetup: { [key: string]: number[] } = useMemo(() => generalConfig.visualPairsAns, []);

  return (
    <TestContext.Provider
      value={{
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
