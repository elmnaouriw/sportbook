# Analyse du projet SportBook — Rapport d'audit

> Généré le 18 juin 2026 — Projet de fin de formation DWWM (MolenGeek)

---

## 1. Structure générale

```
sportbook/
├── backend/                    # API Express (Node.js + MySQL)
│   ├── server.js               # Point d'entrée
│   ├── package.json
│   ├── .env / .env.example
│   ├── database.sql            # ⚠️ Désynchronisé du runtime
│   ├── config/
│   │   └── db.js               # Pool MySQL + init DB + seed
│   ├── middleware/
│   │   ├── auth.js             # JWT + admin guard + blacklist mémoire
│   │   ├── errorHandler.js     # Gestion d'erreur centralisée
│   │   └── validate.js         # Règles express-validator
│   ├── routes/
│   │   ├── auth.js             # Register / Login / Logout
│   │   ├── sessions.js         # CRUD sessions + featured + filtre
│   │   ├── bookings.js         # Créer / Lister / Annuler
│   │   ├── users.js            # Profil (GET/PUT)
│   │   └── announcements.js    # CRUD annonces (admin)
│   └── __tests__/              # 17 tests (Jest + Supertest)
├── frontend/
│   ├── index.html              # SPA shell (8 pages)
│   ├── app.js                  # Toute la logique frontend (855 lignes)
│   ├── style.css               # Styles responsives (1856 lignes)
│   └── .vscode/settings.json   # Live Server port 5501
├── docs/                       # Documentation projet
├── .opencode/                  # Configuration IA (skills)
├── .opencode.jsonc
├── AGENTS.md
└── README.md
```

**Points forts :** Séparation claire frontend/backend, documentation structurée, 17 tests backend.

**Points faibles :** Pas de `package.json` racine, pas de linter, pas de script unifié pour lancer le projet, pas de tests frontend.

---

## 2. Stack technique

| Couche | Technologie | Détails |
|--------|-------------|---------|
| Runtime | Node.js | Express 4.18.3 sur port 3000 |
| Base de données | MySQL via `mysql2/promise` | Auto-création des tables + seed |
| Auth | JWT (`jsonwebtoken` 9.0.2 + `bcrypt` 5.1.1) | 12 rounds, expiration 7 jours |
| Validation | `express-validator` 7.3.2 | Middleware de validation par route |
| Sécurité | `helmet` 8.2.0 + `express-rate-limit` 8.5.2 | Headers sécurité + 100 req/15min |
| CORS | `cors` 2.8.6 | Whitelist depuis .env |
| Tests | Jest 30.4.2 + Supertest 7.2.2 | 3 fichiers, 17 tests |
| Frontend | Vanilla JS SPA | HTML5 + CSS3 + ES6, port 5501 |
| CSS | Custom properties + BEM-like | Responsive (3 breakpoints), 1856 lignes |

---

## 3. Base de données — Schéma runtime

### Tables (créées automatiquement par `config/db.js`)

| Table | Colonnes | Contraintes |
|-------|----------|-------------|
| `sports` | id, slug (UNIQUE), name | Seed : yoga, cardio, football, fitness |
| `users` | id, full_name, email (UNIQUE), password, role (ENUM: user/admin), created_at | — |
| `sessions` | id, sport_id (FK), title, instructor, date, time, duration, location, total_spots | — |
| `bookings` | id, user_id (FK), session_id (FK), status (ENUM: confirmed/cancelled), booked_at | UNIQUE(user_id, session_id) |
| `token_blacklist` | id, token_hash (INDEX), created_at | ⚠️ Table créée mais jamais utilisée |
| `announcements` | id, user_id (FK), title, content, created_at, updated_at | — |

### Vue : `sessions_view`
Agrège `sessions` + `sports` + `bookings` pour exposer :
- `session_date`, `start_time`, `duration_min`, `location`
- `total_spots`, `booked_spots`, `available_spots`
- `fill_pct` (0-100), `status` (available / almost_full / full)
- `sport_slug`, `sport_name`

### ⚠️ Problème critique : `database.sql` est obsolète

Le fichier `backend/database.sql` reflète un **schéma ancien** :
- Table `instructors` qui n'existe plus
- Colonnes nommées `session_date`, `start_time`, `duration_min` au lieu de `date`, `time`, `duration`
- Tables `token_blacklist` et `announcements` absentes

**Recommandation :** Supprimer `database.sql` ou le regénérer à partir du schema runtime (US-047). Un fichier `.sql` incorrect est pire que pas de fichier du tout.

---

## 4. Routes API — 17 endpoints

