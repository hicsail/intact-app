import { createContext, FC, ReactNode, useState } from "react";

export enum Stage {
  NULL,
  GENERAL_DIRECTION,
  SOUND_CHECK,
  TRANSITION,
  TEST,
}

export enum TestPhase {
  NULL,
  CHOICE_REACTION_TIME,
  SPACIAL_MEMORY,
  MEMORY_RECALL_IMMEDIATE,
  MEMORY_RECALL_DELAYED,
  DIGIT_SYMBOL_MATCHING,
  VISUAL_PAIRS_MEMORIZE,
  VISUAL_PAIRS_RECALL,
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
