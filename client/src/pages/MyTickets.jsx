import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Plus, RefreshCw, Search, X } from 'lucide-react';
import { getMyTickets } from '../api/client.js';
import TicketCard from '../components/TicketCard.jsx';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function MyTickets() {
  const navigate = useNavigate();
  const [params]  = useSearchParams();

  const [email, setEmail]     = useState(params.get('email') || localStorage.getItem('user_email') || '');
  const [input, setInput]     = useState(email);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const [filter, setFilter]   = useState('all');

  const load = async (e) => {
    const addr = e || email;
    if (!EMAIL_RE.test(addr)) { setError('Adresse email invalide'); return; }
    setLoading(true); setError('');
    try {
      const { data } = await getMyTickets(addr);
      setTickets(data);
      localStorage.setItem('user_email', addr);
      setEmail(addr);
    } catch {
      setError('Impossible de charger les tickets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (email) load(email); }, []);

  const filtered = filter === 'all'
    ? tickets
    : filter === 'open'
    ? tickets.filter(t => !['Résolu', 'Fermé'].includes(t.status))
    : tickets.filter(t => ['Résolu', 'Fermé'].includes(t.status));

  const openCount     = tickets.filter(t => !['Résolu', 'Fermé'].includes(t.status)).length;
  const resolvedCount = tickets.filter(t => ['Résolu', 'Fermé'].includes(t.status)).length;

  return (
    <div className="page-sm">

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }} className="fade-up">
        <div>
          <h1 style={{ marginBottom: 4 }}>🎫 Mes tickets</h1>
          <p style={{ fontSize: 14 }}>Suivez l'avancement de vos demandes IT</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => navigate('/create')} id="btn-new-from-list">
          <Plus size={14} /> Nouveau
        </button>
      </div>

      {/* Email form */}
      <div className="card fade-up fade-up-d1" style={{ marginBottom: 24, padding: 20 }}>
        <label className="form-label" htmlFor="my-email" style={{ marginBottom: 8 }}>Votre adresse email</label>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            id="my-email" type="email" className="form-input"
            placeholder="votre@email.com"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && load(input)}
          />
          <button className="btn btn-primary" onClick={() => load(input)} disabled={loading} id="btn-load-tickets">
            {loading ? <span className="spinner" /> : <Search size={16} />}
          </button>
          {email && (
            <button className="btn btn-ghost btn-icon" onClick={() => load(email)} title="Rafraîchir" id="btn-refresh-tickets">
              <RefreshCw size={16} />
            </button>
          )}
        </div>
        {error && <div className="form-error" style={{ marginTop: 8 }}>{error}</div>}
      </div>

      {/* Results */}
      {tickets.length > 0 && (
        <>
          {/* Stats bar */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }} className="fade-up fade-up-d2">
            {[
              { label: 'Tous', count: tickets.length, key: 'all', color: 'var(--text-2)' },
              { label: 'En cours', count: openCount, key: 'open', color: '#fbbf24' },
              { label: 'Résolus', count: resolvedCount, key: 'closed', color: '#34d399' },
            ].map(({ label, count, key, color }) => (
              <button
                key={key}
                className={`btn ${filter === key ? 'btn-secondary' : 'btn-ghost'}`}
                onClick={() => setFilter(key)}
                style={{ borderColor: filter === key ? color : undefined }}
                id={`filter-${key}`}
              >
                <span style={{ color }}>{count}</span> {label}
              </button>
            ))}
          </div>

          {/* Ticket list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {filtered.map((t, i) => (
              <div key={t.id} className={`fade-up fade-up-d${Math.min(i + 1, 4)}`}>
                <TicketCard ticket={t} techView={false} />
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="empty-state">
              <div className="icon">🎉</div>
              <h3>Aucun ticket dans cette catégorie</h3>
            </div>
          )}
        </>
      )}

      {tickets.length === 0 && !loading && email && (
        <div className="empty-state card fade-up fade-up-d2">
          <div className="icon">📭</div>
          <h3>Aucun ticket trouvé</h3>
          <p style={{ fontSize: 14 }}>Vous n'avez pas encore de ticket pour cet email.</p>
          <button className="btn btn-primary" onClick={() => navigate('/create')} id="btn-create-first">
            <Plus size={16} /> Créer ma première demande
          </button>
        </div>
      )}
    </div>
  );
}
