import { createContext, useEffect, useMemo, useState } from "react";
import { generalConfig, memoryRecallConfig, visualPairsConfig } from "../config/testConfig";
import { randomSelectFromList, randomSelectFromNumberRange } from "../utils/generalUtils";

interface TestContextType {
  memoryRecallSetup: string[];
  digitSymbolMatchingSetup: number[];
  choiceReactionTimeSetup: (0 | 1 | 2)[];
  spacialMemorySetup: number[];
  visualPairSetupImageList: string[];
  visualPairSetupIdxPairs: number[][];
}

export const TestContext = createContext<TestContextType | undefined>(undefined);

export interface TestProviderProps {
  children: React.ReactNode;
}

// TODO: Fix the issue with the visualPairsUsedIdx not resetting properly
export const TestProvider: React.FC<TestProviderProps> = ({ children }) => {
  const [visualPairsUsedIdx, setVisualPairsUsedIdx] = useState(
    visualPairsConfig.imageThemes.reduce((acc, cur) => {
      acc[cur] = [];
      return acc;
    }, {} as Record<string, number[]>)
  );

  const memoryRecallSetup: string[] = useMemo(
    () =>
      Array.from({ length: memoryRecallConfig.options.length }, () => randomSelectFromList(memoryRecallConfig.options)),
    []
  );

  const digitSymbolMatchingSetup: number[] = useMemo(
    () => Array.from({ length: generalConfig.digitSymbolConfig }, () => Math.floor(Math.random() * 9)),
    []
  );
  const choiceReactionTimeSetup: (0 | 1 | 2)[] = useMemo(
    () => Array.from({ length: generalConfig.choiceReactionTime }, () => Math.floor(Math.random() * 3) as 0 | 1 | 2),
    []
  );
  const spacialMemorySetup: number[] = useMemo(() => generalConfig.spacialMemory, []);
  const visualPairSetupImageList: string[] = useMemo(
    () => Array.from({ length: generalConfig.visualPairs }, () => randomSelectFromList(visualPairsConfig.imageThemes)),
    []
  );
  const visualPairSetupIdxPairs: number[][] = useMemo(
    () =>
      Array.from({ length: generalConfig.visualPairs }, (_, idx) => {
        let pair: number[];
        if (visualPairSetupImageList[idx] === "example") {
          pair = randomSelectFromNumberRange(1, 6, 2, false, visualPairsUsedIdx[visualPairSetupImageList[idx]]);
        } else {
          pair = randomSelectFromNumberRange(1, 8, 2, false, visualPairsUsedIdx[visualPairSetupImageList[idx]]);
        }

        setVisualPairsUsedIdx((prev) => {
          prev[visualPairSetupImageList[idx]].push(...pair);
          return prev;
        });

        return pair;
      }),
    []
  );

  useEffect(() => {
    return () => {
      setVisualPairsUsedIdx(
        visualPairsConfig.imageThemes.reduce((acc, cur) => {
          acc[cur] = [];
          return acc;
        }, {} as Record<string, number[]>)
      );
    };
  }, []);

  return (
    <TestContext.Provider
      value={{
        memoryRecallSetup,
        digitSymbolMatchingSetup,
        choiceReactionTimeSetup,
        spacialMemorySetup,
        visualPairSetupImageList,
        visualPairSetupIdxPairs,
      }}
    >
      {children}
    </TestContext.Provider>
  );
};
