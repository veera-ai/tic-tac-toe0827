# Tic Tac Toe

A minimalistic Tic Tac Toe game built with TypeScript and Vite. This app serves static content on port 3000 and requires no backend.

## Features

- Responsive 3x3 grid with simple, light theme
- Turn indicator (X/O)
- Move validation (cannot play occupied cells)
- Win detection (rows, columns, diagonals)
- Draw detection
- Reset button (alternates starting player for variety)
- Accessible with semantic roles and status updates

## Getting Started

Prerequisites:
- Node.js 18+ and npm

Install dependencies:
```bash
npm install
```

Start in development (serves on http://localhost:3000):
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build (serves on http://localhost:3000):
```bash
npm run preview
```

No additional environment variables are required for this feature. The app is a single-container TypeScript frontend.

## How to Play

1. The status text shows whose turn it is.
2. Click an empty cell to place your mark (X or O).
3. The game declares a winner when three marks align horizontally, vertically, or diagonally.
4. If all cells are filled with no winner, it's a draw.
5. Click "Reset" at any time to start a new round.

## Architecture

- UI: Vanilla DOM rendering (no framework) for minimal footprint.
- Logic: Encapsulated in `src/game/logic.ts` with pure functions.
- Entry: `src/main.ts` binds UI to logic and manages rendering.

See `ARCHITECTURE.md` for broader project details if present.