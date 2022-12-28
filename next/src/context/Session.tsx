import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

interface Player {
  name: string;
}
export interface Session {
  id: string;
  p1?: Player;
  p2?: Player;
  iAm: "p1" | "p2";
  firstMover: "p1" | "p2";
}
type MaybeSession = Session | undefined;
type TSessionContext = [MaybeSession, Dispatch<SetStateAction<MaybeSession>>];
interface Props {
  children: ReactNode;
}

export const SessionContext = createContext<TSessionContext>([, () => {}]);

export const SessionProvider = ({ children }: Props) => {
  const [session, setSession] = useState<MaybeSession>();

  return (
    <SessionContext.Provider value={[session, setSession]}>{children}</SessionContext.Provider>
  );
};
