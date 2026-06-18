const express = require('express');
const router  = express.Router();
const db      = require('../config/db');
const { authMiddleware } = require('../middleware/auth');
const { AppError } = require('../middleware/errorHandler');
const { createBookingValidation } = require('../middleware/validate');

// Toutes les routes bookings nécessitent d'être connecté
router.use(authMiddleware);

// ── POST /api/bookings ───────────────────────
router.post('/', createBookingValidation, async (req, res, next) => {
  const { session_id } = req.body;
  const user_id = req.user.id;

  try {
    const [sessions] = await db.query(
      'SELECT * FROM sessions_view WHERE id = ?', [session_id]
    );
    if (!sessions.length) return next(new AppError('Session introuvable', 404));

    const session = sessions[0];
    if (session.status === 'full') {
      return next(new AppError('Session complète', 409));
    }

    await db.query(
      'INSERT INTO bookings (user_id, session_id) VALUES (?, ?)',
      [user_id, session_id]
    );

    const [updated] = await db.query('SELECT * FROM sessions_view WHERE id = ?', [session_id]);
    res.status(201).json({
      message: 'Réservation confirmée !',
      session: updated[0]
    });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return next(new AppError('Vous avez déjà réservé cette session', 409));
    }
    next(err);
  }
});

// ── GET /api/bookings/me ─────────────────────
router.get('/me', async (req, res, next) => {
  try {
    const [rows] = await db.query(
      `SELECT b.id AS booking_id, b.booked_at, b.status,
              sv.*
       FROM bookings b
       JOIN sessions_view sv ON sv.id = b.session_id
       WHERE b.user_id = ? AND b.status = 'confirmed'
       ORDER BY sv.session_date ASC`,
      [req.user.id]
    );
    res.json({ total: rows.length, bookings: rows });
  } catch (err) {
    next(err);
  }
});

// ── DELETE /api/bookings/:id ─────────────────
router.delete('/:id', async (req, res, next) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM bookings WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );
    if (!rows.length) return next(new AppError('Réservation introuvable', 404));

    await db.query(
      "UPDATE bookings SET status = 'cancelled' WHERE id = ?",
      [req.params.id]
    );
    res.json({ message: 'Réservation annulée' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
