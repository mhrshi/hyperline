import type { Board, Locus, Players, Winner } from "../types/game.js";

const ROOMS: {
  [roomId: string]: {
    p1: string;
    p2?: string;
    nextTurn: Players;
    board: Board;
    winner?: Winner;
    wonLocus?: Locus[];
    waitingForPlayerReconnect?: NodeJS.Timeout;
  };
} = {};

export default ROOMS;
