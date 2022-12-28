import { createContext, ReactNode } from "react";
import { io } from "socket.io-client";

const socket = io("192.168.1.8:5000", { path: "/backend/" });
export const SocketContext = createContext(socket);

interface Props {
  children: ReactNode;
}

export const SocketProvider = ({ children }: Props) => (
  <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
);
