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
