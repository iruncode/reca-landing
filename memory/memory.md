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
- `vercel.json` (`outputDirectory: dist`) ajouté le 2026-07-19 pour permettre aussi un build sur Vercel (l'erreur initiale : Vercel cherchait un dossier `build` par défaut, Vite sort dans `dist`). Confirmé fonctionnel par l'utilisateur — Vercel est maintenant un déploiement actif du site, pas juste théorique.
- **Contrainte connue** : `netlify/functions/contact.js` utilise le format Netlify (`exports.handler(event)`), incompatible avec Vercel tel quel. Si Vercel devient la cible de déploiement réelle, il faudra migrer cette fonction vers le format `/api` de Vercel — sinon le formulaire de contact échoue silencieusement (route `/.netlify/functions/contact` inexistante sur Vercel).
- Décision utilisateur (2026-07-19) : ne pas migrer la fonction maintenant ("pas tout de suite"). Ne pas le faire de façon proactive — attendre une demande explicite.

## Refonte v2 (branche `landing-v2-optimisation`)
- Branche non fusionnée dans `main`, travail en cours (non commité au 2026-07-25).
- Nouvelle structure de sections (voir `memory/file-index.md` à jour) : `Nav`, `Hero`, `TrustBar`, `Problems`, `Solutions`, `HowItWorks`, `Services`, `Included`, `TaxCredit`, `SocialProof`, `Zones`, `Faq`, `ContactForm`, `Footer`, `MobileStickyBar`.
- `WhyReca` → renommé `Solutions` ; `Testimonials` → renommé `SocialProof` (le contenu témoignages a été retiré, `SocialProof` n'est plus qu'un bloc texte "qui sommes-nous").
- `ContactForm` n'est plus un formulaire simple : c'est un wizard à 3 étapes (adresse → type d'entrée/services → coordonnées) avec `useState` (plus d'uncontrolled form). La fonction Netlify (`netlify/functions/contact.js`) a déjà été mise à jour en conséquence (champs `adresse`, `typeEntree`, `services[]`, `prenom`, `telephone`, `courriel`, `site_web`) — cohérente avec le nouveau payload.
- Nouveau fichier `src/data/zones.ts` : la liste `ZONES` a été extraite de `Zones.tsx`/`Footer.tsx` vers un module partagé (les deux composants l'importent).
- **Piège identifié le 2026-07-25** : les 6 nouveaux composants (`TrustBar`, `Problems`, `Included`, `TaxCredit`, `Faq`, `MobileStickyBar`) + le wizard de `ContactForm` avaient été codés avec des classNames spécifiques, mais le CSS correspondant n'avait jamais été ajouté à `src/styles/global.css` — la page se serait affichée non stylée. Corrigé dans cette session (tout le CSS manquant ajouté, dans le même style que l'existant : tokens `--navy/--red/--cyan/--ice/--steel`, `--radius`, `--shadow`, grilles responsives aux mêmes breakpoints 900/800/700/640/560/500/480px).
- Si une future session touche à ces sections et voit des classNames sans règle CSS correspondante, c'est probablement le même piège qui se reproduit — vérifier systématiquement (`grep className` vs `grep` dans `global.css`) avant de considérer un composant "fini".

## Branche `optimisation-mobile`
- Créée depuis `landing-v2-optimisation` le 2026-07-25 pour un passage d'optimisation/correction de bugs desktop + mobile, vérifié avec Playwright (Chromium headless) dans ce sandbox.
- Bugs mobiles réels trouvés et corrigés (tous dans `src/styles/global.css`) :
  1. **CTA de nav qui wrap sur 2 lignes sous ~700px** — `.nav-actions .btn-primary` masqué sous 700px (le `MobileStickyBar` fournit déjà ce même CTA en permanence en bas d'écran, donc pas de perte fonctionnelle).
  2. **Sections d'ancre cachées sous la nav sticky** — aucune section n'avait de `scroll-margin-top`, donc cliquer un lien de nav/footer (`#faq`, `#zones`, etc.) faisait atterrir le titre de section derrière la nav. Ajouté `section[id] { scroll-margin-top: 88px; }` (88px couvre la hauteur mesurée de la nav sur desktop ~84.5px et mobile ~71px après le fix n°1).
  3. **Bouton "Retour" du wizard de `ContactForm` qui devenait un cercle illisible sous 480px** — `.wizard-actions .btn { flex: 1 }` sans `min-width: 0` laissait le texte long "Recevoir ma soumission gratuite" (mots non sécables) forcer sa propre largeur minimale et écraser le bouton "Retour" à quasi rien ; comme les deux ont `border-radius: 999px`, "Retour" devenait un cercle. Corrigé avec `min-width: 0` + empilement `flex-direction: column-reverse` en pleine largeur sous 480px (CTA principal au-dessus).
  4. Dépassement horizontal sub-pixel négligeable à 320px (~1px, un `<span>` de neige) — `overflow-x: hidden` ajouté sur `html` par précaution (n'affecte rien de visible).
- Méthode de vérification : `npm run dev` + script Node/Playwright ad hoc (pas commité, vivait dans le scratchpad de la session) qui screenshot chaque section aux largeurs 1280/375/320/768/900px, clique tout le wizard de contact, ouvre le menu mobile, ouvre l'accordéon FAQ, clique les liens d'ancre de la nav, et vérifie qu'il n'y a aucune erreur console. Zéro erreur console sur les deux viewports après corrections.
- Voir aussi la mémoire cross-session (hors dépôt) sur le comportement du téléchargement Chromium dans ce sandbox (lent, pas bloqué — ne pas tuer le process trop tôt).

## Essayé et rejeté
- (rien à ce jour)
