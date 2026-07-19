# Contexte permanent — reca-landing

## Client
- Groupe RÉCA — déneigement résidentiel/commercial, Saint-Jérôme, QC.
- Site vitrine one-page. Objectif de conversion unique : le formulaire de contact dans la section CTA finale.

## Marque
- Couleurs (variables CSS dans `src/styles/global.css`) : `--navy`, `--red`, `--cyan`, `--ice`, `--steel`.
- Logo : `public/logo-reca.png` (fond transparent, dérivé de `.input/haAE0z47.jpg`).

## Décisions techniques et pourquoi
- Stack : Vite + React + TypeScript.
- CSS : un seul fichier global (`src/styles/global.css`), pas de CSS modules ni styled-components — choix intentionnel, à conserver sauf demande explicite.
- `ContactForm` : formulaire non contrôlé (`useRef` + `FormData`), pas de `useState` par champ — approche la plus simple pour un formulaire submit-once puis reset.
- Le formulaire poste en JSON vers `/.netlify/functions/contact` via `fetch`. Pas de fallback `mailto:` en JS — juste un message "appelez ou écrivez-nous" en cas d'échec.
- Champ honeypot caché (`site_web`) pour filtrer le spam, vérifié côté client et côté fonction serverless.
- Backend d'envoi de courriel : fonction Netlify (`netlify/functions/contact.js`) qui appelle l'API Resend. Nécessite `RESEND_API_KEY` en variable d'environnement.
- `FROM_EMAIL` utilise actuellement le domaine de test Resend (`onboarding@resend.dev`) — à remplacer une fois un domaine d'expédition vérifié dans Resend.

## Déploiement
- Cible principale : Netlify (`netlify.toml` → build `npm run build`, publish `dist/`, functions `netlify/functions`).
- `vercel.json` (`outputDirectory: dist`) ajouté le 2026-07-19 pour permettre aussi un build sur Vercel (l'erreur initiale : Vercel cherchait un dossier `build` par défaut, Vite sort dans `dist`).
- **Contrainte connue** : `netlify/functions/contact.js` utilise le format Netlify (`exports.handler(event)`), incompatible avec Vercel tel quel. Si Vercel devient la cible de déploiement réelle, il faudra migrer cette fonction vers le format `/api` de Vercel — sinon le formulaire de contact échoue silencieusement (route `/.netlify/functions/contact` inexistante sur Vercel).
- Décision utilisateur (2026-07-19) : ne pas migrer la fonction maintenant ("pas tout de suite"). Ne pas le faire de façon proactive — attendre une demande explicite.

## Essayé et rejeté
- (rien à ce jour)
