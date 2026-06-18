const express = require('express');
const router  = express.Router();
const db      = require('../config/db');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const { AppError } = require('../middleware/errorHandler');
const { createSessionValidation, updateSessionValidation } = require('../middleware/validate');

// ── GET /api/sessions ────────────────────────
router.get('/', async (req, res, next) => {
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
    next(err);
  }
});

// ── GET /api/sessions/featured ───────────────
// 4 premières sessions à venir
router.get('/featured', async (req, res, next) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM sessions_view ORDER BY session_date ASC, start_time ASC LIMIT 4'
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

// ── GET /api/sessions/:id ────────────────────
router.get('/:id', async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT * FROM sessions_view WHERE id = ?', [req.params.id]);
    if (!rows.length) return next(new AppError('Session introuvable', 404));
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});

// ── POST /api/sessions ───────────────────────
router.post('/', authMiddleware, adminMiddleware, createSessionValidation, async (req, res, next) => {
  const { title, sport_id, instructor, date, time, duration, location, total_spots } = req.body;

  try {
    const [result] = await db.query(
      `INSERT INTO sessions (title, sport_id, instructor, date, time, duration, location, total_spots)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, sport_id, instructor, date, time, duration, location, total_spots]
    );
    res.status(201).json({ message: 'Session créée', id: result.insertId });
  } catch (err) {
    next(err);
  }
});

// ── DELETE /api/sessions/:id ─────────────────
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res, next) => {
  try {
    await db.query('DELETE FROM sessions WHERE id = ?', [req.params.id]);
    res.json({ message: 'Session supprimée' });
  } catch (err) {
    next(err);
  }
});

// ── PUT /api/sessions/:id ───────────────────
router.put('/:id', authMiddleware, adminMiddleware, updateSessionValidation, async (req, res, next) => {
  const { title, sport_id, instructor, date, time, duration, location, total_spots } = req.body;

  const allowedFields = { title, sport_id, instructor, date, time, duration, location, total_spots };
  const fields = {};
  for (const [key, value] of Object.entries(allowedFields)) {
    if (value !== undefined) fields[key] = value;
  }

  if (Object.keys(fields).length === 0) {
    return next(new AppError('Aucun champ à mettre à jour', 400));
  }

  try {
    const [rows] = await db.query('SELECT id FROM sessions WHERE id = ?', [req.params.id]);
    if (!rows.length) return next(new AppError('Session introuvable', 404));

    const sets = Object.keys(fields).map(k => `${k} = ?`).join(', ');
    const values = [...Object.values(fields), req.params.id];
    await db.query(`UPDATE sessions SET ${sets} WHERE id = ?`, values);
    res.json({ message: 'Session mise à jour' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
