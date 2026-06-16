# SportBook — Node.js + Express + MySQL

Architecture full-stack avec backend Express API et frontend SPA vanilla.

## Structure du projet

```
sportbook/
├── backend/
│   ├── config/
│   │   └── db.js              # Pool MySQL + auto-création DB/tables/seed
│   ├── middleware/
│   │   └── auth.js            # Vérification JWT + admin
│   ├── routes/
│   │   ├── auth.js            # Register / Login
│   │   ├── sessions.js        # CRUD sessions
│   │   └── bookings.js        # Réservations
│   ├── database.sql           # Schéma de référence (manuel)
│   ├── server.js              # Point d'entrée Express
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── index.html             # SPA — 5 pages (Home, Sessions, Bookings, Login, Register)
│   ├── style.css              # Styles complets (responsive, animations, thème)
│   ├── app.js                 # Contrôleur SPA (routing, API calls, auth)
│   └── .vscode/
│       └── settings.json      # Live Server → port 5501
└── README.md
```

---

## Installation

### 1. Installer les dépendances backend

```bash
cd backend
npm install
```

### 2. Configurer l'environnement

```bash
cp .env.example .env
# Éditer .env avec tes infos MySQL
```

### 3. Lancer le backend

```bash
# Développement (rechargement auto)
npm run dev

# Production
npm start
```

La base de données, les tables et les données de test sont **créées automatiquement** au premier démarrage (via `config/db.js`).  
Tu peux aussi utiliser `database.sql` manuellement si tu préfères.

### 4. Lancer le frontend

Ouvre le dossier `frontend/` dans VS Code et lance **Live Server** (port 5501), ou utilise n'importe quel serveur statique :

```bash
npx serve frontend
```

---

## API Endpoints

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/health` | Healthcheck |

### Auth

| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/api/auth/register` | Créer un compte `{ full_name, email, password }` |
| POST | `/api/auth/login` | Se connecter `{ email, password }` |

### Sessions

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/sessions` | Liste (filtres: `?sport=yoga&date=2026-05-20&search=yoga`) |
| GET | `/api/sessions/featured` | 4 sessions vedettes |
| GET | `/api/sessions/:id` | Détail d'une session |
| POST | `/api/sessions` | Créer *(admin)* |
| DELETE | `/api/sessions/:id` | Supprimer *(admin)* |

### Bookings *(token requis)*

| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/api/bookings` | Réserver `{ session_id }` |
| GET | `/api/bookings/me` | Mes réservations |
| DELETE | `/api/bookings/:id` | Annuler une réservation |

---

## Authentification

Toutes les routes protégées nécessitent un header :

```
Authorization: Bearer <token>
```

Le token JWT est retourné par `/api/auth/login` et `/api/auth/register`.

---

## Frontend

Le frontend est une SPA vanilla (HTML/CSS/JS) servie indépendamment sur `http://127.0.0.1:5501`.  
Le CORS backend est configuré pour accepter uniquement cette origine.
