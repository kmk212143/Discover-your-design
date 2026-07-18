import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { UserCircle, Eye, EyeOff } from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, scale: 0.98, transition: { duration: 0.3 } }
};

export default function AuthPages({ type = 'login' }) {
  const isLogin = type === 'login';
  const navigate = useNavigate();
  const { login, signUp } = useStore();
  
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!isLogin && password !== confirm) {
      return setError('Passwords do not match.');
    }
    
    setLoading(true);
    // Simulate network delay
    await new Promise(r => setTimeout(r, 800));
    
    try {
      if (isLogin) {
        login(email, password);
      } else {
        signUp(name, email, password);
        login(email, password);
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-2xl) 0', background: 'linear-gradient(135deg, var(--color-bg) 0%, var(--color-surface-hover) 100%)' }}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="card" style={{ width: '100%', maxWidth: '480px', padding: 'var(--space-3xl)' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
          <UserCircle size={48} color="var(--color-primary)" style={{ marginBottom: 'var(--space-sm)' }} />
          <h2>{isLogin ? 'Welcome Back' : 'Create an Account'}</h2>
          <p style={{ color: 'var(--color-text-secondary)' }}>{isLogin ? 'Enter your details to access your dashboard.' : 'Sign up to save your styles and results.'}</p>
        </div>
        
        {error && (
          <div style={{ background: 'rgba(217,83,79,0.1)', color: 'var(--color-error)', padding: 'var(--space-md)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-lg)', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
          {!isLogin && (
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Full Name</label>
              <input type="text" className="form-control" required value={name} onChange={e => setName(e.target.value)} />
            </div>
          )}
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email Address</label>
            <input type="email" className="form-control" required value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input type={showPwd ? 'text' : 'password'} className="form-control" required minLength={6} value={password} onChange={e => setPassword(e.target.value)} />
              <button type="button" onClick={() => setShowPwd(!showPwd)} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-tertiary)' }}>
                {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          
          {!isLogin && (
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Confirm Password</label>
              <input type="password" className="form-control" required minLength={6} value={confirm} onChange={e => setConfirm(e.target.value)} />
            </div>
          )}
          
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', padding: '1rem', marginTop: 'var(--space-sm)' }}>
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>
        
        <div style={{ textAlign: 'center', marginTop: 'var(--space-2xl)', fontSize: '0.9rem' }}>
          {isLogin ? (
            <>Don't have an account? <Link to="/signup" style={{ fontWeight: 600 }}>Sign up</Link></>
          ) : (
            <>Already have an account? <Link to="/login" style={{ fontWeight: 600 }}>Log in</Link></>
          )}
        </div>
      </div>
    </motion.div>
  );
}
