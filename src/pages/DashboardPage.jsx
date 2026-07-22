import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { Link, Navigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Compass } from 'lucide-react';
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

export default function DashboardPage() {
  const { user, lang } = useStore();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const history = user.quizHistory || [];
  const attempts = history.length;
  const lastResult = attempts > 0 ? history[history.length - 1].style : null;
  
  const styleSlug = lastResult ? lastResult.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '') : '';

  return (
    <motion.div 
      className="container"
      style={{ padding: 'var(--space-4xl) 0' }}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div variants={itemVariants} style={{ marginBottom: 'var(--space-3xl)' }}>
        <h1>
          {t('dashboard.welcome', lang).replace('{name}', user.name.split(' ')[0])}
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem' }}>
          {t('dashboard.subtitle', lang)}
        </p>
      </motion.div>

      <div className="grid-2" style={{ marginBottom: 'var(--space-3xl)' }}>
        <motion.div className="card" variants={itemVariants}>
          <div style={{ color: 'var(--color-text-tertiary)', fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 'var(--space-sm)' }}>
            {t('dashboard.attempts', lang)}
          </div>
          <div style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--color-primary)' }}>
            {attempts}
          </div>
        </motion.div>
        
        <motion.div className="card" variants={itemVariants}>
          <div style={{ color: 'var(--color-text-tertiary)', fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 'var(--space-sm)' }}>
            {t('dashboard.dominantStyle', lang)}
          </div>
          <div style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', fontWeight: 600, color: 'var(--color-primary)', marginTop: '0.5rem' }}>
            {lastResult ? (
              <Link 
                to={`/styles/${styleSlug}`} 
                style={{ 
                  textDecoration: 'underline', 
                  color: 'var(--color-accent)', 
                  fontWeight: 700, 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '0.5rem' 
                }}
              >
                {lastResult} <ArrowRight size={18} style={{ transform: lang === 'ar' ? 'rotate(180deg)' : 'none' }} />
              </Link>
            ) : (
              t('dashboard.noneYet', lang)
            )}
          </div>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
        <Link to="/quiz" className="btn btn-primary" style={{ padding: '1rem 2rem' }}>
          <Sparkles size={18} /> {t('dashboard.retake', lang)}
        </Link>
        <Link to="/styles" className="btn btn-secondary" style={{ padding: '1rem 2rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          <Compass size={18} /> {t('dashboard.exploreStyles', lang)}
        </Link>
      </motion.div>
    </motion.div>
  );
}
