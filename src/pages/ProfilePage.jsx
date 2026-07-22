import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { User, Moon, Sun, Languages, Key, LogOut } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import { t } from '../data/translations';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

export default function ProfilePage() {
  const { user, theme, setTheme, lang, setLang, logout } = useStore();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <motion.div 
      className="container" 
      style={{ padding: 'var(--space-4xl) 0', maxWidth: '800px' }}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.h1 variants={itemVariants} style={{ marginBottom: 'var(--space-2xl)' }}>
        {t('profile.title', lang)}
      </motion.h1>
      
      <motion.div className="card" variants={itemVariants} style={{ marginBottom: 'var(--space-2xl)', display: 'flex', alignItems: 'center', gap: 'var(--space-xl)' }}>
        <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
          <User size={48} />
        </div>
        <div>
          <h2 style={{ margin: 0 }}>{user.name}</h2>
          <div style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-sm)' }}>{user.email}</div>
        </div>
      </motion.div>
      
      <div className="grid-2">
        <motion.div className="card" variants={itemVariants}>
          <h3 style={{ marginBottom: 'var(--space-lg)', borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-sm)' }}>
            {t('profile.preferences', lang)}
          </h3>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-md)' }}>
            <div>
              <div style={{ fontWeight: 500 }}>{t('profile.darkMode', lang)}</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--color-text-tertiary)' }}>{t('profile.toggleTheme', lang)}</div>
            </div>
            <button 
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              style={{ background: 'var(--color-surface-hover)', padding: '0.5rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {theme === 'light' ? (
                <Moon size={20} color="var(--color-text-primary)" />
              ) : (
                <Sun size={20} color="var(--color-text-primary)" />
              )}
            </button>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-md)' }}>
            <div>
              <div style={{ fontWeight: 500 }}>{t('profile.language', lang)}</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--color-text-tertiary)' }}>{t('profile.langDisplay', lang)}</div>
            </div>
            <button 
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              style={{ background: 'var(--color-surface-hover)', padding: '0.5rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Languages size={20} color="var(--color-text-primary)" />
            </button>
          </div>
        </motion.div>
        
        <motion.div className="card" variants={itemVariants}>
          <h3 style={{ marginBottom: 'var(--space-lg)', borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-sm)' }}>
            {t('profile.actions', lang)}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <button className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>
              <Key size={18} /> {t('profile.changePassword', lang)}
            </button>
            <button 
              onClick={logout}
              className="btn btn-secondary" 
              style={{ justifyContent: 'flex-start', color: 'var(--color-error)', borderColor: 'rgba(217, 83, 79, 0.3)' }}
            >
              <LogOut size={18} /> {t('profile.logout', lang)}
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
