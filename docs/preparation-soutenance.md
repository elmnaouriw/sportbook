# Préparation Soutenance — SportBook

> Projet de fin de formation DWWM — MolenGeek
> Utilise ce fichier pour vérifier que tu maîtrises chaque notion et que tu peux répondre à chaque question.

---

## 1. Notions techniques utilisées dans le projet

Coche chaque case quand tu es capable d'expliquer la notion sans hésitation.

### Architecture & Backend

- [ ] **Node.js** — runtime JavaScript côté serveur, event loop, non-bloquant
- [ ] **Express.js** — framework HTTP, routing, middleware chain
- [ ] **Architecture REST** — stateless, ressources (sessions, bookings, users), verbes HTTP (GET/POST/PUT/DELETE)
- [ ] **Architecture routes/middleware/contrôleur** — séparation des responsabilités dans `backend/routes/`, `backend/middleware/`, `backend/config/`
- [ ] **SPA (Single Page Application)** — tout le frontend dans une seule page `index.html`, navigation par affichage/masquage de sections
- [ ] **`server.js` comme point d'entrée** — montage des middlewares (helmet, cors, rate-limit) puis des routes, écoute après init DB
- [ ] **Variables d'environnement** — `.env`, `dotenv`, séparation dev/prod
- [ ] **Modèle asynchrone** — `async/await`, `Promise`, gestion d'erreurs avec try/catch
- [ ] **Pool de connexions MySQL** (`mysql2/promise`) — avantages vs connexion unique, réutilisation

### Base de données

- [ ] **MySQL / SQL relationnel** — tables, colonnes, types, contraintes
- [ ] **Clés étrangères (FK)** — `sport_id`, `user_id`, `session_id` avec `ON DELETE CASCADE`
- [ ] **Contrainte UNIQUE** — empêcher les doublons de réservation `UNIQUE(user_id, session_id)`
- [ ] **ENUM MySQL** — `role('user','admin')`, `status('confirmed','cancelled')`
- [ ] **Requêtes paramétrées** — prévention des injections SQL (`?` placeholders)
- [ ] **Vue SQL** (`sessions_view`) — jointure entre 3 tables + calcul des places disponibles
- [ ] **Auto-initialisation de la DB** au démarrage du serveur (création DB + tables + seed)
- [ ] **Index** — `token_hash` indexé pour recherche rapide dans `token_blacklist`
- [ ] **Différence entre `CREATE TABLE` et `CREATE TABLE IF NOT EXISTS`**
- [ ] **Jointures SQL** — `INNER JOIN` entre `sessions_view` et les tables `sports`, `bookings`

### Authentification & Sécurité

- [ ] **JWT (JSON Web Token)** — structure (header, payload, signature), fonctionnement sans état côté serveur
- [ ] **`jsonwebtoken`** — `sign()`, `verify()`, expiration, payload (userId, role)
- [ ] **bcrypt** — hash des mots de passe, 12 rounds (salt), comparaison avec `compare()`
- [ ] **Middleware d'authentification** — extraction du token Bearer, vérification, injection `req.user`
- [ ] **Middleware d'autorisation (admin)** — vérification de `req.user.role === 'admin'`
- [ ] **Blacklist de tokens** — invalidation des JWT à la déconnexion (hash SHA-256, stockage DB vs mémoire)
- [ ] **SHA-256** — hashage des tokens pour la blacklist (ne jamais stocker un token en clair)
- [ ] **Helmet** — sécurisation des en-têtes HTTP (X-Content-Type-Options, X-Frame-Options, etc.)
- [ ] **express-rate-limit** — limitation du nombre de requêtes, prévention brute-force (général 100/15min, auth 10/15min)
- [ ] **express-validator** — validation et nettoyage des entrées côté serveur (`body()`, `validationResult`)
- [ ] **CORS** — Cross-Origin Resource Sharing, whitelist d'origines autorisées
- [ ] **Oubli de mot de passe** — token aléatoire, hash stocké, expiration 1h, flag `used` anti-rejeu
- [ ] **Nodemailer** — envoi d'emails transactionnels, fallback console en dev
- [ ] **XSS côté client** — fonction `escapeHTML()` pour injecter du contenu utilisateur sans risque
- [ ] **Double validation** — validation côté client (formulaire HTML/JS) ET côté serveur (express-validator)

