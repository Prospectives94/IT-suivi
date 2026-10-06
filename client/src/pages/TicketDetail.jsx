import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Clock, Tag, AlertTriangle, Check, RotateCcw } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { getTicket, updateStatus, addComment } from '../api/client.js';
import { StatusBadge, UrgencyBadge, CategoryBadge } from '../components/StatusBadge.jsx';
import CommentThread from '../components/CommentThread.jsx';

const fmt = (d) => format(new Date(d), "dd MMMM yyyy 'à' HH:mm", { locale: fr });

export default function TicketDetail() {
  const { id }    = useParams();
  const navigate  = useNavigate();
  const [sp]      = useSearchParams();

  const email     = sp.get('email') || localStorage.getItem('user_email') || '';
  const [ticket, setTicket]         = useState(null);
  const [loading, setLoading]       = useState(true);
  const [actionLoading, setActLd]   = useState(false);
  const [error, setError]           = useState('');

  const load = async () => {
    try {
      const { data } = await getTicket(id);
      setTicket(data);
    } catch {
      setError('Ticket introuvable');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [id]);

  const handleNewComment = (c) => setTicket(t => ({ ...t, comments: [...(t.comments || []), c] }));

  const handleUserStatusChange = async (newStatus) => {
    setActLd(true);
    try {
      if (newStatus === 'En cours') {
        // Add automatic comment explaining reopen
        await addComment(id, {
          content: "🔄 Ticket rouvert par l'utilisateur (le problème persiste).",
          author: email || ticket.user_email,
          author_role: 'user'
        });
      }
      const { data } = await updateStatus(id, newStatus);
      await load();
    } catch (err) {
      alert("Erreur lors de la mise à jour du statut");
    } finally {
      setActLd(false);
    }
  };

  const STATUS_STEPS = ['Nouveau', 'En cours', 'En attente', 'Résolu', 'Fermé'];
  const stepIdx = ticket ? STATUS_STEPS.indexOf(ticket.status) : 0;

  if (loading) return (
    <div className="page-sm" style={{ display: 'flex', justifyContent: 'center', paddingTop: 80 }}>
      <span className="spinner" style={{ width: 32, height: 32, border: '3px solid var(--border)', borderTopColor: 'var(--primary)' }} />
    </div>
  );

  if (error || !ticket) return (
    <div className="page-sm">
      <div className="empty-state card">
        <div className="icon">❌</div>
        <h3>{error || 'Ticket non trouvé'}</h3>
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>Retour</button>
      </div>
    </div>
  );

  return (
    <div className="page-sm">
      {/* Back */}
      <button className="btn btn-ghost btn-sm" onClick={() => navigate(-1)} style={{ marginBottom: 24 }} id="btn-back">
        <ArrowLeft size={16} /> Retour
      </button>

      {/* Header card */}
      <div className="card fade-up" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 16 }}>
          <div>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-4)', display: 'block', marginBottom: 6 }}>TICKET #{ticket.id}</span>
            <h2 style={{ marginBottom: 0 }}>{ticket.title}</h2>
          </div>
          <StatusBadge status={ticket.status} />
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
          <CategoryBadge category={ticket.category} />
          <UrgencyBadge  urgency={ticket.urgency} />
          {ticket.is_late === 1 && (
            <span className="badge badge-late"><AlertTriangle size={10} /> En retard</span>
          )}
        </div>

        <div style={{ background: 'var(--bg-1)', borderRadius: 'var(--radius-sm)', padding: 16, fontSize: 14, color: 'var(--text-2)', lineHeight: 1.7, marginBottom: 16 }}>
          {ticket.description}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, fontSize: 13, color: 'var(--text-4)' }}>
          <span style={{ display: 'flex', gap: 6 }}>
            <Clock size={14} /> Créé le {fmt(ticket.created_at)}
          </span>
          {ticket.resolved_at && (
            <span style={{ color: 'var(--success)', display: 'flex', gap: 6 }}>
              ✅ Résolu le {fmt(ticket.resolved_at)}
            </span>
          )}
        </div>
      </div>

      {/* User validation banner when status is 'Résolu' */}
      {ticket.status === 'Résolu' && (
        <div className="card fade-up" style={{
          background: 'rgba(16, 185, 129, 0.1)',
          border: '1.5px solid var(--success)',
          marginBottom: 16,
          padding: 20
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <span style={{ fontSize: 22 }}>🎉</span>
            <h3 style={{ margin: 0, color: 'var(--success)', fontSize: 16 }}>Validation de la résolution</h3>
          </div>
          <p style={{ fontSize: 14, color: 'var(--text-2)', marginBottom: 16, lineHeight: 1.5 }}>
            Le service informatique a indiqué que votre problème est résolu. Merci de valider pour clôturer et archiver définitivement ce ticket, ou de le rouvrir si vous avez toujours besoin d'assistance.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button
              className="btn"
              style={{ background: 'var(--success)', color: '#fff', border: 'none', fontWeight: 600, padding: '10px 18px', borderRadius: 'var(--radius-sm)' }}
              onClick={() => handleUserStatusChange('Fermé')}
              disabled={actionLoading}
              id="btn-user-confirm-closed"
            >
              <Check size={16} /> Confirmer & Archiver le ticket
            </button>
            <button
              className="btn btn-secondary"
              style={{ padding: '10px 18px', borderRadius: 'var(--radius-sm)' }}
              onClick={() => handleUserStatusChange('En cours')}
              disabled={actionLoading}
              id="btn-user-reopen"
            >
              <RotateCcw size={16} /> Le problème persiste (Rouvrir)
            </button>
          </div>
        </div>
      )}

      {/* Progress bar */}
      <div className="card fade-up fade-up-d1" style={{ marginBottom: 16 }}>
        <h3 style={{ marginBottom: 16, fontSize: 13, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '.6px' }}>Progression</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          {['Nouveau', 'En cours', 'Résolu'].map((s, i) => {
            const isActive = ticket.status === s;
            const isDone   = stepIdx > ['Nouveau', 'En cours', 'En attente', 'Résolu', 'Fermé'].indexOf(s);
            return (
              <div key={s} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                {i > 0 && <div style={{ flex: 1, height: 2, background: isDone || isActive ? 'var(--primary)' : 'var(--border)' }} />}
                <div style={{
                  width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: isDone ? 'var(--success)' : isActive ? 'var(--primary)' : 'var(--bg-3)',
                  fontSize: 13, color: isDone || isActive ? '#fff' : 'var(--text-4)',
                  fontWeight: 700,
                }}>
                  {isDone ? '✓' : i + 1}
                </div>
                <div style={{ flex: 1, height: 2, background: isDone ? 'var(--primary)' : 'var(--border)', display: i === 2 ? 'none' : undefined }} />
              </div>
            );
          })}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 11, color: 'var(--text-4)' }}>
          <span>Nouveau</span><span>En cours</span><span>Résolu</span>
        </div>
      </div>

      {/* History */}
      {ticket.history?.length > 0 && (
        <div className="card fade-up fade-up-d2" style={{ marginBottom: 16 }}>
          <h3 style={{ marginBottom: 16, fontSize: 13, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '.6px' }}>Historique</h3>
          {ticket.history.map((h, i) => (
            <div key={h.id} style={{ display: 'flex', gap: 12, marginBottom: i < ticket.history.length - 1 ? 12 : 0 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--primary)', marginTop: 6, flexShrink: 0 }} />
              <div style={{ fontSize: 13, color: 'var(--text-3)' }}>
                {h.old_status ? <><strong>{h.old_status}</strong> → <strong style={{ color: 'var(--text-1)' }}>{h.new_status}</strong></> : <><strong style={{ color: 'var(--text-1)' }}>Ticket créé</strong> — {h.new_status}</>}
                <span style={{ color: 'var(--text-4)', marginLeft: 8 }}>
                  {format(new Date(h.changed_at), 'dd/MM à HH:mm', { locale: fr })}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Comments */}
      <div className="card fade-up fade-up-d3">
        <h3 style={{ marginBottom: 20 }}>💬 Messages ({ticket.comments?.length || 0})</h3>
        <CommentThread
          ticketId={ticket.id}
          comments={ticket.comments || []}
          onNewComment={handleNewComment}
          techView={false}
          authorEmail={email || ticket.user_email}
        />
      </div>
    </div>
  );
}
