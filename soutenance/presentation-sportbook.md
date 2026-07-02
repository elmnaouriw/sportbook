# Présentation Soutenance — SportBook

**Auteur :** Walid El Mnaouri
**Formation :** Titre Professionnel Développeur Web et Web Mobile — RNCP 37674
**Établissement :** MolenGeek
**Date :** Juillet 2026
**Projet :** SportBook — Application de réservation de séances sportives

---

> Ce document contient les 30 slides de présentation avec, pour chacune :
> 1. Titre de la slide
> 2. Contenu visuel / texte
> 3. Suggestion de design
> 4. Éléments techniques à expliquer
> 5. Note orale

---

## Slide 1 — Slide de titre

| Champ | Contenu |
|---|---|
| **Titre** | SportBook |
| **Sous-titre** | Application de réservation de séances sportives |
| **Informations** | Walid El Mnaouri — Titre Professionnel DWWM |
| | MolenGeek — Juillet 2026 |

**Design :**
- Fond sombre ou dégradé sportif (bleu nuit → violet)
- Logo SportBook centré (ou texte stylisé)
- Icône de sport (ballon, chronomètre) en subtil arrière-plan
- Texte blanc, lisible, typo sans-serif moderne

**Éléments techniques :** Aucun (slide d'ouverture)

**Note orale :**
> *Bonjour, je suis Walid El Mnaouri, et je vous présente aujourd'hui SportBook, mon projet de fin de formation pour le titre Développeur Web et Web Mobile, réalisé à MolenGeek.*

---

## Slide 2 — Présentation personnelle

| Champ | Contenu |
|---|---|
| **Titre** | Qui suis-je ? |
| **Contenu** | Walid El Mnaouri |
| | Parcours : [à compléter — reconversion, formation, etc.] |
| | Formation DWWM à MolenGeek — 6 mois |
| | Objectif : Devenir développeur web full-stack |

**Design :**
- Photo d'identité à gauche (ou avatar)
- Liste concise à droite
- Couleurs sobres, professionnelles
- Icône utilisateur ou portrait stylisé

**Éléments techniques :** Aucun

**Note orale :**
> *Je m'appelle Walid El Mnaouri. Avant cette formation, [mon parcours]. Pendant 6 mois, j'ai été formé aux technologies du développement web front-end et back-end à MolenGeek. SportBook est le projet qui concrétise l'ensemble des compétences acquises.*

---

## Slide 3 — Contexte de la formation

| Champ | Contenu |
|---|---|
| **Titre** | Contexte de la formation |
| **Contenu** | **Formation :** Titre Professionnel DWWM — RNCP 37674 |
| | **Organisme :** MolenGeek (Bruxelles) |
| | **Durée :** 6 mois — temps plein |
| | **Compétences visées :** |
| | • Développer la partie front-end d'une application web |
| | • Développer la partie back-end d'une application web |
| | • Concevoir une base de données |
| | • Sécuriser une application web |

**Design :**
- Timeline ou blocs numérotés
- Couleur sobre, puces bien espacées
- Mention du RNCP pour crédibilité

**Éléments techniques :** Aucun

**Note orale :**
> *Le titre DWWM est un diplôme de niveau 5 (Bac+2) délivré par le Ministère du Travail. La formation à MolenGeek m'a préparé à l'ensemble du cycle de développement web, de la maquette à la base de données en passant par le déploiement.*

---

## Slide 4 — Présentation du projet SportBook

| Champ | Contenu |
|---|---|
| **Titre** | SportBook — Le projet |
| **Contenu** | **Quoi ?** Application web de réservation de séances sportives |
| | **Pour qui ?** Associations sportives, salles de sport, pratiquants |
| | **Stack :** HTML / CSS / JS vanilla — Node.js / Express — MySQL |
| | **Type :** SPA (Single Page Application) full-stack |

**Design :**
- 3 ou 4 icônes illustrant le concept (calendrier + ballon + écran + base de données)
- Texte court, aéré
- Fond blanc, accent coloré pour les mots-clés

**Éléments techniques :** Présentation rapide de la stack sans détail

**Note orale :**
> *SportBook est une application qui permet à des utilisateurs de découvrir, réserver et gérer des séances sportives. Côté administrateur, elle offre des outils complets pour gérer l'offre sportive. L'application est full-stack, avec un front-end en JavaScript vanilla et un back-end Node.js/Express connecté à une base MySQL.*

---

## Slide 5 — Problématique / besoin utilisateur

| Champ | Contenu |
|---|---|
| **Titre** | Problème identifié |
| **Contenu** | **Avant SportBook :** |
| | • Offre sportive dispersée (WhatsApp, téléphone, bouche-à-oreille) |
| | • Pas de visibilité en temps réel sur les places disponibles |
| | • Pas de système centralisé de réservation |
| | • Gestion manuelle pour les organisateurs |
| | **Avec SportBook :** |
| | • Tout est centralisé en un clic |
| | • Réservation et annulation autonomes |

**Design :**
- Deux colonnes : "Avant" (rouge/orange) vs "Après" (vert)
- Icônes illustrant chaque point (téléphone, calendrier, checkmark)
- Contraste visuel fort

**Éléments techniques :** Aucun

**Note orale :**
> *Le constat est simple : aujourd'hui, pour réserver une séance de sport, il faut téléphoner, envoyer un message ou se déplacer. Il n'existe pas d'outil centralisé qui permette de voir en temps réel les séances disponibles et de réserver en ligne. SportBook répond à ce manque.*

---

## Slide 6 — Objectifs du projet

| Champ | Contenu |
|---|---|
| **Titre** | Objectifs |
| **Contenu** | **Objectifs fonctionnels :** |
| | • Permettre l'inscription et la connexion sécurisée |
| | • Offrir un catalogue de séances avec filtres |
| | • Permettre la réservation et l'annulation |
| | • Fournir un espace d'administration complet |
| | **Objectifs techniques :** |
| | • Application full-stack fonctionnelle |
| | • Code sécurisé (JWT, bcrypt, validation) |
| | • Interface responsive |
| | • Tests automatisés |

**Design :**
- Deux blocs distincts : "Fonctionnels" et "Techniques"
- Checkmarks à côté de chaque objectif
- Design épuré, police lisible

**Éléments techniques :** Mention des objectifs de sécurité

**Note orale :**
> *Les objectifs étaient doubles. D'un côté, livrer une application complète et utilisable avec tous les parcours essentiels. De l'autre, appliquer les bonnes pratiques de développement : sécurité, responsive, tests, et architecture propre.*

---

## Slide 7 — Public cible

| Champ | Contenu |
|---|---|
| **Titre** | Public cible |
| **Contenu** | **Utilisateurs finaux :** |
| | • Pratiquants de sport (tout âge, tout niveau) |
| | • Personnes cherchant une activité sportive près de chez elles |
| | **Administrateurs :** |
| | • Gérants de salles de sport |
| | • Associations sportives |
| | • Coachs / éducateurs sportifs |

**Design :**
- Deux profils utilisateur illustrés (icônes)
- Flèche montrant l'interaction des deux publics avec l'application
- Design simple, pas de texte technique

**Éléments techniques :** Aucun

**Note orale :**
> *L'application s'adresse à deux types d'utilisateurs. Les pratiquants, qui veulent trouver et réserver des séances facilement. Et les administrateurs, qui ont besoin d'un outil pour gérer leur offre sportive.*

---

## Slide 8 — Fonctionnalités principales

| Champ | Contenu |
|---|---|
| **Titre** | Fonctionnalités |
| **Contenu** | **Utilisateur :** |
| | • Inscription / Connexion sécurisée |
| | • Consultation des séances avec filtres |
| | • Réservation et annulation |
| | • Profil et "Mes réservations" |
| | • Consultation des annonces |
| | **Administrateur :** |
| | • CRUD complet des séances |
| | • CRUD des annonces |
| | • Gestion des utilisateurs |
| | • Gestion des rôles (user/admin) |

**Design :**
- Deux colonnes : "Utilisateur" / "Administrateur"
- Chaque fonctionnalité avec une petite icône
- Badges de couleur pour distinguer les deux rôles

**Éléments techniques :** Expliquer brièvement le CRUD et la gestion des rôles

**Note orale :**
> *Côté utilisateur, les fonctionnalités couvrent tout le parcours : de la création de compte à l'annulation d'une réservation. Côté administrateur, on retrouve les opérations CRUD classiques et la gestion des rôles.*

---

## Slide 9 — Parcours utilisateur

| Champ | Contenu |
|---|---|
| **Titre** | Parcours utilisateur |
| **Contenu** | Schéma textuel : |
| ```
  Accueil
     │
     ▼
  Inscription ──► Connexion
     │
     ▼
  Page des séances ──► Filtres (sport, date, recherche)
     │
     ▼
  Réserver une séance
     │
     ▼
  Mes réservations ──► Annulation (si besoin)
     │
     ▼
  Profil (modification)
``` |

**Design :**
- Diagramme de flux vertical ou horizontal avec des flèches
- Chaque étape dans une carte arrondie
- Couleur dégradée du haut vers le bas

**Éléments techniques :** Expliquer brièvement le flux de navigation SPA

**Note orale :**
> *Le parcours utilisateur est linéaire et intuitif : on s'inscrit, on explore les séances, on réserve en un clic, et on peut gérer ses réservations depuis un espace dédié. Tout se fait sans rechargement de page, grâce à l'architecture SPA.*

---

## Slide 10 — Parcours administrateur

| Champ | Contenu |
|---|---|
| **Titre** | Parcours administrateur |
| **Contenu** | Schéma textuel : |
```
  Connexion admin
       │
       ▼
  Dashboard admin
       │
   ┌───┼───────────┐
   ▼   ▼           ▼
Séances Utilisateurs Annonces
   │     │           │
   ▼     ▼           ▼
CRUD  Gérer rôles  CRUD
complet             complet
``` |

**Design :**
- Diagramme arborescent
- Dashboard comme point central
- Icônes par section (calendrier, users, megaphone)

**Éléments techniques :** Protection des routes admin avec double middleware

**Note orale :**
> *Le parcours administrateur est centralisé autour d'un dashboard. L'administrateur peut gérer les séances, les utilisateurs et les annonces depuis une interface unique. Chaque action est protégée par un double système de vérification : authentification JWT puis vérification du rôle admin.*

---

## Slide 11 — Maquettes Figma

| Champ | Contenu |
|---|---|
| **Titre** | Conception — Maquettes Figma |
| **Contenu** | • Conception de l'interface avant le développement |
| | • Création des maquettes desktop et mobile |
| | • Définition du parcours utilisateur visuel |
| | • Validation du design avant intégration |

**Design :**
- Captures d'écran des maquettes Figma (page d'accueil, sessions, mobile)
- Disposition : maquette desktop en grand + maquette mobile à côté
- Flèche "Figma → Code" pour montrer la transition

