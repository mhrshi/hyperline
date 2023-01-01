import type { Server, Socket } from "socket.io";
import type { ClientToServerEvents, ServerToClientEvents } from "./socket-events.js";

export type TypedServer = Server<ClientToServerEvents, ServerToClientEvents>;
export type TypedSocket = Socket<ClientToServerEvents, ServerToClientEvents>;
