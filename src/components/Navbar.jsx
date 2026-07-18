import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { User, LogIn } from 'lucide-react';

export default function Navbar() {
  const user = useStore(state => state.user);

  return (
    <nav style={{ padding: 'var(--space-md) var(--space-lg)', borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link to="/" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary)' }}>
        PerfectDesign
      </Link>
      
      <div style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'center' }}>
        {user ? (
          <>
            <Link to="/dashboard" style={{ fontWeight: 500, color: 'var(--color-text-secondary)' }}>Dashboard</Link>
            <Link to="/profile" className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>
              <User size={18} /> Profile
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" style={{ fontWeight: 500, color: 'var(--color-text-secondary)' }}>Log In</Link>
            <Link to="/signup" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
              <LogIn size={18} /> Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
