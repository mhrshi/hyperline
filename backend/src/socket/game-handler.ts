import { nanoid } from "nanoid/async";
import ROOMS from "./ROOMS.js";
import { checkTie, checkWin } from "../game.js";

import type { TypedServer, TypedSocket } from "../types/socket-io.js";
import type { Board, Players } from "../types/game.js";

const TWO_MINS = 1000 * 60 * 2;

const roomIdFrom = (socket: TypedSocket) => [...socket.rooms].filter((r) => r !== socket.id)[0];
const otherPlayer = (curr: Players) => (curr === "p1" ? "p2" : "p1");
const makeEmptyBoard = (size: number): Board => Array(size).fill(Array(size).fill(0));

const gameHandler = (io: TypedServer, socket: TypedSocket) => {
  socket.on("game:host", async ({ gamerName }) => {
    const roomId = await nanoid(9);
    socket.join(roomId);
    ROOMS[roomId] = {
      p1: gamerName,
      p2: undefined,
      nextTurn: "p1",
      board: Array(3).fill([0, 0, 0]),
    };
    socket.emit("game:hosted", { roomId });
  });

  socket.on("game:join", ({ gamerName, roomId }) => {
    if (ROOMS[roomId] && ROOMS[roomId].p2 === undefined) {
      ROOMS[roomId].p2 = gamerName;
      socket.join(roomId);
      const { p1, p2 } = ROOMS[roomId];
      io.to(roomId).emit("game:joined", { success: true, p1, p2: p2! });
    } else {
      socket.emit("game:joined", { success: false });
    }
  });

  socket.on("game:reset", ({ gridSize }) => {
    const roomId = roomIdFrom(socket);
    io.to(roomId).emit("game:reset", { gridSize });
    ROOMS[roomId] = {
      ...ROOMS[roomId],
      nextTurn: otherPlayer(ROOMS[roomId].nextTurn),
      board: makeEmptyBoard(gridSize),
      winner: undefined,
      wonLocus: undefined,
    };
  });

  socket.on("disconnecting", (_reason) => {
    const roomId = roomIdFrom(socket);
    if (!roomId || !ROOMS[roomId]) return;
    ROOMS[roomId].waitingForPlayerReconnect = setTimeout(() => {
      delete ROOMS[roomId];
      io.to(roomId).emit("game:left");
    }, TWO_MINS);
  });

  socket.on("player:mark", ({ updatedBoard, locus }) => {
    const roomId = roomIdFrom(socket);
    const playerMark = updatedBoard[locus[0]][locus[1]];
    const wonLocus = checkWin(updatedBoard, locus);
    const winner = wonLocus
      ? (`p${playerMark}` as Players)
      : checkTie(updatedBoard)
      ? "none"
      : undefined;
    const nextTurn = ("p" + (3 - playerMark)) as Players;
    io.to(roomId).emit("player:marked", { nextTurn, updatedBoard, winner, wonLocus });
    ROOMS[roomId] = { ...ROOMS[roomId], board: updatedBoard, nextTurn, winner, wonLocus };
  });
};

export default gameHandler;
