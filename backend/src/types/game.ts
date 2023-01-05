export type Board = number[][];
export type Locus = [x: number, y: number];

export type Players = "p1" | "p2";
export type Winner = Players | "none" | undefined;

export type Session = {
  id: string;
  p1?: string;
  p2?: string;
  iAm: Players;
  firstMover: Players;
};

export type GameHostBody = { gamerName: string };
export type GameJoinBody = { gamerName: string; roomId: string };
export type GameResetBody = { gridSize: number };
export type PlayerMarkBody = { updatedBoard: Board; locus: Locus };

export type GameHostedBody = { roomId: string };
export type GameJoinedBody = { success: false } | { success: true; p1: string; p2: string };
export type GameSyncBody = { nextTurn: Players; board: Board; winner?: Winner; wonLocus?: Locus[] };
export type PlayerMarkedBody = {
  nextTurn: Players;
  updatedBoard: Board;
  winner: Winner;
  wonLocus?: Locus[];
};
