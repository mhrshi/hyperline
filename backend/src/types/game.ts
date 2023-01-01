export type Players = "p1" | "p2";
export type Winner = Players | "none" | undefined;

export type GameHostBody = { gamerName: string };
export type GameJoinBody = { gamerName: string; roomId: string };
export type GameResetBody = { gridSize: number };
export type PlayerMarkBody = { updatedBoard: number[]; markedIndex: number };

export type GameHostedBody = { roomId: string };
export type GameJoinedBody = { success: false } | { success: true; p1: string; p2: string };
export type PlayerMarkedBody = { winner: Winner; updatedBoard: number[]; nextTurn: Players };
