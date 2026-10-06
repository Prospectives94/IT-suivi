const STATUS_MAP = {
  'Nouveau':    { cls: 'badge-nouveau',    dot: 'dot-blue',   label: 'Nouveau' },
  'En cours':   { cls: 'badge-en-cours',   dot: 'dot-yellow', label: 'En cours' },
  'En attente': { cls: 'badge-en-attente', dot: 'dot-purple', label: 'En attente' },
  'Résolu':     { cls: 'badge-resolu',     dot: 'dot-green',  label: 'Résolu' },
  'Fermé':      { cls: 'badge-ferme',      dot: 'dot-gray',   label: 'Fermé' },
};

const URGENCY_MAP = {
  'Normale':  { cls: 'badge-normale',  emoji: '🔵' },
  'Urgente':  { cls: 'badge-urgente',  emoji: '🟠' },
  'Critique': { cls: 'badge-critique', emoji: '🔴' },
};

export function StatusBadge({ status }) {
  const cfg = STATUS_MAP[status] || { cls: 'badge-ferme', dot: 'dot-gray', label: status };
  return (
    <span className={`badge ${cfg.cls}`}>
      <span className={`dot ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

export function UrgencyBadge({ urgency }) {
  const cfg = URGENCY_MAP[urgency] || { cls: 'badge-normale', emoji: '🔵' };
  return (
    <span className={`badge ${cfg.cls}`}>
      {cfg.emoji} {urgency}
    </span>
  );
}

export function CategoryBadge({ category }) {
  const MAP = {
    'Matériel': { bg: 'rgba(59,130,246,.12)', color: '#60a5fa' },
    'Logiciel': { bg: 'rgba(139,92,246,.12)', color: '#a78bfa' },
    'Accès':    { bg: 'rgba(16,185,129,.12)', color: '#34d399' },
    'Réseau':   { bg: 'rgba(245,158,11,.12)', color: '#fbbf24' },
    'Autre':    { bg: 'rgba(100,116,139,.12)', color: '#94a3b8' },
  };
  const style = MAP[category] || MAP['Autre'];
  return (
    <span className="badge" style={{ background: style.bg, color: style.color, border: `1px solid ${style.color}30` }}>
      {category}
    </span>
  );
}