### Auth (`/api/auth`)
| Méthode | Path | Auth | Admin | Statut |
|---------|------|------|-------|--------|
| POST | `/api/auth/register` | ❌ | ❌ | ✅ |
| POST | `/api/auth/login` | ❌ | ❌ | ✅ |
| POST | `/api/auth/logout` | ✅ | ❌ | ✅ |

### Sessions (`/api/sessions`)
| Méthode | Path | Auth | Admin | Statut |
|---------|------|------|-------|--------|
| GET | `/api/sessions` | ❌ | ❌ | ✅ |
| GET | `/api/sessions/featured` | ❌ | ❌ | ✅ |
| GET | `/api/sessions/:id` | ❌ | ❌ | ✅ |
| POST | `/api/sessions` | ✅ | ✅ | ✅ |
| PUT | `/api/sessions/:id` | ✅ | ✅ | ✅ |
| DELETE | `/api/sessions/:id` | ✅ | ✅ | ✅ |

### Bookings (`/api/bookings`)
| Méthode | Path | Auth | Admin | Statut |
|---------|------|------|-------|--------|
| POST | `/api/bookings` | ✅ | ❌ | ✅ |
| GET | `/api/bookings/me` | ✅ | ❌ | ✅ |
| DELETE | `/api/bookings/:id` | ✅ | ❌ | ✅ |

### Users (`/api/users`)
| Méthode | Path | Auth | Admin | Statut |
|---------|------|------|-------|--------|
| GET | `/api/users/me` | ✅ | ❌ | ✅ |
| PUT | `/api/users/me` | ✅ | ❌ | ✅ |

### Announcements (`/api/announcements`)
| Méthode | Path | Auth | Admin | Statut |
|---------|------|------|-------|--------|
| GET | `/api/announcements` | ✅ | ✅ | ✅ |
| POST | `/api/announcements` | ✅ | ✅ | ✅ |
| DELETE | `/api/announcements/:id` | ✅ | Owner/Admin | ✅ |

### Health
| Méthode | Path | Auth | Admin | Statut |
|---------|------|------|-------|--------|
| GET | `/api/health` | ❌ | ❌ | ✅ |

### ❌ Routes manquantes (jamais implémentées)

| Endpoint | US | Description |
|----------|----|-------------|
| `GET /api/users` | US-023 | Lister tous les utilisateurs (admin) |
| `PUT /api/users/:id/role` | US-024 | Changer le rôle d'un utilisateur |
| `DELETE /api/users/:id` | US-025 | Supprimer/désactiver un compte |
| `GET /api/bookings` | US-026 | Voir toutes les réservations (admin) |
| `DELETE /api/bookings/:id` (admin) | US-027 | Admin annule une résa pour un user |
| `POST /api/auth/forgot-password` | US-006 | Mot de passe oublié |
| `POST /api/auth/reset-password` | US-006 | Réinitialisation du mot de passe |

---

## 5. Problèmes identifiés — Classés par sévérité

### 🔴 Critique (à corriger avant la soutenance)

