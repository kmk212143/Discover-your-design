import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { stylesData } from '../data/stylesData';
import { t } from '../data/translations';
import { Search, SlidersHorizontal, Home, Compass } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  exit: { opacity: 0 }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function DesignStylesPage() {
  const lang = useStore(state => state.lang);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpace, setSelectedSpace] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Spaces list
  const spaces = [
    { id: 'all', label: t('styles.allSpaces', lang) },
    { id: 'livingRoom', label: t('spaces.livingRoom', lang) },
    { id: 'bedroom', label: t('spaces.bedroom', lang) },
    { id: 'bathroom', label: t('spaces.bathroom', lang) },
    { id: 'kitchen', label: t('spaces.kitchen', lang) },
    { id: 'office', label: t('spaces.office', lang) }
  ];

  // Categories list
  const categories = [
    { id: 'all', label_en: 'All Categories', label_ar: 'جميع الفئات' },
    { id: 'Modern', label_en: 'Modern / Contemporary', label_ar: 'حديث / معاصر' },
    { id: 'Minimalist', label_en: 'Minimalist', label_ar: 'بسيط' },
    { id: 'Natural', label_en: 'Natural / Cozy', label_ar: 'طبيعي / دافئ' },
    { id: 'Luxury', label_en: 'Luxury / Classic', label_ar: 'فاخر / كلاسيكي' },
    { id: 'Industrial', label_en: 'Industrial', label_ar: 'صناعي' },
    { id: 'Traditional', label_en: 'Traditional', label_ar: 'تقليدي' }
  ];

  // Filter styles
  const filteredStyles = useMemo(() => {
    return stylesData.filter(style => {
      const name = lang === 'ar' ? style.name_ar : style.name;
      const desc = lang === 'ar' ? style.shortDescription_ar : style.shortDescription;
      
      const matchesSearch = 
        name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        style.slug.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = 
        selectedCategory === 'all' || 
        style.category === selectedCategory;

      // In stylesData, spaceApplications is a map of spaces. All styles have all spaces defined,
      // so this filter is always matched, but we can structure it if we want to show/hide specific ones.
      // For now, selecting a space will customize what recommendations are highlighted on details page.
      const matchesSpace = selectedSpace === 'all' || style.spaceApplications[selectedSpace];

      return matchesSearch && matchesCategory && matchesSpace;
    });
  }, [searchQuery, selectedCategory, selectedSpace, lang]);

  return (
    <motion.div 
      className="container" 
      style={{ padding: 'var(--space-4xl) var(--space-lg)' }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Intro Header */}
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-3xl)' }}>
        <h1 style={{ fontSize: '3rem', color: 'var(--color-primary)', marginBottom: 'var(--space-md)' }}>
          {t('styles.title', lang)}
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.15rem', maxWidth: '700px', margin: '0 auto' }}>
          {t('styles.subtitle', lang)}
        </p>
      </div>

      {/* Filters & Search Control Bar */}
      <div className="card" style={{ padding: 'var(--space-lg)', marginBottom: 'var(--space-2xl)', borderRadius: 'var(--radius-lg)' }}>
        <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap', alignItems: 'center' }}>
          
          {/* Search Input */}
          <div style={{ flex: '1 1 300px', position: 'relative' }}>
            <input 
              type="text" 
              className="form-control" 
              placeholder={t('styles.searchPlaceholder', lang)}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ 
                paddingLeft: lang === 'ar' ? '1rem' : '2.5rem', 
                paddingRight: lang === 'ar' ? '2.5rem' : '1rem',
                borderRadius: 'var(--radius-md)'
              }}
            />
            <Search 
              size={18} 
              style={{ 
                position: 'absolute', 
                [lang === 'ar' ? 'right' : 'left']: '1rem', 
                top: '50%', 
                transform: 'translateY(-50%)', 
                color: 'var(--color-text-tertiary)' 
              }} 
            />
          </div>

          {/* Category Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
            <SlidersHorizontal size={16} color="var(--color-text-tertiary)" />
            <select 
              className="form-control" 
              value={selectedCategory} 
              onChange={e => setSelectedCategory(e.target.value)}
              style={{ padding: '0.5rem 2rem 0.5rem 1rem', width: 'auto', minWidth: '180px' }}
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {lang === 'ar' ? cat.label_ar : cat.label_en}
                </option>
              ))}
            </select>
          </div>

          {/* Space Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
            <Home size={16} color="var(--color-text-tertiary)" />
            <select 
              className="form-control" 
              value={selectedSpace} 
              onChange={e => setSelectedSpace(e.target.value)}
              style={{ padding: '0.5rem 2rem 0.5rem 1rem', width: 'auto', minWidth: '180px' }}
            >
              {spaces.map(sp => (
                <option key={sp.id} value={sp.id}>
                  {sp.label}
                </option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* Grid of Styles */}
      <AnimatePresence>
        {filteredStyles.length > 0 ? (
          <div className="grid-3">
            {filteredStyles.map(style => {
              const name = lang === 'ar' ? style.name_ar : style.name;
              const desc = lang === 'ar' ? style.shortDescription_ar : style.shortDescription;
              const characteristics = lang === 'ar' ? style.characteristics_ar : style.characteristics;

              return (
                <motion.div 
                  key={style.id}
                  variants={itemVariants}
                  layout
                  className="card"
                  style={{ 
                    padding: 0, 
                    overflow: 'hidden', 
                    borderRadius: 'var(--radius-lg)', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    height: '100%' 
                  }}
                >
                  <div style={{ overflow: 'hidden', height: '220px', position: 'relative' }}>
                    <img 
                      src={style.image} 
                      alt={name} 
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover', 
                        display: 'block',
                        transition: 'transform 0.4s ease'
                      }}
                      className="style-card-image"
                    />
                    <div style={{ 
                      position: 'absolute', 
                      top: '12px', 
                      [lang === 'ar' ? 'left' : 'right']: '12px', 
                      background: 'var(--color-primary)', 
                      color: 'white', 
                      padding: '4px 12px', 
                      borderRadius: 'var(--radius-full)', 
                      fontSize: '0.75rem', 
                      fontWeight: 600 
                    }}>
                      {lang === 'ar' ? style.category_ar : style.category}
                    </div>
                  </div>

                  <div style={{ padding: 'var(--space-xl)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: 'var(--space-xs)' }}>{name}</h3>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.925rem', marginBottom: 'var(--space-md)', flex: 1 }}>
                      {desc}
                    </p>

                    {/* Characteristics Tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: 'var(--space-lg)' }}>
                      {characteristics.slice(0, 2).map((char, index) => (
                        <span key={index} style={{ 
                          fontSize: '0.75rem', 
                          background: 'var(--color-surface-hover)', 
                          color: 'var(--color-text-secondary)', 
                          padding: '2px 8px', 
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--color-border)'
                        }}>
                          {char}
                        </span>
                      ))}
                    </div>

                    <Link 
                      to={`/styles/${style.slug}${selectedSpace !== 'all' ? `?space=${selectedSpace}` : ''}`} 
                      className="btn btn-secondary" 
                      style={{ width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                    >
                      <Compass size={16} />
                      {t('styles.exploreBtn', lang)}
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <motion.div 
            variants={itemVariants}
            style={{ textAlign: 'center', padding: 'var(--space-4xl) 0', color: 'var(--color-text-secondary)' }}
          >
            <h3>{t('styles.noResults', lang)}</h3>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
