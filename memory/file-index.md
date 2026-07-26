# Index des fichiers par section — reca-landing

Référence à consulter avant toute exploration du repo. `src/App.tsx` assemble les sections dans cet ordre.

| Section             | Fichier(s)                              |
|----------------------|------------------------------------------|
| Nav                  | `src/components/Nav.tsx`                |
| Hero                 | `src/components/Hero.tsx`, `src/components/Gauge.tsx`, `src/components/Snow.tsx` (le CTA principal ouvre `SubmissionTypeModal` au lieu d'un lien `#contact` direct) |
| TrustBar             | `src/components/TrustBar.tsx`           |
| TaxCredit            | `src/components/TaxCredit.tsx` (admissibilité au crédit d'impôt, remontée juste après le Hero/TrustBar) |
| Zones                | `src/components/Zones.tsx`, `src/data/zones.ts` (remontée juste après TaxCredit) |
| ProblemsSolutions    | `src/components/ProblemsSolutions.tsx` (fusion de l'ex-`Problems.tsx` + ex-`Solutions.tsx`, 4 paires problème/solution côte à côte) |
| Services             | `src/components/Services.tsx`           |
| ContactForm          | `src/components/ContactForm.tsx` (wizard 3 étapes, `useState`, reçoit `prefillType` depuis `App.tsx` pour pré-sélectionner "Multilogement ou commercial" à l'étape 2 si l'utilisateur a choisi "Commercial" dans le modal) |
| Footer               | `src/components/Footer.tsx`, `src/data/zones.ts` |
| MobileStickyBar      | `src/components/MobileStickyBar.tsx` (barre fixe bas d'écran, visible <700px) |
| SubmissionTypeModal  | `src/components/SubmissionTypeModal.tsx` (popup Particulier/Commercial déclenché par le CTA du Hero, état géré dans `App.tsx`) |

## Sections supprimées (restructuration du 2026-07-26)
`HowItWorks.tsx` ("Le processus"), `Included.tsx` ("Ce qui est inclus"), `SocialProof.tsx` ("Qui sommes-nous"), `Faq.tsx` ("Questions fréquentes"), `Problems.tsx` et `Solutions.tsx` (fusionnés dans `ProblemsSolutions.tsx`) — tous supprimés du repo, ne plus y faire référence.

## Partagé / transverse
- `src/components/icons.tsx` — icônes SVG réutilisées (check, map pin, phone, mail, menu). Les icônes spécifiques à une section (radar, truck, house, shield, etc.) sont inlinées directement dans leur composant.
- `src/styles/global.css` — tout le style, tokens de design en haut (`--navy`, `--red`, `--cyan`, `--ice`, `--steel`, polices).
- `src/main.tsx` — monte `<App />` dans `#root`.
- `index.html` — SEO/meta (Open Graph, Twitter Card, JSON-LD LocalBusiness), favicons, liens de polices.
- `public/` — assets statiques servis tels quels (logo, favicons, og-image).
- `netlify/functions/contact.js` — fonction serverless Netlify, reçoit le POST du formulaire et envoie via Resend.
- `netlify.toml` — config build/publish Netlify.
- `vercel.json` — config build/output pour Vercel (`dist`).
