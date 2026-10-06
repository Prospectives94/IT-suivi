const nodemailer = require('nodemailer');

const createTransporter = () => nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.office365.com',
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: { ciphers: 'SSLv3' },
});

const APP_URL = () => process.env.CLIENT_URL || process.env.APP_URL || 'http://localhost:3001';
const FROM    = () => `"IT Ticket Manager" <${process.env.SMTP_USER}>`;

const STATUS_COLORS = {
  'Nouveau':    '#6366F1',
  'En cours':   '#F59E0B',
  'En attente': '#8B5CF6',
  'Résolu':     '#10B981',
  'Fermé':      '#6B7280',
};

const URGENCY_EMOJI = { 'Normale': '🔵', 'Urgente': '🟠', 'Critique': '🔴' };

// ─── Email HTML Template ────────────────────────────────────────────────────
const template = (bodyHtml) => `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
           background: #f1f5f9; padding: 24px; color: #1e293b; }
    .wrap  { max-width: 600px; margin: 0 auto; }
    .card  { background: #fff; border-radius: 16px; overflow: hidden;
             box-shadow: 0 4px 24px rgba(0,0,0,.08); }
    .hdr   { background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
             padding: 32px; text-align: center; }
    .hdr h1 { color: #fff; font-size: 20px; font-weight: 700; }
    .hdr p  { color: #94a3b8; font-size: 13px; margin-top: 6px; }
    .body  { padding: 32px; }
    .badge { display: inline-block; padding: 5px 14px; border-radius: 999px;
             font-size: 12px; font-weight: 700; color: #fff; letter-spacing: .5px; margin-bottom: 20px; }
    .field { margin-bottom: 16px; }
    .fl    { font-size: 11px; color: #64748b; text-transform: uppercase;
             letter-spacing: .8px; margin-bottom: 3px; }
    .fv    { font-size: 15px; color: #1e293b; }
    .desc  { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px;
             padding: 16px; font-size: 14px; line-height: 1.6; color: #334155; margin-top: 4px; }
    .alert-ok { background: #d1fae5; border-radius: 10px; padding: 16px;
                color: #065f46; font-size: 14px; margin-top: 16px; }
    .btn  { display: inline-block; margin-top: 24px; padding: 13px 28px;
            background: linear-gradient(135deg, #6366F1, #8b5cf6);
            color: #fff !important; border-radius: 10px; text-decoration: none;
            font-weight: 700; font-size: 15px; }
    .ftr  { background: #f8fafc; padding: 18px 32px; text-align: center;
            color: #94a3b8; font-size: 12px; border-top: 1px solid #e2e8f0; }
    .divider { border: none; border-top: 1px solid #e2e8f0; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="card">
      <div class="hdr">
        <h1>🖥️ IT Ticket Manager</h1>
        <p>Service Informatique — Notification automatique</p>
      </div>
      <div class="body">${bodyHtml}</div>
      <div class="ftr">Ce message est généré automatiquement. Merci de ne pas y répondre directement.</div>
    </div>
  </div>
</body>
</html>`;

// ─── 1. New ticket → notify IT ─────────────────────────────────────────────
const sendNewTicketNotification = async (ticket) => {
  if (!process.env.IT_EMAIL || !process.env.SMTP_USER) return;

  const urgEmoji = URGENCY_EMOJI[ticket.urgency] || '🔵';
  const body = `
    <h2 style="color:#1e293b;font-size:18px;margin-bottom:16px">Nouvelle demande reçue</h2>
    <span class="badge" style="background:#6366F1">NOUVEAU</span>
    <div class="field"><div class="fl">Titre</div><div class="fv"><strong>${ticket.title}</strong></div></div>
    <div class="field"><div class="fl">Catégorie</div><div class="fv">${ticket.category}</div></div>
    <div class="field"><div class="fl">Urgence</div><div class="fv">${urgEmoji} ${ticket.urgency}</div></div>
    <div class="field"><div class="fl">Demandeur</div><div class="fv">${ticket.user_name || 'Non renseigné'} — ${ticket.user_email}</div></div>
    <div class="field"><div class="fl">Description</div><div class="desc">${ticket.description}</div></div>
    <hr class="divider">
    <a href="${APP_URL()}/tech?ticket=${ticket.id}" class="btn">Traiter ce ticket →</a>
  `;

  const t = createTransporter();
  await t.sendMail({
    from: FROM(),
    to: process.env.IT_EMAIL,
    subject: `[IT #${ticket.id}] ${ticket.urgency === 'Critique' ? '🚨 CRITIQUE — ' : ticket.urgency === 'Urgente' ? '⚠️ URGENT — ' : ''}${ticket.title}`,
    html: template(body),
  });
  console.log(`📧 Email IT envoyé pour ticket #${ticket.id}`);
};

