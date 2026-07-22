import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { quizData } from '../data/quizData';
import { useStore } from '../store/useStore';
import { ArrowLeft } from 'lucide-react';
import { t } from '../data/translations';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function QuizPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const saveQuizResult = useStore(state => state.saveQuizResult);
  const lang = useStore(state => state.lang);
  const navigate = useNavigate();

  const q = quizData[currentStep];
  const progress = (currentStep / quizData.length) * 100;

  const handleOptionClick = (styles) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = styles;
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentStep < quizData.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        finishQuiz(newAnswers);
      }
    }, 400);
  };

  const finishQuiz = (finalAnswers) => {
    const scoreMap = {};
    finalAnswers.forEach(stylesArray => {
      stylesArray.forEach(style => {
        scoreMap[style] = (scoreMap[style] || 0) + 1;
      });
    });

    let maxScore = 0;
    let dominantStyle = "Scandinavian";
    
    for (const [style, score] of Object.entries(scoreMap)) {
      if (score > maxScore) {
        maxScore = score;
        dominantStyle = style;
      }
    }
    
    saveQuizResult(dominantStyle);
    navigate('/result');
  };

  return (
    <div className="container" style={{ padding: 'var(--space-4xl) 0', minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentStep}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
              <div style={{ color: 'var(--color-text-tertiary)', fontWeight: 500, marginBottom: 'var(--space-sm)' }}>
                {t('quiz.questionOf', lang)
                  .replace('{current}', currentStep + 1)
                  .replace('{total}', quizData.length)}
              </div>
              <div style={{ width: '100%', height: '6px', background: 'var(--color-border)', borderRadius: 'var(--radius-full)', overflow: 'hidden', marginBottom: 'var(--space-2xl)' }}>
                <motion.div 
                  initial={{ width: `${((currentStep - 1) / quizData.length) * 100}%` }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  style={{ height: '100%', background: 'var(--color-primary)' }}
                />
              </div>
              <h2 style={{ fontSize: '2rem' }}>
                {lang === 'ar' && q.title_ar ? q.title_ar : q.title}
              </h2>
            </div>

            <div className={q.type === 'image' || q.type === 'color' ? 'grid-2' : ''} style={{ display: q.type === 'text' ? 'flex' : 'grid', flexDirection: 'column', gap: 'var(--space-md)' }}>
              {q.options.map((opt) => (
                <motion.div 
                  key={opt.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="card"
                  onClick={() => handleOptionClick(opt.styles)}
                  style={{ 
                    cursor: 'pointer', 
                    padding: q.type === 'text' ? 'var(--space-lg)' : 0, 
                    overflow: 'hidden', 
                    textAlign: 'center',
                    border: '2px solid transparent'
                  }}
                >
                  {q.type !== 'text' && (
                    <img src={opt.image} alt={opt.label} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                  )}
                  <div style={{ padding: q.type === 'text' ? 0 : 'var(--space-md)', fontWeight: 500, fontSize: q.type === 'text' ? '1.125rem' : '1rem' }}>
                    {lang === 'ar' && opt.label_ar ? opt.label_ar : opt.label}
                  </div>
                </motion.div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--space-2xl)' }}>
              {currentStep > 0 ? (
                <button onClick={() => setCurrentStep(s => s - 1)} className="btn btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ArrowLeft size={18} style={{ transform: lang === 'ar' ? 'rotate(180deg)' : 'none' }} /> {t('quiz.previous', lang)}
                </button>
              ) : <div />}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
