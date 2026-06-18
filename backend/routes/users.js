const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcrypt');
const db      = require('../config/db');
const { authMiddleware } = require('../middleware/auth');
const { AppError } = require('../middleware/errorHandler');
const { updateProfileValidation } = require('../middleware/validate');

router.use(authMiddleware);

// ── GET /api/users/me ──────────────────────────
router.get('/me', async (req, res, next) => {
  try {
    const [rows] = await db.query(
      'SELECT id, full_name, email, role, created_at FROM users WHERE id = ?',
      [req.user.id]
    );
    if (!rows.length) return next(new AppError('Utilisateur introuvable', 404));
    res.json({ user: rows[0] });
  } catch (err) {
    next(err);
  }
});

// ── PUT /api/users/me ──────────────────────────
router.put('/me', updateProfileValidation, async (req, res, next) => {
  const { full_name, email, current_password, new_password } = req.body;

  try {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [req.user.id]);
    if (!rows.length) return next(new AppError('Utilisateur introuvable', 404));

    const user = rows[0];

    if (email && email !== user.email) {
      const [dup] = await db.query('SELECT id FROM users WHERE email = ? AND id != ?', [email, req.user.id]);
      if (dup.length) return next(new AppError('Cet email est déjà utilisé', 409));
    }

    if (new_password) {
      if (!current_password) {
        return next(new AppError('Mot de passe actuel requis pour changer le mot de passe', 400));
      }
      const match = await bcrypt.compare(current_password, user.password);
      if (!match) return next(new AppError('Mot de passe actuel incorrect', 403));
      if (new_password.length < 6) return next(new AppError('Nouveau mot de passe : minimum 6 caractères', 400));
    }

    const finalName  = full_name ?? user.full_name;
    const finalEmail = email ?? user.email;
    const finalPass  = new_password ? await bcrypt.hash(new_password, 12) : user.password;

    await db.query(
      'UPDATE users SET full_name = ?, email = ?, password = ? WHERE id = ?',
      [finalName, finalEmail, finalPass, req.user.id]
    );

    const [updated] = await db.query(
      'SELECT id, full_name, email, role, created_at FROM users WHERE id = ?',
      [req.user.id]
    );

    res.json({ message: 'Profil mis à jour', user: updated[0] });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return next(new AppError('Cet email est déjà utilisé', 409));
    }
    next(err);
  }
});

module.exports = router;
