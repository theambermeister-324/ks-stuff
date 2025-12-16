# Knapsack Strategic Documents

This repository contains strategic documents, playbooks, and interactive tools for Knapsack.

## Setup

### Prerequisites

- Node.js 18+ and npm (or yarn/pnpm)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## Project Structure

- `strat/` - Strategic documents and playbooks
  - `solutionengineering/` - Solution Engineering tools
    - `ipe_tam.tsx` - IPE Strategic Playbook (React component)
    - `ipe-playbook.html` - Entry point for IPE Playbook
    - `main.tsx` - React entry point
    - `index.html` - SE Rapid Technical Qualification document

## Available Scripts

- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run type-check` - Run TypeScript type checking

## Dependencies

- **React 18.2.0** - UI library
- **lucide-react** - Icon library
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety

## Development

The IPE Strategic Playbook is a React/TypeScript application. To view it:

1. Run `npm run dev`
2. Navigate to the IPE Playbook route (typically `/ipe-playbook.html`)

## Deployment

Build the project with `npm run build` and serve the `dist/` directory.

