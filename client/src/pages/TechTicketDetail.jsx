import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, StarOff, Clock, Mail, User, AlertTriangle, Check } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { getTicket, updateStatus, updatePriority } from '../api/client.js';
import { StatusBadge, UrgencyBadge, CategoryBadge } from '../components/StatusBadge.jsx';
import CommentThread from '../components/CommentThread.jsx';

const STATUSES = ['Nouveau', 'En cours', 'En attente', 'Résolu', 'Fermé'];
const fmt = (d) => format(new Date(d), "dd MMM yyyy 'à' HH:mm", { locale: fr });

const STATUS_ICONS = { 'Nouveau': '📥', 'En cours': '⚙️', 'En attente': '⏳', 'Résolu': '✅', 'Fermé': '🔒' };
const STATUS_COLORS = {
  'Nouveau':    'rgba(99,102,241,.15)',
  'En cours':   'rgba(245,158,11,.15)',
  'En attente': 'rgba(139,92,246,.15)',
  'Résolu':     'rgba(16,185,129,.15)',
  'Fermé':      'rgba(100,116,139,.15)',
};
const STATUS_TEXT = {
  'Nouveau':    '#818cf8',
  'En cours':   '#fbbf24',
  'En attente': '#a78bfa',
  'Résolu':     '#34d399',
  'Fermé':      '#94a3b8',
};

