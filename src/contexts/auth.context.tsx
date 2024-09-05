import { createContext, FC, ReactNode, useState } from "react";

interface AuthContextType {
  participantId: string | undefined;
  setParticipantId: (id: string | undefined) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [participantId, setParticipantId] = useState<string | undefined>("");

  return <AuthContext.Provider value={{ participantId, setParticipantId }}>{children}</AuthContext.Provider>;
};
