# Index des fichiers par section — reca-landing

Référence à consulter avant toute exploration du repo. `src/App.tsx` assemble les sections dans cet ordre.

| Section        | Fichier(s)                              |
|----------------|------------------------------------------|
| Nav            | `src/components/Nav.tsx`                |
| Hero           | `src/components/Hero.tsx`, `src/components/Gauge.tsx`, `src/components/Snow.tsx` |
| HowItWorks     | `src/components/HowItWorks.tsx`         |
| Services       | `src/components/Services.tsx`           |
| WhyReca        | `src/components/WhyReca.tsx`            |
| Zones          | `src/components/Zones.tsx`              |
| Testimonials   | `src/components/Testimonials.tsx`       |
| ContactForm    | `src/components/ContactForm.tsx`        |
| Footer         | `src/components/Footer.tsx`             |

## Partagé / transverse
- `src/components/icons.tsx` — icônes SVG réutilisées (check, map pin, phone, mail, menu). Les icônes spécifiques à une section (radar, truck, house, shield, etc.) sont inlinées directement dans leur composant.
- `src/styles/global.css` — tout le style, tokens de design en haut (`--navy`, `--red`, `--cyan`, `--ice`, `--steel`, polices).
- `src/main.tsx` — monte `<App />` dans `#root`.
- `index.html` — SEO/meta (Open Graph, Twitter Card, JSON-LD LocalBusiness), favicons, liens de polices.
- `public/` — assets statiques servis tels quels (logo, favicons, og-image).
- `netlify/functions/contact.js` — fonction serverless Netlify, reçoit le POST du formulaire et envoie via Resend.
- `netlify.toml` — config build/publish Netlify.
- `vercel.json` — config build/output pour Vercel (`dist`).