export default function TechTicketDetail() {
  const { id }   = useParams();
  const navigate = useNavigate();

  const [ticket, setTicket]         = useState(null);
  const [loading, setLoading]       = useState(true);
  const [statusLoading, setStatLd]  = useState(false);
  const [priLoading, setPriLd]      = useState(false);
  const [toast, setToast]           = useState('');

  // Guard: must be authed
  useEffect(() => {
    const isTech = sessionStorage.getItem('tech_auth') === 'true';
    const isDev = sessionStorage.getItem('dev_auth') === 'true';
    if (!isTech && !isDev) navigate('/tech');
  }, []);

  const load = async () => {
    try {
      const { data } = await getTicket(id);
      setTicket(data);
    } catch {
      navigate('/tech');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { load(); }, [id]);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const changeStatus = async (status) => {
    if (status === ticket.status) return;
    setStatLd(true);
    try {
      const { data } = await updateStatus(id, status);
      setTicket(t => ({ ...t, ...data }));
      showToast(`✅ Statut mis à jour : ${status}`);
    } catch {
      showToast('❌ Erreur lors de la mise à jour');
    } finally {
      setStatLd(false);
    }
  };

  const togglePriority = async () => {
    const newPri = ticket.priority > 0 ? 0 : 1;
    setPriLd(true);
    try {
      const { data } = await updatePriority(id, newPri);
      setTicket(t => ({ ...t, priority: data.priority }));
      showToast(newPri ? '⭐ Ticket marqué prioritaire' : 'Priorité retirée');
    } finally {
      setPriLd(false);
    }
  };

  const handleNewComment = (c) => setTicket(t => ({ ...t, comments: [...(t.comments || []), c] }));

  if (loading) return (
    <div className="page" style={{ display: 'flex', justifyContent: 'center', paddingTop: 80 }}>
      <span className="spinner" style={{ width: 32, height: 32, border: '3px solid var(--border)', borderTopColor: 'var(--primary)' }} />
    </div>
  );
  if (!ticket) return null;

  const isLate     = ticket.is_late === 1;
  const isPriority = ticket.priority > 0;
  const ageHours   = Math.round((Date.now() - new Date(ticket.created_at)) / 3600000);

  return (
    <div className="page">
      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', top: 80, right: 20, zIndex: 999,
          background: 'var(--bg-2)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius)', padding: '12px 20px',
          boxShadow: 'var(--shadow-lg)', fontSize: 14, fontWeight: 600,
          animation: 'fadeUp .2s ease',
        }}>{toast}</div>
      )}

      {/* Back */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, alignItems: 'center' }} className="fade-up">
        <button className="btn btn-ghost btn-sm" onClick={() => navigate('/tech')} id="btn-back-tech">
          <ArrowLeft size={16} /> Dashboard
        </button>
        <span style={{ color: 'var(--text-4)' }}>/</span>
        <span style={{ fontSize: 14, color: 'var(--text-3)' }}>Ticket #{ticket.id}</span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <button
            className={`btn btn-sm ${isPriority ? 'btn-warning' : 'btn-secondary'}`}
            style={isPriority ? { background: 'rgba(245,158,11,.15)', color: '#fbbf24', border: '1px solid rgba(245,158,11,.3)' } : {}}
            onClick={togglePriority} disabled={priLoading} id="btn-toggle-priority"
          >
            {isPriority ? <><Star size={14} fill="currentColor" /> Prioritaire</> : <><StarOff size={14} /> Priorité</>}
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20, alignItems: 'start' }}>

        {/* ── Left: Ticket content ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Info card */}
          <div className="card fade-up">
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
                <CategoryBadge category={ticket.category} />
                <UrgencyBadge  urgency={ticket.urgency} />
                {isLate     && <span className="badge badge-late"><AlertTriangle size={10} /> En retard ({ageHours}h)</span>}
                {isPriority && <span className="badge badge-priority"><Star size={10} /> Prioritaire</span>}
              </div>
              <h2 style={{ marginBottom: 0 }}>{ticket.title}</h2>
            </div>

            <div style={{ background: 'var(--bg-1)', borderRadius: 'var(--radius-sm)', padding: 16, fontSize: 14, color: 'var(--text-2)', lineHeight: 1.7, marginBottom: 16 }}>
              {ticket.description}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, fontSize: 13, color: 'var(--text-4)' }}>
              <span style={{ display: 'flex', gap: 6 }}><User size={14} /> {ticket.user_name || '—'}</span>
              <span style={{ display: 'flex', gap: 6 }}><Mail size={14} /> {ticket.user_email}</span>
              <span style={{ display: 'flex', gap: 6 }}><Clock size={14} /> Reçu le {fmt(ticket.created_at)}</span>
              {ticket.resolved_at && <span style={{ color: 'var(--success)', display: 'flex', gap: 6 }}>✅ Résolu le {fmt(ticket.resolved_at)}</span>}
            </div>
          </div>

          {/* History */}
          {ticket.history?.length > 0 && (
            <div className="card fade-up fade-up-d1">
              <h3 style={{ marginBottom: 16, fontSize: 13, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '.6px' }}>Historique</h3>
              {ticket.history.map((h, i) => (
                <div key={h.id} style={{ display: 'flex', gap: 12, marginBottom: i < ticket.history.length - 1 ? 12 : 0, alignItems: 'flex-start' }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--bg-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, flexShrink: 0 }}>
                    {STATUS_ICONS[h.new_status] || '•'}
                  </div>
                  <div style={{ fontSize: 13 }}>
                    {h.old_status
                      ? <><span style={{ color: 'var(--text-4)' }}>{h.old_status}</span> → <strong style={{ color: STATUS_TEXT[h.new_status] }}>{h.new_status}</strong></>
                      : <strong style={{ color: 'var(--text-1)' }}>Ticket créé — {h.new_status}</strong>
                    }
                    <span style={{ color: 'var(--text-4)', marginLeft: 8 }}>
                      {format(new Date(h.changed_at), 'dd/MM/yy à HH:mm', { locale: fr })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Comments */}
          <div className="card fade-up fade-up-d2">
            <h3 style={{ marginBottom: 20 }}>💬 Conversation ({ticket.comments?.length || 0})</h3>
            <CommentThread
              ticketId={ticket.id}
              comments={ticket.comments || []}
              onNewComment={handleNewComment}
              techView={true}
            />
          </div>
        </div>

        {/* ── Right: Status panel ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Current status */}
          <div className="card fade-up" style={{ padding: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.6px', color: 'var(--text-4)', marginBottom: 12 }}>Statut actuel</div>
            <StatusBadge status={ticket.status} />
          </div>

          {/* Change status */}
          <div className="card fade-up fade-up-d1" style={{ padding: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.6px', color: 'var(--text-4)', marginBottom: 14 }}>Modifier le statut</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {STATUSES.map(s => {
                const isActive = ticket.status === s;
                return (
                  <button
                    key={s}
                    id={`status-btn-${s.replace(' ', '-').toLowerCase()}`}
                    disabled={statusLoading}
                    onClick={() => changeStatus(s)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '10px 14px', borderRadius: 'var(--radius-sm)', cursor: isActive ? 'default' : 'pointer',
                      border: isActive ? '1.5px solid var(--primary)' : '1.5px solid var(--border)',
                      background: isActive ? 'rgba(99,102,241,.1)' : STATUS_COLORS[s],
                      transition: 'all .15s', textAlign: 'left',
                      fontSize: 13, fontWeight: 600, color: isActive ? 'var(--text-1)' : STATUS_TEXT[s],
                    }}
                  >
                    <span>{STATUS_ICONS[s]}</span>
                    <span style={{ flex: 1 }}>{s}</span>
                    {isActive && <Check size={14} />}
                  </button>
                );
              })}
            </div>
            {statusLoading && <div style={{ textAlign: 'center', marginTop: 8, fontSize: 12, color: 'var(--text-4)' }}>Mise à jour…</div>}
            <div style={{ fontSize: 11, color: 'var(--text-4)', marginTop: 12, lineHeight: 1.6 }}>
              📧 Un email sera envoyé automatiquement à l'utilisateur lors du changement de statut.
            </div>
          </div>

          {/* User info card */}
          <div className="card fade-up fade-up-d2" style={{ padding: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.6px', color: 'var(--text-4)', marginBottom: 14 }}>Demandeur</div>
            <div style={{ display: 'flex', flex: 1, flexDirection: 'column', gap: 8, fontSize: 14 }}>
              {ticket.user_name && (
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <User size={14} style={{ color: 'var(--text-4)', flexShrink: 0 }} />
                  <span>{ticket.user_name}</span>
                </div>
              )}
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <Mail size={14} style={{ color: 'var(--text-4)', flexShrink: 0 }} />
                <a href={`mailto:${ticket.user_email}`} style={{ fontSize: 13, wordBreak: 'break-all' }}>{ticket.user_email}</a>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <Clock size={14} style={{ color: 'var(--text-4)', flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: 'var(--text-4)' }}>Il y a {ageHours}h</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive: stack on mobile */}
      <style>{`@media (max-width: 768px) { .page > div > div:first-child { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}
