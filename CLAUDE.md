# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Project state

This is the "reca-landing" project: a one-page marketing site for Groupe RÉCA (residential/commercial snow removal in Saint-Jérôme, QC), built as a **Vite + React + TypeScript** app. The site's sole conversion goal is the contact form in the final CTA section.

## Structure

- `index.html` — Vite entry point; carries all SEO/meta tags (Open Graph, Twitter Card, JSON-LD LocalBusiness), font links, favicons.
- `src/main.tsx` — mounts `<App />` into `#root`.
- `src/App.tsx` — assembles the page from section components in order: `Nav`, `Hero`, `HowItWorks`, `Services`, `WhyReca`, `Zones`, `Testimonials`, `ContactForm`, `Footer`.
- `src/components/` — one component per page section, plus `icons.tsx` for small reused inline SVG icons (check, map pin, phone, mail, menu). Section-specific icons (radar, truck, house, shield, etc.) are inlined directly in their component since they're each used once.
- `src/styles/global.css` — all styling in one global stylesheet (design tokens as CSS custom properties at the top: `--navy`, `--red`, `--cyan`, `--ice`, `--steel`, fonts). No CSS modules/styled-components — intentional, keep it this way unless asked.
- `public/` — static assets served as-is: `logo-reca.png` (transparent, derived from `.input/haAE0z47.jpg`), `favicon.ico`/`favicon.png`/`apple-touch-icon.png`/`og-image.png`. `.input/` itself (source images, including a contract mockup kept only as a design/style reference) is not published.
- `netlify/functions/contact.js` — serverless function that receives the contact form POST and sends an email via the Resend API. Requires `RESEND_API_KEY` as an environment variable (see `.env.example`); never commit the real key.
- `netlify.toml` — `npm run build` → publish `dist/`, functions in `netlify/functions`.

## Notable implementation details

- **Gauge** (`src/components/Gauge.tsx`) and **Snow** (`src/components/Snow.tsx`) are the hero's signature animated elements. Gauge runs a small phase state machine via `useEffect`/`setTimeout`; both respect `prefers-reduced-motion` (Gauge freezes on the "threshold reached" phase, Snow renders no particles).
- **ContactForm** (`src/components/ContactForm.tsx`) uses an uncontrolled form (`useRef` + `FormData`) rather than per-field `useState`, mirroring the simplest approach for a one-shot submit-and-reset form. It posts JSON to `/.netlify/functions/contact` via `fetch` — no `mailto:` fallback in the JS path, only a "call or email us" note on failure. Includes a hidden honeypot field (`site_web`) for basic spam filtering, checked both client-side and in the serverless function.
- Accessibility: skip-link, `:focus-visible` styled globally, all form fields have `<label>`, `aria-live` on the form status region, `prefers-reduced-motion` respected.

## Commands

- `npm run dev` — start the Vite dev server with HMR
- `npm run build` — type-check via `tsc -b` then produce a production build with `vite build`
- `npm run preview` — serve the production build locally

There is no test script or linter configured.

## Deployment

Designed for Netlify (static publish of `dist/` + Netlify Functions). Set `RESEND_API_KEY` in the site's environment variables before the contact form can send real email. The `from` address in `netlify/functions/contact.js` uses Resend's test domain (`onboarding@resend.dev`) until a real sending domain is verified in Resend — update `FROM_EMAIL` once that's done.

A `vercel.json` (`outputDirectory: dist`) was added so the project can also build on Vercel. Note: `netlify/functions/contact.js` uses Netlify's function format (`exports.handler(event)`), which is **not** compatible with Vercel as-is — if Vercel ever becomes the deploy target, the contact form needs to be migrated to Vercel's `/api` format first, or it will silently fail.

## Memory system (`memory/`)

To keep context and task state consistent across sessions, this repo has a `memory/` folder at the root with four files:

```
memory/
├── memory.md      — permanent project context
├── tasks.md       — task list (todo / in progress / done)
├── plans.md       — detailed plans for in-progress or upcoming work
└── file-index.md  — reference table: which files belong to which page section
```

- **`memory/memory.md`** — context that must never be lost: brand tone/colors/fonts, technical decisions and why, client-specific constraints, things tried and rejected.
- **`memory/tasks.md`** — tasks with three statuses: `[ ]` todo, `[~]` in progress, `[x]` done. Each done task keeps a short completion note.
- **`memory/plans.md`** — before any non-trivial task (new section, new feature, redesign), write the plan here first: goal, steps, files touched, risks. Implement only after.
- **`memory/file-index.md`** — reference table mapping each page section to its exact files, plus a shared/cross-cutting section.

### Update protocol — MANDATORY

**At the start of every task:**
1. Read `memory/memory.md` in full
2. Read `memory/tasks.md` for current state
3. If the task touches an existing section, check `memory/file-index.md` for the exact file list
4. If the task is non-trivial, write or update the plan in `memory/plans.md` before coding

**At the end of every task:**
1. Update `memory/tasks.md` (status + completion note)
2. Add any new decision or constraint to `memory/memory.md`
3. Check off/archive the plan in `memory/plans.md`
4. If files were added, removed, or moved, update `memory/file-index.md`

Never consider a task "done" until these files are up to date — a task not reflected in `memory/` doesn't exist for the next session.
