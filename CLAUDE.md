# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project state

This is the "reca-landing" project, currently at the stock output of the Vite `react-ts` template — `src/App.tsx` still contains the template's starter markup and has not yet been replaced with real landing-page content. There is no router, no component library, no state management, and no test runner configured. Treat any architectural decisions (routing, styling approach, component structure, testing) as unmade; don't assume patterns exist beyond what's in `src/`.

## Commands

- `npm run dev` — start the Vite dev server with HMR
- `npm run build` — type-check via `tsc -b` then produce a production build with `vite build`
- `npm run lint` — run ESLint over the project
- `npm run preview` — serve the production build locally

There is no test script configured in `package.json`.

## Architecture

- Entry point is `src/main.tsx`, which mounts `<App />` (from `src/App.tsx`) into `#root` in `index.html`, wrapped in `React.StrictMode`.
- `vite.config.ts` uses `@vitejs/plugin-react` with no other customization (no path aliases, no env-driven config).
- TypeScript is split via project references: the root `tsconfig.json` references `tsconfig.app.json` (app code in `src/`, bundler-mode resolution, `noEmit`, strict unused-locals/params checks) and `tsconfig.node.json` (build tooling, e.g. `vite.config.ts`).
- ESLint (`eslint.config.js`) is flat-config based, combining `@eslint/js` recommended rules, `typescript-eslint` recommended rules, `eslint-plugin-react-hooks` recommended rules, and `eslint-plugin-react-refresh`'s Vite preset. Type-aware lint rules are not enabled (see README for how to opt in if needed).
- Static SVG icons referenced via `<use href="/icons.svg#...">` are expected to live in `public/icons.svg` (sprite sheet pattern) — check `public/` before adding new icons.
