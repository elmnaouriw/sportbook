# Script de soutenance — SportBook

**Durée estimée :** 10-12 minutes
**Auteur :** [Votre prénom et nom]
**Formation :** DWWM — MolenGeek
**Projet :** SportBook — Application de réservation de séances sportives

---

## 1. Introduction (30 sec)

> *Bonjour à tous, je vous remercie de me recevoir aujourd'hui pour la présentation de mon projet de fin de formation.*

> *Je m'appelle **[Votre prénom]** et je suis actuellement en formation Développeur Web et Web Mobile à MolenGeek depuis 6 mois. Aujourd'hui, je vais vous présenter **SportBook**, l'application web que j'ai développée dans le cadre de mon projet de fin de formation.*

---

## 2. Contexte du projet (1 min)

> *L'idée de SportBook est née d'un constat simple : dans ma commune, il existe de nombreuses associations et salles de sport qui proposent des séances collectives — yoga, cardio, fitness — mais il n'existe pas d'outil centralisé pour découvrir ces activités, connaître les places disponibles, ou réserver en ligne.*

> *Aujourd'hui, pour participer à une séance, il faut :*
> - *Soit téléphoner à la salle*
> - *Soit se déplacer sur place*
> - *Soit passer par des boucles WhatsApp ou des formulaires Google disparates*

> *L'objectif de SportBook est donc de **centraliser l'offre sportive locale** et de permettre aux utilisateurs de **réserver leurs séances en quelques clics**, tout en offrant aux administrateurs un outil de gestion complet.*

---

## 3. Cahier des charges et objectifs (1 min 30)

> *Le cahier des charges, que vous trouverez dans le dossier docs/brief.md, définissait plusieurs objectifs clés :*

> **Côté utilisateur :**
> - Créer un compte et s'authentifier de manière sécurisée
> - Parcourir les séances sportives avec des filtres (par sport, par date, par mot-clé)
> - Réserver une séance en un clic
> - Visualiser et annuler ses réservations
> - Modifier son profil

> **Côté administrateur :**
> - Gérer les séances (création, modification, suppression)
> - Gérer les utilisateurs et leurs rôles
> - Publier des annonces
> - Superviser l'ensemble des réservations

> **Contraintes techniques :**
> - Application full-stack avec **Node.js / Express** côté serveur
> - Base de données **MySQL**
> - Frontend en **SPA vanilla** (HTML / CSS / JavaScript pur, sans framework)
> - **Authentification JWT**
> - Tests unitaires et tests E2E
> - Déploiement via **Docker**

---

## 4. Architecture technique (2 min)

> *Voyons maintenant l'architecture de l'application.*

### Schéma d'architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Client (Navigateur)                  │
│  ┌───────────────────────────────────────────────────┐  │
│  │              Frontend SPA (Vanilla JS)             │  │
│  │  index.html / app.js / style.css                  │  │
│  │  Port 5501 (Live Server)                          │  │
│  └──────────────────────┬────────────────────────────┘  │
│                         │ API REST (HTTP / JSON)         │
│                         │ JWT dans Header Authorization  │
└─────────────────────────┼────────────────────────────────┘
                          │
┌─────────────────────────┼────────────────────────────────┐
│              Backend (Node.js / Express)                  │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Routes → Middleware (Auth, Validation) → Controllers│ │
│  │  Port 3000                                        │  │
│  └──────────────────────┬────────────────────────────┘  │
│                         │ mysql2/promise                  │
│                         │ (Pool de connexions)            │
│  ┌──────────────────────┼────────────────────────────┐  │
│  │              Base de données MySQL 8              │  │
│  │  7 tables + 1 vue                                  │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

> *Comme vous pouvez le voir, l'architecture suit un modèle classique en 3 tiers :*
> - **Frontend :** Une SPA (Single Page Application) en JavaScript vanilla qui communique avec l'API via des requêtes fetch
> - **Backend :** Une API REST construite avec Express, avec une architecture en couches (routes, middleware, contrôleurs)
> - **Base de données :** MySQL 8 avec un pool de connexions géré par mysql2/promise

> *J'ai fait le choix d'une SPA vanilla plutôt qu'un framework comme React pour plusieurs raisons :*
> - *Cela permet de maîtriser les fondamentaux du JavaScript sans abstraction*
> - *Le projet reste léger et performant*
> - *Cela correspondait au périmètre du projet sans complexité superflue*

---

## 5. Base de données (1 min 30)

> *Parlons de la base de données. Elle est composée de **7 tables** et d'**1 vue**.*

> *Les tables principales sont :*
> - **users** — Comptes utilisateurs avec email unique, mot de passe hashé (bcrypt, 12 rounds), et rôle (user/admin)
> - **sports** — Catégories de sport (yoga, cardio, football, fitness)
> - **sessions** — Les séances proposées, liées à un sport, avec date, horaire, lieu et nombre de places
> - **bookings** — Les réservations, avec une contrainte d'unicité pour éviter les doublons
> - **announcements** — Les annonces publiées par les administrateurs
> - **token_blacklist** — Pour l'invalidation des tokens JWT côté serveur
> - **password_reset_tokens** — Pour le flux de réinitialisation de mot de passe

