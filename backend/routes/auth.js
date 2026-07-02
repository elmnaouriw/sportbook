const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcrypt');
const jwt     = require('jsonwebtoken');
const crypto  = require('crypto');
const nodemailer = require('nodemailer');
const db      = require('../config/db');
const { AppError } = require('../middleware/errorHandler');
const { authMiddleware, addToBlacklist } = require('../middleware/auth');
const { registerValidation, loginValidation, forgotPasswordValidation, resetPasswordValidation } = require('../middleware/validate');

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
router.post('/logout', authMiddleware, async (req, res) => {
  const header = req.headers['authorization'];
  const token = header.split(' ')[1];
  await addToBlacklist(token);
  res.json({ message: 'Déconnexion réussie' });
});

// ── POST /api/auth/forgot-password ───────────
router.post('/forgot-password', forgotPasswordValidation, async (req, res, next) => {
  const { email } = req.body;

  try {
    // Always return success to prevent email enumeration
    const [rows] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (rows.length > 0) {
      const token = crypto.randomBytes(32).toString('hex');
      const hash = crypto.createHash('sha256').update(token).digest('hex');
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

      await db.query(
        'INSERT INTO password_reset_tokens (email, token_hash, expires_at) VALUES (?, ?, ?)',
        [email, hash, expiresAt]
      );

      const resetLink = `${process.env.API_URL || 'http://localhost:3000'}/?page=reset-password&token=${token}`;

      // Try to send email via SMTP; fallback to console log
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || '',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER || '',
          pass: process.env.SMTP_PASS || ''
        }
      });

      try {
        await transporter.sendMail({
          from: process.env.SMTP_FROM || 'noreply@sportbook.app',
          to: email,
          subject: 'Réinitialisation de votre mot de passe SportBook',
          html: `
            <h1>Réinitialisation de mot de passe</h1>
            <p>Vous avez demandé la réinitialisation de votre mot de passe.</p>
            <p><a href="${resetLink}">Cliquez ici pour réinitialiser votre mot de passe</a></p>
            <p>Ce lien expire dans 1 heure.</p>
            <p>Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.</p>
          `
        });
        console.log(`✅ Email de réinitialisation envoyé à ${email}`);
      } catch (mailErr) {
        console.log(`📧 SMTP non configuré — lien de réinitialisation : ${resetLink}`);
      }
    }

    res.json({ message: 'Si cet email existe, un lien de réinitialisation a été envoyé.' });
  } catch (err) {
    next(err);
  }
});

// ── POST /api/auth/reset-password ────────────
router.post('/reset-password', resetPasswordValidation, async (req, res, next) => {
  const { token, password } = req.body;

  try {
    const hash = crypto.createHash('sha256').update(token).digest('hex');

    const [rows] = await db.query(
      'SELECT * FROM password_reset_tokens WHERE token_hash = ? AND used = 0 AND expires_at > NOW()',
      [hash]
    );

    if (rows.length === 0) {
      return next(new AppError('Token invalide ou expiré', 400));
    }

    const resetRecord = rows[0];
    const hashedPassword = await bcrypt.hash(password, 12);

    await db.query('UPDATE users SET password = ? WHERE email = ?', [hashedPassword, resetRecord.email]);
    await db.query('UPDATE password_reset_tokens SET used = 1 WHERE id = ?', [resetRecord.id]);

    res.json({ message: 'Mot de passe réinitialisé avec succès.' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
