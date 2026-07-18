import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { useStore } from './store/useStore';

import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import AuthPages from './pages/AuthPages';
import DashboardPage from './pages/DashboardPage';
import QuizPage from './pages/QuizPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  const location = useLocation();
  const { theme, lang } = useStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  }, [theme, lang]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<AuthPages type="login" />} />
            <Route path="/signup" element={<AuthPages type="signup" />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