> *La vue **sessions_view** est particulièrement intéressante : elle agrège les données des séances, des sports et des réservations pour exposer en temps réel :*
> - *Le nombre de places réservées*
> - *Le nombre de places disponibles*
> - *Le taux de remplissage*
> - *Le statut (disponible, presque complet, complet)*

> *L'initialisation de la base de données est entièrement automatisée dans le fichier config/db.js : au premier démarrage, l'application crée la base, les tables, la vue, et insère les données de démonstration.*

---

## 6. API REST — Points d'entrée (1 min 30)

> *L'API expose **17 endpoints** répartis en 6 groupes :*

> - **/api/auth** — Inscription, connexion, déconnexion, mot de passe oublié/réinitialisation
> - **/api/sessions** — Consultation et gestion CRUD des séances
> - **/api/bookings** — Création, consultation et annulation des réservations
> - **/api/users** — Consultation et modification du profil
> - **/api/announcements** — Gestion des annonces (administration)
> - **/api/admin** — Gestion des utilisateurs et supervision des réservations (administration)

> *Chaque endpoint est protégé par une chaîne de middleware : validation des données avec express-validator, vérification du token JWT, et contrôle des rôles pour les routes administrateur.*

> *Le middleware d'authentification vérifie :*
> 1. *La présence du header Authorization*
> 2. *La validité du token JWT (signature, expiration à 7 jours)*
> 3. *L'absence du token dans la blacklist (déconnexion)*

> *Le middleware administrateur vérifie ensuite que le rôle de l'utilisateur est "admin".*

---

## 7. Sécurité (1 min 30)

> *La sécurité a été une préoccupation centrale tout au long du développement. Voici les mesures mises en place :*

> **1. Hash des mots de passe** — Utilisation de bcrypt avec un facteur de coût de 12, ce qui rend les attaques par force brute extrêmement coûteuses en temps de calcul.

> **2. Authentification JWT** — Les tokens sont signés et ont une durée de validité de 7 jours. À la déconnexion, le token est hashé (SHA-256) et stocké dans une table blacklist, ce qui le rend immédiatement invalide.

> **3. Protection contre les injections SQL** — Toutes les requêtes utilisent des requêtes paramétrées (placeholder `?` avec mysql2), ce qui empêche toute injection SQL.

> **4. En-têtes HTTP sécurisés** — Le middleware Helmet ajoute automatiquement les en-têtes de sécurité (X-Content-Type-Options, X-Frame-Options, etc.).

> **5. Rate limiting** — Deux niveaux de limitation : 100 requêtes par 15 minutes pour l'API générale, et 10 requêtes par 15 minutes pour les routes d'authentification, pour prévenir les attaques par force brute.

> **6. Validation des entrées** — Côté client avec retour visuel en temps réel, et côté serveur avec express-validator sur chaque route.

> **7. Protection XSS** — Une fonction escapeHTML() nettoie toutes les données utilisateur avant injection dans le DOM.

> **8. Réinitialisation de mot de passe sécurisée** — Les tokens de reset sont hashés, ont une expiration, et sont à usage unique.

---

## 8. Frontend — Expérience utilisateur (1 min 30)

> *Passons maintenant au frontend. L'interface utilisateur a été conçue avec une approche **mobile-first** et **responsive** avec 3 points de rupture.*

> *Les principales fonctionnalités côté client sont :*

> **Navigation SPA** — Toutes les pages sont chargées dans un seul fichier HTML, avec affichage/masquage des sections via JavaScript. La navigation est fluide, sans rechargement de page.

> **Filtres en temps réel** — Sur la page des séances, l'utilisateur peut filtrer par sport, par date, ou rechercher par mot-clé avec un debounce de 300ms. Les résultats se mettent à jour instantanément.

> **Réservation en un clic** — Depuis la liste des séances, un clic sur "Réserver" crée immédiatement la réservation. Le compteur de places se met à jour sans rechargement.

> **Animations au scroll** — Utilisation de l'Intersection Observer API pour des animations d'apparition et des compteurs animés sur la page d'accueil.

> **Skeleton loading** — Pendant le chargement des données, des placeholders animés (shimmer) sont affichés pour une expérience perçue plus fluide.

> **Notifications toast** — Les actions (réservation réussie, erreur, etc.) sont confirmées par des notifications non-intrusives.

> **Indicateur de force de mot de passe** — Une barre visuelle indique la robustesse du mot de passe en temps réel lors de l'inscription.

> **Côté administration** — Un dashboard dédié permet de gérer les séances, les utilisateurs, les réservations et les annonces depuis une interface unique.

---

## 9. Tests (1 min)

> *La qualité du code a été assurée par une stratégie de tests à deux niveaux :*

> **Tests unitaires et d'intégration (backend)** — 17 tests avec Jest et Supertest :
> - Tests du middleware d'authentification et d'autorisation
> - Tests des routes API (healthcheck, sessions, featured)
> - Tests de la gestion d'erreurs

> **Tests E2E (end-to-end)** — 12 tests avec Cypress :
> - Tests du rendu de la page d'accueil
> - Tests de navigation entre les pages
> - Tests des formulaires (connexion, inscription, mot de passe oublié)

