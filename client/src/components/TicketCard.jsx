import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { MessageSquare, Clock, AlertTriangle, Star } from 'lucide-react';
import { StatusBadge, UrgencyBadge, CategoryBadge } from './StatusBadge.jsx';

const fmtAge = (date) =>
  formatDistanceToNow(new Date(date), { addSuffix: true, locale: fr });

export default function TicketCard({ ticket, techView = false, onClick }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) { onClick(ticket); return; }
    navigate(techView ? `/tech/ticket/${ticket.id}` : `/ticket/${ticket.id}`);
  };

  const isLate     = ticket.is_late === 1;
  const isPriority = ticket.priority > 0;

  return (
    <div
      className={`ticket-card ${isPriority ? 'priority' : ''} ${isLate ? 'late' : ''} fade-up`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      id={`ticket-card-${ticket.id}`}
    >
      <div className="ticket-card-header">
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-4)' }}>
              #{ticket.id}
            </span>
            {isPriority && (
              <span className="badge badge-priority">
                <Star size={10} /> Prioritaire
              </span>
            )}
            {isLate && (
              <span className="badge badge-late">
                <AlertTriangle size={10} /> En retard
              </span>
            )}
          </div>
          <div className="ticket-card-title">{ticket.title}</div>
        </div>
        <StatusBadge status={ticket.status} />
      </div>

      {ticket.description && (
        <p className="ticket-card-desc">{ticket.description}</p>
      )}

      <div className="ticket-card-meta">
        <CategoryBadge category={ticket.category} />
        <UrgencyBadge  urgency={ticket.urgency} />
      </div>

      <div className="ticket-card-footer">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 12, color: 'var(--text-4)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Clock size={12} /> {fmtAge(ticket.created_at)}
          </span>
          {ticket.comment_count > 0 && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <MessageSquare size={12} /> {ticket.comment_count}
            </span>
          )}
        </div>
        {techView && ticket.user_name && (
          <span style={{ fontSize: 12, color: 'var(--text-4)' }}>
            👤 {ticket.user_name}
          </span>
        )}
        {techView && !ticket.user_name && (
          <span style={{ fontSize: 12, color: 'var(--text-4)' }}>
            ✉️ {ticket.user_email}
          </span>
        )}
      </div>
    </div>
  );
}
