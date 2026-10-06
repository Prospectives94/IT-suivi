import { useNavigate } from 'react-router-dom';
import { Plus, Ticket, Monitor, BarChart3, ArrowRight, Shield } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="page-sm" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 64px)' }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 48 }} className="fade-up">
        <div style={{
          width: 72, height: 72, borderRadius: 20,
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 36, margin: '0 auto 20px',
          boxShadow: '0 0 40px rgba(99,102,241,.4)'
        }}>🖥️</div>
        <h1 style={{ marginBottom: 12 }}>IT Ticket Manager</h1>
        <p style={{ fontSize: 16, maxWidth: 440, margin: '0 auto' }}>
          Centralisez vos demandes IT, suivez leur avancement en temps réel, supprimez les emails et appels de relance.
        </p>
      </div>

      {/* Cards */}
      <div className="grid-2 fade-up fade-up-d1" style={{ width: '100%', gap: 20 }}>

        {/* User card */}
        <div
          className="card"
          style={{ cursor: 'pointer', transition: 'all .25s', padding: 32, position: 'relative', overflow: 'hidden' }}
          onClick={() => navigate('/my-tickets')}
          id="home-user-card"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && navigate('/my-tickets')}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(59,130,246,.4)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; }}
        >
          <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(59,130,246,.07)' }} />
          <div style={{ fontSize: 40, marginBottom: 16 }}>👷</div>
          <h2 style={{ marginBottom: 8, color: '#60a5fa' }}>Je suis Utilisateur</h2>
          <p style={{ fontSize: 14, marginBottom: 24 }}>
            Créez une demande IT et suivez son statut en temps réel. Fini les relances !
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
            {['Créer un ticket en 2 minutes', 'Suivi en temps réel', 'Notifications automatiques'].map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-2)' }}>
                <span style={{ color: '#34d399' }}>✓</span> {f}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-primary btn-sm" onClick={(e) => { e.stopPropagation(); navigate('/create'); }} id="btn-create-ticket">
              <Plus size={14} /> Nouveau ticket
            </button>
            <button className="btn btn-secondary btn-sm" id="btn-my-tickets">
              <Ticket size={14} /> Mes tickets <ArrowRight size={12} />
            </button>
          </div>
        </div>

        {/* Tech card */}
        <div
          className="card"
          style={{ cursor: 'pointer', transition: 'all .25s', padding: 32, position: 'relative', overflow: 'hidden' }}
          onClick={() => navigate('/tech')}
          id="home-tech-card"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && navigate('/tech')}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(99,102,241,.4)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; }}
        >
          <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(99,102,241,.07)' }} />
          <div style={{ fontSize: 40, marginBottom: 16 }}>🔧</div>
          <h2 style={{ marginBottom: 8, color: 'var(--primary-2)' }}>Je suis Technicien IT</h2>
          <p style={{ fontSize: 14, marginBottom: 24 }}>
            Accédez au dashboard centralisé, gérez les tickets et consultez les statistiques.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
            {['Dashboard centralisé', 'Tri par ancienneté & priorité', 'Analytics & rapports'].map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-2)' }}>
                <span style={{ color: '#a78bfa' }}>✓</span> {f}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-primary btn-sm" id="btn-tech-dashboard">
              <Monitor size={14} /> Dashboard <ArrowRight size={12} />
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 16, fontSize: 12, color: 'var(--text-4)' }}>
            <Shield size={12} /> Accès protégé par code
          </div>
        </div>
      </div>

      {/* Footer info */}
      <div className="fade-up fade-up-d2" style={{ marginTop: 32, textAlign: 'center', fontSize: 12, color: 'var(--text-4)', display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent:'center' }}>
        <div>🚀 Application PWA — Installable sur mobile</div>
        <div>🔒 Hébergé en interne</div>
        <div>📧 Notifications par email</div>
      </div>
    </div>
  );
}
