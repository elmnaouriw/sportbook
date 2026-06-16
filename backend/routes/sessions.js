const express = require('express');
const router  = express.Router();
const db      = require('../config/db');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// ── GET /api/sessions ────────────────────────
// Retourne toutes les sessions (avec filtres optionnels)
router.get('/', async (req, res) => {
  const { sport, date, search } = req.query;

  let sql    = 'SELECT * FROM sessions_view WHERE 1=1';
  const params = [];

  if (sport) {
    sql += ' AND sport_slug = ?';
    params.push(sport);
  }
  if (date) {
    sql += ' AND session_date = ?';
    params.push(date);
  }
  if (search) {
    sql += ' AND (LOWER(title) LIKE ? OR LOWER(instructor) LIKE ?)';
    params.push(`%${search.toLowerCase()}%`, `%${search.toLowerCase()}%`);
  }

  sql += ' ORDER BY session_date ASC, start_time ASC';

  try {
    const [rows] = await db.query(sql, params);
    res.json({ total: rows.length, sessions: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// ── GET /api/sessions/featured ───────────────
// 4 premières sessions à venir
router.get('/featured', async (req, res) => {
  try {
    // 🔧 CORRECTION : On utilise les bons noms de colonnes (date et time)
    const [rows] = await db.query(
      'SELECT * FROM sessions_view ORDER BY session_date ASC, start_time ASC LIMIT 4'
    );
    res.json(rows);
  } catch (err) {
    // 🔧 DEBUG : On ajoute ça pour voir s'il y a un autre problème dans le terminal
    console.error("❌ Erreur dans GET /featured :", err); 
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// ── GET /api/sessions/:id ────────────────────
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM sessions_view WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'Session introuvable' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// ── POST /api/sessions ───────────────────────
// Créer une session (admin uniquement)
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  const { title, sport_id, instructor, date, time, duration, location, total_spots } = req.body;

  if (!title || !sport_id || !instructor || !date || !time || !duration || !location || !total_spots) {
    return res.status(400).json({ error: 'Tous les champs sont requis' });
  }

  try {
    const [result] = await db.query(
      `INSERT INTO sessions (title, sport_id, instructor, date, time, duration, location, total_spots)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, sport_id, instructor, date, time, duration, location, total_spots]
    );
    res.status(201).json({ message: 'Session créée', id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// ── DELETE /api/sessions/:id ─────────────────
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    await db.query('DELETE FROM sessions WHERE id = ?', [req.params.id]);
    res.json({ message: 'Session supprimée' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
