import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { User, LogIn, Compass } from 'lucide-react';
import { t } from '../data/translations';

export default function Navbar() {
  const { user, lang } = useStore();

  return (
    <nav style={{ padding: 'var(--space-md) var(--space-lg)', borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link to="/" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary)' }}>
        {t('nav.brand', lang)}
      </Link>
      
      <div style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'center' }}>
        <Link to="/styles" style={{ fontWeight: 500, color: 'var(--color-text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
          <Compass size={16} />
          {t('nav.styles', lang)}
        </Link>
        
        {user ? (
          <>
            <Link to="/dashboard" style={{ fontWeight: 500, color: 'var(--color-text-secondary)' }}>
              {t('nav.dashboard', lang)}
            </Link>
            <Link to="/profile" className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>
              <User size={18} /> {t('nav.profile', lang)}
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" style={{ fontWeight: 500, color: 'var(--color-text-secondary)' }}>
              {t('nav.login', lang)}
            </Link>
            <Link to="/signup" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
              <LogIn size={18} /> {t('nav.signup', lang)}
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