**Éléments techniques :** Aucun (design)

**Note orale :**
> *Avant de coder, j'ai conçu l'interface sur Figma. Cela m'a permis de valider l'ergonomie, le parcours et l'identité visuelle avant de commencer l'intégration. J'ai conçu les vues desktop et mobile simultanément.*

---

## Slide 12 — Charte graphique / UI

| Champ | Contenu |
|---|---|
| **Titre** | Charte graphique |
| **Contenu** | **Couleurs :** |
| | • Primaire : Bleu foncé #1a2a4a |
| | • Accent : Orange vif #f97316 (CTA, badges, survols) |
| | • Fond : Blanc #ffffff et gris clair #f8fafc |
| | • Texte : Gris foncé #1f2937 |
| | **Typographie :** Sans-serif (Inter / system-ui) |
| | **Composants :** Cartes, badges, toasts, skeleton loading |
| | **Responsive :** 3 breakpoints (mobile < 640px, tablette < 1024px, desktop) |

**Design :**
- Palette de couleurs affichée (cercles de couleur)
- Exemple de typographie
- Miniature des composants (carte, badge, toast)

**Éléments techniques :** Variables CSS (custom properties), Grid, Flexbox, media queries

**Note orale :**
> *La charte graphique repose sur des couleurs sobres et un accent orange pour les actions importantes. Le CSS utilise des variables pour la cohérence et est organisé avec Flexbox et Grid pour la mise en page. L'application est responsive avec trois points de rupture.*

