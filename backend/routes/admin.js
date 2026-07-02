const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcryptjs');
const db      = require('../config/db');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const { AppError } = require('../middleware/errorHandler');

router.use(authMiddleware, adminMiddleware);

// ── GET /api/admin/users ───────────────────────
router.get('/users', async (req, res, next) => {
  try {
    const [rows] = await db.query(
      'SELECT id, full_name, email, role, created_at FROM users ORDER BY created_at DESC'
    );
    res.json({ total: rows.length, users: rows });
  } catch (err) {
    next(err);
  }
});

// ── PUT /api/admin/users/:id/role ──────────────
router.put('/users/:id/role', async (req, res, next) => {
  const { role } = req.body;
  if (!role || !['user', 'admin'].includes(role)) {
    return next(new AppError('Le rôle doit être "user" ou "admin"', 400));
  }

  try {
    const [rows] = await db.query('SELECT id FROM users WHERE id = ?', [req.params.id]);
    if (!rows.length) return next(new AppError('Utilisateur introuvable', 404));

    await db.query('UPDATE users SET role = ? WHERE id = ?', [role, req.params.id]);
    res.json({ message: 'Rôle mis à jour' });
  } catch (err) {
    next(err);
  }
});

// ── DELETE /api/admin/users/:id ────────────────
router.delete('/users/:id', async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT id, role FROM users WHERE id = ?', [req.params.id]);
    if (!rows.length) return next(new AppError('Utilisateur introuvable', 404));
    if (rows[0].role === 'admin') {
      return next(new AppError('Impossible de supprimer un administrateur', 403));
    }

    await db.query('DELETE FROM users WHERE id = ?', [req.params.id]);
    res.json({ message: 'Utilisateur supprimé' });
  } catch (err) {
    next(err);
  }
});

// ── GET /api/admin/bookings ────────────────────
router.get('/bookings', async (req, res, next) => {
  try {
    const [rows] = await db.query(
      `SELECT b.id, b.user_id, b.session_id, b.status, b.booked_at,
              u.full_name AS user_name, u.email AS user_email,
              sv.title AS session_title, sv.session_date, sv.start_time, sv.sport_name
       FROM bookings b
       JOIN users u ON u.id = b.user_id
       JOIN sessions_view sv ON sv.id = b.session_id
       ORDER BY b.booked_at DESC`
    );
    res.json({ total: rows.length, bookings: rows });
  } catch (err) {
    next(err);
  }
});

// ── DELETE /api/admin/bookings/:id ─────────────
router.delete('/bookings/:id', async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT * FROM bookings WHERE id = ?', [req.params.id]);
    if (!rows.length) return next(new AppError('Réservation introuvable', 404));

    await db.query("UPDATE bookings SET status = 'cancelled' WHERE id = ?", [req.params.id]);
    res.json({ message: 'Réservation annulée par l\'administrateur' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
