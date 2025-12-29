import { createInitialState, makeMove, resetGame, type GameState } from './game/logic';

// Render helpers
function el<K extends keyof HTMLElementTagNameMap>(tag: K, className?: string, text?: string) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function render(app: HTMLElement, state: GameState, onMove: (idx: number) => void, onReset: () => void) {
  app.innerHTML = '';

  const game = el('div', 'game');

  // Header with title, status, and controls
  const header = el('div', 'header');
  const title = el('h1', 'title', 'Tic Tac Toe');

  const status = el('div', 'status');
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');
  status.textContent = state.winner
    ? `Winner: ${state.winner}`
    : state.isDraw
      ? 'Draw!'
      : `Next player: ${state.current}`;

  const controls = el('div', 'controls');
  const resetBtn = el('button', 'primary', 'Reset');
  resetBtn.addEventListener('click', () => onReset());
  controls.appendChild(resetBtn);

  header.appendChild(title);
  header.appendChild(status);
  header.appendChild(controls);

  // Board
  const board = el('div', 'board');
  board.setAttribute('role', 'grid');
  board.setAttribute('aria-label', 'Tic Tac Toe board');

  state.board.forEach((cell, idx) => {
    const cellBtn = el('button', 'cell') as HTMLButtonElement;
    cellBtn.setAttribute('role', 'gridcell');
    cellBtn.setAttribute('aria-label', `Cell ${idx + 1}`);
    cellBtn.textContent = cell ? cell : '';
    const disabled = Boolean(cell) || state.winner !== null || state.isDraw;
    if (disabled) cellBtn.classList.add('disabled');
    cellBtn.disabled = disabled;

    cellBtn.addEventListener('click', () => onMove(idx));
    board.appendChild(cellBtn);
  });

  // Footer
  const footer = el('div', 'footer');
  const tip = el('div', undefined, 'Tip: Click any empty cell to place your mark.');
  const sr = el('span', 'sr-only', 'Game interface ready.');
  footer.appendChild(tip);
  footer.appendChild(sr);

  game.appendChild(header);
  game.appendChild(board);
  game.appendChild(footer);

  app.appendChild(game);
}

// Basic app bootstrap
(function bootstrap() {
  const app = document.getElementById('app');
  if (!app) throw new Error('Root element #app not found');

  let state = createInitialState('X');

  const onMove = (idx: number) => {
    state = makeMove(state, idx);
    render(app, state, onMove, onReset);
  };

  const onReset = () => {
    // Alternate who starts after each completed game for variety
    const nextStarter = state.winner || state.isDraw
      ? (state.current === 'X' ? 'O' : 'X')
      : state.current;
    state = resetGame(nextStarter);
    render(app, state, onMove, onReset);
  };

  render(app, state, onMove, onReset);
})();
