require('dotenv').config();
const express = require('express');
const path    = require('path');
const cors    = require('cors');
const helmet  = require('helmet');
const rateLimit = require('express-rate-limit');
const db      = require('./config/db');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

const isProduction = process.env.NODE_ENV === 'production';

const corsOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',').map(s => s.trim())
  : ['http://127.0.0.1:5501', 'http://127.0.0.1:5500', 'http://localhost:5501', 'http://localhost:5500'];

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: corsOrigins, credentials: true }));
app.use(express.json({ limit: '1mb' }));

if (isProduction) {
  app.use(express.static(path.join(__dirname, '..', 'frontend')));
}

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Trop de requêtes, réessayez plus tard' }
});
app.use('/api/', generalLimiter);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Trop de tentatives de connexion, réessayez plus tard' }
});
app.use('/api/auth/', authLimiter);

app.use('/api/auth',     require('./routes/auth'));
app.use('/api/sessions', require('./routes/sessions'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/announcements', require('./routes/announcements'));
app.use('/api/users',        require('./routes/users'));
app.use('/api/admin',        require('./routes/admin'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/sports', async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT id, slug, name FROM sports ORDER BY name ASC');
    res.json({ sports: rows });
  } catch (err) {
    next(err);
  }
});

app.use('/api/', (req, res) => {
  res.status(404).json({ error: 'Route introuvable' });
});

if (isProduction) {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
  });
}

app.use(errorHandler);

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  db.ready.then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 SportBook API lancée sur http://localhost:${PORT}`);
    });
  }).catch(() => {
    console.error('❌ Impossible de démarrer le serveur : échec de la connexion à la base de données');
    process.exit(1);
  });
}

module.exports = app;