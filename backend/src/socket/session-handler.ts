import ROOMS from "./ROOMS.js";

import type { TypedSocket } from "../types/socket-io.js";
import type { Session } from "../types/game.js";

const sessionHandler = (socket: TypedSocket, next: () => void) => {
  const session: Session = socket.handshake.auth.session;
  if (session && ROOMS[session.id]) {
    socket.join(session.id);
    const { nextTurn, board, winner, wonLocus } = ROOMS[session.id];
    socket.emit("game:sync", { nextTurn, board, winner, wonLocus });
  }
  next();
};

export default sessionHandler;
