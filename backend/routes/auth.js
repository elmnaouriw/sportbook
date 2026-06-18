const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcrypt');
const jwt     = require('jsonwebtoken');
const db      = require('../config/db');
const { AppError } = require('../middleware/errorHandler');
const { authMiddleware, addToBlacklist } = require('../middleware/auth');
const { registerValidation, loginValidation } = require('../middleware/validate');

// ── POST /api/auth/register ──────────────────
router.post('/register', registerValidation, async (req, res, next) => {
  let { full_name, email, password, role } = req.body;

  role = role === 'admin' ? 'admin' : 'user';

  try {
    const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return next(new AppError('Cet email est déjà utilisé', 409));
    }

    const hash = await bcrypt.hash(password, 12);
    const [result] = await db.query(
      'INSERT INTO users (full_name, email, password, role) VALUES (?, ?, ?, ?)',
      [full_name.trim(), email.toLowerCase(), hash, role]
    );

    const token = jwt.sign(
      { id: result.insertId, email, role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.status(201).json({
      message: 'Compte créé avec succès',
      token,
      user: { id: result.insertId, full_name, email, role }
    });
  } catch (err) {
    next(err);
  }
});

// ── POST /api/auth/login ─────────────────────
router.post('/login', loginValidation, async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email.toLowerCase()]);
    if (rows.length === 0) {
      return next(new AppError('Email ou mot de passe incorrect', 401));
    }

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return next(new AppError('Email ou mot de passe incorrect', 401));
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({
      message: 'Connexion réussie',
      token,
      user: { id: user.id, full_name: user.full_name, email: user.email, role: user.role }
    });
  } catch (err) {
    next(err);
  }
});

// ── POST /api/auth/logout ────────────────────
router.post('/logout', authMiddleware, (req, res) => {
  const header = req.headers['authorization'];
  const token = header.split(' ')[1];
  addToBlacklist(token);
  res.json({ message: 'Déconnexion réussie' });
});

module.exports = router;
