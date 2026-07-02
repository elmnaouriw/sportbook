# Journal de bord — SportBook

## 2026-06-16
- Mise à jour du README pour refléter la nouvelle architecture backend/frontend
- Ajout de la skill commit-journal pour automatiser les commits avec mise à jour du journal

## 2026-06-16 (2e session)
### Réalisations
- Implémentation de la page admin frontend : création, listing et suppression de séances depuis le dashboard administrateur
- Correction des noms de colonnes dans l'API POST /api/sessions pour aligner backend et frontend
- Enrichissement de la skill commit-journal avec un questionnaire structuré pour guider la rédaction du journal de bord
- Ajout de la documentation projet (brief, todo, user-stories, AGENTS.md)

### Problèmes rencontrés
- Première utilisation d'opencode (passage de Claude dans le navigateur à un outil en ligne de commande)
- Découverte et création d'une skill personnalisée pour automatiser les commits avec journal
- Changement de workflow : auparavant je copiais-collais depuis le navigateur, maintenant j'utilise des outils spécialisés

### Compétences transversales
- Autonomie : travail en indépendance sur la feature admin
- Résolution de problèmes : correction de la désynchronisation backend/frontend
- Utilisation d'outils IA : adoption d'opencode avec ses agents spécialisés

### Prochaines étapes
- Modifier une séance existante (US-019) — PUT /api/sessions/:id + formulaire frontend

## 2026-06-16 (3e session)
### Réalisations
- Correction CORS dans `server.js` : ajout des origines `localhost:5500` et `127.0.0.1:5500` pour permettre au frontend de communiquer avec l'API
- Implémentation de la fonctionnalité "Annonces" côté utilisateur :
  - Table `announcements` en BDD (auto-créée au démarrage) avec liaison FK vers `users`
  - Route API `GET/POST/DELETE /api/announcements` avec authentification
  - Page frontend dédiée avec formulaire de création et liste des annonces
  - Styles CSS pour les cards d'annonces (avatar, auteur, date)

### Problèmes rencontrés
- Problème CORS : le frontend tournait sur le port 5500 alors que le CORS était configuré uniquement pour le 5501. Résolu en élargissant les origines autorisées dans la config CORS.

### Compétences transversales
- Autonomie : implémentation complète d'une feature de la BDD au frontend
- Utilisation d'outils IA exécutants : adoption des agents spécialisés (explore) pour analyser le codebase en profondeur avant d'implémenter

### Prochaines étapes
- Dashboard admin annonces : interface administrateur pour gérer toutes les annonces

## 2026-06-16 (4e session)
### Réalisations
- Dashboard admin annonces : section dédiée dans la page Admin pour lister et supprimer les annonces
- Ajout des fonctions `loadAdminAnnouncements()` et `adminDeleteAnnouncement()` dans app.js
- Intégration du chargement automatique des annonces dans `showAdminPage()`

### Prochaines étapes
- Notifications quand une annonce est publiée

## 2026-06-18
### Réalisations
- Implémentation de la page profil utilisateur (US-005) :
  - Backend : route `GET /api/users/me` pour consulter son profil
  - Backend : route `PUT /api/users/me` pour modifier nom, email et mot de passe (avec vérification du mot de passe actuel)
  - Frontend : page "Mon profil" avec formulaire de modification
  - Lien de navigation "Mon profil" visible quand connecté
  - Mise à jour automatique du nom affiché dans la nav après modification
- Mise à jour de la todo list et user-stories

### Compétences transversales
- Autonomie : implémentation complète d'une feature de l'API au frontend
- Organisation : priorisation d'une US P1 après avoir bouclé toutes les P0

### Prochaines étapes
- Modifier une séance (US-019) — dernière P0 restante
- Notifications quand une annonce est publiée

## 2026-06-18 (2e session)
### Réalisations
- Ajout d'un sélecteur de rôle (User/Admin) dans le formulaire d'inscription :
  - Backend : route `POST /api/auth/register` accepte désormais un champ `role` (user/admin)
  - Backend : le rôle est stocké en BDD et inclus dans le JWT (payload + réponse)
  - Frontend : sélecteur visuel en cartes radio (User pour réserver / Admin pour publier des annonces)
  - CSS : styles dédiés pour le sélecteur (grille 2 colonnes, carte avec bordure bleue au sélection)

### Problèmes rencontrés
- Port 3000 déjà utilisé au lancement du serveur : un processus Node résiduel tournait encore, résolu en tuant le processus avec `kill` avant de relancer

### Décisions
- Choix d'un sélecteur en cartes radio plutôt qu'un simple menu déroulant pour meilleure expérience utilisateur : les deux options sont visibles en permanence avec une description claire (Book sessions / Post announcements)

### Prochaines étapes
- Modifier une séance (US-019)

## 2026-06-18 (3e session)
### Réalisations
- Correction de la visibilité des annonces par rôle :
  - Backend : `GET` et `POST /api/announcements` protégés par `adminMiddleware` (réservé aux admins)
  - Frontend : lien "Annonces" masqué pour les utilisateurs non-admin dans la navigation
  - Frontend : `showAnnouncementsPage()` vérifie le rôle admin avant d'afficher la page
