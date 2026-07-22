import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, RefreshCw, Compass, CheckCircle2, LayoutDashboard, UserPlus, LogIn, ChevronRight } from 'lucide-react';
import { t } from '../data/translations';
import { stylesData } from '../data/stylesData';

const pageVariants = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.6, staggerChildren: 0.15 } },
  exit: { opacity: 0, scale: 0.98, transition: { duration: 0.3 } }
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

export default function QuizResultPage() {
  const { user, lang } = useStore();
  const navigate = useNavigate();

  // Retrieve result from user history if logged in, otherwise from localStorage
  const localResult = localStorage.getItem('quizResult');
  const userHistory = user?.quizHistory || [];
  const dominantStyleName = userHistory.length > 0 
    ? userHistory[userHistory.length - 1].style 
    : (localResult || 'Scandinavian');

  // Find style details
  const style = stylesData.find(s => s.name === dominantStyleName || s.slug === dominantStyleName.toLowerCase().replace(/\s+/g, '-')) || stylesData[0];
  const styleSlug = style.slug;

  const styleName = lang === 'ar' ? style.name_ar : style.name;
  const shortDesc = lang === 'ar' ? style.shortDescription_ar : style.shortDescription;
  const philosophy = lang === 'ar' ? style.philosophy_ar : style.philosophy;

  return (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ paddingBottom: 'var(--space-4xl)' }}
    >
      {/* Visual Header Banner */}
      <div style={{ position: 'relative', height: '55vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', overflow: 'hidden' }}>
        <img 
          src={style.image} 
          alt={styleName} 
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: -2 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.65)', zIndex: -1 }}></div>
        
        <div className="container" style={{ textAlign: 'center', padding: '0 var(--space-xl)' }}>
          <motion.div variants={itemVariants} style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-primary-hover)', marginBottom: 'var(--space-md)' }}>
            <Sparkles size={16} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '6px' }} />
            {t('result.congrats', lang)}
          </motion.div>
          
          <motion.h1 variants={itemVariants} style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', color: 'white', marginBottom: 'var(--space-md)' }}>
            <Link 
              to={`/styles/${styleSlug}`} 
              style={{ 
                color: 'white', 
                textDecoration: 'underline', 
                textDecorationColor: 'var(--color-primary)',
                transition: 'opacity 0.2s',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseOver={e => e.target.style.opacity = '0.85'}
              onMouseOut={e => e.target.style.opacity = '1'}
            >
              {styleName}
              <ArrowRight size={32} style={{ verticalAlign: 'middle', transform: lang === 'ar' ? 'rotate(180deg)' : 'none' }} />
            </Link>
          </motion.h1>
          
          <motion.p variants={itemVariants} style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.9)', maxWidth: '650px', margin: '0 auto', marginBottom: 'var(--space-lg)' }}>
            {shortDesc}
          </motion.p>
          
          <motion.p variants={itemVariants} style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>
            {t('result.viewDetails', lang)}
          </motion.p>
        </div>
      </div>

      <div className="container" style={{ marginTop: 'var(--space-3xl)' }}>
        
        {/* Guest CTA Reminder */}
        {!user && (
          <motion.div 
            variants={itemVariants}
            className="card" 
            style={{ 
              background: 'rgba(166, 123, 91, 0.1)', 
              borderColor: 'rgba(166, 123, 91, 0.3)', 
              textAlign: 'center', 
              marginBottom: 'var(--space-2xl)',
              borderRadius: 'var(--radius-lg)' 
            }}
          >
            <p style={{ fontWeight: 500, fontSize: '1.1rem', marginBottom: 'var(--space-md)', color: 'var(--color-text-primary)' }}>
              {t('result.guestPrompt', lang)}
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/signup" className="btn btn-primary" style={{ padding: '0.5rem 1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                <UserPlus size={16} /> {t('nav.signup', lang)}
              </Link>
              <Link to="/login" className="btn btn-secondary" style={{ padding: '0.5rem 1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                <LogIn size={16} /> {t('nav.login', lang)}
              </Link>
            </div>
          </motion.div>
        )}

        <div className="grid-3" style={{ marginBottom: 'var(--space-3xl)' }}>
          
          {/* Why This Matches You */}
          <motion.div className="card" variants={itemVariants} style={{ gridColumn: 'span 2' }}>
            <h2 style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-sm)', marginBottom: 'var(--space-md)' }}>
              {t('result.whyMatch', lang)}
            </h2>
            <div style={{ marginBottom: 'var(--space-lg)' }}>
              <h4 style={{ color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '4px' }}>
                <CheckCircle2 size={18} /> {t('result.personalityMatch', lang)}
              </h4>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                {t('result.personalityDesc', lang)}
              </p>
            </div>
            <div>
              <h4 style={{ color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '4px' }}>
                <Compass size={18} /> {t('result.philosophy', lang)}
              </h4>
              <p style={{ color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>
                "{philosophy}"
              </p>
            </div>
          </motion.div>

          {/* Color swatches */}
          <motion.div className="card" variants={itemVariants}>
            <h3 style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-sm)', marginBottom: 'var(--space-md)' }}>
              {t('result.colors', lang)}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)', marginTop: '0.5rem' }}>
              {style.colorPalette.map((col, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                  <div style={{ 
                    width: '38px', 
                    height: '38px', 
                    borderRadius: '50%', 
                    background: col.hex,
                    border: '1px solid var(--color-border)',
                    boxShadow: 'var(--shadow-sm)'
                  }} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                      {lang === 'ar' ? col.name_ar : col.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)' }}>{col.hex}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* Recommended Materials */}
        <motion.div variants={itemVariants} style={{ marginBottom: 'var(--space-3xl)' }}>
          <h2 style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
            {t('result.materials', lang)}
          </h2>
          <div className="grid-3">
            {style.materials.map((mat, index) => (
              <div key={index} className="card" style={{ textAlign: 'center', padding: 'var(--space-lg)' }}>
                <h4 style={{ color: 'var(--color-primary)', marginBottom: '4px' }}>
                  {lang === 'ar' ? mat.name_ar : mat.name}
                </h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                  {lang === 'ar' ? mat.usage_ar : mat.usage}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Actions Button Panel */}
        <motion.div variants={itemVariants} style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-md)', flexWrap: 'wrap', marginTop: 'var(--space-2xl)' }}>
          <Link to="/quiz" className="btn btn-primary" style={{ padding: '1rem 2rem' }}>
            <RefreshCw size={18} /> {t('result.retake', lang)}
          </Link>
          {user && (
            <Link to="/dashboard" className="btn btn-secondary" style={{ padding: '1rem 2rem' }}>
              <LayoutDashboard size={18} /> {t('result.goToDashboard', lang)}
            </Link>
          )}
          <Link to="/styles" className="btn btn-secondary" style={{ padding: '1rem 2rem' }}>
            <Compass size={18} /> {t('result.exploreAllStyles', lang)}
          </Link>
        </motion.div>

      </div>
    </motion.div>
  );
}