// ─── 2. Status change → notify user ────────────────────────────────────────
const sendStatusUpdateEmail = async (ticket, oldStatus) => {
  if (!process.env.SMTP_USER) return;

  const color = STATUS_COLORS[ticket.status] || '#6366F1';
  const isResolved = ticket.status === 'Résolu' || ticket.status === 'Fermé';
  const body = `
    <h2 style="color:#1e293b;font-size:18px;margin-bottom:16px">Votre ticket a été mis à jour</h2>
    <span class="badge" style="background:${color}">${ticket.status.toUpperCase()}</span>
    <div class="field"><div class="fl">Ticket</div><div class="fv"><strong>#${ticket.id} — ${ticket.title}</strong></div></div>
    <div class="field"><div class="fl">Ancien statut</div><div class="fv">${oldStatus}</div></div>
    <div class="field"><div class="fl">Nouveau statut</div><div class="fv"><strong>${ticket.status}</strong></div></div>
    ${ticket.status === 'Résolu' ? `<div class="alert-ok">✅ Votre demande a été traitée et marquée comme <strong>Résolue</strong> par le service IT.<br><br>👉 <strong>Merci de vous connecter pour valider la résolution et archiver le ticket</strong> (ou le rouvrir si le problème persiste).</div>` : ticket.status === 'Fermé' ? `<div class="alert-ok">🔒 Ce ticket est désormais archivé et clôturé.</div>` : ''}
    <a href="${APP_URL()}/ticket/${ticket.id}?email=${encodeURIComponent(ticket.user_email)}" class="btn">Accéder à mon ticket →</a>
  `;

  const t = createTransporter();
  await t.sendMail({
    from: FROM(),
    to: ticket.user_email,
    subject: `[IT #${ticket.id}] Mise à jour : ${ticket.status} — ${ticket.title}`,
    html: template(body),
  });
  console.log(`📧 Email utilisateur envoyé pour ticket #${ticket.id} → ${ticket.status}`);
};

// ─── 3. Tech comment → notify user ─────────────────────────────────────────
const sendCommentNotification = async (ticket, comment) => {
  if (!process.env.SMTP_USER) return;

  const body = `
    <h2 style="color:#1e293b;font-size:18px;margin-bottom:16px">Le technicien a répondu</h2>
    <div class="field"><div class="fl">Ticket</div><div class="fv"><strong>#${ticket.id} — ${ticket.title}</strong></div></div>
    <div class="field"><div class="fl">Message du technicien</div>
      <div class="desc" style="border-left:4px solid #6366F1">${comment.content}</div>
    </div>
    <a href="${APP_URL()}/ticket/${ticket.id}?email=${encodeURIComponent(ticket.user_email)}" class="btn">Répondre au ticket →</a>
  `;

  const t = createTransporter();
  await t.sendMail({
    from: FROM(),
    to: ticket.user_email,
    subject: `[IT #${ticket.id}] Réponse du technicien — ${ticket.title}`,
    html: template(body),
  });
  console.log(`📧 Email commentaire envoyé pour ticket #${ticket.id}`);
};

module.exports = { sendNewTicketNotification, sendStatusUpdateEmail, sendCommentNotification };
