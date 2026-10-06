import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, RefreshCw, Clock, Ticket, AlertTriangle, TrendingUp, CheckCircle, Calendar } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { getAnalytics } from '../api/client.js';

const STATUS_COLORS = {
  'Nouveau':    '#818cf8',
  'En cours':   '#fbbf24',
  'En attente': '#a78bfa',
  'Résolu':     '#34d399',
  'Fermé':      '#94a3b8',
};
const CAT_COLORS = ['#6366f1', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b'];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px', fontSize: 13 }}>
      <div style={{ color: 'var(--text-3)', marginBottom: 4 }}>{label}</div>
      <div style={{ fontWeight: 700, color: 'var(--primary-2)' }}>{payload[0].value} ticket{payload[0].value > 1 ? 's' : ''}</div>
    </div>
  );
};

const StatCard = ({ icon, label, value, sub, color, id }) => (
  <div className="stat-card" id={id}>
    <div style={{ color, marginBottom: 4 }}>{icon}</div>
    <div className="stat-value" style={{ color }}>{value ?? '—'}</div>
    <div className="stat-label">{label}</div>
    {sub && <div style={{ fontSize: 12, color: 'var(--text-4)' }}>{sub}</div>}
  </div>
);

export default function Analytics() {
  const navigate = useNavigate();
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);

  // Guard
  useEffect(() => {
    const isTech = sessionStorage.getItem('tech_auth') === 'true';
    const isDev = sessionStorage.getItem('dev_auth') === 'true';
    if (!isTech && !isDev) navigate('/tech');
  }, []);

  const load = async () => {
    setLoading(true);
    try {
      const { data: d } = await getAnalytics();
      setData(d);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { load(); }, []);

  if (loading) return (
    <div className="page" style={{ display: 'flex', justifyContent: 'center', paddingTop: 80 }}>
      <span className="spinner" style={{ width: 32, height: 32, border: '3px solid var(--border)', borderTopColor: 'var(--primary)' }} />
    </div>
  );

  if (!data) return null;

  const fmtHours = (h) => {
    if (h === null || h === undefined) return '—';
    if (h < 1)   return `${Math.round(h * 60)} min`;
    if (h < 24)  return `${h.toFixed(1)} h`;
    return `${(h / 24).toFixed(1)} j`;
  };

  // Normalize chart labels
  const chartDays = (data.ticketsByDay || []).map(d => ({
    date: format(parseISO(d.date), 'dd/MM', { locale: fr }),
    count: d.count,
  }));

  return (
    <div className="page">

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, flexWrap: 'wrap', gap: 12 }} className="fade-up">
        <div>
          <h1 style={{ marginBottom: 4 }}>📊 Analytics</h1>
          <p style={{ fontSize: 14 }}>Performance du service IT — 30 derniers jours</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-ghost btn-icon" onClick={load} title="Rafraîchir" id="btn-refresh-analytics"><RefreshCw size={16} /></button>
          <button className="btn btn-secondary btn-sm" onClick={() => navigate('/tech')} id="btn-back-from-analytics">
            <ArrowLeft size={14} /> Dashboard
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid-4 fade-up fade-up-d1" style={{ marginBottom: 32 }}>
        <StatCard id="kpi-total"     icon={<Ticket size={20} />}       label="Total tickets"      value={data.total}   sub={`${data.thisWeek} cette semaine`} color="#60a5fa" />
        <StatCard id="kpi-open"      icon={<AlertTriangle size={20} />}label="Ouverts"            value={data.open}    sub={`${data.late} en retard`}         color={data.late > 0 ? '#f87171' : '#34d399'} />
        <StatCard id="kpi-avg-res"   icon={<Clock size={20} />}        label="Temps de résolution" value={fmtHours(data.avgResolutionHours)} sub="Moyenne" color="#a78bfa" />
        <StatCard id="kpi-first-res" icon={<TrendingUp size={20} />}   label="1ère réponse"       value={fmtHours(data.avgFirstResponseHours)} sub="Objectif < 4h" color={data.avgFirstResponseHours && data.avgFirstResponseHours < 4 ? '#34d399' : '#fbbf24'} />
      </div>

      {/* Charts row */}
      <div className="grid-2 fade-up fade-up-d2" style={{ marginBottom: 24 }}>

        {/* Bar chart: tickets par jour */}
        <div className="card">
          <h3 style={{ marginBottom: 20 }}>📈 Tickets par jour (30 jours)</h3>
          {chartDays.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={chartDays} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#64748b' }} interval="preserveStartEnd" />
                <YAxis tick={{ fontSize: 10, fill: '#64748b' }} allowDecimals={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(99,102,241,.1)' }} />
                <Bar dataKey="count" fill="url(#barGrad)" radius={[4, 4, 0, 0]} />
                <defs>
                  <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.7} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="empty-state" style={{ height: 220 }}>
              <div className="icon">📭</div>
              <p>Pas encore de données</p>
            </div>
          )}
        </div>

        {/* Pie chart: statuts */}
        <div className="card">
          <h3 style={{ marginBottom: 20 }}>🔵 Répartition par statut</h3>
          {data.byStatus?.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={data.byStatus} dataKey="count" nameKey="status" cx="50%" cy="50%" outerRadius={80} label={({ status, percent }) => `${status} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                  {data.byStatus.map((e, i) => (
                    <Cell key={i} fill={STATUS_COLORS[e.status] || '#94a3b8'} />
                  ))}
                </Pie>
                <Tooltip formatter={(val, name) => [`${val} tickets`, name]} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="empty-state" style={{ height: 220 }}>
              <div className="icon">📭</div>
              <p>Pas encore de données</p>
            </div>
          )}
        </div>
      </div>

      {/* Second row */}
      <div className="grid-2 fade-up fade-up-d3">

        {/* Pie chart: catégories */}
        <div className="card">
          <h3 style={{ marginBottom: 20 }}>📦 Répartition par catégorie</h3>
          {data.byCategory?.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={data.byCategory} dataKey="count" nameKey="category" cx="50%" cy="50%" innerRadius={40} outerRadius={80}>
                  {data.byCategory.map((e, i) => (
                    <Cell key={i} fill={CAT_COLORS[i % CAT_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(val, name) => [`${val} tickets`, name]} />
                <Legend iconSize={10} wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="empty-state" style={{ height: 200 }}><div className="icon">📭</div><p>Pas encore de données</p></div>
          )}
        </div>

        {/* Urgency table */}
        <div className="card">
          <h3 style={{ marginBottom: 20 }}>⚡ Répartition par urgence</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {(data.byUrgency || []).map(u => {
              const pct = data.total ? Math.round((u.count / data.total) * 100) : 0;
              const color = u.urgency === 'Critique' ? '#f87171' : u.urgency === 'Urgente' ? '#fbbf24' : '#60a5fa';
              return (
                <div key={u.urgency}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 13 }}>
                    <span>{u.urgency}</span>
                    <span style={{ color, fontWeight: 700 }}>{u.count} ({pct}%)</span>
                  </div>
                  <div style={{ height: 6, background: 'var(--bg-3)', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 3, transition: 'width .5s ease' }} />
                  </div>
                </div>
              );
            })}
          </div>

          <hr className="divider" />

          {/* Resolved count */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <CheckCircle size={18} style={{ color: 'var(--success)' }} />
            <div>
              <div style={{ fontWeight: 700, color: 'var(--success)' }}>{data.resolved} tickets résolus</div>
              <div style={{ fontSize: 12, color: 'var(--text-4)' }}>
                Taux de résolution : {data.total ? Math.round((data.resolved / data.total) * 100) : 0}%
              </div>
            </div>
          </div>

          {data.late > 0 && (
            <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
              <AlertTriangle size={18} style={{ color: 'var(--danger)' }} />
              <div>
                <div style={{ fontWeight: 700, color: 'var(--danger)' }}>{data.late} ticket{data.late > 1 ? 's' : ''} en retard</div>
                <div style={{ fontSize: 12, color: 'var(--text-4)' }}>Sans action depuis plus de 48h</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
