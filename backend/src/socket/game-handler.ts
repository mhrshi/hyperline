import { nanoid } from "nanoid/async";

import type { TypedServer, TypedSocket } from "../types/socket-io.js";

const ROOMS: {
  [roomId: string]: {
    p1: string;
    p2?: string;
  };
} = {};

const roomIdFrom = (socket: TypedSocket) => [...socket.rooms].filter((r) => r !== socket.id)[0];

const gameHandler = (io: TypedServer, socket: TypedSocket) => {
  socket.on("game:host", async ({ gamerName }) => {
    const roomId = await nanoid(11);
    socket.join(roomId);
    ROOMS[roomId] = {
      p1: gamerName,
      p2: undefined,
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
  });

  socket.on("disconnecting", (_reason) => {
    const roomId = roomIdFrom(socket);
    delete ROOMS[roomId];
    io.to(roomId).emit("game:left");
  });

  socket.on("player:mark", ({ updatedBoard, markedIndex }) => {
    const roomId = roomIdFrom(socket);
    const nextTurn = ("p" + (3 - updatedBoard[markedIndex])) as "p1" | "p2";
    const winner = checkForWinner(markedIndex, updatedBoard);
    io.to(roomId).emit("player:marked", { winner, updatedBoard, nextTurn });
  });
};

function checkForWinner(index: number, gridArray: number[]) {
  const gridSize = Math.round(Math.sqrt(gridArray.length)) as 3 | 5 | 7;

  if (index % (gridSize + 1) === 0) {
    const major = diagonalCheck(gridArray, gridSize, 1);
    if (major) return `p${major}` as "p1" | "p2";
  }

  if (index % (gridSize - 1) === 0) {
    const minor = diagonalCheck(gridArray, gridSize, -1);
    if (minor) return `p${minor}` as "p1" | "p2";
  }

  const rowRes = rowCheck(index, gridArray, gridSize);
  if (rowRes) return `p${rowRes}` as "p1" | "p2";

  const colRes = columnCheck(index, gridArray, gridSize);
  if (colRes) return `p${colRes}` as "p1" | "p2";

  return undefined;
}

function diagonalCheck(gridArray: number[], gridSize: 3 | 5 | 7, type: 1 | -1) {
  const jump = gridSize + type;
  let i = type === 1 ? 0 : gridSize - 1;
  let sum = 0;
  while (i < gridArray.length) {
    sum += gridArray[i] * grid["magic"][gridSize][i];
    i += jump;
  }
  const sumIndex = grid["wins"][gridSize].indexOf(sum);
  return sumIndex === -1 ? "" : sumIndex + 1;
}

function rowCheck(index: number, gridArray: number[], gridSize: 3 | 5 | 7) {
  let i = index - (index % gridSize);
  const end = i + gridSize;
  let sum = 0;
  while (i < end) {
    sum += gridArray[i] * grid["magic"][gridSize][i];
    i++;
  }
  const sumIndex = grid["wins"][gridSize].indexOf(sum);
  return sumIndex === -1 ? "" : sumIndex + 1;
}

function columnCheck(index: number, gridArray: number[], gridSize: 3 | 5 | 7) {
  const jump = gridSize;
  let i = index % gridSize;
  let sum = 0;
  while (i < gridArray.length) {
    sum += gridArray[i] * grid["magic"][gridSize][i];
    i += jump;
  }
  const sumIndex = grid["wins"][gridSize].indexOf(sum);
  return sumIndex === -1 ? "" : sumIndex + 1;
}

const grid = {
  magic: {
    3: [8, 1, 6, 3, 5, 7, 4, 9, 2],
    5: [17, 24, 1, 8, 15, 23, 5, 7, 14, 16, 4, 6, 13, 20, 22, 10, 12, 19, 21, 3, 11, 18, 25, 2, 9],
    7: [
      30, 39, 48, 1, 10, 19, 28, 38, 47, 7, 9, 18, 27, 29, 46, 6, 8, 17, 26, 35, 37, 5, 14, 16, 25,
      34, 36, 45, 13, 15, 24, 33, 42, 44, 4, 21, 23, 32, 41, 43, 3, 12, 22, 31, 40, 49, 2, 11, 20,
    ],
  },
  wins: {
    3: [15, 30],
    5: [65, 130],
    7: [175, 350],
  },
};

export default gameHandler;
