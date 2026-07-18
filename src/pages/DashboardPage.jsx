import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { Link, Navigate } from 'react-router-dom';
import { Sparkles, History } from 'lucide-react';

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
  const user = useStore(state => state.user);
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const history = user.quizHistory || [];
  const attempts = history.length;
  const lastResult = attempts > 0 ? history[history.length - 1].style : 'None yet';

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
        <h1>Welcome back, {user.name.split(' ')[0]}!</h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem' }}>Here is your design journey.</p>
      </motion.div>

      <div className="grid-2" style={{ marginBottom: 'var(--space-3xl)' }}>
        <motion.div className="card" variants={itemVariants}>
          <div style={{ color: 'var(--color-text-tertiary)', fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 'var(--space-sm)' }}>
            Quiz Attempts
          </div>
          <div style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--color-primary)' }}>
            {attempts}
          </div>
        </motion.div>
        
        <motion.div className="card" variants={itemVariants}>
          <div style={{ color: 'var(--color-text-tertiary)', fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 'var(--space-sm)' }}>
            Current Dominant Style
          </div>
          <div style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', fontWeight: 600, color: 'var(--color-primary)', marginTop: '0.5rem' }}>
            {lastResult}
          </div>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} style={{ display: 'flex', gap: 'var(--space-md)' }}>
        <Link to="/quiz" className="btn btn-primary" style={{ padding: '1rem 2rem' }}>
          <Sparkles size={18} /> Retake Quiz
        </Link>
      </motion.div>
    </motion.div>
  );
}
