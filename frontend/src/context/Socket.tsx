import { createContext, ReactNode } from "react";
import { io } from "socket.io-client";

import type { Socket } from "socket.io-client";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from "@backend-shared-types/socket-events";

type TypedSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

const socket: TypedSocket = io(process.env.NEXT_PUBLIC_SOCKET_DOMAIN ?? "", {
  path: "/ws/",
  autoConnect: false,
});
export const SocketContext = createContext(socket);

interface Props {
  children: ReactNode;
}

export const SocketProvider = ({ children }: Props) => (
  <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
);