### Frontend

- [ ] **HTML5 sémantique** — `header`, `nav`, `main`, `section`, `footer`, `form` avec `label`
- [ ] **CSS3 avancé** — custom properties (variables CSS), Grid, Flexbox
- [ ] **Méthodologie CSS** — nomenclature cohérente, classes réutilisables
- [ ] **Design responsive** — media queries (1024px, 640px), unités relatives
- [ ] **Animations CSS** — transitions, `@keyframes` shimmer (skeleton loading), `opacity`/`translateY`
- [ ] **Intersection Observer API** — animations au scroll (`observeReveal()`)
- [ ] **localStorage** — stockage du token JWT et des infos utilisateur côté client
- [ ] **`fetch()` API** — `apiFetch()` wrapper avec headers JWT, gestion d'erreurs
- [ ] **`escapeHTML()`** — prévention XSS dans le DOM
- [ ] **Debounce** — sur la recherche de séances pour éviter trop d'appels API
- [ ] **Toast notifications** — système de notifications non-intrusives
- [ ] **Skeleton loading** — affichage de squelettes pendant le chargement des données
- [ ] **Dialogue de confirmation** — avant d'annuler une réservation (`confirm()`)

### Tests

- [ ] **Jest** — framework de tests unitaires, `describe`, `it`, `expect`
- [ ] **Supertest** — test des routes HTTP sans serveur réel
- [ ] **Mock de BDD** — `jest.mock()` pour simuler la couche base de données
- [ ] **Tests middleware** — test isolé de `authMiddleware` et `adminMiddleware`
- [ ] **Tests d'API** — test des endpoints health, sessions, featured
- [ ] **Cypress** — tests E2E frontend, navigation, formulaires, scénarios utilisateur

### DevOps & Outils

- [ ] **Docker / Dockerfile** — containerisation de l'application (node:20-alpine)
- [ ] **npm / package.json** — dépendances, scripts personnalisés
- [ ] **concurrently** — lancement parallèle backend + frontend
- [ ] **nodemon** — rechargement automatique du serveur en développement
- [ ] **.env / .env.example** — configuration séparée de l'environnement
- [ ] **Git** — commits, branches, suivi de version
- [ ] **ESLint / Prettier** — (non présents mais bonne pratique à connaître)

### Base de données détaillée

- [ ] **Schéma des 7 tables** : sports, users, sessions, bookings, token_blacklist, password_reset_tokens, announcements
- [ ] **sessions_view** : compréhension de la jointure et du calcul fill_pct / status
- [ ] **Cycle de vie d'une réservation** : POST booking → statut "confirmed" → DELETE → statut "cancelled"
- [ ] **Seed data** : 4 sports, 4 sessions générées avec `CURDATE()`

---

## 2. Questions possibles du jury

### Présentation générale & Contexte

- [ ] **Q :** Présente-nous le projet SportBook. Quel est le problème qu'il résout ?
  - *R : Application de réservation de séances sportives. Problème : gestion manuelle des inscriptions, pas de visibilité en temps réel sur les places disponibles.*

- [ ] **Q :** Dans quel cadre as-tu développé ce projet ?
  - *R : Projet de fin de formation DWWM à MolenGeek, sur 6 mois.*

- [ ] **Q :** Quels étaient les objectifs pédagogiques ?
  - *R : Mettre en pratique le fullstack (Node.js/Express/MySQL + frontend vanilla), appliquer les bonnes pratiques de sécurité, produire une application complète de la conception au déploiement.*

- [ ] **Q :** Combien de temps as-tu passé sur ce projet ?
  - *R : Environ X sessions entre le 16 et 18 juin 2026 (phase de développement avec opencode).*