---

## Slide 13 — Architecture globale

| Champ | Contenu |
|---|---|
| **Titre** | Architecture globale |
| **Contenu** | Schéma textuel : |
```
  ┌─────────────────────────────────────┐
  │          NAVIGATEUR                  │
  │  Frontend SPA (HTML/CSS/JS)         │
  │  Port 5501 — Live Server            │
  └──────────────┬──────────────────────┘
                 │ API REST (HTTP / JSON)
                 │ Authorization: Bearer JWT
  ┌──────────────┴──────────────────────┐
  │          BACKEND Node.js            │
  │  Express — Routes → Middlewares     │
  │  → Contrôleurs                     │
  │  Port 3000                         │
  └──────────────┬──────────────────────┘
                 │ mysql2/promise
  ┌──────────────┴──────────────────────┐
  │    BASE DE DONNÉES MySQL 8          │
  │    7 tables + 1 vue                 │
  └─────────────────────────────────────┘
``` |

**Design :**
- Trois blocs empilés (Frontend, Backend, BDD) reliés par des flèches
- Icônes par bloc (écran, serveur, base)
- Couleurs distinctes par couche (clair, moyen, foncé)

**Éléments techniques :** Expliquer les 3 couches, le rôle de chaque niveau

**Note orale :**
> *L'architecture suit un modèle classique en 3 couches. Le navigateur communique avec le backend via une API REST en JSON. Le backend, avec Express, reçoit les requêtes, les traite via des middlewares et des contrôleurs, et interroge la base de données avec mysql2. Chaque couche est indépendante.*

---

## Slide 14 — Architecture front-end

| Champ | Contenu |
|---|---|
| **Titre** | Architecture front-end |
| **Contenu** | Structure du front-end : |
| • **index.html** — Structure unique de la SPA (toutes les pages) |
| • **style.css** — Styles, responsive, animations, variables |
| • **app.js** — Logique applicative (navigation, API, auth, DOM) |
| | **Fonctionnement SPA :** |
| • `showPage(page)` masque/affiche les sections |
| • Navigation sans rechargement |
| • Token JWT stocké dans localStorage |
| • Appels API avec `fetch()` via un wrapper `apiFetch()` |

