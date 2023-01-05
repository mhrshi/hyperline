import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { SocketContext } from "./Socket";

import type { Session } from "@backend-shared-types/game";

type MaybeSession = Session | undefined;
type TSessionContext = [MaybeSession, Dispatch<SetStateAction<MaybeSession>>];
interface Props {
  children: ReactNode;
}

export const SessionContext = createContext<TSessionContext>([, () => {}]);

const SESSION_KEY = "hyperline";

export const SessionProvider = ({ children }: Props) => {
  const socket = useContext(SocketContext);
  const [session, setSession] = useState<MaybeSession>();

  useEffect(() => {
    const val = sessionStorage.getItem(SESSION_KEY);
    if (val) {
      const session = JSON.parse(val) as Session;
      setSession(session);
      socket.auth = { session };
    }
    socket.connect();
  }, [socket]);

  useEffect(() => {
    if (!session) {
      sessionStorage.removeItem(SESSION_KEY);
      return;
    }
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }, [session]);

  return (
    <SessionContext.Provider value={[session, setSession]}>{children}</SessionContext.Provider>
  );
};
