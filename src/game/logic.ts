export type Player = 'X' | 'O';
export type Cell = Player | null;

/**
 * Represents the immutable state of the Tic Tac Toe game.
 */
export interface GameState {
  board: Cell[]; // length 9
  current: Player;
  winner: Player | null;
  isDraw: boolean;
}

/**
 * Checks all winning lines and returns the winner if present.
 */
function detectWinner(board: Cell[]): Player | null {
  const lines = [
    // rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // cols
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonals
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    const v = board[a];
    if (v && v === board[b] && v === board[c]) {
      return v;
    }
  }
  return null;
}

/**
 * Determines if the board is full (no null cells).
 */
function isBoardFull(board: Cell[]): boolean {
  return board.every((c) => c !== null);
}

// PUBLIC_INTERFACE
export function createInitialState(startingPlayer: Player = 'X'): GameState {
  /**
   * Create an initial game state.
   *
   * @param startingPlayer - The player who takes the first turn ('X' or 'O').
   * @returns A fresh GameState with empty board and no winner/draw.
   */
  return {
    board: Array<Cell>(9).fill(null),
    current: startingPlayer,
    winner: null,
    isDraw: false,
  };
}

// PUBLIC_INTERFACE
export function makeMove(state: GameState, index: number): GameState {
  /**
   * Attempt to place the current player's mark at the given index.
   *
   * Rules:
   * - Ignores the move if index is invalid, cell is occupied, or game is already over.
   * - After a valid move, toggles the current player unless the game ends.
   *
   * @param state - The current GameState.
   * @param index - The board index [0..8].
   * @returns A new GameState reflecting the result of the attempted move.
   */
  if (state.winner || state.isDraw) return state;
  if (index < 0 || index > 8) return state;
  if (state.board[index] !== null) return state;

  const board = state.board.slice();
  board[index] = state.current;

  const winner = detectWinner(board);
  const isDraw = !winner && isBoardFull(board);

  return {
    board,
    current: winner || isDraw ? state.current : (state.current === 'X' ? 'O' : 'X'),
    winner,
    isDraw,
  };
}

// PUBLIC_INTERFACE
export function resetGame(startingPlayer: Player = 'X'): GameState {
  /**
   * Reset the game to a fresh state.
   *
   * @param startingPlayer - The player to start after reset.
   * @returns A new initial GameState.
   */
  return createInitialState(startingPlayer);
}
