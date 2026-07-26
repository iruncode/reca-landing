# Index des fichiers par section — reca-landing

Référence à consulter avant toute exploration du repo. `src/App.tsx` assemble les sections dans cet ordre.

| Section             | Fichier(s)                              |
|----------------------|------------------------------------------|
| Nav                  | `src/components/Nav.tsx` (le bouton "Soumission gratuite" ouvre `SubmissionModal` via la prop `onOpenModal`) |
| Hero                 | `src/components/Hero.tsx`, `src/components/Gauge.tsx`, `src/components/Snow.tsx` (le CTA principal ouvre `SubmissionModal` via `onOpenModal`) |
| TrustBar             | `src/components/TrustBar.tsx`           |
| TaxCredit            | `src/components/TaxCredit.tsx` (admissibilité au crédit d'impôt, remontée juste après le Hero/TrustBar) |
| Zones                | `src/components/Zones.tsx`, `src/data/zones.ts` (remontée juste après TaxCredit) |
| ProblemsSolutions    | `src/components/ProblemsSolutions.tsx` (fusion de l'ex-`Problems.tsx` + ex-`Solutions.tsx`, 4 paires problème/solution côte à côte) |
| Services             | `src/components/Services.tsx`           |
| ContactForm          | `src/components/ContactForm.tsx` (titre + coordonnées, rend `<ContactWizard idPrefix="page" />`) |
| ContactWizard        | `src/components/ContactWizard.tsx` (le wizard à 4 étapes lui-même — Particulier/Commercial → adresse → type d'entrée/services → coordonnées — partagé entre `ContactForm` et `SubmissionModal` via la prop `idPrefix`) |
| Footer               | `src/components/Footer.tsx`, `src/data/zones.ts` |
| MobileStickyBar      | `src/components/MobileStickyBar.tsx` (barre fixe bas d'écran, visible <700px ; le bouton "Soumission gratuite" ouvre `SubmissionModal` via `onOpenModal`) |
| SubmissionModal      | `src/components/SubmissionModal.tsx` (remplace `SubmissionTypeModal.tsx` ; popup contenant tout `ContactWizard`, état `isOpen` géré dans `App.tsx`) |

## Sections supprimées
- Restructuration du 2026-07-26 : `HowItWorks.tsx` ("Le processus"), `Included.tsx` ("Ce qui est inclus"), `SocialProof.tsx` ("Qui sommes-nous"), `Faq.tsx` ("Questions fréquentes"), `Problems.tsx` et `Solutions.tsx` (fusionnés dans `ProblemsSolutions.tsx`).
- `SubmissionTypeModal.tsx` (remplacé le même jour par `SubmissionModal.tsx`, qui contient le wizard complet au lieu de 2 boutons de choix).
Tous supprimés du repo, ne plus y faire référence.

## Partagé / transverse
- `src/components/icons.tsx` — icônes SVG réutilisées (check, map pin, phone, mail, menu). Les icônes spécifiques à une section (radar, truck, house, shield, etc.) sont inlinées directement dans leur composant.
- `src/styles/global.css` — tout le style, tokens de design en haut (`--navy`, `--red`, `--cyan`, `--ice`, `--steel`, polices).
- `src/main.tsx` — monte `<App />` dans `#root`.
- `index.html` — SEO/meta (Open Graph, Twitter Card, JSON-LD LocalBusiness), favicons, liens de polices.
- `public/` — assets statiques servis tels quels (logo, favicons, og-image).
- `netlify/functions/contact.js` — fonction serverless Netlify, reçoit le POST du formulaire et envoie via Resend.
- `netlify.toml` — config build/publish Netlify.
- `vercel.json` — config build/output pour Vercel (`dist`).
