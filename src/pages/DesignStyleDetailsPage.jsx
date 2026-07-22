import { useState } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { stylesData } from '../data/stylesData';
import { t } from '../data/translations';
import { ArrowLeft, Compass, Info, Check, X, CheckCircle2, AlertTriangle, Target, Link2 } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.1 } },
  exit: { opacity: 0 }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function DesignStyleDetailsPage() {
  const { styleSlug } = useParams();
  const [searchParams] = useSearchParams();
  const lang = useStore(state => state.lang);

  // Tab space application (defaults to searchParam space if provided, e.g. from gallery filter)
  const initialSpace = searchParams.get('space') || 'livingRoom';
  const [activeSpaceTab, setActiveSpaceTab] = useState(initialSpace);

  // Find style
  const style = stylesData.find(s => s.slug === styleSlug);

  if (!style) {
    return (
      <div className="container" style={{ padding: 'var(--space-4xl) 0', textAlign: 'center' }}>
        <h2>Style not found</h2>
        <Link to="/styles" className="btn btn-primary" style={{ marginTop: 'var(--space-md)' }}>
          {t('details.backToList', lang)}
        </Link>
      </div>
    );
  }

  // Get localizable data
  const name = lang === 'ar' ? style.name_ar : style.name;
  const overview = lang === 'ar' ? style.overview_ar : style.overview;
  const philosophy = lang === 'ar' ? style.philosophy_ar : style.philosophy;
  const characteristics = lang === 'ar' ? style.characteristics_ar : style.characteristics;
  
  const furniture = lang === 'ar' ? style.furniture_ar : style.furniture;
  const lighting = lang === 'ar' ? style.lighting_ar : style.lighting;
  const walls = lang === 'ar' ? style.walls_ar : style.walls;
  const ceiling = lang === 'ar' ? style.ceiling_ar : style.ceiling;
  const flooring = lang === 'ar' ? style.flooring_ar : style.flooring;
  
  const idealFor = lang === 'ar' ? style.idealFor_ar : style.idealFor;
  const origin = lang === 'ar' ? style.origin_ar : style.origin;
  
  const pros = lang === 'ar' ? style.pros_ar : style.pros;
  const cons = lang === 'ar' ? style.cons_ar : style.cons;

  // Accessories Do's and Don'ts
  const dos = lang === 'ar' ? style.accessories.dos_ar : style.accessories.dos;
  const donts = lang === 'ar' ? style.accessories.donts_ar : style.accessories.donts;

  // Space Tabs definition
  const spaceTabs = [
    { id: 'livingRoom', label: t('spaces.livingRoom', lang) },
    { id: 'bedroom', label: t('spaces.bedroom', lang) },
    { id: 'bathroom', label: t('spaces.bathroom', lang) },
    { id: 'kitchen', label: t('spaces.kitchen', lang) },
    { id: 'office', label: t('spaces.office', lang) }
  ];

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{ paddingBottom: 'var(--space-4xl)' }}
    >
      {/* Top Banner Hero */}
      <div style={{ position: 'relative', height: '45vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', overflow: 'hidden' }}>
        <img 
          src={style.image} 
          alt={name} 
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: -2 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.7) 100%)', zIndex: -1 }}></div>
        
        <div className="container" style={{ textAlign: 'center', zIndex: 1, padding: '0 var(--space-lg)' }}>
          <motion.div variants={itemVariants}>
            <Link to="/styles" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.8)', marginBottom: 'var(--space-md)', fontSize: '0.9rem', border: '1px solid rgba(255,255,255,0.3)', padding: '4px 16px', borderRadius: 'var(--radius-full)' }}>
              <ArrowLeft size={16} style={{ transform: lang === 'ar' ? 'rotate(180deg)' : 'none' }} /> {t('details.backToList', lang)}
            </Link>
          </motion.div>
          <motion.h1 variants={itemVariants} style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: 'white', marginBottom: 'var(--space-sm)' }}>
            {name}
          </motion.h1>
          <motion.p variants={itemVariants} style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.9)', fontStyle: 'italic', maxWidth: '600px', margin: '0 auto' }}>
            "{philosophy}"
          </motion.p>
        </div>
      </div>

      <div className="container" style={{ marginTop: 'var(--space-3xl)' }}>
        <div className="grid-3">
          
          {/* Main Info Column */}
          <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: 'var(--space-2xl)' }}>
            
            {/* Overview Card */}
            <motion.div className="card" variants={itemVariants}>
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-sm)', marginBottom: 'var(--space-md)' }}>
                <Info size={22} color="var(--color-primary)" />
                {t('details.overview', lang)}
              </h2>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: 'var(--space-md)' }}>
                {overview}
              </p>
              <div style={{ display: 'flex', gap: 'var(--space-xl)', flexWrap: 'wrap', marginTop: 'var(--space-lg)' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Origin</div>
                  <div style={{ fontWeight: 600 }}>{origin}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Category</div>
                  <div style={{ fontWeight: 600 }}>{lang === 'ar' ? style.category_ar : style.category}</div>
                </div>
              </div>
            </motion.div>

            {/* Key Characteristics */}
            <motion.div className="card" variants={itemVariants}>
              <h2 style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-sm)', marginBottom: 'var(--space-md)' }}>
                {t('details.characteristics', lang)}
              </h2>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {characteristics.map((char, index) => (
                  <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: 'var(--color-text-secondary)' }}>
                    <span style={{ color: 'var(--color-success)', marginTop: '0.25rem' }}>✓</span>
                    <span style={{ fontSize: '1.05rem' }}>{char}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Materials Detail */}
            <motion.div className="card" variants={itemVariants}>
              <h2 style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-sm)', marginBottom: 'var(--space-md)' }}>
                {t('details.materials', lang)}
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-md)' }}>
                {style.materials.map((mat, index) => (
                  <div key={index} style={{ background: 'var(--color-surface-hover)', padding: 'var(--space-md)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                    <h4 style={{ color: 'var(--color-primary)', marginBottom: '0.25rem' }}>
                      {lang === 'ar' ? mat.name_ar : mat.name}
                    </h4>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                      <strong>Usage:</strong> {lang === 'ar' ? mat.usage_ar : mat.usage}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Space specific application tab layout */}
            <motion.div className="card" variants={itemVariants}>
              <h2 style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-sm)', marginBottom: 'var(--space-md)' }}>
                {t('details.spaceApp', lang)}
              </h2>
              
              {/* Tab headers */}
              <div style={{ display: 'flex', gap: '4px', overflowX: 'auto', paddingBottom: 'var(--space-sm)', marginBottom: 'var(--space-lg)', borderBottom: '1px solid var(--color-border)' }}>
                {spaceTabs.map(tab => (
                  <button 
                    key={tab.id}
                    onClick={() => setActiveSpaceTab(tab.id)}
                    className="btn"
                    style={{ 
                      padding: '0.5rem 1rem', 
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.9rem',
                      background: activeSpaceTab === tab.id ? 'var(--color-primary)' : 'transparent',
                      color: activeSpaceTab === tab.id ? 'white' : 'var(--color-text-secondary)',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <div style={{ minHeight: '80px' }}>
                <p style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)', lineHeight: '1.7' }}>
                  {style.spaceApplications[activeSpaceTab] 
                    ? (lang === 'ar' ? style.spaceApplications[activeSpaceTab].ar : style.spaceApplications[activeSpaceTab].en)
                    : 'N/A'}
                </p>
              </div>
            </motion.div>

            {/* Detailed Design Elements Card */}
            <motion.div className="card" variants={itemVariants}>
              <h2 style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-sm)', marginBottom: 'var(--space-xl)' }}>
                Structure & Fitment Guides
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
                <div>
                  <h4 style={{ color: 'var(--color-primary)', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    {t('details.furniture', lang)}
                  </h4>
                  <p style={{ color: 'var(--color-text-secondary)', marginTop: '4px' }}>{furniture}</p>
                </div>
                
                <div>
                  <h4 style={{ color: 'var(--color-primary)', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    {t('details.lighting', lang)}
                  </h4>
                  <p style={{ color: 'var(--color-text-secondary)', marginTop: '4px' }}>{lighting}</p>
                </div>

                <div>
                  <h4 style={{ color: 'var(--color-primary)', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    {t('details.walls', lang)}
                  </h4>
                  <p style={{ color: 'var(--color-text-secondary)', marginTop: '4px' }}>{walls}</p>
                </div>

                <div>
                  <h4 style={{ color: 'var(--color-primary)', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    Ceiling
                  </h4>
                  <p style={{ color: 'var(--color-text-secondary)', marginTop: '4px' }}>{ceiling}</p>
                </div>

                <div>
                  <h4 style={{ color: 'var(--color-primary)', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    {t('details.flooring', lang)}
                  </h4>
                  <p style={{ color: 'var(--color-text-secondary)', marginTop: '4px' }}>{flooring}</p>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Sidebar Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2xl)' }}>
            
            {/* Color Palette Card */}
            <motion.div className="card" variants={itemVariants}>
              <h3 style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-sm)', marginBottom: 'var(--space-lg)' }}>
                {t('details.colors', lang)}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                {style.colorPalette.map((col, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                    <div style={{ 
                      width: '44px', 
                      height: '44px', 
                      borderRadius: '50%', 
                      background: col.hex,
                      border: '1px solid var(--color-border)',
                      boxShadow: 'var(--shadow-sm)'
                    }} />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>
                        {lang === 'ar' ? col.name_ar : col.name}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-tertiary)' }}>{col.hex}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Accessories Do's and Don'ts */}
            <motion.div className="card" variants={itemVariants}>
              <h3 style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-sm)', marginBottom: 'var(--space-lg)' }}>
                {t('details.accessories', lang)}
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
                {/* Do's */}
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-success)', fontWeight: 600, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
                    <CheckCircle2 size={16} /> {t('details.dos', lang)}
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px', paddingLeft: lang === 'ar' ? 0 : '12px', paddingRight: lang === 'ar' ? '12px' : 0 }}>
                    {dos.map((item, idx) => (
                      <li key={idx} style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', position: 'relative' }}>
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Don'ts */}
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-error)', fontWeight: 600, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
                    <AlertTriangle size={16} /> {t('details.donts', lang)}
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px', paddingLeft: lang === 'ar' ? 0 : '12px', paddingRight: lang === 'ar' ? '12px' : 0 }}>
                    {donts.map((item, idx) => (
                      <li key={idx} style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', position: 'relative' }}>
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Pros and Cons */}
            <motion.div className="card" variants={itemVariants}>
              <h3 style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-sm)', marginBottom: 'var(--space-lg)' }}>
                {t('details.prosCons', lang)}
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-success)', marginBottom: '4px' }}>
                    {t('details.pros', lang)}
                  </div>
                  <ul style={{ listStyle: 'none', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                    {pros.map((p, idx) => <li key={idx}>+ {p}</li>)}
                  </ul>
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-accent)', marginBottom: '4px' }}>
                    {t('details.cons', lang)}
                  </div>
                  <ul style={{ listStyle: 'none', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                    {cons.map((c, idx) => <li key={idx}>- {c}</li>)}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Ideal For & Compatible */}
            <motion.div className="card" variants={itemVariants}>
              <h3 style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-sm)', marginBottom: 'var(--space-md)' }}>
                {t('details.idealFor', lang)}
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-lg)' }}>
                {idealFor}
              </p>

              {style.compatibleStyles && style.compatibleStyles.length > 0 && (
                <>
                  <h3 style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-sm)', marginBottom: 'var(--space-md)' }}>
                    {t('details.compatibleStyles', lang)}
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {style.compatibleStyles.map((comp, idx) => {
                      const compStyle = stylesData.find(s => s.name === comp || s.slug === comp.toLowerCase().replace(/\s+/g, '-'));
                      const compSlug = compStyle ? compStyle.slug : comp.toLowerCase().replace(/\s+/g, '-');
                      const compName = compStyle ? (lang === 'ar' ? compStyle.name_ar : compStyle.name) : comp;
                      
                      return (
                        <Link 
                          key={idx} 
                          to={`/styles/${compSlug}`}
                          style={{ 
                            fontSize: '0.8rem', 
                            background: 'var(--color-surface-hover)', 
                            border: '1px solid var(--color-border)',
                            color: 'var(--color-primary)', 
                            padding: '4px 12px', 
                            borderRadius: 'var(--radius-sm)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <Link2 size={12} />
                          {compName}
                        </Link>
                      );
                    })}
                  </div>
                </>
              )}
            </motion.div>

          </div>

        </div>
      </div>
    </motion.div>
  );
}
