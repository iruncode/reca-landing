# Tâches — reca-landing

- [x] Construire la landing page (React + Vite), toutes les sections. — Commit `058ac76`.
- [x] Corriger l'erreur de build Vercel ("No Output Directory named build"). — Ajout de `vercel.json` (`outputDirectory: dist`), commit `530684f`, poussé sur `origin/main`. Confirmé fonctionnel par l'utilisateur le 2026-07-19 : le déploiement Vercel marche.
- [x] Mettre en place le système de mémoire du projet (`memory/`). — Adapté depuis un `CLAUDE.md` d'un autre projet fourni par l'utilisateur (partie modules Contrats/Mapbox/Supabase et bloc RTK écartés car non pertinents/non installés ici).
- [ ] Migrer `netlify/functions/contact.js` vers le format Vercel (`/api`) — nécessaire seulement si Vercel devient la cible de déploiement réelle du formulaire de contact. Explicitement reporté par l'utilisateur le 2026-07-19.
- [ ] Vérifier un domaine d'expédition réel dans Resend et mettre à jour `FROM_EMAIL` dans `netlify/functions/contact.js`.
