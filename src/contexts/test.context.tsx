import { createContext, useMemo } from "react";
import { generalConfig } from "../config/test.config";

interface TestContextType {
  memoryRecallSetup: string[];
  digitSymbolMatchingSetup: number[];
  choiceReactionTimeSetup: (0 | 1 | 2)[];
  spacialMemorySetup: boolean[][][];
  visualPairSetupImageSetup: { [key: string]: number[] };
}

export const TestContext = createContext<TestContextType | undefined>(undefined);

export interface TestProviderProps {
  children: React.ReactNode;
}

// TODO: Fix the issue with the visualPairsUsedIdx not resetting properly
export const TestProvider: React.FC<TestProviderProps> = ({ children }) => {
  const memoryRecallSetup: string[] = useMemo(() => generalConfig.memoryRecallAns, []);
  const digitSymbolMatchingSetup: number[] = useMemo(() => generalConfig.digitSymbolAns, []);
  const choiceReactionTimeSetup: (0 | 1 | 2)[] = useMemo(() => generalConfig.choiceReactionTimeAns, []);
  const spacialMemorySetup: boolean[][][] = useMemo(
    () => generalConfig.spacialMemoryAns.map((layer) => layer.map((row) => row.map((value) => value === 1))),
    []
  );
  const visualPairSetupImageSetup: { [key: string]: number[] } = useMemo(() => generalConfig.visualPairsAns, []);

  return (
    <TestContext.Provider
      value={{
        memoryRecallSetup,
        digitSymbolMatchingSetup,
        choiceReactionTimeSetup,
        spacialMemorySetup,
        visualPairSetupImageSetup,
      }}
    >
      {children}
    </TestContext.Provider>
  );
};
