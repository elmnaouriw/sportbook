const express = require('express');
const router  = express.Router();
const db      = require('../config/db');
const { authMiddleware } = require('../middleware/auth');

// ── GET /api/announcements ────────────────────
// Liste toutes les annonces (avec nom de l'auteur)
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT a.id, a.title, a.content, a.user_id, u.full_name AS author, a.created_at, a.updated_at
       FROM announcements a
       JOIN users u ON u.id = a.user_id
       ORDER BY a.created_at DESC`
    );
    res.json({ total: rows.length, announcements: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// ── POST /api/announcements ───────────────────
// Créer une annonce (connecté requis)
router.post('/', authMiddleware, async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Titre et contenu requis' });
  }

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
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// ── DELETE /api/announcements/:id ─────────────
// Supprimer sa propre annonce (ou admin)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM announcements WHERE id = ?',
      [req.params.id]
    );
    if (!rows.length) return res.status(404).json({ error: 'Annonce introuvable' });

    const annonce = rows[0];
    if (annonce.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Vous ne pouvez pas supprimer cette annonce' });
    }

    await db.query('DELETE FROM announcements WHERE id = ?', [req.params.id]);
    res.json({ message: 'Annonce supprimée' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
