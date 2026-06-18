const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const tokenBlacklist = new Set();

function addToBlacklist(token) {
  const hash = crypto.createHash('sha256').update(token).digest('hex');
  tokenBlacklist.add(hash);
}

function isBlacklisted(token) {
  const hash = crypto.createHash('sha256').update(token).digest('hex');
  return tokenBlacklist.has(hash);
}

function authMiddleware(req, res, next) {
  const header = req.headers['authorization'];
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token manquant ou invalide' });
  }

  const token = header.split(' ')[1];
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);

    if (isBlacklisted(token)) {
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
