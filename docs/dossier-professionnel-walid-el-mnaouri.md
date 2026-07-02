# DOSSIER PROFESSIONNEL (DP)

---

**Nom :** El Mnaouri
**Prénom :** Walid

**Titre professionnel visé :** Développeur Web et Web Mobile

**Modalité d'accès :** Parcours de formation

---

## Activité-type 1 — Développer la partie front-end d'une application web ou web mobile en intégrant les recommandations de sécurité

### CP1 — Maquetter une application

Pour mon projet de fin de formation à MolenGeek, j'ai développé **SportBook**, une application de réservation de séances sportives. Avant de coder, j'ai conçu toutes les maquettes sur **Figma**.

J'ai imaginé deux profils utilisateurs : les membres qui réservent des séances, et les administrateurs qui gèrent les séances, les annonces et les utilisateurs. J'ai maquetté chaque écran en pensant au parcours utilisateur : la page d'accueil avec ses sections (hero, statistiques, séances en vedette), la page des séances avec des filtres par sport et par date, les pages d'authentification (connexion, inscription avec un sélecteur de rôle en cartes visuelles), le profil, les réservations, le dashboard administrateur, et les pages de mot de passe oublié et réinitialisation.

J'ai aussi défini une charte graphique cohérente : des tons de bleus, des polices modernes, et des composants réutilisables (boutons, cartes, formulaires, badges de statut). Le design a été pensé responsive pour s'adapter au desktop, à la tablette et au mobile.

### CP2 — Réaliser une interface statique et adaptable

J'ai codé toute l'interface en **HTML et CSS vanilla**, sans framework JavaScript. J'ai fait ce choix pour montrer ma maîtrise des fondamentaux et parce qu'une SPA vanilla est plus légère qu'une application React ou Vue pour ce projet.

Le HTML est sémantique (`header`, `nav`, `main`, `section`, `footer`) avec toutes les pages dans un seul fichier `index.html`. J'ai utilisé **CSS Grid** pour les grilles de cartes et **Flexbox** pour la navigation et les formulaires. Le design est responsive avec trois points de rupture : 4 colonnes sur desktop, 2 sur tablette, 1 sur mobile.

J'ai mis en place des **variables CSS** pour la cohérence visuelle, des animations au survol des cartes, un squelette de chargement (skeleton loading) pendant les appels API, et des transitions au défilement avec Intersection Observer. La navigation s'adapte automatiquement au statut de l'utilisateur : les liens admin sont masqués pour les utilisateurs standards.

### CP3 — Développer une interface utilisateur web dynamique

J'ai développé toute la partie interactive de la SPA en **JavaScript vanilla** (~984 lignes).

J'ai créé un **wrapper API (`apiFetch`)** qui encapsule tous les appels fetch : il ajoute automatiquement le token JWT dans les headers, parse les réponses, gère les erreurs et affiche des notifications toast. La navigation se met à jour dynamiquement selon que l'utilisateur est connecté ou non, et selon son rôle.

La **page des séances** affiche les cartes construites dynamiquement avec le sport, le titre, l'instructeur, la date, l'heure, la durée, le lieu, les places disponibles avec un indicateur d'urgence quand il en reste moins de 3, et une barre de progression du taux de remplissage. Les filtres (sport, date, recherche) sont gérés avec un **debounce de 300ms** pour éviter de surcharger l'API.

La **réservation en un clic** met à jour l'interface immédiatement sans rechargement. Les formulaires sont validés en temps réel avec des retours visuels, et la force du mot de passe est affichée avec une barre colorée.

J'ai aussi implémenté les animations au scroll, la prévention XSS avec `escapeHTML()`, et les dialogues de confirmation avant les actions importantes.

### CP4 — Réaliser une interface utilisateur avec une solution de gestion de contenu ou e-commerce

J'ai développé une **interface d'administration complète** pour gérer le contenu de l'application.

Les administrateurs peuvent **créer, modifier et supprimer des séances** via un formulaire complet avec validation. La modification pré-remplit le formulaire avec les données existantes. La suppression demande une confirmation.

Ils peuvent aussi **publier des annonces** (titre + contenu) qui s'affichent sous forme de cartes avec l'auteur et la date. Les annonces sont réservées aux administrateurs : un utilisateur standard ne voit même pas le lien dans la navigation.

