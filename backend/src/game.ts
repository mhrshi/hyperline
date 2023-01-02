type Locus = [number, number];

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

const make2DBoardFrom = (oneDBoard: number[]) => {
  const size = Math.floor(Math.sqrt(oneDBoard.length));
  return Array(size)
    .fill(0)
    .map((_, i) => oneDBoard.slice(i * size, size + i * size));
};

const findDiametricMarks = (board: number[][], [rootX, rootY]: Locus, maxDepth: 3 | 4) => {
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
    const [x, y] = direction;
    return 1 + dfsInDirection(direction, currDepth + 1, [X + x, Y + y]);
  };

  return AXES.map((axis) => {
    const [[x1, y1], [x2, y2]] = axis;
    const markedThisSide = dfsInDirection(axis[0], 1, [rootX + x1, rootY + y1]);
    const markedThatSide = dfsInDirection(axis[1], 1, [rootX + x2, rootY + y2]);
    return 1 + markedThisSide + markedThatSide;
  });
};

export const checkWin = (oneDBoard: number[], markedIndex: number) => {
  const board = make2DBoardFrom(oneDBoard);
  const size = board.length;
  const rootNode = [Math.floor(markedIndex / size), markedIndex % size] as Locus;
  const maxDepth = size === 3 ? 3 : 4;
  const diametricMarks = findDiametricMarks(board, rootNode, maxDepth);
  return diametricMarks.includes(maxDepth);
};

export const checkTie = (oneDBoard: number[], _markedIndex: number) => oneDBoard.indexOf(0) === -1;
