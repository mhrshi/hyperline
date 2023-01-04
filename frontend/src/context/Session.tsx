import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

import type { Session } from "@backend-shared-types/game";

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
