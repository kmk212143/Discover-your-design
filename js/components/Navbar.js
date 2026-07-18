import { store } from '../state.js';
import { t } from '../i18n.js';

export function renderNavbar() {
  const isDark = store.state.theme === 'dark';
  const isAr = store.state.lang === 'ar';
  const isLoggedIn = !!store.state.user;

  return `
    <nav class="navbar glass">
      <div class="container nav-container">
        <a href="#/" class="nav-logo">
          <i class="ph ph-house-line"></i>
          Discover Design
        </a>
        
        <div class="nav-links">
          <a href="#/" class="nav-link">${t('nav.home')}</a>
          <a href="#/styles" class="nav-link">${t('nav.styles')}</a>
          <a href="#/quiz" class="nav-link">${t('nav.quiz')}</a>
          ${isLoggedIn ? `<a href="#/dashboard" class="nav-link">${t('nav.dashboard')}</a>` : ''}
        </div>
        
        <div class="nav-actions">
          <button id="theme-toggle" class="icon-btn" aria-label="Toggle Theme">
            ${isDark ? '<i class="ph ph-sun"></i>' : '<i class="ph ph-moon"></i>'}
          </button>
          
          <button id="lang-toggle" class="icon-btn" aria-label="Toggle Language" style="font-weight: 600; font-size: 0.9rem;">
            ${isAr ? 'EN' : 'AR'}
          </button>
          
          ${!isLoggedIn ? 
            `<a href="#/login" class="btn btn-secondary">${t('nav.login')}</a>` : 
            `<a href="#/profile" class="icon-btn"><i class="ph ph-user"></i></a>`
          }
        </div>
      </div>
    </nav>
  `;
}
