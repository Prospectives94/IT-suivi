const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.get('/', (req, res) => {
  try {
    // Counts by status
    const byStatus = db.prepare(
      `SELECT status, COUNT(*) as count FROM tickets GROUP BY status ORDER BY count DESC`
    ).all();

    // Counts by category
    const byCategory = db.prepare(
      `SELECT category, COUNT(*) as count FROM tickets GROUP BY category ORDER BY count DESC`
    ).all();

    // Counts by urgency
    const byUrgency = db.prepare(
      `SELECT urgency, COUNT(*) as count FROM tickets GROUP BY urgency`
    ).all();

    // Late tickets (> 48h without action, not resolved/closed)
    const late = db.prepare(`
      SELECT COUNT(*) as count FROM tickets
      WHERE CAST((julianday('now') - julianday(last_action_at)) * 24 AS INTEGER) > 48
        AND status NOT IN ('Résolu', 'Fermé')
    `).get();

    // Average resolution time in hours
    const avgRes = db.prepare(`
      SELECT AVG((julianday(resolved_at) - julianday(created_at)) * 24) as avg_hours
      FROM tickets
      WHERE resolved_at IS NOT NULL AND status IN ('Résolu', 'Fermé')
    `).get();

    // Tickets per day (last 30 days)
    const ticketsByDay = db.prepare(`
      SELECT DATE(created_at) as date, COUNT(*) as count
      FROM tickets
      WHERE created_at >= DATE('now', '-30 days')
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    `).all();

    // Totals
    const total   = db.prepare(`SELECT COUNT(*) as count FROM tickets`).get();
    const open    = db.prepare(`SELECT COUNT(*) as count FROM tickets WHERE status NOT IN ('Résolu', 'Fermé')`).get();
    const resolved = db.prepare(`SELECT COUNT(*) as count FROM tickets WHERE status IN ('Résolu', 'Fermé')`).get();
    const thisWeek = db.prepare(`SELECT COUNT(*) as count FROM tickets WHERE created_at >= DATE('now', '-7 days')`).get();
    const today   = db.prepare(`SELECT COUNT(*) as count FROM tickets WHERE DATE(created_at) = DATE('now')`).get();

    // Average first response time (hours from creation to first non-Nouveau status change)
    const avgFirstResponse = db.prepare(`
      SELECT AVG((julianday(sh.changed_at) - julianday(t.created_at)) * 24) as avg_hours
      FROM tickets t
      JOIN status_history sh ON sh.ticket_id = t.id AND sh.new_status = 'En cours'
      WHERE sh.id = (SELECT MIN(id) FROM status_history WHERE ticket_id = t.id AND new_status = 'En cours')
    `).get();

    res.json({
      total: total.count,
      open: open.count,
      resolved: resolved.count,
      late: late.count,
      thisWeek: thisWeek.count,
      today: today.count,
      avgResolutionHours: avgRes.avg_hours ? Math.round(avgRes.avg_hours * 10) / 10 : null,
      avgFirstResponseHours: avgFirstResponse.avg_hours ? Math.round(avgFirstResponse.avg_hours * 10) / 10 : null,
      byStatus,
      byCategory,
      byUrgency,
      ticketsByDay,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
