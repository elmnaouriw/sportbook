const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcrypt');
const db      = require('../config/db');
const { authMiddleware } = require('../middleware/auth');

router.use(authMiddleware);

// ── GET /api/users/me ──────────────────────────
router.get('/me', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id, full_name, email, role, created_at FROM users WHERE id = ?',
      [req.user.id]
    );
    if (!rows.length) return res.status(404).json({ error: 'Utilisateur introuvable' });
    res.json({ user: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// ── PUT /api/users/me ──────────────────────────
router.put('/me', async (req, res) => {
  const { full_name, email, current_password, new_password } = req.body;

  try {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [req.user.id]);
    if (!rows.length) return res.status(404).json({ error: 'Utilisateur introuvable' });

    const user = rows[0];

    if (email && email !== user.email) {
      const [dup] = await db.query('SELECT id FROM users WHERE email = ? AND id != ?', [email, req.user.id]);
      if (dup.length) return res.status(409).json({ error: 'Cet email est déjà utilisé' });
    }

    if (new_password) {
      if (!current_password) {
        return res.status(400).json({ error: 'Mot de passe actuel requis pour changer le mot de passe' });
      }
      const match = await bcrypt.compare(current_password, user.password);
      if (!match) return res.status(403).json({ error: 'Mot de passe actuel incorrect' });
      if (new_password.length < 6) return res.status(400).json({ error: 'Nouveau mot de passe : minimum 6 caractères' });
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
      return res.status(409).json({ error: 'Cet email est déjà utilisé' });
    }
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