| # | Problème | Localisation | Détail | Suggestion |
|---|----------|-------------|--------|------------|
| C1 | **`database.sql` désynchronisé** | `backend/database.sql` | Schéma différent du runtime (instructors, colonnes, tables manquantes) | Supprimer ou regénérer le fichier |
| C2 | **Blacklist de tokens en mémoire** | `middleware/auth.js` | La table `token_blacklist` existe en DB mais n'est jamais utilisée ; la blacklist in-memory est perdue au redémarrage | Migrer la blacklist vers la DB (la table est déjà créée) |
| C3 | **Routes admin users inexistantes** | Routes manquantes | US-023 à US-027 : aucune gestion des utilisateurs côté admin | Implémenter les 5 endpoints manquants + UI frontend |
| C4 | **Pas de mot de passe oublié** | Route manquante | US-006 : aucun endpoint de reset | Ajouter forgot/reset password (ou au minimum documenter pourquoi c'est hors scope) |
| C5 | **Pas de déploiement** | Aucun | US-043 : pas de Dockerfile, pas de config prod | Au minimum un Dockerfile et des instructions de déploiement |

### 🟡 Haute

| # | Problème | Localisation | Détail | Suggestion |
|---|----------|-------------|--------|------------|
| H1 | **Race condition au démarrage** | `config/db.js:178-188` | `initializeDatabase()` est async ; les routes peuvent être appelées avant l'init | Attendre l'initialisation avant d'écouter sur le port |
| H2 | **Pas de limites de taille sur les requêtes** | `server.js` | `express.json()` sans `{ limit }` — accepte des payloads arbitraires | Ajouter `limit: '1mb'` |
| H3 | **Aucun test frontend** | Frontend | 0 test pour `app.js` (855 lignes) | Ajouter au moins des tests fonctionnels de base |
| H4 | **Accessibilité absente** | Frontend | US-032/033 : pas d'ARIA, pas de navigation clavier, pas de skip links | Audit d'accessibilité + corrections |
| H5 | **Pas de pages légales** | Frontend | US-045/046 : mentions légales et CGU manquantes | Créer les pages HTML |
| H6 | **Dashboard admin incomplet** | Frontend | US-021/022 : liste sans graphiques, pas de dashboard réservations | Améliorer la page admin |
| H7 | **Announcement delete ne rafraîchit pas la page annonces** | `frontend/app.js:665` | Après suppression dans l'admin, la liste principale n'est pas mise à jour | Recharger la liste principale aussi |

### 🟢 Moyenne

| # | Problème | Localisation | Détail | Suggestion |
|---|----------|-------------|--------|------------|
| M1 | **Pas de linter / formateur** | Projet | Aucun fichier `.eslintrc` ou `.prettierrc` | Ajouter ESLint + Prettier |
| M2 | **Pas de package.json racine** | Racine | Il faut lancer backend et frontend séparément | Ajouter un script `npm run dev` qui lance les deux |
| M3 | **JWT secret en dur dans .env** | `backend/.env` | `ma_cle_secrete_pour_le_jury` — OK pour éval, pas pour prod | Ajouter un commentaire de warning |
| M4 | **CORS limité à 5500/5501** | `.env` | CASSera en prod avec un autre port/domaine | Documenter la variable à changer |
| M5 | **URL API en dur dans le frontend** | `frontend/app.js:1` | Fallback sur `http://localhost:3000/api` | Utiliser `window.__API_URL__` systématiquement |
| M6 | **Messages d'erreur FR/EN mélangés** | Backend + Frontend | Certains messages en français, d'autres en anglais | Uniformiser (le brief est en FR) |
| M7 | **Pas de CSP personnalisé** | `server.js` | Helmet utilise les defaults, pas de CSP | Ajouter une politique CSP |
| M8 | **Tests insuffisants** | `__tests__/` | 17 tests, mais aucun sur bookings, users, announcements, et aucun test frontend | Étendre la couverture |
| M9 | **Fichiers monolithiques frontend** | `app.js` (855 lignes), `style.css` (1856 lignes) | Difficile à maintenir | Envisager une séparation en modules |
| M10 | **Validation redondante** | `routes/users.js:46` | La longueur du password est vérifiée dans le validateur ET manuellement | Supprimer la redondance |

---

## 6. Sécurité — État des lieux

| Protection | Statut | Notes |
|------------|--------|-------|
| SQL injection | ✅ OK | Toutes les requêtes sont paramétrées |
| Mots de passe hashés | ✅ OK | bcrypt 12 rounds |
| JWT | ✅ OK | HS256 avec secret dans .env |
| Routes protégées | ✅ OK | authMiddleware + adminMiddleware |
| Helmet (headers sécurité) | ✅ OK | 8.2.0, defaults |
| Rate limiting | ✅ OK | 100/15min général, 10/15min auth |
| XSS (serveur) | ✅ OK | express-validator sanitize + Helmet |
| XSS (client) | ⚠️ Partiel | `escapeHTML()` utilisé dans les cards |
| Blacklist tokens | ⚠️ Incomplète | En mémoire seulement, perdue au restart |
| CSP | ❌ Manquant | Helmet defaults uniquement |
| Limite taille payload | ❌ Manquant | Aucun `express.json({ limit })` |
| HPP (param pollution) | ❌ Manquant | Pas de `hpp` middleware |
| Navigation clavier | ❌ Manquant | US-032 |
| ARIA / accessibilité | ❌ Manquant | US-033 |

---

## 7. User Stories — Avancement réel

### Par Epic

| Epic | Total | ✅ Fait | ❌ Manquant | ⚠️ Partiel |
|------|-------|---------|-------------|------------|
| E1 — Auth & Compte | 6 | 5 | 1 | 0 |
| E2 — Consultation séances | 6 | 6 | 0 | 0 |
| E3 — Réservations | 5 | 5 | 0 | 0 |
| E4 — Admin séances | 5 | 3 | 0 | 2 |
| E5 — Admin utilisateurs | 5 | 0 | 5 | 0 |
| E6 — UI/UX | 6 | 3 | 2 | 1 |
| E7 — Sécurité & Infrastructure | 11 | 7 | 3 | 1 |
| E8 — Pages légales | 2 | 0 | 2 | 0 |
| E9 — Qualité & Maintenance | 2 | 0 | 0 | 2 |
| **Total** | **48** | **29** | **13** | **6** |

### Par priorité (depuis `todo.md`)

| Priorité | Total | ✅ Fait | ❌ Manquant | ⚠️ Partiel |
|----------|-------|---------|-------------|------------|
| P0 | 22 | 22 | 0 | 0 |
| P1 | 14 | 9 | 4 | 1 |
| P2 | 13 | 2 | 9 | 2 |
| **Total** | **49** | **33** | **13** | **3** |

✅ **Toutes les P0 sont faites** — le core fonctionnel est solide.

---

## 8. Tests — Couverture

| Fichier | Tests | Ce qui est testé |
|---------|-------|------------------|
| `auth.test.js` | 11 | authMiddleware (token manquant, malformé, valide, expiré), adminMiddleware (admin, non-admin, null) |
| `api.test.js` | 3 | Healthcheck, sessions list, featured sessions (DB mockée) |
| `errorHandler.test.js` | 5 | AppError, operational error, ER_DUP_ENTRY, unknown error |
| **Total** | **17** | |

### ❌ Non testé
- Routes bookings (POST, GET, DELETE)
- Routes users (GET, PUT)
- Routes announcements
- Routes auth (register, login, logout)
- Route sessions (POST, PUT, DELETE)
- Route sessions avec filtres
- Frontend (aucun test)

---

## 9. Recommandations — Plan d'action

### 🔴 Avant la soutenance (critique)

1. **Resynchroniser `database.sql`** avec le schéma réel (US-047)
2. **Corriger la blacklist de tokens** — utiliser la table DB au lieu de la mémoire (US-039)
3. **Ajouter les pages légales** — mentions légales et CGU (US-045/046)
4. **Vérifier l'accessibilité de base** — au minimum des labels ARIA sur les formulaires (US-033)
5. **Tester l'application sur mobile** — vérifier que le responsive tient la route (US-028)

### 🟡 Recommandé (renforce le dossier)

6. **Ajouter Dockerfile + docker-compose** pour le déploiement (US-043)
7. **Implémenter US-023/024/025** (gestion admin des utilisateurs) — montre la maîtrise du CRUD
8. **Ajouter des tests sur les routes booking et users** — facile avec le mock DB existant
9. **Ajouter un linter** (ESLint) — montre les bonnes pratiques
10. **Uniformiser la langue des messages** — tout en français

### 🟢 Bonus (impressionnant pour la soutenance)

11. **Séparer `app.js` en modules** (ex. `api.js`, `auth.js`, `ui.js`, `admin.js`)
12. **Ajouter un dashboard admin avec graphiques** (Chart.js en CDN)
13. **Ajouter `package.json` racine** avec `concurrently` pour lancer backend + frontend
14. **Améliorer la couverture de tests** (frontend avec Playwright ou Cypress)
15. **CSP personnalisé** dans Helmet

---

## 10. Résumé chiffré

| Métrique | Valeur |
|----------|--------|
| Fichiers source backend | 10 |
| Fichiers source frontend | 3 |
| Endpoints API | 17 |
| Tables DB | 6 (+ 1 vue) |
| Pages frontend | 8 |
| Lignes CSS | 1856 |
| Lignes JS frontend | 855 |
| Tests backend | 17 (3 fichiers) |
| Tests frontend | 0 |
| User Stories totales | 48 |
| User Stories faites | 29 |
| User Stories P0 faites | 22/22 ✅ |
| Commits | ~13 |
| Problèmes critiques | 5 |
| Problèmes haute sévérité | 7 |
| Problèmes moyenne sévérité | 10 |

---

## 11. Conclusion

Le projet SportBook est **solide et bien avancé**. Toutes les fonctionnalités cœur (P0) sont implémentées et fonctionnelles. L'architecture est propre, la sécurité de base est en place, et il y a déjà des tests (ce qui est rare pour un projet de formation).

Les axes d'amélioration principaux sont :
1. **Nettoyer les artefacts obsolètes** (`database.sql`, blacklist mémoire inutilisée)
2. **Finaliser les user stories manquantes** (admin users, pages légales, password reset)
3. **Préparer la soutenance** avec un déploiement fonctionnel et une démo mobile

Le projet mérite d'être présenté en l'état, mais les corrections ci-dessus le rendraient **excellent** pour une soutenance DWWM.

---

*Rapport généré le 18 juin 2026 — basé sur l'analyse complète du code source.*
