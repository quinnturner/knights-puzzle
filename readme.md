# Knights Minimum Move Puzzle

This program will find the minimum number of moves for a knight to get from any point on a chess board to another. The board can be any rectangular shape of any size.

I did this on a Friday night at midnight because I was bored, don't take it too seriously :)

## Solution approach

The approach taken is not the most efficient, but I think it's easy to understand. First, a breadth-first-search (BFS) is performed to get from the start square to the end square. Each square that's passed is marked as `visited` with the minimum number of moves it takes to get to that square.

Next, a depth-first-search (DFS) is performed with context of the `visited` 2D array of minimum number of moves to access every square, moving from the end to the start. E.g. the end location takes 4 moves, the next to end location takes `4 - 1 = 3` moves, the next takes `4 - 2 = 2` moves, etc., until you reached the beginning square. It then maps that path to a human-readable format using ASCII character code math.

This program will overflow the stack during the BFS if provided with a high number of rows or columns. This could be fixed by making it a non-recursive program, but at the potential cost of readability.

## Running

The program was written in TypeScript `knights.ts` but has been pre-built as `knights.js`.

To re-build and run,

```sh
npm start
```

## Modifying the initial conditions

At the top of `knights.ts`, there are a list of initial conditions.

- Destination X (`dx`)
- Destination Y (`dy`)
- Start X (`sx`)
- Start Y (`sy`)
- Size X (`sizeX`)
- Size Y (`sizeY`)

## Example

**Initial conditions:**

- `sizeX`: `30`
- `sizeY`: `30`
- `sx`: `0`
- `sy`: `0`
- `dx`: `28`
- `dy`: `29`

**Result:**

> The minimum number of moves to reach [28, 29] from A1 with a knight on an 30x30 board is 19.

> Path: NC2, NE3, NG4, NI5, NK6, NM7, NO8, NQ9, NS10, NT12, NU14, NV16, NW18, NX20, NY22, NZ24, N[26, 25], N[27, 27], N[28, 29]

## Areas of improvement

- Don't allocate the legal knights move array every time
    - Use two 1D arrays with the increments and perform math on those
- Don't use recursion for the BFS to avoid the stack overflow on large board sizes
- Don't exhaust paths where the current number of moves exceeds the current minimum number of moves it takes to reach the end
- Maintain the shortest path during the BFS by adding the moves to a stack rather than doing a post-BFS reverse-DFS to find the best result
- Make indices 1-based rather than 0-based to follow chess standards
- Use a compiled language like C++ or Rust for better performance

## Contributing

Feel free to modify this or make suggestions on improvements including PRs, but I don't expect to actively contribute to this project since it was just a challenge problem :)