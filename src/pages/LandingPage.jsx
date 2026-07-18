import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.2 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4 } }
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

export default function LandingPage() {
  return (
    <motion.div 
      className="container" 
      style={{ padding: 'var(--space-4xl) var(--space-lg)', textAlign: 'center' }}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div variants={itemVariants} style={{ marginBottom: 'var(--space-2xl)' }}>
        <h1 style={{ fontSize: '4rem', color: 'var(--color-primary)', marginBottom: 'var(--space-md)' }}>
          Discover Your Perfect Design
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
          Take our intelligent quiz to uncover your unique interior design style, tailored perfectly to your lifestyle and taste.
        </p>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Link to="/quiz" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.125rem' }}>
          <Sparkles size={20} /> Start the Quiz <ArrowRight size={20} />
        </Link>
      </motion.div>
      
      <motion.div 
        variants={itemVariants} 
        style={{ marginTop: 'var(--space-4xl)', borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}
      >
        <img 
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200" 
          alt="Luxury Interior" 
          style={{ width: '100%', height: '500px', objectFit: 'cover', display: 'block' }}
        />
      </motion.div>
    </motion.div>
  );
}
