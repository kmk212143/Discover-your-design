import { store } from './state.js';
import { renderNavbar } from './components/Navbar.js';
import { renderFooter } from './components/Footer.js';

// Import Pages
import { LandingPage } from './pages/LandingPage.js';
import { QuizPage } from './pages/QuizPage.js';
import { StylesPage } from './pages/StylesPage.js';
import { AuthPages } from './pages/AuthPages.js';
import { DashboardPage } from './pages/DashboardPage.js';
import { ResultPage } from './pages/ResultPage.js';
import { LoadingPage } from './pages/LoadingPage.js';
import { ProfilePage } from './pages/ProfilePage.js';
import { ContactPage } from './pages/ContactPage.js';

export class Router {
  constructor() {
    this.routes = {
      '/': LandingPage,
      '/login': () => AuthPages('login'),
      '/signup': () => AuthPages('signup'),
      '/dashboard': DashboardPage,
      '/quiz': QuizPage,
      '/loading': LoadingPage,
      '/result': ResultPage,
      '/styles': StylesPage,
      '/profile': ProfilePage,
      '/contact': ContactPage,
    };
    
    window.addEventListener('hashchange', () => this.handleRoute());
    
    // Listen for state changes to re-render navbar/footer if language changes
    store.subscribe((state) => {
      // Re-render layout on lang change
      if (this.currentLang !== state.lang) {
        this.currentLang = state.lang;
        this.renderLayout();
        this.handleRoute(true); // force re-render current page
      }
      
      // Update DOM for theme and RTL/LTR
      document.documentElement.setAttribute('data-theme', state.theme);
      document.documentElement.setAttribute('lang', state.lang);
      document.documentElement.setAttribute('dir', state.lang === 'ar' ? 'rtl' : 'ltr');
    });

    this.currentLang = store.state.lang;
  }

  init() {
    this.renderLayout();
    this.handleRoute();
  }

  renderLayout() {
    const navContainer = document.getElementById('navbar-container');
    const footerContainer = document.getElementById('footer-container');
    
    navContainer.innerHTML = renderNavbar();
    footerContainer.innerHTML = renderFooter();
    
    this.attachLayoutEvents();
  }

  attachLayoutEvents() {
    // Theme toggle
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const newTheme = store.state.theme === 'light' ? 'dark' : 'light';
        store.setState({ theme: newTheme });
      });
    }

    // Lang toggle
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
      langBtn.addEventListener('click', () => {
        const newLang = store.state.lang === 'en' ? 'ar' : 'en';
        store.setState({ lang: newLang });
      });
    }
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
      }
    });
  }

  async handleRoute(force = false) {
    const hash = window.location.hash || '#/';
    const path = hash.slice(1);
    
    const appContainer = document.getElementById('app-container');
    
    // Fade out
    appContainer.classList.remove('active');
    
    // Small delay for transition
    await new Promise(r => setTimeout(r, 300));
    
    // Find matching route or fallback to landing
    const pageBuilder = this.routes[path] || this.routes['/'];
    
    // Render the page
    appContainer.innerHTML = pageBuilder();
    
    // Scroll to top
    if (!force) window.scrollTo(0, 0);
    
    // Fade in
    appContainer.classList.add('active');
    
    // Run any page-specific JS initialization
    this.initPageLogic(path);
  }
  
  initPageLogic(path) {
    // This function will dispatch custom events that pages can listen to 
    // for setting up event listeners after DOM is rendered
    document.dispatchEvent(new CustomEvent('page-rendered', { detail: { path } }));
  }
}

export const router = new Router();
