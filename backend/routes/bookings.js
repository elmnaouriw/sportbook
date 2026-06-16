const express = require('express');
const router  = express.Router();
const db      = require('../config/db');
const { authMiddleware } = require('../middleware/auth');

// Toutes les routes bookings nécessitent d'être connecté
router.use(authMiddleware);

// ── POST /api/bookings ───────────────────────
// Réserver une session
router.post('/', async (req, res) => {
  const { session_id } = req.body;
  const user_id = req.user.id;

  if (!session_id) return res.status(400).json({ error: 'session_id requis' });

  try {
    // Vérifier que la session existe et a des places
    const [sessions] = await db.query(
      'SELECT * FROM sessions_view WHERE id = ?', [session_id]
    );
    if (!sessions.length) return res.status(404).json({ error: 'Session introuvable' });

    const session = sessions[0];
    if (session.status === 'full') {
      return res.status(409).json({ error: 'Session complète' });
    }

    // Insérer la réservation (UNIQUE empêche les doublons)
    await db.query(
      'INSERT INTO bookings (user_id, session_id) VALUES (?, ?)',
      [user_id, session_id]
    );

    // Retourner les données mises à jour
    const [updated] = await db.query('SELECT * FROM sessions_view WHERE id = ?', [session_id]);
    res.status(201).json({
      message: 'Réservation confirmée !',
      session: updated[0]
    });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Vous avez déjà réservé cette session' });
    }
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// ── GET /api/bookings/me ─────────────────────
// Mes réservations
router.get('/me', async (req, res) => {
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
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// ── DELETE /api/bookings/:id ─────────────────
// Annuler une réservation
router.delete('/:id', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM bookings WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );
    if (!rows.length) return res.status(404).json({ error: 'Réservation introuvable' });

    await db.query(
      "UPDATE bookings SET status = 'cancelled' WHERE id = ?",
      [req.params.id]
    );
    res.json({ message: 'Réservation annulée' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