**Design :**
- Représentation simple du fichier HTML avec des sections marquées
- Icônes pour chaque page
- Flèche montrant la fonction `showPage()` qui cache/affiche

**Éléments techniques :** Concept de SPA, `showPage()`, `apiFetch()`, localStorage

**Note orale :**
> *Le front-end est organisé autour de trois fichiers. Un seul fichier HTML contient toutes les pages, et JavaScript s'occupe d'afficher ou masquer les bonnes sections. Le token JWT est stocké dans localStorage et envoyé automatiquement dans chaque requête API via un wrapper sécurisé.*

---

## Slide 15 — Architecture back-end

| Champ | Contenu |
|---|---|
| **Titre** | Architecture back-end |
| **Contenu** | **Structure :** |
| • **server.js** — Point d'entrée, configuration des middlewares |
| • **config/db.js** — Pool MySQL, auto-initialisation |
| • **routes/** — Définition des endpoints API |
| • **middleware/auth.js** — Auth JWT + Vérification admin |
| | **Chaîne de middlewares :** |
```
Requête → Helmet → CORS → JSON Parser
    → Rate Limit → Auth Middleware → Route
    → Controller → Réponse
``` |

**Design :**
- Boîtes horizontales enchaînées (chaîne de middlewares)
- Backend représenté comme un pipeline de traitement
- Code stylisé (fond sombre) pour montrer la structure

**Éléments techniques :** Middleware chain, Express, architecture en couches

**Note orale :**
> *Le back-end est construit avec Express. Chaque requête traverse une chaîne de middlewares. D'abord les middlewares de sécurité (Helmet, CORS), puis le rate limiting, ensuite l'authentification si nécessaire, et enfin la route qui appelle la logique métier dans le contrôleur.*

---

## Slide 16 — Base de données

| Champ | Contenu |
|---|---|
| **Titre** | Base de données — Présentation |
| **Contenu** | **Type :** MySQL 8 — Base de données relationnelle |
| **Tables :** 7 tables |
| • **users** — Utilisateurs et rôles |
| • **sports** — Catégories de sport |
| • **sessions** — Séances sportives |
| • **bookings** — Réservations |
| • **announcements** — Annonces |
| • **token_blacklist** — Tokens JWT invalidés |
| • **password_reset_tokens** — Réinitialisation mot de passe |
| **Vue :** `sessions_view` — Statut des séances en temps réel |

**Design :**
- Représentation d'une base de données avec icône cylindre (classique)
- Liste des tables avec petites icônes
- Mise en avant de la vue SQL

**Éléments techniques :** Base relationnelle, tables, vue SQL

**Note orale :**
> *La base de données contient sept tables et une vue. Les tables couvrent les utilisateurs, les sports, les séances, les réservations et les annonces, plus deux tables techniques pour la gestion des tokens. La vue sessions_view permet de connaître en temps réel la disponibilité des séances.*

---

## Slide 17 — Schéma des tables

| Champ | Contenu |
|---|---|
| **Titre** | Schéma des tables |
| **Contenu** | Schéma textuel : |
```
users                    sports
├── id (PK)              ├── id (PK)
├── full_name            ├── slug (UNIQUE)
├── email (UNIQUE)       └── name
├── password (bcrypt)
└── role (ENUM: user/admin)

sessions                 bookings
├── id (PK)              ├── id (PK)
├── sport_id (FK)        ├── user_id (FK)
├── title                ├── session_id (FK)
├── instructor           ├── status (ENUM)
├── date                 └── UNIQUE(user_id, session_id)
├── time
├── duration             announcements
├── location             ├── id (PK)
└── total_spots          ├── title
                         ├── content
                         └── author_id (FK)
``` |

**Design :**
- Boîtes représentant chaque table avec colonnes et types
- Clés primaires (PK) et étrangères (FK) bien identifiées
- Contrainte UNIQUE mise en évidence
- Couleurs douces pour chaque table

**Éléments techniques :** Types MySQL, ENUM, contrainte UNIQUE, clés étrangères

**Note orale :**
> *Chaque table a un identifiant unique, des clés étrangères pour les relations, et des contraintes. La contrainte UNIQUE sur bookings empêche un utilisateur de réserver deux fois la même séance. Les mots de passe utilisent ENUM pour les rôles et les statuts.*

---

## Slide 18 — Relations entre les tables

| Champ | Contenu |
|---|---|
| **Titre** | Relations entre les tables |
| **Contenu** | Schéma textuel des relations : |
```
sports 1─────* sessions
  │                │
  │                │
  │                │
  │         bookings
  │           │   │
  │           │   │
  │      ┌────┘   │
  │      ▼        │
  └───* users  *──┘


  users 1─────* announcements
```

**Détail :**
- Un sport peut avoir plusieurs séances
- Un utilisateur peut avoir plusieurs réservations
- Une séance peut avoir plusieurs réservations
- Un administrateur peut créer plusieurs annonces
- Les réservations font le lien entre utilisateurs et séances
- CASCADE sur les suppressions

**Design :**
- Diagramme entité-relation simplifié
- Flèches * ── 1 et * ── *
- Clés étrangères indiquées

**Éléments techniques :** Relations 1-N et N-N (via table de liaison), ON DELETE CASCADE

**Note orale :**
> *La table bookings est une table de liaison entre users et sessions. Elle permet une relation plusieurs-à-plusieurs. Les clés étrangères assurent l'intégrité des données, et ON DELETE CASCADE garantit que la suppression d'un sport supprime automatiquement ses séances.*

---

## Slide 19 — Authentification JWT

| Champ | Contenu |
|---|---|
| **Titre** | Authentification — JWT |
| **Contenu** | Schéma textuel : |
```
  1. Inscription/Connexion
  2. Serveur vérifie les identifiants
  3. Serveur signe un JWT (userId + role)
  4. Token renvoyé au client
  5. Client stocke le token (localStorage)
  6. Chaque requête inclut le token
     Header: Authorization: Bearer <token>
  7. Serveur vérifie la signature
  8. req.user contient les infos utilisateur

  Structure du JWT :
  header.payload.signature
  { alg: HS256 } . { userId, role, exp } . signature
``` |

**Design :**
- Diagramme de flux en 8 étapes
- Code de token JWT affiché partiellement (format xx.yy.zz)
- Couleurs pour les 3 parties du JWT (rouge, vert, bleu)

**Éléments techniques :** `jwt.sign()`, `jwt.verify()`, payload, expiration, HS256, stateless

**Note orale :**
> *L'authentification repose sur des JWT. Quand un utilisateur se connecte, le serveur signe un token contenant son ID et son rôle. Ce token est stocké dans localStorage et renvoyé dans chaque requête via le header Authorization. Le serveur vérifie la signature et l'expiration, sans avoir à stocker de session côté serveur.*

---

## Slide 20 — Sécurité

| Champ | Contenu |
|---|---|
| **Titre** | Sécurité |
| **Contenu** | **Mesures mises en place :** |
| | 1. **Mots de passe** — Hashés avec bcrypt (12 rounds) |
| | 2. **JWT** — Tokens signés, expiration 7 jours, blacklist à la déconnexion |
| | 3. **Routes protégées** — Middleware auth + middleware admin |
| | 4. **Injections SQL** — Requêtes paramétrées (mysql2 `?`) |
| | 5. **Headers HTTP** — Helmet (X-Content-Type-Options, X-Frame-Options...) |
| | 6. **Rate limiting** — 10 req/15min sur login, 100/15min sur l'API |
| | 7. **Validation entrées** — express-validator côté serveur |
| | 8. **XSS** — Fonction `escapeHTML()` avant injection DOM |

**Design :**
- Liste numérotée avec icônes de cadenas/bouclier
- Code sécurisé en exemple à droite
- Pas de jargon trop technique

**Éléments techniques :** bcrypt, JWT, Helmet, rate-limit, express-validator, SQL paramétré

**Note orale :**
> *La sécurité a été une priorité. Chaque mot de passe est hashé avec bcrypt. Les tokens JWT sont signés et vérifiés à chaque requête. Les routes administrateur sont protégées par un middleware supplémentaire. Toutes les requêtes SQL utilisent des paramètres pour éviter les injections, et les entrées sont validées côté serveur. Helmet sécurise les en-têtes HTTP et le rate limiting protège contre les attaques par force brute.*

---

## Slide 21 — Exemples de routes API

| Champ | Contenu |
|---|---|
| **Titre** | API — Exemples de routes |
| **Contenu** | **Authentification :** |
| | `POST /api/auth/register` — Créer un compte |
| | `POST /api/auth/login` — Se connecter |
| | **Séances :** |
| | `GET /api/sessions` — Liste (avec filtres) |
| | `GET /api/sessions/featured` — Séances vedettes |
| | `POST /api/sessions` — Créer (admin) |
| | **Réservations (token requis) :** |
| | `POST /api/bookings` — Réserver |
| | `GET /api/bookings/me` — Mes réservations |
| | `DELETE /api/bookings/:id` — Annuler |
| | **Administration (admin requis) :** |
| | `GET /api/admin/users` — Liste des utilisateurs |
| | `PUT /api/admin/users/:id/role` — Modifier le rôle |

**Design :**
- Tableau ou liste avec code formaté (fond sombre)
- Méthodes HTTP colorées (GET=vert, POST=bleu, DELETE=rouge, PUT=orange)
- Badge 🔒 pour les routes protégées

**Éléments techniques :** Méthodes HTTP, REST, endpoints protégés

**Note orale :**
> *L'API expose une quinzaine d'endpoints. Certains sont publics, comme la consultation des séances. D'autres nécessitent un token JWT, comme la création de réservation. Et les routes d'administration sont réservées au rôle admin. Chaque endpoint suit les conventions REST.*

---

## Slide 22 — Démonstration des fonctionnalités

| Champ | Contenu |
|---|---|
| **Titre** | Démonstration |
| **Contenu** | **Parcours utilisateur :** |
| | 1. Page d'accueil (hero, stats, séances vedettes) |
| | 2. Inscription / Connexion |
| | 3. Parcourir les séances → Filtres par sport, date, recherche |
| | 4. Réserver une séance |
| | 5. Mes réservations → Annuler |
| | 6. Modifier le profil |
| | **Parcours administrateur :** |
| | 7. Dashboard admin |
| | 8. CRUD séances |
| | 9. Gestion des utilisateurs |
| | 10. Gestion des annonces |

**Design :**
- Slides de screenshots ou préparation pour démo en direct
- Numéros ou flèches pour l'ordre de démonstration
- "En direct" si démo live ou captures sinon

**Éléments techniques :** Aucun (c'est la démo)

**Note orale :**
> *Je vais maintenant vous montrer l'application en fonctionnement. Nous allons suivre le parcours complet d'un utilisateur, de l'inscription à l'annulation d'une réservation, puis basculer sur l'espace administrateur pour la gestion des séances et des utilisateurs.*

---

## Slide 23 — Tests réalisés

| Champ | Contenu |
|---|---|
| **Titre** | Tests |
| **Contenu** | **Tests backend (Jest + Supertest) :** |
| | • Tests du middleware d'authentification |
| | • Tests du middleware administrateur |
| | • Tests des routes API (health, sessions, featured) |
| | • Tests de la gestion d'erreurs 401/403 |
| | **Tests E2E (Cypress) :** |
| | • Tests d'affichage de la page d'accueil |
| | • Tests de navigation SPA |
| | • Tests des formulaires (connexion, inscription) |
| | **Commande :** `npm test` pour Jest, `npm run test:e2e` pour Cypress |

**Design :**
- Logo des outils de test (Jest, Cypress)
- Résultat imaginaire : "17 tests passés ✔"
- Badge de couverture ou pourcentage

**Éléments techniques :** Jest, Supertest pour tests d'API, Cypress pour E2E

**Note orale :**
> *Pour garantir la qualité du code, j'ai mis en place des tests unitaires et d'intégration avec Jest et Supertest pour le backend, et des tests E2E avec Cypress pour les scénarios utilisateur. Les tests couvrent notamment les middlewares de sécurité et les routes critiques.*

---

## Slide 24 — Difficultés rencontrées

| Champ | Contenu |
|---|---|
| **Titre** | Difficultés rencontrées |
| **Contenu** | 1. **Invalidation des JWT** |
| | → Problème : Les JWT sont stateless, on ne peut pas les révoquer |
| | 2. **Comptage des places disponibles** |
| | → Problème : Risque de sur-réservation |
| | 3. **Architecture SPA sans framework** |
| | → Problème : Gestion manuelle du routage et de l'état |
| | 4. **Désynchronisation backend / frontend** |
| | → Problème : Noms de colonnes différents entre API et affichage |
| | 5. **CORS** |
| | → Problème : Origine bloquée entre les ports |

**Design :**
- Blocs "Problème → Solution" pour chaque difficulté
- Problème en rouge à gauche, solution en vert à droite
- Design type "avant/après"

**Éléments techniques :** CORS, JWT blacklist, vue SQL, architecture SPA

**Note orale :**
> *Plusieurs difficultés techniques ont émergé. La première : comment révoquer un token JWT alors qu'il est stateless ? J'ai mis en place une blacklist en base de données. Ensuite, comment éviter les doublons de réservation ? Avec une contrainte UNIQUE et une vue SQL. L'architecture SPA sans framework a aussi demandé une gestion rigoureuse de l'état et de la navigation.*

---

## Slide 25 — Solutions apportées

| Champ | Contenu |
|---|---|
| **Titre** | Solutions apportées |
| **Contenu** | 1. **Blacklist de tokens JWT** (table `token_blacklist`) |
| | 2. **Contrainte UNIQUE** sur `(user_id, session_id)` + vue SQL `sessions_view` |
| | 3. **Architecture modulaire** : `showPage()`, state via localStorage, rendus dédiés |
| | 4. **Correction des noms de colonnes** dans les routes API |
| | 5. **Configuration CORS** via `.env` avec whitelist des ports de développement |

**Design :**
- Reprendre les 5 difficultés et afficher la solution en une ligne
- Icône "check" vert par solution
- Code ou schéma minimal pour la solution JWT blacklist

**Éléments techniques :** Blacklist JWT avec SHA-256, vue SQL, contrainte UNIQUE, CORS whitelist

**Note orale :**
> *Pour chaque difficulté, une solution concrète a été implémentée. La blacklist de tokens permet une déconnexion réelle malgré le stateless des JWT. La contrainte UNIQUE et la vue SQL garantissent l'intégrité des réservations. Et l'architecture modulaire du front-end rend le code maintenable sans framework.*

---

## Slide 26 — Améliorations possibles

| Champ | Contenu |
|---|---|
| **Titre** | Améliorations possibles |
| **Contenu** | **Fonctionnelles :** |
| | • Page de détail des séances avec informations complètes |
| | • Paiement en ligne pour les séances payantes |
| | • Notifications par email (confirmation, rappel) |
| | • Système d'avis et notation des séances |
| | **Techniques :** |
| | • Pagination des résultats |
| | • Accessibilité (ARIA, navigation clavier) |
| | • Séparation de `app.js` en modules |
| | • Graphiques et statistiques dans le dashboard admin |
| | • Tests frontend et coverage plus large |

**Design :**
- Deux colonnes : "Fonctionnelles" / "Techniques"
- Icône "future" ou roadmap
- Mention "V2" pour montrer la vision d'évolution

**Éléments techniques :** Points d'amélioration honnêtes

**Note orale :**
> *Le projet est fonctionnel, mais il y a des axes d'amélioration. J'aimerais ajouter un système de paiement, des notifications par email, et améliorer l'accessibilité. Techniquement, je séparerais app.js en modules pour une meilleure maintenabilité, et j'ajouterais des tests supplémentaires et de la pagination.*

---

## Slide 27 — Compétences DWWM mobilisées

| Champ | Contenu |
|---|---|
| **Titre** | Compétences DWWM mobilisées |
| **Contenu** | **Compétences techniques :** |
| | • Développement front-end (HTML/CSS/JS — SPA, responsive, animations) |
| | • Développement back-end (Node.js, Express, API REST) |
| | • Conception et gestion de base de données (MySQL) |
| | • Sécurité des applications web (JWT, bcrypt, Helmet, validation) |
| | • Tests (Jest, Supertest, Cypress) |
| | • Versioning (Git, GitHub) |
| | • Environnement de développement (VS Code, Docker) |
| | **Compétences transversales :** |
| | • Gestion de projet (priorisation P0/P1/P2, todo list) |
| | • Documentation (journal de bord, dossier professionnel) |
| | • Autonomie et résolution de problèmes |

**Design :**
- Deux colonnes : "Techniques" / "Transversales"
- Chaque compétence sous forme de tag/badge
- Lien avec le référentiel DWWM

**Éléments techniques :** Faire le lien avec le RNCP 37674

**Note orale :**
> *Ce projet m'a permis de mobiliser l'ensemble des compétences du titre DWWM. Du front-end avec l'intégration responsive et les animations, au back-end avec l'API REST et la sécurité, en passant par la base de données et les tests. Sans oublier les compétences transversales comme la gestion de projet, la documentation et l'autonomie.*

---

## Slide 28 — Conclusion

| Champ | Contenu |
|---|---|
| **Titre** | Conclusion |
| **Contenu** | **SportBook en bref :** |
| | • Application full-stack complète et fonctionnelle |
| | • Architecture propre (3 couches : frontend / backend / BDD) |
| | • Code sécurisé (JWT, bcrypt, validation, protection) |
| | • Interface responsive et soignée |
| | • Tests automatisés |
| | **Apprentissages :** |
| | • Maîtrise du développement full-stack |
| | • Importance de la sécurité dès la conception |
| | • Valeur de l'organisation et de la documentation |

**Design :**
- Résumé en checkpoints
- Fond sobre, texte blanc ou foncé selon le thème
- Phrase d'impact finale

**Éléments techniques :** Synthèse des acquis

**Note orale :**
> *SportBook est une application complète, sécurisée et testée. Ce projet m'a permis de consolider toutes les compétences acquises pendant la formation et de découvrir l'importance d'une bonne architecture et de la sécurité. Je ressors de ce projet avec une vraie maîtrise du développement full-stack.*

---

## Slide 29 — Remerciements

| Champ | Contenu |
|---|---|
| **Titre** | Remerciements |
| **Contenu** | • **MolenGeek** pour la formation et l'accompagnement |
| | • **Mon formateur** pour son suivi et ses conseils |
| | • **Le jury** pour le temps consacré à l'évaluation |
| | • **Mes proches** pour leur soutien |

**Design :**
- Fond épuré, centré
- Texte sobre et chaleureux
- Éventuellement logo MolenGeek

**Éléments techniques :** Aucun

**Note orale :**
> *Je tiens à remercier MolenGeek pour cette formation, mon formateur pour son accompagnement, le jury pour son attention, et mes proches pour leur soutien pendant ces 6 mois.*

---

## Slide 30 — Questions du jury

| Champ | Contenu |
|---|---|
| **Titre** | Questions ? |
| **Contenu** | Merci de votre attention. |
| | Je suis disponible pour répondre à vos questions. |
| | Contact : [email ou LinkedIn — optionnel] |

**Design :**
- Fond sobre et professionnel
- Texte centré "Questions ?"
- Icône de bulle de dialogue
- Éventuellement QR code vers le projet GitHub

**Éléments techniques :** Aucun

**Note orale :**
> *Merci pour votre attention. Je suis prêt à répondre à vos questions et à détailler les points qui vous intéressent.*

---

## Annexes — Schémas visuels à reproduire

### A. Schéma architecture globale (Slide 13)

```
┌──────────────────────────────────────┐
│          NAVIGATEUR                  │
│  Frontend SPA (HTML/CSS/JS)         │
│  Live Server :5501                   │
└──────────────┬───────────────────────┘
               │ Requêtes fetch()
               │ Header Authorization: Bearer
               │ JSON
┌──────────────┴───────────────────────┐
│          SERVEUR Node.js             │
│  server.js                           │
│    ├── config/db.js (Pool MySQL)     │
│    ├── middleware/auth.js (JWT)      │
│    ├── routes/auth.js                │
│    ├── routes/sessions.js            │
│    └── routes/bookings.js            │
│  Port :3000                          │
└──────────────┬───────────────────────┘
               │ mysql2/promise
               │ Requêtes paramétrées
┌──────────────┴───────────────────────┐
│    BASE DE DONNÉES MySQL 8          │
│  sportbook_db                        │
│   ├── users                          │
│   ├── sports                         │
│   ├── sessions                       │
│   ├── bookings                       │
│   ├── announcements                  │
│   ├── token_blacklist                │
│   ├── password_reset_tokens          │
│   └── sessions_view (vue)           │
└──────────────────────────────────────┘
```

### B. Fonctionnement JWT (Slide 19)

```
CLIENT                          SERVEUR
   │                               │
   │── POST /auth/login ──────────►│
   │   { email, password }         │
   │                               ├── bcrypt.compare(password, hash)
   │                               ├── jwt.sign({ userId, role }, secret, { expiresIn: '7d' })
   │◄── { token } ────────────────│
   │                               │
   │── GET /api/bookings/me ──────►│
   │   Authorization: Bearer xxx   │
   │                               ├── jwt.verify(token, secret)
   │                               ├── Vérifie blacklist
   │                               ├── req.user = { userId, role }
   │◄── { bookings } ────────────│
```

### C. Cycle de vie d'une réservation (Slide 9 & 22)

```
  1. Utilisateur parcourt les séances
  2. Clique sur "Réserver"
  3. POST /api/bookings { session_id }
  4. Vérification : place disponible ? déjà réservé ?
  5. Insertion dans bookings (statut: confirmed)
  6. Mise à jour du compteur (sessions_view)
  7. Confirmation affichée (toast)
  8. Réservation visible dans "Mes réservations"
  9. Possibilité d'annuler (DELETE → statut: cancelled)
```

### D. Chaîne de middlewares Express (Slide 15)

```
Requête entrante
      │
      ▼
 ┌─────────────┐
 │ Helmet      │ ─── Sécurité des en-têtes HTTP
 └──────┬──────┘
        ▼
 ┌─────────────┐
 │ CORS        │ ─── Origines autorisées
 └──────┬──────┘
        ▼
 ┌─────────────┐
 │ express.json│ ─── Parsing du corps JSON
 └──────┬──────┘
        ▼
 ┌─────────────┐
 │ Rate Limiter│ ─── Limitation des requêtes
 └──────┬──────┘
        ▼
 ┌─────────────┐
 │ Auth Middle │ ─── Vérification JWT (si route protégée)
 └──────┬──────┘
        ▼
 ┌─────────────┐
 │ Admin Middle│ ─── Vérification rôle admin (si route admin)
 └──────┬──────┘
        ▼
 ┌─────────────┐
 │ Route       │ ─── Controller → BDD → Réponse JSON
 └─────────────┘
```

### E. Diagramme entité-relation simplifié (Slide 18)

```
  ┌──────────┐          ┌──────────────┐
  │  sports  │──*───────│  sessions    │
  └──────────┘    1      └──────┬───────┘
                                │1
                                │
                                │*
                        ┌──────┴───────┐
                        │  bookings    │
                        └──────┬───────┘
                           *   │
                           ┌───┘
                           │1
                     ┌─────┴──────┐
                     │   users    │──*── announcements
                     └────────────┘
```
