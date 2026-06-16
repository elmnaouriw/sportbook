# 🏅 SportBook — Node.js + Express + MySQL

## Structure du projet

```
sportbook/
├── config/
│   └── db.js              # Connexion MySQL (pool)
├── middleware/
│   └── auth.js            # Vérification JWT
├── routes/
│   ├── auth.js            # Register / Login
│   ├── sessions.js        # CRUD sessions
│   └── bookings.js        # Réservations
├── public/
│   └── index.html         # Ton front-end HTML/CSS/JS
├── database.sql           # Schéma + données de test
├── server.js              # Point d'entrée Express
├── package.json
└── .env.example
```

---

## 🚀 Installation

### 1. Cloner et installer les dépendances
```bash
cd sportbook
npm install
```

### 2. Configurer l'environnement
```bash
cp .env.example .env
# Éditer .env avec tes infos MySQL
```

### 3. Créer la base de données
```bash
mysql -u root -p < database.sql
```

### 4. Copier le front-end
```bash
mkdir public
cp ../sportbook.html public/index.html
```

### 5. Lancer le serveur
```bash
# Développement (avec rechargement auto)
npm run dev

# Production
npm start
```

Le serveur tourne sur **http://localhost:3000**

---

## 📡 API Endpoints

### Auth
| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/api/auth/register` | Créer un compte |
| POST | `/api/auth/login` | Se connecter |

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

## 🔐 Authentification

Toutes les routes protégées nécessitent un header :
```
Authorization: Bearer <token>
```

Le token est retourné par `/api/auth/login` et `/api/auth/register`.

---

## 💡 Connecter le front-end à l'API

Dans ton `sportbook.html`, remplace les données statiques par des appels `fetch` :

```javascript
// Exemple : charger les sessions
const res = await fetch('/api/sessions?sport=yoga');
const { sessions } = await res.json();

// Exemple : réserver
const res = await fetch('/api/bookings', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  },
  body: JSON.stringify({ session_id: 1 })
});
```
