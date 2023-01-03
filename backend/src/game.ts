import type { Board, Locus } from "./types/game.js";

const AXES: Locus[][] = [
  [
    [-1, 0],
    [1, 0],
  ], // North & South
  [
    [0, -1],
    [0, 1],
  ], // West & East
  [
    [-1, -1],
    [1, 1],
  ], // NW & SE
  [
    [-1, 1],
    [1, -1],
  ], // NE & SW
];

const makeUnvisited = (size: number) =>
  [...Array(size)].map(() => Array<boolean>(size).fill(false));

const findDiametricMarks = (board: Board, [rootX, rootY]: Locus, maxDepth: 3 | 4) => {
  const size = board.length;
  const mark = board[rootX][rootY];
  const visited = makeUnvisited(size);

  const dfsInDirection = (direction: Locus, currDepth: number, node: Locus): number => {
    const [X, Y] = node;
    const isOutOfBounds = X < 0 || X >= size || Y < 0 || Y >= size || currDepth >= maxDepth;
    if (isOutOfBounds || board[X][Y] !== mark || visited[X][Y]) {
      return 0;
    }
    visited[X][Y] = true;
    markedInAxis.push(node);
    const [x, y] = direction;
    return 1 + dfsInDirection(direction, currDepth + 1, [X + x, Y + y]);
  };

  let markedInAxis: Locus[];
  return AXES.map((axis) => {
    const [[x1, y1], [x2, y2]] = axis;
    markedInAxis = [[rootX, rootY]];
    const markedThisSide = dfsInDirection(axis[0], 1, [rootX + x1, rootY + y1]);
    const markedThatSide = dfsInDirection(axis[1], 1, [rootX + x2, rootY + y2]);
    return 1 + markedThisSide + markedThatSide === maxDepth ? markedInAxis : undefined;
  });
};

export const checkWin = (board: Board, locus: Locus) => {
  const maxDepth = board.length === 3 ? 3 : 4;
  const diametricMarks = findDiametricMarks(board, locus, maxDepth);
  return diametricMarks.filter(Boolean)[0];
};

export const checkTie = (board: Board) => board.flat().indexOf(0) === -1;