- Les utilisateurs classiques ne voient plus les annonces (ni dans la nav, ni via l'API)

### Problèmes rencontrés
- Des annonces de test créées précédemment étaient visibles par tous les utilisateurs, y compris les nouveaux comptes — résolu en restreignant l'accès au rôle admin

### Décisions
- Séparation claire des fonctionnalités : User peut réserver des séances, Admin peut gérer les annonces et les séances. Chaque profil a sa propre navigation.

### Prochaines étapes
- Modifier une séance (US-019)

## 2026-06-18 (4e session)
### Réalisations
- Ajout de **Helmet** pour sécuriser les en-têtes HTTP (prévention XSS, clickjacking, etc.)
- Ajout de **express-rate-limit** avec deux limiteurs : général (100 req/15min) et auth (10 req/15min)
- Ajout de **express-validator** sur toutes les routes d'API :
  - Validation des entrées (email, mot de passe, champs requis, formats)
  - Middleware de validation réutilisable dans `middleware/validate.js`
- **API URL configurable** : variable `API_URL` dans `.env`, CORS via `CORS_ORIGINS`, frontend lit `window.__API_URL__` avec fallback
- **PUT /sessions** sécurisé : validation des types via express-validator (sport_id entier, date ISO, time HH:MM, etc.)
- **Endpoint `POST /api/auth/logout`** avec invalidation du token :
  - Blacklist en mémoire (Set) avec hash SHA-256
  - Vérification du token blacklisté dans `authMiddleware`
  - Frontend : `logout()` appelle l'API avant de nettoyer le localStorage
- Ajout table `token_blacklist` dans `database.sql` et migration auto `config/db.js`

### Problèmes rencontrés
- Aucun problème majeur — les tests existants (17 tests) passent sans modification grâce au choix d'une blacklist en mémoire plutôt qu'en BDD pour le middleware d'auth

### Décisions
- Blacklist en mémoire (Set) plutôt qu'en BDD : pas de requête DB à chaque appel API, plus performant ; non persisté entre les redémarrages mais acceptable pour ce projet
- Rate-limiter séparé pour `/api/auth/` (10 req/15min) plus restrictif que le limiteur général (100 req/15min) pour limiter les tentatives de brute-force
- express-validator plutôt que Joi : plus léger, s'intègre nativement avec Express, suffisant pour les besoins du projet

### Compétences transversales
- Sécurité : prise de conscience des bonnes pratiques (helmet, rate limiting, validation, blacklist)
- Organisation : traitement groupé de 5 tâches de sécurité/maintenance en une session

### Prochaines étapes
- Tests de sécurité (US-042)
- Déploiement (Docker / VPS)

## 2026-06-18 (5e session)
### Réalisations
- **US-006 — Mot de passe oublié** :
  - Backend : endpoints `POST /api/auth/forgot-password` et `POST /api/auth/reset-password`
  - Backend : table `password_reset_tokens` en BDD (token hash, expiration, flag used)
  - Backend : installation de `nodemailer` pour l'envoi d'emails
  - Backend : fallback console quand SMTP non configuré (affiche le lien dans les logs)
  - Frontend : page "Forgot Password" avec formulaire email
  - Frontend : page "Reset Password" avec nouveau mot de passe (token dans l'URL)
  - Frontend : lien "Forgot password?" dans la page de connexion
  - `.env.example` : ajout des variables SMTP (Mailtrap recommandé en dev)
- **Tests E2E frontend avec Cypress** :
  - Installation et configuration de Cypress 15.17.0
  - 12 tests E2E couvrant : page d'accueil, navigation, login, register, forgot-password, reset-password
  - Scripts `test:e2e` (headless) et `test:e2e:open` (GUI) dans package.json racine

### Décisions
- Nodemailer avec fallback console : pas de SMTP obligatoire en dev, le lien s'affiche dans la console serveur ; en prod, config SMTP via `.env`
- Token de reset : hash SHA-256 stocké en BDD (jamais le token en clair), expiration 1h, flag `used` pour usage unique
- Cypress plutôt que Playwright : plus simple à setup pour un projet vanilla JS, écosystème mature

### Compétences transversales
- Autonomie : implémentation complète de deux features distinctes (reset password + tests E2E) en une session
- Veille technique : découverte de nodemailer pour l'envoi d'emails, configuration SMTP

### Prochaines étapes
- Tests de sécurité (US-042)
- Navigation clavier (US-032) et accessibilité (US-033)

## 2026-07-02 (6e session)
### Réalisations
- **i18n — Internationalisation du frontend** :
  - Traduction complète anglais → français de l'interface (boutons, labels, messages, dates, navigation, placeholders)
  - Format 24h (remplacement AM/PM) et dates françaises (31 janv. 2026)
  - Adaptation des textes dans `app.js`, `index.html` et `style.css`
- **Responsive design (US-028)** :
  - Media queries pour tablette (max 1024px) : grille 2 colonnes, navigation adaptée
  - Media queries pour mobile (max 640px) : grille 1 colonne, menu compact, empilement vertical
  - Amélioration de l'affichage des formulaires, cards, et sections sur petits écrans
- **Footer + pages légales (US-045, US-046)** :
  - Footer avec liens Mentions légales, CGU, GitHub
  - Pages `cgu.html` et `mentions-legales.html` complètes
  - Lien vers CGU et mentions légales dans le formulaire d'inscription
- **Améliorations UX** :
  - CTA banner masqué quand l'utilisateur est connecté
  - Redirection automatique des pages auth (login/register/forgot/reset) si déjà connecté
  - Message d'erreur amélioré sur les bookings avec préfixe "Erreur :"
  - `loadSports()` dynamique avec fallback en dur si API indisponible
- **Infrastructure backend** :
  - ErrorHandler centralisé (AppError class + middleware Express)
  - Routes admin CRUD : GET/PUT/DELETE users, GET/DELETE bookings (US-023/024/025/026/027)
  - Route `GET /api/sports` pour chargement dynamique de la liste des sports
  - Mode production : `express.static` sert le frontend, catch-all SPA pour le routing
  - Export `ready` promise dans `db.js` : le serveur attend l'initialisation BDD avant d'écouter
  - Fix division par zéro dans `sessions_view` (protection `WHEN s.total_spots > 0`)
- **Déploiement (US-043)** :
  - Dockerfile multi-stage (node:20-alpine, npm ci, production)
  - docker-compose.yml avec service MySQL 8.0 (port 3307) + API (port 3000)
  - Root `package.json` avec scripts `dev`, `test`, `test:e2e`, `start`, `install:all`
  - `.env.production.example` pour déploiement Alwaysdata
  - API URL en relatif (`/api`) au lieu de localhost:3000
- **Tests (US-040, US-041, US-042)** :
  - Tests unitaires Jest : auth middleware, errorHandler, health check (11 tests)
  - Tests E2E Cypress : accueil, navigation, login, register, forgot-password, reset-password (12 tests)

### Problèmes rencontrés
- Aucun problème majeur sur cette session — les fonctionnalités étaient déjà implémentées, il s'agissait surtout de finalisation (i18n, responsive, packaging)

### Décisions
- Traduction complète en français plutôt que support multilingue : le projet est pour un marché francophone, pas besoin de i18n library
- API URL en relatif (`/api`) en production : le frontend est servi par Express, pas besoin d'URL absolue
- Fallback console pour nodemailer : pas de SMTP en dev, le lien s'affiche dans les logs

### Compétences transversales
- Organisation : regroupement de toutes les fonctionnalités implémentées en sessions précédentes en 3 commits logiques
- Autonomie : implémentation du responsive design sans framework CSS
- Rigueur : synchronisation de `database.sql` avec le schéma runtime, ajout des pages légales manquantes

### Prochaines étapes
- Tests de sécurité (US-042)
- Navigation clavier (US-032) et accessibilité (US-033)

## 2026-07-02 (7e session)
### Réalisations
- **Migration bcrypt → bcryptjs** : remplacement de `bcrypt` (dépendances natives, échec d'install sur certaines archi) par `bcryptjs` (pure JS, cross-platform) dans tous les fichiers backend
- **Simplification du workflow dev** : suppression du bloc `isProduction` dans `server.js` — Express sert désormais le frontend en dev comme en prod. `npm run dev` ne lance plus que le backend (plus besoin de live-server)
- **Nouveau script dev** : `npm run dev:hot` conserve l'ancien comportement (backend + live-server) pour ceux qui veulent le hot-reload
- **Tri des fichiers de soutenance** : `.gitignore` mis à jour pour exclure `SportBook-Presentation.pptx` (généré par `generate-pptx.js`) ; les fichiers source (`generate-pptx.js`, `presentation-sportbook.md`, `script-oral.md`, `Soutenance_DWWM_SportBook_V3_Technique.key`) sont versionnés
- **Création de `docs/plan-de-comite.md`** : document complet avec déroulement du jour J (timing 20-30 min, plan de présentation slide par slide, démo utilisateur + admin, anticipation questions jury) et dossier jury (documents à fournir, checklist préparation, auto-évaluation)

### Décisions
- bcryptjs plutôt que bcrypt : pas de dépendances natives = installation fiable sur tous les environnements (Mac, Windows, Linux, Docker multi-arch)
- Frontend servi par Express en dev : simplifie le workflow, un seul processus, plus de problème CORS entre ports
- Fichiers soutenance : seuls les fichiers source sont versionnés, le PPTX généré est ignoré par Git

### Compétences transversales
- Organisation : préparation complète du dossier de soutenance (plan de comité, tri des fichiers, simplification du workflow)
- Rigueur : nettoyage des dépendances et harmonisation dev/prod avant la soutenance

### Prochaines étapes
- Tests de sécurité (US-042)
- Navigation clavier (US-032) et accessibilité (US-033)

## Avant 2026-06-16
- J'ai fais un brief et des tests au niveau de l'interface en utilisant Claude dans le navigateur
- J'ai installé sur ma machine XAMPP pour faire fonctionner la base de donnée et avoir PHPMYADMIN inclus dedans