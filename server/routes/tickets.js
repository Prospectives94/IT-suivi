const express = require('express');
const router = express.Router();
const db = require('../db/database');
const { sendNewTicketNotification, sendStatusUpdateEmail, sendCommentNotification } = require('../services/emailService');

const VALID_STATUSES = ['Nouveau', 'En cours', 'En attente', 'Résolu', 'Fermé'];

// GET all tickets (technicien) - sorted by priority desc, then created_at asc (oldest first)
router.get('/', (req, res) => {
  try {
    const { status, category, urgency, search } = req.query;
    let query = `
      SELECT t.*,
        (SELECT COUNT(*) FROM comments WHERE ticket_id = t.id) AS comment_count,
        CASE WHEN CAST((julianday('now') - julianday(t.last_action_at)) * 24 AS INTEGER) > 48
             AND t.status NOT IN ('Résolu', 'Fermé')
             THEN 1 ELSE 0 END AS is_late
      FROM tickets t
      WHERE 1=1
    `;
    const params = [];

    if (status)   { query += ` AND t.status = ?`;       params.push(status); }
    if (category) { query += ` AND t.category = ?`;     params.push(category); }
    if (urgency)  { query += ` AND t.urgency = ?`;      params.push(urgency); }
    if (search)   {
      query += ` AND (t.title LIKE ? OR t.description LIKE ? OR t.user_email LIKE ? OR t.user_name LIKE ?)`;
      const s = `%${search}%`;
      params.push(s, s, s, s);
    }

    query += ` ORDER BY t.priority DESC, t.created_at ASC`;
    const tickets = db.prepare(query).all(...params);
    res.json(tickets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// GET user's tickets by email
router.get('/my', (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ error: 'Email requis' });

    const tickets = db.prepare(`
      SELECT t.*,
        (SELECT COUNT(*) FROM comments WHERE ticket_id = t.id) AS comment_count
      FROM tickets t
      WHERE t.user_email = ?
      ORDER BY t.created_at DESC
    `).all(email.toLowerCase().trim());

    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single ticket with comments + history
router.get('/:id', (req, res) => {
  try {
    const ticket = db.prepare(`
      SELECT t.*,
        CASE WHEN CAST((julianday('now') - julianday(t.last_action_at)) * 24 AS INTEGER) > 48
             AND t.status NOT IN ('Résolu', 'Fermé')
             THEN 1 ELSE 0 END AS is_late
      FROM tickets t WHERE t.id = ?
    `).get(req.params.id);

    if (!ticket) return res.status(404).json({ error: 'Ticket non trouvé' });

    const comments = db.prepare(
      'SELECT * FROM comments WHERE ticket_id = ? ORDER BY created_at ASC'
    ).all(req.params.id);

    const history = db.prepare(
      'SELECT * FROM status_history WHERE ticket_id = ? ORDER BY changed_at ASC'
    ).all(req.params.id);

    res.json({ ...ticket, comments, history });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create ticket
router.post('/', async (req, res) => {
  try {
    const { title, description, category, urgency, user_email, user_name } = req.body;

    if (!title?.trim() || !description?.trim() || !user_email?.trim()) {
      return res.status(400).json({ error: 'Titre, description et email sont requis' });
    }

    const result = db.prepare(`
      INSERT INTO tickets (title, description, category, urgency, user_email, user_name)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      title.trim(),
      description.trim(),
      category || 'Autre',
      urgency || 'Normale',
      user_email.toLowerCase().trim(),
      user_name?.trim() || ''
    );

    const ticket = db.prepare('SELECT * FROM tickets WHERE id = ?').get(result.lastInsertRowid);
    db.prepare('INSERT INTO status_history (ticket_id, new_status) VALUES (?, ?)').run(ticket.id, 'Nouveau');

    // Email notification (non-blocking)
    sendNewTicketNotification(ticket).catch(e => console.error('📧 Email erreur:', e.message));

    res.status(201).json(ticket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH update status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({ error: `Statut invalide. Valeurs: ${VALID_STATUSES.join(', ')}` });
    }

    const ticket = db.prepare('SELECT * FROM tickets WHERE id = ?').get(req.params.id);
    if (!ticket) return res.status(404).json({ error: 'Ticket non trouvé' });

    const oldStatus = ticket.status;
    const resolvedAt = (status === 'Résolu' || status === 'Fermé') ? new Date().toISOString() : (ticket.resolved_at || null);

    db.prepare(`
      UPDATE tickets
      SET status = ?, updated_at = CURRENT_TIMESTAMP, last_action_at = CURRENT_TIMESTAMP, resolved_at = ?
      WHERE id = ?
    `).run(status, resolvedAt, req.params.id);

    db.prepare('INSERT INTO status_history (ticket_id, old_status, new_status) VALUES (?, ?, ?)').run(req.params.id, oldStatus, status);

    const updated = db.prepare('SELECT * FROM tickets WHERE id = ?').get(req.params.id);

    sendStatusUpdateEmail(updated, oldStatus).catch(e => console.error('📧 Email erreur:', e.message));

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH update priority
router.patch('/:id/priority', (req, res) => {
  try {
    const { priority } = req.body;
    db.prepare('UPDATE tickets SET priority = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(priority, req.params.id);
    const ticket = db.prepare('SELECT * FROM tickets WHERE id = ?').get(req.params.id);
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST add comment
router.post('/:id/comments', async (req, res) => {
  try {
    const { content, author, author_role } = req.body;
    if (!content?.trim() || !author?.trim()) {
      return res.status(400).json({ error: 'Contenu et auteur requis' });
    }

    const ticket = db.prepare('SELECT * FROM tickets WHERE id = ?').get(req.params.id);
    if (!ticket) return res.status(404).json({ error: 'Ticket non trouvé' });

    const result = db.prepare(
      'INSERT INTO comments (ticket_id, author, author_role, content) VALUES (?, ?, ?, ?)'
    ).run(req.params.id, author.trim(), author_role || 'user', content.trim());

    db.prepare(
      'UPDATE tickets SET last_action_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
    ).run(req.params.id);

    const comment = db.prepare('SELECT * FROM comments WHERE id = ?').get(result.lastInsertRowid);

    if (author_role === 'technician') {
      sendCommentNotification(ticket, comment).catch(e => console.error('📧 Email erreur:', e.message));
    }

    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
