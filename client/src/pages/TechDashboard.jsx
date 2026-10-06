import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, RefreshCw, Filter, Star, AlertTriangle, CheckCircle, Clock, Inbox } from 'lucide-react';
import { getTickets, techLogin, login } from '../api/client.js';
import TicketCard from '../components/TicketCard.jsx';

const STATUSES    = ['Nouveau', 'En cours', 'En attente', 'Résolu', 'Fermé'];
const CATEGORIES  = ['Matériel', 'Logiciel', 'Accès', 'Réseau', 'Autre'];

export default function TechDashboard() {
  const navigate = useNavigate();
  const [sp]     = useSearchParams();

  const [authed, setAuthed]       = useState(sessionStorage.getItem('tech_auth') === 'true' || sessionStorage.getItem('dev_auth') === 'true');
  const [pin, setPin]             = useState('');
  const [pinError, setPinError]   = useState('');
  const [pinLoading, setPinLoad]  = useState(false);

  const [tickets, setTickets]     = useState([]);
  const [loading, setLoading]     = useState(false);
  const [search, setSearch]       = useState('');
  const [statusF, setStatusF]     = useState('');
  const [catF, setCatF]           = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (statusF) params.status   = statusF;
      if (catF)    params.category = catF;
      if (search)  params.search   = search;
      const { data } = await getTickets(params);
      setTickets(data);
    } finally {
      setLoading(false);
    }
  }, [statusF, catF, search]);

  useEffect(() => { if (authed) load(); }, [authed, load]);

  // Auto-open ticket from URL param
  useEffect(() => {
    const tid = sp.get('ticket');
    if (tid && authed) navigate(`/tech/ticket/${tid}`);
  }, [sp, authed]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setPinLoad(true); setPinError('');
    try {
      const { data } = await login(pin);
      sessionStorage.setItem(`${data.role}_auth`, 'true');
      setAuthed(true);
    } catch {
      setPinError('Code d\'accès incorrect');
    } finally {
      setPinLoad(false);
    }
  };

  const logout = () => {
    sessionStorage.removeItem('tech_auth');
    sessionStorage.removeItem('dev_auth');
    setAuthed(false);
  };

  // Stats
  const stats = {
    total:   tickets.length,
    open:    tickets.filter(t => !['Résolu', 'Fermé'].includes(t.status)).length,
    late:    tickets.filter(t => t.is_late === 1).length,
    urgent:  tickets.filter(t => ['Urgente', 'Critique'].includes(t.urgency) && !['Résolu', 'Fermé'].includes(t.status)).length,
    done:    tickets.filter(t => ['Résolu', 'Fermé'].includes(t.status)).length,
  };

  /* ── Login Gate ── */
  if (!authed) return (
    <div className="page-sm" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 64px)' }}>
      <div className="card fade-up" style={{ width: '100%', maxWidth: 400, padding: 40 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔐</div>
          <h2 style={{ marginBottom: 8 }}>Accès Technicien</h2>
          <p style={{ fontSize: 14 }}>Entrez votre code d'accès pour accéder au dashboard</p>
        </div>
        <form onSubmit={handleLogin}>
          {pinError && <div className="alert alert-error" style={{ marginBottom: 16 }}>{pinError}</div>}
          <div className="form-group">
            <label className="form-label" htmlFor="tech-pin">Code d'accès</label>
            <input
              id="tech-pin" type="password" className="form-input"
              placeholder="••••••••" value={pin}
              onChange={(e) => setPin(e.target.value)}
              autoFocus style={{ fontSize: 20, letterSpacing: 4, textAlign: 'center' }}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-lg btn-full" disabled={pinLoading || !pin} id="btn-tech-login">
            {pinLoading ? <><span className="spinner" /> Vérification…</> : '🚀 Accéder au dashboard'}
          </button>
        </form>
      </div>
    </div>
  );

  /* ── Dashboard ── */
  return (
    <div className="page">

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, flexWrap: 'wrap', gap: 12 }} className="fade-up">
        <div>
          <h1 style={{ marginBottom: 4 }}>🖥️ Dashboard Technicien</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-4)' }}>
            <div className="live-dot" /> Live
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-ghost btn-icon" onClick={load} title="Rafraîchir" id="btn-refresh-dashboard"><RefreshCw size={16} /></button>
          <button className="btn btn-secondary btn-sm" onClick={() => navigate('/analytics')} id="btn-go-analytics">📊 Analytics</button>
          <button className="btn btn-ghost btn-sm" onClick={logout}>Déconnexion</button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid-4 fade-up fade-up-d1" style={{ marginBottom: 28 }}>
        {[
          { label: 'Total ouverts', value: stats.open,   icon: <Inbox size={20} />,         color: '#60a5fa', id: 'stat-open'   },
          { label: 'En retard',     value: stats.late,   icon: <AlertTriangle size={20} />,  color: '#f87171', id: 'stat-late'   },
          { label: 'Urgents',       value: stats.urgent, icon: <Clock size={20} />,          color: '#fbbf24', id: 'stat-urgent' },
          { label: 'Résolus',       value: stats.done,   icon: <CheckCircle size={20} />,    color: '#34d399', id: 'stat-done'   },
        ].map(s => (
          <div key={s.label} className="stat-card" id={s.id}>
            <div style={{ color: s.color }}>{s.icon}</div>
            <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="card fade-up fade-up-d2" style={{ padding: 16, marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <Filter size={14} style={{ color: 'var(--text-4)' }} />

          <div style={{ position: 'relative', flex: 1, minWidth: 180 }}>
            <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-4)' }} />
            <input
              type="text" className="form-input"
              style={{ paddingLeft: 32 }} placeholder="Rechercher…"
              value={search} onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && load()}
              id="tech-search"
            />
          </div>

          <select className="form-select" style={{ width: 'auto' }} value={statusF} onChange={(e) => setStatusF(e.target.value)} id="filter-status">
            <option value="">Tous les statuts</option>
            {STATUSES.map(s => <option key={s}>{s}</option>)}
          </select>

          <select className="form-select" style={{ width: 'auto' }} value={catF} onChange={(e) => setCatF(e.target.value)} id="filter-category">
            <option value="">Toutes catégories</option>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>

          {(statusF || catF || search) && (
            <button className="btn btn-ghost btn-sm" onClick={() => { setStatusF(''); setCatF(''); setSearch(''); }} id="btn-clear-filters">
              Effacer
            </button>
          )}
        </div>
      </div>

      {/* Ticket list */}
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}><span className="spinner" style={{ width: 32, height: 32, border: '3px solid var(--border)', borderTopColor: 'var(--primary)' }} /></div>
      ) : tickets.length === 0 ? (
        <div className="empty-state card">
          <div className="icon">🎉</div>
          <h3>Aucun ticket</h3>
          <p>Aucune demande ne correspond aux filtres actuels</p>
        </div>
      ) : (
        <>
          <div style={{ fontSize: 13, color: 'var(--text-4)', marginBottom: 12 }}>
            {tickets.length} ticket{tickets.length > 1 ? 's' : ''} — triés par priorité puis ancienneté
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {tickets.map((t, i) => (
              <div key={t.id} className={`fade-up fade-up-d${Math.min(i + 1, 4)}`}>
                <TicketCard ticket={t} techView={true} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
