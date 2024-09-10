import { createContext, FC, ReactNode, useState } from "react";

export enum Stage {
  NULL = 0,
  GENERAL_DIRECTION = 1,
  SOUND_CHECK = 2,
  TRANSITION = 3,
  TEST = 4,
}

export enum TestPhase {
  NULL = 0,
  CHOICE_REACTION_TIME = 1,
  SPACIAL_MEMORY = 2,
  MEMORY_RECALL_IMMEDIATE = 3,
  MEMORY_RECALL_DELAYED = 4,
  DIGIT_SYMBOL_MATCHING = 5,
  VISUAL_PAIRS_MEMORIZE = 6,
  VISUAL_PAIRS_RECALL = 7,
}

interface GeneralContextType {
  testPhase: TestPhase;
  stage: Stage;
  setTestPhase: (phase: TestPhase) => void;
  setStage: (stage: Stage) => void;
}

export const GeneralContext = createContext<GeneralContextType | undefined>(undefined);

export interface GeneralProviderProps {
  children: ReactNode;
}

export const GeneralProvider: FC<GeneralProviderProps> = ({ children }) => {
  const [testPhase, setTestPhase] = useState<TestPhase>(TestPhase.NULL);
  const [stage, setStage] = useState<Stage>(Stage.NULL);

  return (
    <GeneralContext.Provider value={{ testPhase, setTestPhase, stage, setStage }}>{children}</GeneralContext.Provider>
  );
};
