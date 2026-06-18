const express = require('express');
const router  = express.Router();
const db      = require('../config/db');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const { AppError } = require('../middleware/errorHandler');
const { createAnnouncementValidation } = require('../middleware/validate');

// ── GET /api/announcements ────────────────────
router.get('/', authMiddleware, adminMiddleware, async (req, res, next) => {
  try {
    const [rows] = await db.query(
      `SELECT a.id, a.title, a.content, a.user_id, u.full_name AS author, a.created_at, a.updated_at
       FROM announcements a
       JOIN users u ON u.id = a.user_id
       ORDER BY a.created_at DESC`
    );
    res.json({ total: rows.length, announcements: rows });
  } catch (err) {
    next(err);
  }
});

// ── POST /api/announcements ───────────────────
router.post('/', authMiddleware, adminMiddleware, createAnnouncementValidation, async (req, res, next) => {
  const { title, content } = req.body;

  try {
    const [result] = await db.query(
      'INSERT INTO announcements (user_id, title, content) VALUES (?, ?, ?)',
      [req.user.id, title, content]
    );
    const [rows] = await db.query(
      `SELECT a.id, a.title, a.content, a.user_id, u.full_name AS author, a.created_at, a.updated_at
       FROM announcements a
       JOIN users u ON u.id = a.user_id
       WHERE a.id = ?`,
      [result.insertId]
    );
    res.status(201).json({ message: 'Annonce créée !', announcement: rows[0] });
  } catch (err) {
    next(err);
  }
});

// ── DELETE /api/announcements/:id ─────────────
router.delete('/:id', authMiddleware, async (req, res, next) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM announcements WHERE id = ?',
      [req.params.id]
    );
    if (!rows.length) return next(new AppError('Annonce introuvable', 404));

    const annonce = rows[0];
    if (annonce.user_id !== req.user.id && req.user.role !== 'admin') {
      return next(new AppError('Vous ne pouvez pas supprimer cette annonce', 403));
    }

    await db.query('DELETE FROM announcements WHERE id = ?', [req.params.id]);
    res.json({ message: 'Annonce supprimée' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
