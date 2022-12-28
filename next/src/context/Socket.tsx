import { createContext, ReactNode } from "react";
import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_DOMAIN ?? "", { path: "/backend/" });
export const SocketContext = createContext(socket);

interface Props {
  children: ReactNode;
}

export const SocketProvider = ({ children }: Props) => (
  <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
);
