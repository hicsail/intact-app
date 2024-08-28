import { createContext, FC, ReactNode, useState } from "react";

export enum TestPhase {
  CHOICE_REACTION_TIME = "choice-reaction-time",
  SPACIAL_MEMORY = "spacial-memory",
  MEMORY_RECALL_IMMEDIATE = "memory-recall-immediate",
  MEMORY_RECALL_DELAYED = "memory-recall-delayed",
  DIGIT_SYMBOL_MATCHING = "digit-symbol-matching",
  VISUAL_PAIRS_MEMORIZE = "visual-pairs-memorize",
  VISUAL_PAIRS_RECALL = "visual-pairs-recall",
}

interface GeneralContextType {
  testPhase: string;
  setTestPhase: (phase: string) => void;
}

export const GeneralContext = createContext<GeneralContextType | undefined>(undefined);

export interface GeneralProviderProps {
  children: ReactNode;
}

export const GeneralProvider: FC<GeneralProviderProps> = ({ children }) => {
  const [testPhase, setTestPhase] = useState<string>("");

  return <GeneralContext.Provider value={{ testPhase, setTestPhase }}>{children}</GeneralContext.Provider>;
};
