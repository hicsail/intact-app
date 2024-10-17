import { createContext, Dispatch, FC, ReactNode, SetStateAction, useState } from "react";

export enum Stage {
  NULL = 0,
  SOUND_CHECK = 1,
  GENERAL_DIRECTION = 2,
  TRANSITION = 3,
  TEST = 4,
  ENDING = 5,
}

export enum TestPhase {
  NULL = 0,
  CHOICE_REACTION_TIME = 1,
  SPATIAL_MEMORY = 2,
  MEMORY_RECALL_IMMEDIATE = 3,
  MEMORY_RECALL_DELAYED = 4,
  DIGIT_SYMBOL_MATCHING = 5,
  VISUAL_PAIRS_MEMORIZE = 6,
  VISUAL_PAIRS_RECALL = 7,
  FINISHED = 8,
}

interface GeneralContextType {
  soundCheckNumber: number;
  setSoundCheckNumber: Dispatch<SetStateAction<number>>;
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
  const [soundCheckNumber, setSoundCheckNumber] = useState<number>(Math.floor(Math.random() * 9));
  const [testPhase, setTestPhase] = useState<TestPhase>(TestPhase.NULL);
  const [stage, setStage] = useState<Stage>(Stage.NULL);

  return (
    <GeneralContext.Provider
      value={{ soundCheckNumber, setSoundCheckNumber, testPhase, setTestPhase, stage, setStage }}
    >
      {children}
    </GeneralContext.Provider>
  );
};