### Architecture & Choix techniques

- [ ] **Q :** Pourquoi avoir séparé backend et frontend ?
  - *R : Architecture découplée, possibilité de remplacer le frontend sans toucher à l'API, meilleure maintenabilité.*

- [ ] **Q :** Pourquoi avoir choisi une SPA vanilla plutôt qu'un framework (React, Vue) ?
  - *R : Correspond au périmètre du projet (pas de besoin de réactivité complexe), montre la maîtrise du JavaScript pur sans abstraction, évite la complexité d'un bundler.*

- [ ] **Q :** Pourquoi Express plutôt qu'un autre framework ?
  - *R : Léger, mature, immense écosystème de middlewares, idéal pour une API REST.*

- [ ] **Q :** Pourquoi MySQL plutôt que MongoDB (NoSQL) ?
  - *R : Les données sont fortement relationnelles (sessions → sports, bookings → users → sessions), schéma bien défini, pas besoin de flexibilité document.*

- [ ] **Q :** Pourquoi `mysql2/promise` plutôt que `mysql` ?
  - *R : Support natif des Promises (async/await) vs callbacks, meilleure intégration avec le code asynchrone moderne.*

- [ ] **Q :** Explique le rôle de chaque middleware dans `server.js`.
  - *R : Helmet (sécurité headers) → CORS (cross-origin) → express.json (body parsing) → rate-limit (protection) → routes API → error handler (gestion d'erreurs).*

- [ ] **Q :** Pourquoi `database.sql` existe en plus de l'auto-init dans `db.js` ?
  - *R : Double usage — `db.js` auto-initialise pour le développement, `database.sql` sert de référence et permet de recréer la DB manuellement.*

### Base de données

- [ ] **Q :** Explique le schéma de la base de données et les relations entre les tables.
  - *R : sports 1→* sessions, users 1→* bookings, sessions 1→* bookings. Chaque réservation lie un utilisateur à une séance.*

- [ ] **Q :** À quoi sert la vue `sessions_view` ?
  - *R : À exposer directement le statut des séances (places disponibles, taux de remplissage) sans avoir à recalculer côté application.*

- [ ] **Q :** Pourquoi une contrainte UNIQUE sur `(user_id, session_id)` dans bookings ?
  - *R : Empêcher un utilisateur de réserver deux fois la même séance.*

- [ ] **Q :** Comment est gérée la suppression en cascade ?
  - *R : `ON DELETE CASCADE` — si un sport est supprimé, les sessions associées sont supprimées automatiquement.*

- [ ] **Q :** Quelle est la différence entre une vue et une table ?
  - *R : Une vue est une requête stockée, pas de données physiques, toujours à jour.*

### Authentification & Sécurité

- [ ] **Q :** Explique le fonctionnement des JWT dans ton application.
  - *R : À la connexion, le serveur signe un token contenant userId + role. Le client le stocke dans localStorage et l'envoie dans chaque requête via le header Authorization Bearer. Le serveur vérifie la signature avec le secret.*

- [ ] **Q :** Comment est protégé l'accès aux routes administrateur ?
  - *R : Deux middlewares enchaînés — `authMiddleware` vérifie le JWT, `adminMiddleware` vérifie `req.user.role === 'admin'`.*

- [ ] **Q :** Comment sont protégés les mots de passe ?
  - *R : Hashés avec bcrypt (12 rounds), jamais stockés en clair. Comparaison avec `bcrypt.compare()`.

- [ ] **Q :** Comment gères-tu la déconnexion alors que le JWT est stateless ?
  - *R : Blacklist de tokens — le JWT est hashé (SHA-256) et stocké dans une table `token_blacklist`. Le `authMiddleware` vérifie que le token n'est pas blacklisté.*

- [ ] **Q :** Pourquoi as-tu initialement choisi une blacklist en mémoire puis changé vers la BDD ?
  - *R : La mémoire est plus rapide mais perdue au redémarrage. La BDD persiste mais ajoute une requête à chaque appel.*

- [ ] **Q :** Qu'est-ce que Helmet apporte ?
  - *R : Des en-têtes HTTP de sécurité : X-Content-Type-Options (empêche MIME sniffing), X-Frame-Options (anti-clickjacking), Strict-Transport-Security (HSTS), etc.*

- [ ] **Q :** Pourquoi deux rate-limiters différents ?
  - *R : 10 req/15min sur /api/auth/ pour limiter le brute-force (tentatives de mot de passe), 100 req/15min sur le reste pour éviter l'abus général.*

- [ ] **Q :** Comment préviens-tu les injections SQL ?
  - *R : Toutes les requêtes utilisent des paramètres positionnels (`?`) via mysql2 — les valeurs sont échappées par le driver.*

- [ ] **Q :** Comment as-tu géré le "mot de passe oublié" sans SMTP en dev ?
  - *R : Fallback console — le lien de réinitialisation est affiché dans les logs du serveur quand aucune config SMTP n'est présente.*

- [ ] **Q :** Pourquoi stocker un hash du token de reset plutôt que le token en clair ?
  - *R : Principe de moindre exposition — même si la BDD est compromise, les tokens de reset ne sont pas récupérables.*

### Frontend

- [ ] **Q :** Comment est organisée l'application frontend ?
  - *R : SPA avec 6 pages (Home, Sessions, Announcements, Bookings, Profile, Admin) + 4 pages d'auth (Login, Register, Forgot, Reset). La navigation montre/masque des sections via display.*

- [ ] **Q :** Où sont stockées les informations de connexion côté client ?
  - *R : Dans `localStorage` — le token JWT (`token`) et les infos utilisateur (`user`).*

- [ ] **Q :** Comment gères-tu les erreurs API côté frontend ?
  - *R : `apiFetch()` wrapper catch les erreurs, parse le message, et affiche une toast notification rouge.*

- [ ] **Q :** Comment as-tu fait les animations au scroll ?
  - *R : Intersection Observer API — les éléments avec la classe `reveal` apparaissent avec une transition CSS quand ils entrent dans le viewport.*

- [ ] **Q :** Pourquoi une fonction `escapeHTML()` ?
  - *R : Pour échapper les caractères HTML (<, >, &, ", ') dans le contenu utilisateur avant de l'injecter dans le DOM — prévention XSS.*

- [ ] **Q :** Comment fonctionne la recherche de séances ?
  - *R : Trois filtres (sport, date, search) avec debounce sur le champ texte pour éviter les appels API à chaque frappe.*

### Tests

- [ ] **Q :** Quels types de tests as-tu mis en place ?
  - *R : Tests unitaires (Jest) sur les middlewares, tests d'intégration (Supertest) sur les endpoints API, tests E2E (Cypress) sur le frontend.*

- [ ] **Q :** Pourquoi avoir mocké la base de données dans les tests API ?
  - *R : Pour isoler le test de la couche HTTP sans dépendre d'une vraie BDD — plus rapide, plus fiable.*

- [ ] **Q :** Qu'est-ce que tu n'as pas testé et pourquoi ?
  - *R : Routes bookings, users, announcements — par manque de temps. Les tests existants couvrent le coeur de la sécurité (auth, admin guard).*

### Déploiement & DevOps

- [ ] **Q :** Comment déploies-tu l'application ?
  - *R : Via Docker — un Dockerfile basé sur node:20-alpine copie le backend et le frontend, expose le port 3000.*

- [ ] **Q :** Pourquoi Docker ?
  - *R : Environnement reproductible, pas de problème de "ça marche chez moi", facilite le déploiement sur n'importe quel serveur.*

- [ ] **Q :** Comment lancer le projet en développement ?
  - *R : `npm run dev` à la racine (concurrently lance le backend sur 3000 via nodemon et le frontend sur 5501 via Live Server).*

### Gestion de projet

- [ ] **Q :** Comment as-tu organisé ton travail ?
  - *R : User stories triées par priorité (P0/P1/P2), todo list, sessions de travail ciblées. Toutes les P0 (core fonctionnel) sont faites.*

- [ ] **Q :** Comment as-tu géré les versions et le suivi ?
  - *R : Git avec commits réguliers, un journal de bord (`docs/journal.md`) tenu à chaque session.*

- [ ] **Q :** Qu'est-ce qui reste à améliorer ?
  - *R : Accessibilité (ARIA, navigation clavier), tests frontend, séparation de app.js en modules, graphiques dashboard admin.*

### Problèmes rencontrés (à valoriser)

- [ ] **Q :** Quels problèmes techniques as-tu rencontrés ?
  - *R : CORS entre les ports 5500/5501, désynchronisation BDD/schéma, port 3000 déjà utilisé, synchronisation backend/frontend sur les noms de colonnes.*

- [ ] **Q :** Comment as-tu résolu le problème CORS ?
  - *R : Élargissement de la whitelist CORS dans le .env pour inclure tous les ports de développement.*

- [ ] **Q :** Comment as-tu géré la désynchronisation des noms de colonnes entre backend et frontend ?
  - *R : Identification de l'écart, correction des noms de colonnes dans la route POST /api/sessions pour aligner sur les noms attendus par le frontend.*

### Compétences transversales

- [ ] **Q :** Comment as-tu organisé ton temps ?
  - *R : Sessions ciblées par fonctionnalité, priorisation P0 → P1 → P2, suivi via todo list.*

- [ ] **Q :** Qu'as-tu appris sur la gestion de projet ?
  - *R : L'importance de la priorisation, la difficulté d'estimer le temps, la valeur d'une documentation à jour.*

- [ ] **Q :** Comment as-tu utilisé l'IA (opencode) dans ce projet ?
  - *R : Assistant de codage (génération, refactoring), exploration du codebase via des agents spécialisés, automatisation des commits avec le journal de bord via une skill personnalisée.*

- [ ] **Q :** Quelle est la différence entre travailler avec une IA dans le navigateur vs opencode en CLI ?
  - *R : L'IA a un accès direct au filesystem, peut exécuter des commandes, lire/écrire des fichiers — plus efficace et intégré.*

---

## 3. Points à absolument connaître pour la soutenance

### Ce que tu dois pouvoir EXPLIQUER SANS NOTE (socle minimum)

1. Le parcours utilisateur complet (inscription → voir séances → réserver → annuler)
2. Le parcours administrateur complet (créer/modifier/supprimer séances, gérer utilisateurs)
3. Comment fonctionne l'authentification JWT (login → token → localStorage → header)
4. Comment est structurée la base de données (les 7 tables et leurs relations)
5. Pourquoi tu as fait les choix techniques que tu as faits
6. Les mesures de sécurité mises en place
7. Ce qui marche et ce qui ne marche pas encore
8. Les difficultés rencontrées et comment tu les as résolues

### Ce qui fait la différence

- Parler de **sécurité** (bcrypt, JWT, Helmet, rate-limit, SQL paramétré, XSS prevention)
- Parler de **qualité** (tests Jest, Supertest, Cypress)
- Parler de **méthodologie** (US, priorisation, journal de bord)
- Parler **d'architecture** (middleware chain, séparation backend/frontend, SPA)
- Avoir un **avis critique** sur ton propre projet (ce que tu ferais mieux maintenant)

---

## 4. Auto-évaluation : es-tu prêt ?

| Critère | ✅ / ❌ |
|---------|--------|
| Je peux présenter le projet en 2 minutes chrono | ☐ |
| Je comprends chaque notion cochée dans la section 1 | ☐ |
| Je peux répondre aux questions du jury dans la section 2 | ☐ |
| Je peux lancer et démontrer l'application | ☐ |
| Je peux montrer le code et l'expliquer | ☐ |
| Je peux pointer les axes d'amélioration | ☐ |

---

> **Conseil :** Pour chaque notion non cochée, cherche la définition et entraîne-toi à l'expliquer à voix haute comme si tu t'adressais au jury.