Pour la **gestion des utilisateurs**, l'admin peut lister les comptes, changer leur rôle (user/admin) et les supprimer. J'ai protégé la suppression entre admins.

Toutes ces fonctionnalités sont protégées par une double vérification : côté client (navigation masquée) et côté serveur (middleware admin).

---

## Activité-type 2 — Développer la partie back-end d'une application web ou web mobile en intégrant les recommandations de sécurité

### CP5 — Créer une base de données

J'ai conçu une base de données **MySQL** avec 7 tables.

La table **`sports`** contient les sports disponibles (yoga, cardio, football, fitness). La table **`users`** stocke les comptes avec nom, email unique, mot de passe hashé (bcrypt) et rôle (user/admin). La table **`sessions`** est liée aux sports par clé étrangère et contient les informations des séances (titre, instructeur, date, heure, durée, lieu, places).

La table **`bookings`** fait le lien entre un utilisateur et une séance, avec une **contrainte UNIQUE** sur le couple (user_id, session_id) pour empêcher les réservations en double. Pour la sécurité, j'ai créé **`token_blacklist`** (hash des JWT déconnectés) et **`password_reset_tokens`** (tokens de réinitialisation avec expiration). Enfin, **`announcements`** stocke les annonces liées aux utilisateurs.

Le point clé : j'ai créé une **vue SQL `sessions_view`** qui joint les tables `sessions`, `sports` et `bookings` pour calculer en temps réel les places disponibles, le taux de remplissage et le statut (available, almost full, full).

La base de données s'initialise automatiquement au premier démarrage du serveur avec des données de démonstration.

### CP6 — Développer les composants d'accès aux données

J'ai utilisé **mysql2/promise** avec un **pool de connexions** (max 10) pour l'accès à la base de données. Toutes les requêtes utilisent des **paramètres préparés** (`?`) pour prévenir les injections SQL — je n'ai jamais concaténé de chaînes pour construire une requête.

Le serveur attend que l'initialisation de la base soit terminée avant de commencer à écouter les requêtes HTTP, via une promesse `db.ready`.

### CP7 — Développer la partie back-end d'une application web ou web mobile

J'ai développé une **API REST avec Express.js** qui expose 17 endpoints.

**Authentification** : inscription avec hash bcrypt (12 rounds), connexion avec retour JWT (HS256, expiration 7 jours), déconnexion avec blacklist de tokens (SHA-256 en BDD), mot de passe oublié avec token sécurisé et envoi d'email via nodemailer (fallback console en dev).

**Sessions** : CRUD complet avec filtres (sport, date, recherche) et endpoint dédié pour les séances en vedette.

**Réservations** : création avec vérification des places disponibles, liste des réservations de l'utilisateur, annulation (suppression logique).

**Administration** : gestion des utilisateurs (liste, changement de rôle, suppression) et des réservations (liste, annulation forcée).

**Sécurité** : Helmet pour les en-têtes HTTP, rate limiting (100 req/15min général, 10 req/15min sur l'auth), CORS avec liste blanche, express-validator sur toutes les routes, gestion d'erreurs centralisée avec une classe AppError.

**Tests et déploiement** : 17 tests unitaires et d'intégration avec Jest/Supertest, 12 tests E2E avec Cypress, conteneurisation Docker (Node 20-alpine + MySQL 8).

### CP8 — Élaborer et mettre en œuvre des composants dans une application de gestion de contenu ou e-commerce

J'ai développé des composants CRUD complets pour l'administration :

**Séances** : création avec validation de tous les champs, modification partielle (un ou plusieurs champs), suppression avec cascade des réservations associées.

**Annonces** : publication avec association automatique à l'utilisateur connecté, liste triée par date, suppression par le propriétaire ou un admin.

**Utilisateurs** : liste, passage de user à admin et inversement, suppression avec protection (un admin ne peut pas supprimer un autre admin).

Tous ces composants sont protégés par une double vérification client/serveur. Les actions destructrices demandent une confirmation, et chaque opération est notifiée par un toast.

---

## Déclaration sur l'honneur

Je soussigné **Walid EL MNAOUI**, déclare sur l'honneur que les renseignements fournis dans ce dossier sont exacts et que je suis l'auteur des réalisations jointes.

Fait à Bruxelles, le _______________

Signature :
