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
- **Note technique — téléchargement Chromium/Playwright dans ce sandbox** : `npx playwright install chromium` fonctionne dans ce sandbox mais est lent (~5-8 min pour ~300 Mo au total) et n'affiche aucune progression visible dans `~/.cache/ms-playwright` tant que chaque partie n'est pas terminée (téléchargement d'abord dans un zip temporaire `/tmp/playwright-download-*/*.zip`, puis déplacé dans le cache une fois complet). Une session précédente avait conclu à tort à un blocage réseau après ~7 minutes sans dossier visible, tué le processus, et laissé un zip partiel corrompu — alors que le téléchargement progressait activement (confirmé en surveillant la taille croissante du zip temporaire). À l'avenir : avant de conclure à un blocage, vérifier la taille du zip temporaire (`find /tmp -iname 'playwright-download-*.zip'`) à quelques intervalles de 20-30s ; ne conclure à un vrai blocage que si la taille reste statique sur plusieurs vérifications.

## Restructuration de la page (2026-07-26, branche `optimisation-mobile`)
- Demande explicite de l'utilisateur pour simplifier la page et raccourcir le chemin vers la conversion. Le Hero reste **strictement intact** (texte, Gauge, Snow) — seul le comportement du CTA principal a changé.
- Nouvel ordre des sections : `Nav` → `Hero` → `TrustBar` → `TaxCredit` (admissibilité crédit d'impôt, remontée en haut) → `Zones` (territoire, remonté en haut) → `ProblemsSolutions` (fusion Problems+Solutions) → `Services` → `ContactForm` → `Footer` → `MobileStickyBar`.
- Sections supprimées : `HowItWorks` ("Le processus"), `Included` ("Ce qui est inclus"), `SocialProof` ("Qui sommes-nous"), `Faq` ("Questions fréquentes"). CSS mort correspondant retiré de `global.css`.
- `Problems.tsx` + `Solutions.tsx` fusionnés en `ProblemsSolutions.tsx` : 4 paires côte à côte (problème *i* ↔ solution *i*, même contenu/copy qu'avant, juste réorganisé visuellement).
- `TaxCredit.tsx` : contenu d'admissibilité inchangé, eyebrow renommé `"L'arme secrète"` → `"Crédit d'impôt"` puisqu'il n'est plus positionné comme une révélation tardive mais comme une info d'ouverture.
- Nouveau flux de conversion sur le CTA du Hero : clic ouvre `SubmissionTypeModal` (popup Particulier/Commercial, état géré dans `App.tsx`), la sélection ferme le modal, scroll fluide vers `#contact`, et pré-remplit `typeEntree` à `"Multilogement ou commercial"` dans `ContactForm` si "Commercial" est choisi (rien de forcé si "Particulier" — l'utilisateur choisit parmi les 3 options résidentielles à l'étape 2 du wizard). Le wizard à 3 étapes lui-même n'a pas changé de structure.
- `ContactForm` : le bloc "Dernière étape" (eyebrow + titre + paragraphe d'urgence "places limitées") a été retiré puisque le point d'entrée qualifiant est maintenant le popup du Hero ; le bloc coordonnées (téléphone/courriel/adresse) reste, avec un titre neutre "Votre soumission gratuite".
- `Nav.tsx` : liens vers les sections supprimées retirés (`#comment-ca-marche`, `#faq`). `Footer.tsx` : les 2 liens vers `#inclus` (section supprimée) repointés vers `#services`.
- Si une future session voit une référence à `HowItWorks`, `Included`, `SocialProof`, `Faq`, `Problems.tsx` ou `Solutions.tsx` (par ex. dans un commit plus ancien ou une autre branche), c'est normal — ces composants ont existé dans la refonte v2 puis ont été retirés ici ; ne pas les recréer sans demande explicite.

## Essayé et rejeté
- (rien à ce jour)