> *Pour lancer les tests :*
> ```bash
> npm test           # Tests backend (Jest)
> npm run test:e2e   # Tests E2E (Cypress en headless)
> ```

---

## 10. Défis rencontrés et solutions (1 min 30)

> *Le développement de SportBook m'a confronté à plusieurs défis techniques :*

> **1. L'invalidation des tokens JWT**
> Le problème : Les JWT étant stateless, il est impossible de les révoquer une fois émis.
> Ma solution : J'ai mis en place une table token_blacklist qui stocke le hash des tokens invalidés. Chaque requête authentifiée vérifie que le token n'est pas blacklisté. Cela permet une déconnexion effective.

> **2. Le comptage des places disponibles en temps réel**
> Le problème : Quand deux utilisateurs réservent la dernière place simultanément, il faut éviter les sur-réservations.
> Ma solution : J'ai créé une vue SQL (sessions_view) qui calcule dynamiquement les places réservées et disponibles. La contrainte d'unicité sur (user_id, session_id) dans la table bookings empêche les doublons.

> **3. L'architecture SPA sans framework**
> Le problème : Sans React ou Vue, il fallait gérer manuellement le routage, l'état, et les re-rendus.
> Ma solution : Une architecture modulaire avec une fonction showPage() centralisée, un état d'authentification dans localStorage, et des fonctions de rendu dédiées par page.

> **4. Le déploiement avec Docker**
> Le problème : Coordonner le démarrage de MySQL et de l'application.
> Ma solution : J'ai utilisé docker-compose avec un healthcheck sur MySQL et un script d'initialisation automatique de la base de données au premier démarrage.

> **5. La gestion de projet**
> Au-delà de la technique, ce projet m'a appris à : organiser mon travail avec un tableau de priorités (P0/P1/P2), tenir un journal de bord régulier, utiliser des outils comme Git avec des commits conventionnels, et rédiger une documentation complète.

---

## 11. Démonstration (3-4 min — en direct)

> *Je vous propose maintenant de passer à une démonstration en direct de l'application.*

### Parcours utilisateur :
> 1. **Page d'accueil** — Présentation des séances en vedette, animations
> 2. **Inscription** — Création d'un compte utilisateur
> 3. **Connexion** — Authentification
> 4. **Exploration des séances** — Filtres par sport et recherche
> 5. **Réservation** — Inscription à une séance
> 6. **Mes réservations** — Visualisation et annulation
> 7. **Profil** — Modification des informations

### Parcours administrateur :
> 8. **Connexion admin** — Compte avec rôle administrateur
> 9. **Gestion des séances** — Création, modification
> 10. **Gestion des utilisateurs** — Changement de rôle
> 11. **Annonces** — Publication d'une annonce
> 12. **Supervision des réservations** — Vue d'ensemble

---

## 12. Conclusion (30 sec)

> *Pour conclure, SportBook est une application complète qui répond aux objectifs fixés dans le cahier des charges : une plateforme de réservation de séances sportives, fonctionnelle, sécurisée, et testée.*

> *Ce projet m'a permis de mettre en pratique l'ensemble des compétences acquises pendant la formation : développement backend avec Node.js et Express, conception de bases de données relationnelles, intégration frontend en JavaScript vanilla, sécurisation d'une application web, tests, et déploiement.*

> *Il m'a également permis de développer des compétences transversales essentielles : gestion de projet, organisation du travail, rédaction technique, et utilisation d'outils professionnels comme Git, Docker, et l'intégration d'IA dans le workflow de développement.*

> *Je vous remercie de votre attention, et je suis à votre disposition pour toute question.*

---

## 13. Questions potentielles du jury (préparation)

> *Voir également le fichier docs/preparation-soutenance.md pour une liste complète.*

| Question | Éléments de réponse |
|----------|---------------------|
| Pourquoi Node.js plutôt que PHP ? | JavaScript full-stack, écosystème NPM, performance asynchrone, correspond à la formation |
| Pourquoi MySQL plutôt que MongoDB ? | Données relationnelles (séances, réservations, utilisateurs), contraintes d'intégrité, schéma stable |
| Pourquoi vanilla JS plutôt que React ? | Maîtrise des fondamentaux, projet à taille humaine, pas de surcharge |
| Comment gérez-vous la concurrence sur les réservations ? | Contrainte UNIQUE + transaction MySQL + vérification des places disponibles |
| Quelles failles de sécurité avez-vous anticipées ? | Injection SQL (paramétrées), XSS (escapeHTML), CSRF (JWT + CORS), brute force (rate limiting) |
| Comment déploieriez-vous en production ? | Docker + VPS (DigitalOcean ou Scaleway), MySQL externalisé, HTTPS avec Let's Encrypt, PM2 pour la gestion des processus |
| Quelle est la différence entre JWT et session ? | JWT : stateless, pas de stockage serveur, autocontenu. Session : stateful, stockée en mémoire/Redis, plus facile à révoquer |
| Comment assureriez-vous la montée en charge ? | Cache Redis, pagination, index SQL, load balancing avec Nginx |
