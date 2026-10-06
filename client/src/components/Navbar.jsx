import { useNavigate, useLocation } from 'react-router-dom';
import { Monitor, Plus, Ticket, BarChart3, Home } from 'lucide-react';

const isTechPage = (path) => path.startsWith('/tech') || path === '/analytics';

export default function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isTech = sessionStorage.getItem('tech_auth') === 'true';

  const go = (to) => () => navigate(to);

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Brand */}
        <button onClick={go('/')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <div className="navbar-brand">
            <div className="logo">🖥️</div>
            <span className="hide-mobile">IT Ticket Manager</span>
          </div>
        </button>

        {/* Navigation */}
        <div className="navbar-nav">
          <button
            className={`nav-link ${pathname === '/' ? 'active' : ''}`}
            onClick={go('/')}
            id="nav-home"
          >
            <Home size={16} />
            <span className="nav-label">Accueil</span>
          </button>

          <button
            className={`nav-link ${pathname === '/create' ? 'active' : ''}`}
            onClick={go('/create')}
            id="nav-create"
          >
            <Plus size={16} />
            <span className="nav-label">Nouveau ticket</span>
          </button>

          <button
            className={`nav-link ${pathname === '/my-tickets' ? 'active' : ''}`}
            onClick={go('/my-tickets')}
            id="nav-my-tickets"
          >
            <Ticket size={16} />
            <span className="nav-label">Mes tickets</span>
          </button>

          <button
            className={`nav-link ${isTechPage(pathname) ? 'active' : ''}`}
            onClick={go('/tech')}
            id="nav-tech"
            style={{ borderLeft: '1px solid var(--border)', marginLeft: 8, paddingLeft: 12 }}
          >
            <Monitor size={16} />
            <span className="nav-label">Technicien</span>
          </button>

          {isTech && (
            <button
              className={`nav-link ${pathname === '/analytics' ? 'active' : ''}`}
              onClick={go('/analytics')}
              id="nav-analytics"
            >
              <BarChart3 size={16} />
              <span className="nav-label">Analytics</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
