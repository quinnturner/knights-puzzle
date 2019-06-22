// Initial parameters
const sizeX = 30;
const sizeY = 30;
const sx = 0;
const sy = 0;
const dx = 28;
const dy = 29;

// Set up a chess board with the current minimum number
// of moves to reach each square from the current to be a large number
const visited = Array(sizeX)
  .fill(null)
  .map(() => Array(sizeY).fill(Number.MAX_SAFE_INTEGER));

// Function to get legal knight moves from your current position
// ensuring that it doesn't go out of bounds
const legalKnightMoves = (x: number, y: number) =>
  [
    [x - 1, y - 2],
    [x + 1, y - 2],
    [x - 2, y - 1],
    [x + 2, y - 1],
    [x - 1, y + 2],
    [x + 1, y + 2],
    [x - 2, y + 1],
    [x + 2, y + 1]
  ].filter(val => !val.find(v => v < 0) && val[0] < sizeX && val[1] < sizeY);

const bfs = (x: number, y: number, moves: number) => {
  if (x === dx && y === dy) {
    return moves;
  }
  const nextMove = moves + 1;
  legalKnightMoves(x, y)
    .filter(val => {
      // Get the new x and new y
      const [nx, ny] = val;
      // If it now takes less moves that it took previously to get here
      // set the min num of moves for that square to the nextMove value
      if (nextMove < visited[nx][ny]) {
        visited[nx][ny] = nextMove;
        return val;
      }
    })
    // For each of the remaining legal moves, continue exploring starting from that position,
    // finding the minimum number of spaces to reach the goal from that square
    .forEach(([nx, ny]) => bfs(nx, ny, nextMove));
  return visited[dx][dy];
};

const dfs = () => {
  const bestPathReversed: number[][] = [];
  let cx = dx;
  let cy = dy;
  while (cx !== sx || cy !== sy) {
    bestPathReversed.push([cx, cy]);
    const bestMove = visited[cx][cy];
    const nextMoveCount = bestMove - 1;
    const nextMove = legalKnightMoves(cx, cy).find(
      ([nx, ny]) => visited[nx][ny] === nextMoveCount
    );
    cx = nextMove[0];
    cy = nextMove[1];
  }
  return bestPathReversed.reverse();
};

const square = (x: number, y: number) => x >= 26 ? `[${x}, ${y}]` : `${String.fromCharCode(x + 65)}${y + 1}`

const bestPathToString = (path: number[][]) => {
  return path
    .map(([x, y]) => `N${square(x, y)}`)
    .join(", ");
};

if (sx < 0 || sy < 0 || sx >= sizeX || sy >= sizeY) {
  throw new Error(`Illegal starting position [${sx}, ${sy}]`);
}

if (dx < 0 || dy < 0 || dx >= sizeX || dy >= sizeY) {
  throw new Error(`Illegal destination position [${dx}, ${dy}]`);
}


// it takes 0 moves to get to the starting square
visited[sx][sy] = 0;
// Calculate the minimum moves from the starting location.
const result = bfs(sx, sy, 0);
const shortestPath = dfs();
const shortestPathString = bestPathToString(shortestPath);
const start = square(sx, sy);
const end = square(dx, dy);
console.log(
  `The minimum number of moves to reach ${end} from ${start} with a knight on an ${sizeX}x${sizeY} board is ${result}.`
);
console.log(`Path: ${shortestPathString}`);
