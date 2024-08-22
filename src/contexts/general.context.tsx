import { createContext, FC, ReactNode, useState } from "react";

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
