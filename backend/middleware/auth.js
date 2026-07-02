const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const db = require('../config/db');

async function addToBlacklist(token) {
  const hash = crypto.createHash('sha256').update(token).digest('hex');
  try {
    await db.query('INSERT IGNORE INTO token_blacklist (token_hash) VALUES (?)', [hash]);
  } catch (err) {
    console.error('Erreur blacklist:', err);
  }
}

async function isBlacklisted(token) {
  const hash = crypto.createHash('sha256').update(token).digest('hex');
  try {
    const [rows] = await db.query('SELECT id FROM token_blacklist WHERE token_hash = ?', [hash]);
    return rows.length > 0;
  } catch (err) {
    console.error('Erreur vérification blacklist:', err);
    return false;
  }
}

async function authMiddleware(req, res, next) {
  const header = req.headers['authorization'];
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token manquant ou invalide' });
  }

  const token = header.split(' ')[1];
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);

    if (await isBlacklisted(token)) {
      return res.status(401).json({ error: 'Token expiré ou invalide' });
    }

    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token expiré ou invalide' });
  }
}

function adminMiddleware(req, res, next) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Accès réservé aux administrateurs' });
  }
  next();
}

module.exports = { authMiddleware, adminMiddleware, addToBlacklist };
