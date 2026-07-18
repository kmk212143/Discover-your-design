// --- js/state.js ---
// Global State Management
class Store {
  constructor() {
    this.state = {
      theme: localStorage.getItem('theme') || 'light',
      lang: localStorage.getItem('lang') || 'en',
      user: JSON.parse(localStorage.getItem('user')) || null,
      quizProgress: JSON.parse(localStorage.getItem('quizProgress')) || {
        currentStep: 0,
        answers: []
      },
      savedResults: JSON.parse(localStorage.getItem('savedResults')) || [],
      users_db: JSON.parse(localStorage.getItem('users_db')) || []
    };
    this.listeners = [];
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.persist();
    this.notify();
  }

  persist() {
    localStorage.setItem('theme', this.state.theme);
    localStorage.setItem('lang', this.state.lang);
    if (this.state.user) {
      localStorage.setItem('user', JSON.stringify(this.state.user));
    } else {
      localStorage.removeItem('user');
    }
    localStorage.setItem('quizProgress', JSON.stringify(this.state.quizProgress));
    localStorage.setItem('savedResults', JSON.stringify(this.state.savedResults));
    localStorage.setItem('users_db', JSON.stringify(this.state.users_db));
  }

  notify() {
    this.listeners.forEach(listener => listener(this.state));
  }

  // --- Auth Simulation ---
  signUp(name, email, password) {
    const exists = this.state.users_db.find(u => u.email === email);
    if (exists) {
      throw new Error("Email is already registered.");
    }
    const newUser = {
      id: 'usr_' + Date.now(),
      name,
      email,
      password, // In a real app this would be hashed
      createdAt: new Date().toISOString(),
      quizHistory: []
    };
    this.setState({ users_db: [...this.state.users_db, newUser] });
    return newUser;
  }

  login(email, password) {
    const user = this.state.users_db.find(u => u.email === email && u.password === password);
    if (!user) {
      throw new Error("Invalid email or password.");
    }
    // Omit password for session
    const { password: _, ...sessionUser } = user;
    this.setState({ user: sessionUser });
    return sessionUser;
  }

  logout() {
    this.setState({ user: null });
  }
}

const store = new Store();

// Initialize theme and language on load
document.documentElement.setAttribute('data-theme', store.state.theme);
document.documentElement.setAttribute('lang', store.state.lang);
document.documentElement.setAttribute('dir', store.state.lang === 'ar' ? 'rtl' : 'ltr');



// --- js/i18n.js ---

const dictionary = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      styles: "Design Styles",
      quiz: "Quiz",
      contact: "Contact",
      login: "Login",
      signup: "Sign Up",
      dashboard: "Dashboard"
    },
    hero: {
      title: "Discover Your Perfect Interior Design Style",
      subtitle: "Take a quick quiz and discover the interior design style that perfectly matches your personality, lifestyle, and taste.",
      startQuiz: "Start Quiz",
      exploreStyles: "Explore Styles"
    },
    whyChooseUs: {
      title: "Why Choose Us",
      personalized: "Personalized Results",
      personalizedDesc: "Get a style curated uniquely for your taste and personality.",
      easy: "Easy Interactive Quiz",
      easyDesc: "Answer visually engaging questions to find your match.",
      inspiration: "Design Inspiration",
      inspirationDesc: "Browse beautiful galleries tailored to your style.",
      expert: "Expert Recommendations",
      expertDesc: "Receive furniture and color palettes from professionals."
    },
    footer: {
      about: "About",
      quickLinks: "Quick Links",
      contact: "Contact",
      rights: "© 2026 Discover Your Perfect Design. All rights reserved."
    }
  },
  ar: {
    nav: {
      home: "الرئيسية",
      about: "عن الموقع",
      styles: "أنماط التصميم",
      quiz: "الاختبار",
      contact: "اتصل بنا",
      login: "تسجيل الدخول",
      signup: "إنشاء حساب",
      dashboard: "لوحة التحكم"
    },
    hero: {
      title: "اكتشف نمط التصميم الداخلي المثالي لك",
      subtitle: "قم بإجراء اختبار سريع واكتشف نمط التصميم الداخلي الذي يتناسب تمامًا مع شخصيتك وأسلوب حياتك وذوقك.",
      startQuiz: "ابدأ الاختبار",
      exploreStyles: "استكشف الأنماط"
    },
    whyChooseUs: {
      title: "لماذا تختارنا",
      personalized: "نتائج مخصصة",
      personalizedDesc: "احصل على نمط مصمم خصيصًا لذوقك وشخصيتك.",
      easy: "اختبار تفاعلي سهل",
      easyDesc: "أجب عن أسئلة جذابة بصريًا للعثور على تطابقك.",
      inspiration: "إلهام التصميم",
      inspirationDesc: "تصفح معارض جميلة مصممة خصيصًا لنمطك.",
      expert: "توصيات الخبراء",
      expertDesc: "احصل على توصيات للأثاث ولوحات الألوان من المحترفين."
    },
    footer: {
      about: "عن الموقع",
      quickLinks: "روابط سريعة",
      contact: "اتصل بنا",
      rights: "© 2026 اكتشف تصميمك المثالي. جميع الحقوق محفوظة."
    }
  }
};

function t(keyPath) {
  const keys = keyPath.split('.');
  let value = dictionary[store.state.lang];
  for (const key of keys) {
    if (value[key] === undefined) return keyPath;
    value = value[key];
  }
  return value;
}



// --- js/components/Navbar.js ---

function renderNavbar() {
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



// --- js/components/Footer.js ---

function renderFooter() {
  return `
    <footer style="background: var(--color-surface); padding: var(--space-4xl) 0 var(--space-xl) 0; border-top: 1px solid var(--color-border); margin-top: auto;">
      <div class="container">
        <div class="grid-4" style="margin-bottom: var(--space-3xl);">
          <div>
            <h3 style="display: flex; align-items: center; gap: var(--space-sm);">
              <i class="ph ph-house-line"></i> Discover Design
            </h3>
            <p style="font-size: 0.9rem;">${t('hero.subtitle')}</p>
          </div>
          <div>
            <h4>${t('footer.quickLinks')}</h4>
            <ul style="display: flex; flex-direction: column; gap: var(--space-sm);">
              <li><a href="#/">${t('nav.home')}</a></li>
              <li><a href="#/styles">${t('nav.styles')}</a></li>
              <li><a href="#/quiz">${t('nav.quiz')}</a></li>
            </ul>
          </div>
          <div>
            <h4>${t('footer.about')}</h4>
            <ul style="display: flex; flex-direction: column; gap: var(--space-sm);">
              <li><a href="#/about">Our Story</a></li>
              <li><a href="#/contact">${t('nav.contact')}</a></li>
            </ul>
          </div>
          <div>
            <h4>Connect</h4>
            <div style="display: flex; gap: var(--space-md); margin-top: var(--space-md);">
              <a href="#" class="icon-btn"><i class="ph ph-instagram-logo"></i></a>
              <a href="#" class="icon-btn"><i class="ph ph-pinterest-logo"></i></a>
              <a href="#" class="icon-btn"><i class="ph ph-twitter-logo"></i></a>
            </div>
          </div>
        </div>
        <div style="text-align: center; padding-top: var(--space-xl); border-top: 1px solid var(--color-border); color: var(--color-text-tertiary); font-size: 0.875rem;">
          ${t('footer.rights')}
        </div>
      </div>
    </footer>
  `;
}



// --- js/pages/LandingPage.js ---

function LandingPage() {
  return `
    <div class="landing-page">
      <!-- Hero Section -->
      <section class="hero fade-in" style="min-height: 90vh; display: flex; align-items: center; position: relative; overflow: hidden; padding: var(--space-4xl) 0;">
        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: -1;">
          <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2000" alt="Luxury Interior" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.15;" />
          <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, transparent, var(--color-bg));"></div>
        </div>
        
        <div class="container" style="text-align: center; max-width: 900px;">
          <h1 class="slide-up stagger-1" style="font-size: clamp(3rem, 6vw, 5rem); margin-bottom: var(--space-lg); line-height: 1.1;">
            ${t('hero.title')}
          </h1>
          <p class="slide-up stagger-2" style="font-size: 1.25rem; margin-bottom: var(--space-2xl); color: var(--color-text-secondary); max-width: 700px; margin-inline: auto;">
            ${t('hero.subtitle')}
          </p>
          <div class="slide-up stagger-3" style="display: flex; gap: var(--space-md); justify-content: center; flex-wrap: wrap;">
            <a href="#/quiz" class="btn btn-primary" style="font-size: 1.125rem; padding: 1rem 2rem;">
              ${t('hero.startQuiz')} <i class="ph ph-arrow-right"></i>
            </a>
            <a href="#/styles" class="btn btn-secondary" style="font-size: 1.125rem; padding: 1rem 2rem;">
              ${t('hero.exploreStyles')}
            </a>
          </div>
        </div>
      </section>

      <!-- Why Choose Us -->
      <section class="fade-in" style="padding: var(--space-4xl) 0; background: var(--color-surface);">
        <div class="container">
          <h2 style="text-align: center; margin-bottom: var(--space-3xl); font-size: 2.5rem;">${t('whyChooseUs.title')}</h2>
          
          <div class="grid-4">
            <div class="card" style="text-align: center;">
              <div style="font-size: 3rem; color: var(--color-accent); margin-bottom: var(--space-md);">
                <i class="ph ph-magic-wand"></i>
              </div>
              <h3 style="font-size: 1.25rem;">${t('whyChooseUs.personalized')}</h3>
              <p style="font-size: 0.95rem;">${t('whyChooseUs.personalizedDesc')}</p>
            </div>
            <div class="card" style="text-align: center;">
              <div style="font-size: 3rem; color: var(--color-accent); margin-bottom: var(--space-md);">
                <i class="ph ph-check-circle"></i>
              </div>
              <h3 style="font-size: 1.25rem;">${t('whyChooseUs.easy')}</h3>
              <p style="font-size: 0.95rem;">${t('whyChooseUs.easyDesc')}</p>
            </div>
            <div class="card" style="text-align: center;">
              <div style="font-size: 3rem; color: var(--color-accent); margin-bottom: var(--space-md);">
                <i class="ph ph-lightbulb"></i>
              </div>
              <h3 style="font-size: 1.25rem;">${t('whyChooseUs.inspiration')}</h3>
              <p style="font-size: 0.95rem;">${t('whyChooseUs.inspirationDesc')}</p>
            </div>
            <div class="card" style="text-align: center;">
              <div style="font-size: 3rem; color: var(--color-accent); margin-bottom: var(--space-md);">
                <i class="ph ph-star"></i>
              </div>
              <h3 style="font-size: 1.25rem;">${t('whyChooseUs.expert')}</h3>
              <p style="font-size: 0.95rem;">${t('whyChooseUs.expertDesc')}</p>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Popular Styles Preview -->
      <section class="fade-in" style="padding: var(--space-4xl) 0;">
        <div class="container">
          <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: var(--space-2xl);">
            <div>
              <h2 style="margin-bottom: var(--space-xs);">Popular Design Styles</h2>
              <p style="margin: 0;">Explore some of the most loved interior aesthetics.</p>
            </div>
            <a href="#/styles" class="btn btn-text">View All <i class="ph ph-arrow-right"></i></a>
          </div>
          
          <div class="grid-3">
            <div class="card" style="padding: 0; overflow: hidden; border-radius: var(--radius-lg);">
              <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800" alt="Modern" style="height: 250px; width: 100%; object-fit: cover; transition: transform 0.5s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
              <div style="padding: var(--space-xl);">
                <h3>Modern Minimalist</h3>
                <p>Clean lines, neutral colors, and functional beauty.</p>
              </div>
            </div>
            <div class="card" style="padding: 0; overflow: hidden; border-radius: var(--radius-lg);">
              <img src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=800" alt="Scandinavian" style="height: 250px; width: 100%; object-fit: cover; transition: transform 0.5s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
              <div style="padding: var(--space-xl);">
                <h3>Scandinavian</h3>
                <p>Cozy warmth, light woods, and simple elegance.</p>
              </div>
            </div>
            <div class="card" style="padding: 0; overflow: hidden; border-radius: var(--radius-lg);">
              <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800" alt="Japandi" style="height: 250px; width: 100%; object-fit: cover; transition: transform 0.5s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
              <div style="padding: var(--space-xl);">
                <h3>Japandi</h3>
                <p>Japanese minimalism meets Scandinavian functionality.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}



// --- js/pages/QuizPage.js ---

const quizData = [
  {
    id: 1, title: "Choose your favorite colors.", type: "color",
    options: [
      { id: "c1", image: "https://images.unsplash.com/photo-1507643179773-3e975d7ac515?q=80&w=400", label: "Neutral & Earthy", styles: ["Minimalist", "Japandi", "Scandinavian"] },
      { id: "c2", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=400", label: "Dark & Moody", styles: ["Industrial", "Luxury", "Contemporary"] },
      { id: "c3", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=400", label: "Bright & Warm", styles: ["Bohemian", "Eclectic", "Mediterranean"] },
      { id: "c4", image: "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?q=80&w=400", label: "Classic Whites", styles: ["Coastal", "Farmhouse", "Traditional"] }
    ]
  },
  {
    id: 2, title: "Choose your dream living room.", type: "image",
    options: [
      { id: "r1", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800", label: "Luxury", styles: ["Luxury", "Modern", "Classic"] },
      { id: "r2", image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=800", label: "Cozy", styles: ["Scandinavian", "Farmhouse", "Japandi"] },
      { id: "r3", image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=800", label: "Raw", styles: ["Industrial", "Mid-Century Modern"] },
      { id: "r4", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800", label: "Eclectic", styles: ["Bohemian", "Eclectic"] }
    ]
  },
  {
    id: 3, title: "Favorite furniture style?", type: "text",
    options: [
      { id: "f1", label: "Clean, geometric lines", styles: ["Modern", "Minimalist", "Contemporary"] },
      { id: "f2", label: "Curved, vintage silhouettes", styles: ["Mid-Century Modern", "Classic"] },
      { id: "f3", label: "Plush, velvet, oversized", styles: ["Luxury", "Traditional"] },
      { id: "f4", label: "Woven, rattan, and relaxed", styles: ["Bohemian", "Coastal"] }
    ]
  },
  {
    id: 4, title: "Favorite lighting?", type: "text",
    options: [
      { id: "l1", label: "Maximum natural light", styles: ["Scandinavian", "Coastal"] },
      { id: "l2", label: "Warm, ambient lamps", styles: ["Bohemian", "Farmhouse"] },
      { id: "l3", label: "Sleek LED strips & recessed", styles: ["Modern", "Minimalist"] },
      { id: "l4", label: "Statement chandeliers", styles: ["Luxury", "Classic", "Traditional"] }
    ]
  },
  {
    id: 5, title: "Which words describe your ideal home?", type: "text",
    options: [
      { id: "w1", label: "Calm, airy, organized", styles: ["Minimalist", "Japandi"] },
      { id: "w2", label: "Creative, vibrant, free", styles: ["Bohemian", "Eclectic"] },
      { id: "w3", label: "Elegant, refined, timeless", styles: ["Classic", "Luxury", "Traditional"] },
      { id: "w4", label: "Functional, simple, warm", styles: ["Scandinavian", "Farmhouse"] }
    ]
  },
  {
    id: 6, title: "Favorite flooring?", type: "text",
    options: [
      { id: "fl1", label: "Light oak wood planks", styles: ["Scandinavian", "Japandi", "Coastal"] },
      { id: "fl2", label: "Polished marble or stone", styles: ["Luxury", "Modern", "Mediterranean"] },
      { id: "fl3", label: "Raw concrete", styles: ["Industrial", "Minimalist"] },
      { id: "fl4", label: "Patterned tiles or rich rugs", styles: ["Bohemian", "Eclectic", "Classic"] }
    ]
  },
  {
    id: 7, title: "How much decoration do you like?", type: "text",
    options: [
      { id: "d1", label: "Minimal (Less is strictly more)", styles: ["Minimalist", "Modern"] },
      { id: "d2", label: "Moderate (Carefully curated pieces)", styles: ["Japandi", "Contemporary", "Mid-Century Modern"] },
      { id: "d3", label: "Rich (Books, art, plants everywhere)", styles: ["Bohemian", "Eclectic", "Traditional"] }
    ]
  },
  {
    id: 8, title: "Favorite materials?", type: "text",
    options: [
      { id: "m1", label: "Natural light wood & linen", styles: ["Scandinavian", "Japandi", "Coastal"] },
      { id: "m2", label: "Glass, chrome, & leather", styles: ["Modern", "Contemporary"] },
      { id: "m3", label: "Exposed brick & black metal", styles: ["Industrial"] },
      { id: "m4", label: "Rich mahogany & marble", styles: ["Classic", "Traditional", "Luxury"] }
    ]
  },
  {
    id: 9, title: "Preferred room atmosphere?", type: "text",
    options: [
      { id: "a1", label: "Cozy & Inviting", styles: ["Scandinavian", "Farmhouse"] },
      { id: "a2", label: "Bright & Breezy", styles: ["Coastal", "Mediterranean"] },
      { id: "a3", label: "Moody & Sophisticated", styles: ["Industrial", "Luxury"] },
      { id: "a4", label: "Artistic & Vibrant", styles: ["Bohemian", "Eclectic"] }
    ]
  },
  {
    id: 10, title: "Choose your favorite bedroom.", type: "image",
    options: [
      { id: "b1", image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=800", label: "Minimalist", styles: ["Minimalist", "Japandi"] },
      { id: "b2", image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=800", label: "Boho", styles: ["Bohemian", "Eclectic"] },
      { id: "b3", image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=800", label: "Classic", styles: ["Classic", "Traditional"] },
      { id: "b4", image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=800", label: "Modern", styles: ["Modern", "Contemporary"] }
    ]
  },
  {
    id: 11, title: "How do you feel about indoor plants?", type: "text",
    options: [
      { id: "p1", label: "I want an indoor jungle!", styles: ["Bohemian", "Eclectic"] },
      { id: "p2", label: "A few manicured statement plants.", styles: ["Modern", "Mid-Century Modern", "Japandi"] },
      { id: "p3", label: "Fresh flowers in vases.", styles: ["Classic", "Traditional", "Farmhouse"] },
      { id: "p4", label: "No plants, keep it clean.", styles: ["Minimalist", "Industrial"] }
    ]
  },
  {
    id: 12, title: "What is your approach to organization?", type: "text",
    options: [
      { id: "o1", label: "Everything hidden away seamlessly.", styles: ["Minimalist", "Modern"] },
      { id: "o2", label: "Neat, but lived-in and accessible.", styles: ["Scandinavian", "Japandi", "Farmhouse"] },
      { id: "o3", label: "Displaying collections proudly.", styles: ["Eclectic", "Bohemian", "Traditional"] }
    ]
  },
  {
    id: 13, title: "Favorite window treatments?", type: "text",
    options: [
      { id: "wt1", label: "Heavy, luxurious drapes", styles: ["Classic", "Luxury", "Traditional"] },
      { id: "wt2", label: "Light, sheer linen curtains", styles: ["Scandinavian", "Coastal", "Bohemian"] },
      { id: "wt3", label: "Sleek roller blinds or nothing", styles: ["Modern", "Minimalist", "Industrial"] }
    ]
  },
  {
    id: 14, title: "How do you view patterns?", type: "text",
    options: [
      { id: "pt1", label: "I prefer solid colors and textures over patterns.", styles: ["Minimalist", "Modern", "Japandi"] },
      { id: "pt2", label: "Subtle stripes or geometric shapes.", styles: ["Mid-Century Modern", "Contemporary"] },
      { id: "pt3", label: "Floral, damask, or intricate vintage patterns.", styles: ["Traditional", "Classic", "Farmhouse"] },
      { id: "pt4", label: "Loud, colorful, and clashing patterns!", styles: ["Bohemian", "Eclectic"] }
    ]
  },
  {
    id: 15, title: "Your ultimate design goal?", type: "text",
    options: [
      { id: "g1", label: "To feel peaceful and zen.", styles: ["Japandi", "Minimalist", "Scandinavian"] },
      { id: "g2", label: "To impress guests with elegance.", styles: ["Luxury", "Classic", "Modern"] },
      { id: "g3", label: "To feel comfortable and nostalgic.", styles: ["Farmhouse", "Traditional", "Coastal"] },
      { id: "g4", label: "To express my unique creativity.", styles: ["Bohemian", "Eclectic", "Industrial"] }
    ]
  }
];

function QuizPage() {
  return `
    <div class="quiz-page container fade-in" style="padding: var(--space-4xl) 0; min-height: 80vh; display: flex; flex-direction: column; justify-content: center;">
      <div id="quiz-container" style="max-width: 800px; margin: 0 auto; width: 100%;">
        <!-- Dynamic content injected here -->
      </div>
    </div>
  `;
}

document.addEventListener('page-rendered', (e) => {
  if (e.detail.path === 'quiz') {
    let currentStep = 0;
    let answers = []; // Will store arrays of styles mapped from choices

    const container = document.getElementById('quiz-container');

    const renderStep = () => {
      const q = quizData[currentStep];
      const progress = ((currentStep) / quizData.length) * 100;
      
      let optionsHtml = '';
      if (q.type === 'image' || q.type === 'color') {
        optionsHtml = `
          <div class="grid-2 slide-up" style="gap: var(--space-md); margin-top: var(--space-2xl);">
            ${q.options.map((opt, i) => `
              <div class="quiz-option card stagger-${i%4+1}" data-styles='${JSON.stringify(opt.styles)}' style="padding: 0; cursor: pointer; overflow: hidden; border: 2px solid transparent; transition: all 0.2s;">
                <img src="${opt.image}" style="width:100%; height:200px; object-fit:cover;">
                <div style="padding: var(--space-md); text-align: center; font-weight: 500;">${opt.label}</div>
              </div>
            `).join('')}
          </div>
        `;
      } else {
        optionsHtml = `
          <div class="slide-up" style="display: flex; flex-direction: column; gap: var(--space-md); margin-top: var(--space-2xl);">
            ${q.options.map((opt, i) => `
              <div class="quiz-option card stagger-${i%4+1}" data-styles='${JSON.stringify(opt.styles)}' style="cursor: pointer; padding: var(--space-lg); text-align: center; font-weight: 500; font-size: 1.125rem; border: 2px solid transparent; transition: all 0.2s;">
                ${opt.label}
              </div>
            `).join('')}
          </div>
        `;
      }

      container.innerHTML = `
        <div style="text-align: center; margin-bottom: var(--space-xl);">
          <div style="color: var(--color-text-tertiary); font-weight: 500; margin-bottom: var(--space-sm);">Question ${currentStep + 1} of ${quizData.length}</div>
          <div style="width: 100%; height: 6px; background: var(--color-border); border-radius: var(--radius-full); overflow: hidden; margin-bottom: var(--space-2xl);">
            <div style="width: ${progress}%; height: 100%; background: var(--color-primary); transition: width 0.5s ease;"></div>
          </div>
          <h2 class="slide-up" style="font-size: 2rem;">${q.title}</h2>
        </div>
        ${optionsHtml}
        <div style="display: flex; justify-content: space-between; margin-top: var(--space-2xl);">
          ${currentStep > 0 ? `<button id="prev-btn" class="btn btn-secondary"><i class="ph ph-arrow-left"></i> Previous</button>` : '<div></div>'}
        </div>
      `;

      // Attach events
      document.querySelectorAll('.quiz-option').forEach(el => {
        el.addEventListener('click', () => {
          el.style.borderColor = 'var(--color-primary)';
          setTimeout(() => {
            const styles = JSON.parse(el.getAttribute('data-styles'));
            answers[currentStep] = styles;
            
            if (currentStep < quizData.length - 1) {
              currentStep++;
              renderStep();
            } else {
              finishQuiz(answers);
            }
          }, 400);
        });
      });

      const prevBtn = document.getElementById('prev-btn');
      if (prevBtn) {
        prevBtn.addEventListener('click', () => {
          currentStep--;
          renderStep();
        });
      }
    };

    renderStep();
  }
});

function finishQuiz(answers) {
  // Advanced Scoring Engine
  const scoreMap = {};
  
  answers.forEach(stylesArray => {
    stylesArray.forEach(style => {
      scoreMap[style] = (scoreMap[style] || 0) + 1;
    });
  });
  
  // Find style with highest score
  let maxScore = 0;
  let dominantStyle = "Scandinavian"; // fallback
  
  for (const [style, score] of Object.entries(scoreMap)) {
    if (score > maxScore) {
      maxScore = score;
      dominantStyle = style;
    }
  }
  
  // Save to global local storage
  localStorage.setItem('quizResult', dominantStyle);
  
  // If user is logged in, save to their profile in the mock DB
  if (store.state.user) {
    const users = JSON.parse(localStorage.getItem('users_db')) || [];
    const userIndex = users.findIndex(u => u.id === store.state.user.id);
    if (userIndex !== -1) {
      const historyItem = { style: dominantStyle, date: new Date().toISOString() };
      users[userIndex].quizHistory = users[userIndex].quizHistory || [];
      users[userIndex].quizHistory.push(historyItem);
      localStorage.setItem('users_db', JSON.stringify(users));
      // update current session
      store.state.user.quizHistory = users[userIndex].quizHistory;
      localStorage.setItem('user', JSON.stringify(store.state.user));
    }
  }
  
  // Route to loading
  window.location.hash = '#/loading';
}



// --- js/pages/LoadingPage.js ---
function LoadingPage() {
  return `
    <div class="loading-page fade-in" style="height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; background: var(--color-bg); position: fixed; top: 0; left: 0; width: 100%; z-index: 1000;">
      <div class="spinner" style="width: 60px; height: 60px; border-width: 4px; margin-bottom: var(--space-xl);"></div>
      <h2 style="font-size: 2rem; color: var(--color-primary); margin-bottom: var(--space-sm);">Finding Your Perfect Style...</h2>
      <p style="color: var(--color-text-secondary); max-width: 400px; text-align: center;">Analyzing your personality, lifestyle, and preferences.</p>
    </div>
  `;
}

document.addEventListener('page-rendered', (e) => {
  if (e.detail.path === 'loading') {
    // Simulate loading for 3-5 seconds
    setTimeout(() => {
      window.location.hash = '#/result';
    }, 3500);
  }
});



// --- js/pages/ResultPage.js ---
const styleDetails = {
  "Scandinavian": {
    name: "Scandinavian",
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=1200",
    desc: "A design movement characterized by simplicity, minimalism and functionality.",
    philosophy: "Less is more, but with warmth and texture.",
    colors: [
      { hex: "#FFFFFF", name: "Snow White" },
      { hex: "#E8E6E1", name: "Warm Grey" },
      { hex: "#C4B7A6", name: "Light Oak" },
      { hex: "#5C6B73", name: "Muted Blue" }
    ],
    materials: ["Light Wood", "Linen", "Wool", "Matte Ceramics"]
  },
  "Modern": {
    name: "Modern",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200",
    desc: "Clean, crisp lines, a simple colour palette and the use of materials that can include metal, glass and steel.",
    philosophy: "Form follows function.",
    colors: [
      { hex: "#1A1A1A", name: "Jet Black" },
      { hex: "#FFFFFF", name: "Pure White" },
      { hex: "#A9A9A9", name: "Steel Grey" },
      { hex: "#8C7A6B", name: "Taupe" }
    ],
    materials: ["Glass", "Steel", "Concrete", "Polished Wood"]
  },
  "Bohemian": {
    name: "Bohemian (Boho)",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200",
    desc: "A carefree, relaxed and highly expressive aesthetic that breaks design rules.",
    philosophy: "Decorate with what you love, collect over time.",
    colors: [
      { hex: "#E07A5F", name: "Terracotta" },
      { hex: "#81B29A", name: "Sage Green" },
      { hex: "#F2CC8F", name: "Mustard" },
      { hex: "#3D405B", name: "Deep Navy" }
    ],
    materials: ["Rattan", "Macrame", "Vintage Wood", "Patterned Textiles"]
  }
};

function ResultPage() {
  return `
    <div id="result-content" class="fade-in">
      <!-- Injected by JS -->
    </div>
  `;
}

document.addEventListener('page-rendered', (e) => {
  if (e.detail.path === 'result') {
    const resultKey = localStorage.getItem('quizResult') || 'Scandinavian';
    const data = styleDetails[resultKey] || styleDetails['Scandinavian'];
    
    const content = `
      <div style="position: relative; height: 60vh; overflow: hidden; display: flex; align-items: center; justify-content: center; text-align: center; color: white;">
        <img src="${data.image}" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: -2;">
        <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.5); z-index: -1;"></div>
        
        <div class="slide-up stagger-1" style="padding: 0 var(--space-xl);">
          <div style="text-transform: uppercase; letter-spacing: 2px; margin-bottom: var(--space-md); font-weight: 600;">Congratulations! Your Design Style Is</div>
          <h1 style="font-size: clamp(3rem, 6vw, 6rem); color: white; margin-bottom: var(--space-lg);">${data.name}</h1>
          <p style="font-size: 1.25rem; max-width: 600px; margin: 0 auto; color: rgba(255,255,255,0.9);">${data.desc}</p>
        </div>
      </div>
      
      <div class="container" style="padding: var(--space-4xl) 0;">
        <div class="grid-3">
          <div class="card slide-up stagger-1" style="grid-column: span 2;">
            <h2>Why This Style Matches You</h2>
            <div style="margin-bottom: var(--space-lg);">
              <h4 style="color: var(--color-primary);"><i class="ph ph-heart"></i> Personality Match</h4>
              <p>You value ${data.philosophy.toLowerCase()} You prefer spaces that feel curated and intentional rather than cluttered.</p>
            </div>
            <div>
              <h4 style="color: var(--color-primary);"><i class="ph ph-house"></i> Design Philosophy</h4>
              <p>${data.philosophy}</p>
            </div>
            
            <div style="margin-top: var(--space-2xl); display: flex; gap: var(--space-md);">
              <button class="btn btn-primary"><i class="ph ph-download-simple"></i> Download PDF Report</button>
              <button class="btn btn-secondary" onclick="window.location.hash='#/quiz'"><i class="ph ph-arrow-counter-clockwise"></i> Retake Quiz</button>
            </div>
          </div>
          
          <div class="card slide-up stagger-2">
            <h3>Color Palette</h3>
            <div style="display: flex; flex-direction: column; gap: var(--space-md); margin-top: var(--space-lg);">
              ${data.colors.map(c => `
                <div style="display: flex; align-items: center; gap: var(--space-md);">
                  <div style="width: 50px; height: 50px; border-radius: var(--radius-full); background: ${c.hex}; border: 1px solid var(--color-border); box-shadow: var(--shadow-sm);"></div>
                  <div>
                    <div style="font-weight: 600;">${c.name}</div>
                    <div style="color: var(--color-text-tertiary); font-size: 0.875rem;">${c.hex}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
        
        <h2 style="margin: var(--space-4xl) 0 var(--space-xl); text-align: center;">Recommended Materials</h2>
        <div class="grid-4 slide-up stagger-3">
          ${data.materials.map(m => `
            <div class="card" style="text-align: center;">
              <div style="font-size: 2.5rem; color: var(--color-primary); margin-bottom: var(--space-sm);"><i class="ph ph-cube"></i></div>
              <h4 style="margin: 0;">${m}</h4>
            </div>
          `).join('')}
        </div>
        
        <h2 style="margin: var(--space-4xl) 0 var(--space-xl); text-align: center;">Inspiration Gallery</h2>
        <div class="grid-3 slide-up stagger-4">
          <img src="https://images.unsplash.com/photo-1593696140826-c58b021acf8b?q=80&w=600" class="card" style="padding:0; width:100%; height: 300px; object-fit: cover;">
          <img src="https://images.unsplash.com/photo-1583847268964-b28ce8f52859?q=80&w=600" class="card" style="padding:0; width:100%; height: 300px; object-fit: cover;">
          <img src="https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?q=80&w=600" class="card" style="padding:0; width:100%; height: 300px; object-fit: cover;">
        </div>
      </div>
    `;
    
    document.getElementById('result-content').innerHTML = content;
  }
});



// --- js/pages/StylesPage.js ---
function StylesPage() {
  const styles = [
    { name: "Modern", img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800", desc: "Clean, crisp lines, and a simple colour palette." },
    { name: "Minimalist", img: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=800", desc: "Simplicity, clean lines, and a monochromatic palette." },
    { name: "Scandinavian", img: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=800", desc: "Cozy warmth, light woods, and simple elegance." },
    { name: "Industrial", img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=800", desc: "Raw, unfinished looks, exposed brick, and metal." },
    { name: "Bohemian", img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800", desc: "Carefree, relaxed and highly expressive aesthetic." },
    { name: "Classic", img: "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=800", desc: "Timeless elegance, symmetry, and rich details." },
    { name: "Japandi", img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800", desc: "Japanese minimalism meets Scandinavian functionality." },
    { name: "Farmhouse", img: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=800", desc: "Warm, cozy, relaxing, and full of charm and character." },
    { name: "Mediterranean", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800", desc: "Light, warm, breezy spaces that connect with nature." }
  ];

  return `
    <div class="styles-page container fade-in" style="padding: var(--space-4xl) 0;">
      <div style="text-align: center; margin-bottom: var(--space-4xl);">
        <h1 class="slide-up">Design Styles Directory</h1>
        <p class="slide-up stagger-1" style="max-width: 600px; margin: 0 auto;">Explore our comprehensive library of interior design aesthetics to find inspiration for your next project.</p>
        
        <div class="slide-up stagger-2" style="max-width: 500px; margin: var(--space-2xl) auto 0; position: relative;">
          <input type="text" class="form-control" placeholder="Search styles..." style="padding-left: 2.5rem; border-radius: var(--radius-full);">
          <i class="ph ph-magnifying-glass" style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--color-text-tertiary); font-size: 1.25rem;"></i>
        </div>
      </div>
      
      <div class="grid-3 slide-up stagger-3">
        ${styles.map(s => `
          <div class="card" style="padding: 0; overflow: hidden; border-radius: var(--radius-lg); display: flex; flex-direction: column;">
            <div style="overflow: hidden; height: 240px;">
              <img src="${s.img}" alt="${s.name}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease;" onmouseover="this.style.transform='scale(1.08)'" onmouseout="this.style.transform='scale(1)'">
            </div>
            <div style="padding: var(--space-xl); flex: 1; display: flex; flex-direction: column;">
              <h3 style="margin-bottom: var(--space-xs);">${s.name}</h3>
              <p style="font-size: 0.95rem; margin-bottom: var(--space-lg); flex: 1;">${s.desc}</p>
              <button class="btn btn-secondary" style="width: 100%;">Explore Style</button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}



// --- js/pages/AuthPages.js ---

function AuthPages(type = 'login') {
  const isLogin = type === 'login';
  
  return `
    <div class="auth-page fade-in" style="min-height: 80vh; display: flex; align-items: center; justify-content: center; padding: var(--space-2xl) 0; background: linear-gradient(135deg, var(--color-bg) 0%, var(--color-surface-hover) 100%);">
      <div class="card slide-up" style="width: 100%; max-width: 480px; padding: var(--space-3xl); box-shadow: var(--shadow-lg);">
        <div style="text-align: center; margin-bottom: var(--space-2xl);">
          <div style="font-size: 2.5rem; color: var(--color-primary); margin-bottom: var(--space-sm);"><i class="ph ph-user-circle"></i></div>
          <h2>${isLogin ? 'Welcome Back' : 'Create an Account'}</h2>
          <p>${isLogin ? 'Enter your details to access your dashboard.' : 'Sign up to save your styles and results.'}</p>
        </div>
        
        <div id="auth-error-msg" style="display: none; background: rgba(217,83,79,0.1); color: var(--color-error); padding: var(--space-md); border-radius: var(--radius-md); margin-bottom: var(--space-lg); border: 1px solid rgba(217,83,79,0.2); font-size: 0.9rem; text-align: center;"></div>
        <div id="auth-success-msg" style="display: none; background: rgba(85,107,47,0.1); color: var(--color-success); padding: var(--space-md); border-radius: var(--radius-md); margin-bottom: var(--space-lg); border: 1px solid rgba(85,107,47,0.2); font-size: 0.9rem; text-align: center;"></div>
        
        <form id="auth-form" style="display: flex; flex-direction: column; gap: var(--space-lg);" novalidate>
          ${!isLogin ? `
            <div class="form-group" style="margin: 0;">
              <label class="form-label">Full Name</label>
              <input type="text" id="auth-name" class="form-control" placeholder="Mariam Al-Fassi" required>
              <div class="error-text" id="err-name" style="color: var(--color-error); font-size: 0.8rem; margin-top: 4px; display: none;">Full name is required.</div>
            </div>
          ` : ''}
          
          <div class="form-group" style="margin: 0;">
            <label class="form-label">Email Address</label>
            <input type="email" id="auth-email" class="form-control" placeholder="mariam@example.com" required>
            <div class="error-text" id="err-email" style="color: var(--color-error); font-size: 0.8rem; margin-top: 4px; display: none;">Please enter a valid email.</div>
          </div>
          
          <div class="form-group" style="margin: 0;">
            <div style="display: flex; justify-content: space-between;">
              <label class="form-label">Password</label>
              ${isLogin ? `<a href="#" style="font-size: 0.875rem;">Forgot Password?</a>` : ''}
            </div>
            <div style="position: relative;">
              <input type="password" id="auth-password" class="form-control" placeholder="••••••••" required>
              <i class="ph ph-eye" id="toggle-pwd" style="position: absolute; right: 1rem; top: 50%; transform: translateY(-50%); cursor: pointer; color: var(--color-text-tertiary);"></i>
            </div>
            <div class="error-text" id="err-password" style="color: var(--color-error); font-size: 0.8rem; margin-top: 4px; display: none;">Password is required.</div>
            
            ${!isLogin ? `
              <div id="pwd-strength" style="display: none;">
                <div style="display: flex; gap: 4px; margin-top: 8px;">
                  <div class="strength-bar" style="height: 4px; flex: 1; background: var(--color-border); border-radius: 2px;"></div>
                  <div class="strength-bar" style="height: 4px; flex: 1; background: var(--color-border); border-radius: 2px;"></div>
                  <div class="strength-bar" style="height: 4px; flex: 1; background: var(--color-border); border-radius: 2px;"></div>
                </div>
                <div id="pwd-strength-text" style="font-size: 0.75rem; color: var(--color-text-tertiary); margin-top: 4px; text-align: right;">Weak</div>
              </div>
            ` : ''}
          </div>

          ${!isLogin ? `
            <div class="form-group" style="margin: 0;">
              <label class="form-label">Confirm Password</label>
              <div style="position: relative;">
                <input type="password" id="auth-confirm" class="form-control" placeholder="••••••••" required>
              </div>
              <div class="error-text" id="err-confirm" style="color: var(--color-error); font-size: 0.8rem; margin-top: 4px; display: none;">Passwords do not match.</div>
            </div>
          ` : ''}
          
          ${isLogin ? `
            <label style="display: flex; align-items: center; gap: var(--space-sm); cursor: pointer; font-size: 0.9rem;">
              <input type="checkbox" checked style="width: 1rem; height: 1rem; accent-color: var(--color-primary);">
              Remember me
            </label>
          ` : ''}
          
          <button type="submit" id="auth-submit-btn" class="btn btn-primary" style="width: 100%; padding: 1rem; margin-top: var(--space-sm);">
            ${isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>
        
        <div style="display: flex; align-items: center; gap: var(--space-md); margin: var(--space-2xl) 0;">
          <div style="flex: 1; height: 1px; background: var(--color-border);"></div>
          <div style="font-size: 0.875rem; color: var(--color-text-tertiary);">OR CONTINUE WITH</div>
          <div style="flex: 1; height: 1px; background: var(--color-border);"></div>
        </div>
        
        <div style="display: flex; gap: var(--space-md);">
          <button class="btn btn-secondary" style="flex: 1;"><i class="ph ph-google-logo"></i> Google</button>
          <button class="btn btn-secondary" style="flex: 1;"><i class="ph ph-apple-logo"></i> Apple</button>
        </div>
        
        <div style="text-align: center; margin-top: var(--space-2xl); font-size: 0.9rem;">
          ${isLogin ? 
            `Don't have an account? <a href="#/signup" style="font-weight: 600;">Sign up</a>` : 
            `Already have an account? <a href="#/login" style="font-weight: 600;">Log in</a>`
          }
        </div>
      </div>
    </div>
  `;
}

document.addEventListener('page-rendered', (e) => {
  if (e.detail.path === 'login' || e.detail.path === 'signup') {
    const isLogin = e.detail.path === 'login';
    const form = document.getElementById('auth-form');
    
    // Toggle Password Visibility
    const togglePwd = document.getElementById('toggle-pwd');
    const pwdInput = document.getElementById('auth-password');
    if (togglePwd && pwdInput) {
      togglePwd.addEventListener('click', () => {
        const type = pwdInput.getAttribute('type') === 'password' ? 'text' : 'password';
        pwdInput.setAttribute('type', type);
        togglePwd.className = type === 'password' ? 'ph ph-eye' : 'ph ph-eye-slash';
      });
    }

    // Password Strength Logic
    if (!isLogin && pwdInput) {
      pwdInput.addEventListener('input', (e) => {
        const val = e.target.value;
        const strengthDiv = document.getElementById('pwd-strength');
        const bars = document.querySelectorAll('.strength-bar');
        const text = document.getElementById('pwd-strength-text');
        
        if (val.length > 0) {
          strengthDiv.style.display = 'block';
          let score = 0;
          if (val.length >= 6) score++;
          if (val.match(/[A-Z]/) && val.match(/[0-9]/)) score++;
          if (val.length >= 8 && val.match(/[^A-Za-z0-9]/)) score++;
          
          bars.forEach(b => b.style.background = 'var(--color-border)');
          if (score >= 1) { bars[0].style.background = 'var(--color-error)'; text.innerText = 'Weak'; }
          if (score >= 2) { bars[0].style.background = '#F2CC8F'; bars[1].style.background = '#F2CC8F'; text.innerText = 'Good'; }
          if (score >= 3) { bars[0].style.background = 'var(--color-success)'; bars[1].style.background = 'var(--color-success)'; bars[2].style.background = 'var(--color-success)'; text.innerText = 'Strong'; }
        } else {
          strengthDiv.style.display = 'none';
        }
      });
    }
    
    if (form) {
      form.addEventListener('submit', async (ev) => {
        ev.preventDefault();
        
        // Hide all previous errors
        document.querySelectorAll('.error-text').forEach(el => el.style.display = 'none');
        document.getElementById('auth-error-msg').style.display = 'none';
        document.getElementById('auth-success-msg').style.display = 'none';

        const email = document.getElementById('auth-email').value.trim();
        const password = document.getElementById('auth-password').value;
        const btn = document.getElementById('auth-submit-btn');

        let isValid = true;
        
        // Validation
        const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
        if (!email || !emailRegex.test(email)) {
          document.getElementById('err-email').style.display = 'block';
          isValid = false;
        }
        
        if (!password || (password.length < 6 && !isLogin)) {
          const errPwd = document.getElementById('err-password');
          errPwd.innerText = isLogin ? 'Password is required.' : 'Password must be at least 6 characters.';
          errPwd.style.display = 'block';
          isValid = false;
        }

        let name = '';
        if (!isLogin) {
          name = document.getElementById('auth-name').value.trim();
          if (!name) {
            document.getElementById('err-name').style.display = 'block';
            isValid = false;
          }
          const confirm = document.getElementById('auth-confirm').value;
          if (password !== confirm) {
            document.getElementById('err-confirm').style.display = 'block';
            isValid = false;
          }
        }

        if (!isValid) return;

        // Show Loading State
        const originalBtnText = btn.innerHTML;
        btn.innerHTML = '<div class="spinner" style="width: 20px; height: 20px; border-width: 2px; border-top-color: white;"></div>';
        btn.disabled = true;

        // Simulate Network Delay
        await new Promise(r => setTimeout(r, 800));

        try {
          if (isLogin) {
            store.login(email, password);
            const successMsg = document.getElementById('auth-success-msg');
            successMsg.innerText = 'Login successful! Redirecting...';
            successMsg.style.display = 'block';
            setTimeout(() => {
              window.location.hash = '#/dashboard';
            }, 500);
          } else {
            store.signUp(name, email, password);
            // Auto login after sign up
            store.login(email, password);
            const successMsg = document.getElementById('auth-success-msg');
            successMsg.innerText = 'Account created successfully! Redirecting...';
            successMsg.style.display = 'block';
            setTimeout(() => {
              window.location.hash = '#/dashboard';
            }, 800);
          }
        } catch (error) {
          const errorMsg = document.getElementById('auth-error-msg');
          errorMsg.innerText = error.message;
          errorMsg.style.display = 'block';
          btn.innerHTML = originalBtnText;
          btn.disabled = false;
        }
      });
    }
  }
});



// --- js/pages/DashboardPage.js ---

function DashboardPage() {
  const user = store.state.user || { name: 'Guest', quizHistory: [] };
  const history = user.quizHistory || [];
  const attempts = history.length;
  const lastResult = attempts > 0 ? history[history.length - 1].style : (localStorage.getItem('quizResult') || 'None');
  
  return `
    <div class="dashboard-page container fade-in" style="padding: var(--space-4xl) 0;">
      
      <div class="slide-up" style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: var(--space-3xl);">
        <div>
          <h1 style="margin-bottom: var(--space-xs);">Welcome back, ${user.name.split(' ')[0]} 👋</h1>
          <p style="margin: 0; color: var(--color-text-secondary);">Ready to discover your next design style?</p>
        </div>
        <button class="btn btn-secondary" onclick="store.setState({user: null}); window.location.hash='#/';">Logout</button>
      </div>
      
      <div class="grid-4 slide-up stagger-1" style="margin-bottom: var(--space-3xl);">
        <div class="card">
          <div style="color: var(--color-text-tertiary); font-size: 0.875rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: var(--space-sm);">Quiz Attempts</div>
          <div style="font-size: 2.5rem; font-family: var(--font-heading); font-weight: 700; color: var(--color-primary);">${attempts}</div>
        </div>
        <div class="card">
          <div style="color: var(--color-text-tertiary); font-size: 0.875rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: var(--space-sm);">Favorite Style</div>
          <div style="font-size: 1.5rem; font-family: var(--font-heading); font-weight: 600; color: var(--color-primary); line-height: 1.2; margin-top: 0.5rem;">${lastResult}</div>
        </div>
        <div class="card">
          <div style="color: var(--color-text-tertiary); font-size: 0.875rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: var(--space-sm);">Saved Inspirations</div>
          <div style="font-size: 2.5rem; font-family: var(--font-heading); font-weight: 700; color: var(--color-primary);">12</div>
        </div>
        <div class="card" style="background: var(--color-primary); color: white; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; cursor: pointer; transition: transform 0.3s;" onclick="window.location.hash='#/quiz'">
          <i class="ph ph-play-circle" style="font-size: 2.5rem; margin-bottom: var(--space-sm);"></i>
          <div style="font-weight: 600; font-size: 1.125rem;">Start New Quiz</div>
        </div>
      </div>
      
      <div class="grid-3 slide-up stagger-2">
        <div style="grid-column: span 2;">
          <h2 style="margin-bottom: var(--space-lg);">Recent Activity</h2>
          <div class="card" style="padding: 0; overflow: hidden;">
            <ul style="margin: 0; padding: 0;">
              <li style="padding: var(--space-lg); border-bottom: 1px solid var(--color-border); display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center; gap: var(--space-md);">
                  <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--color-surface-hover); display: flex; align-items: center; justify-content: center; color: var(--color-primary);"><i class="ph ph-check-circle"></i></div>
                  <div>
                    <div style="font-weight: 600;">Completed Style Quiz</div>
                    <div style="font-size: 0.875rem; color: var(--color-text-tertiary);">Result: ${lastResult}</div>
                  </div>
                </div>
                <div style="font-size: 0.875rem; color: var(--color-text-tertiary);">Today</div>
              </li>
              <li style="padding: var(--space-lg); border-bottom: 1px solid var(--color-border); display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center; gap: var(--space-md);">
                  <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--color-surface-hover); display: flex; align-items: center; justify-content: center; color: var(--color-primary);"><i class="ph ph-heart"></i></div>
                  <div>
                    <div style="font-weight: 600;">Saved "Modern Living Room"</div>
                    <div style="font-size: 0.875rem; color: var(--color-text-tertiary);">Inspiration Gallery</div>
                  </div>
                </div>
                <div style="font-size: 0.875rem; color: var(--color-text-tertiary);">2 days ago</div>
              </li>
              <li style="padding: var(--space-lg); display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center; gap: var(--space-md);">
                  <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--color-surface-hover); display: flex; align-items: center; justify-content: center; color: var(--color-primary);"><i class="ph ph-download-simple"></i></div>
                  <div>
                    <div style="font-weight: 600;">Downloaded PDF Report</div>
                    <div style="font-size: 0.875rem; color: var(--color-text-tertiary);">Scandinavian Style Guide</div>
                  </div>
                </div>
                <div style="font-size: 0.875rem; color: var(--color-text-tertiary);">1 week ago</div>
              </li>
            </ul>
          </div>
        </div>
        
        <div>
          <h2 style="margin-bottom: var(--space-lg);">Recommended Styles</h2>
          <div style="display: flex; flex-direction: column; gap: var(--space-md);">
            
            <div class="card" style="padding: 0; display: flex; overflow: hidden; height: 100px; cursor: pointer;">
              <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=200" style="width: 100px; height: 100%; object-fit: cover;">
              <div style="padding: var(--space-md); flex: 1; display: flex; flex-direction: column; justify-content: center;">
                <h4 style="margin: 0; font-size: 1rem;">Modern</h4>
                <div style="font-size: 0.875rem; color: var(--color-text-tertiary);">92% Match</div>
              </div>
            </div>
            
            <div class="card" style="padding: 0; display: flex; overflow: hidden; height: 100px; cursor: pointer;">
              <img src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=200" style="width: 100px; height: 100%; object-fit: cover;">
              <div style="padding: var(--space-md); flex: 1; display: flex; flex-direction: column; justify-content: center;">
                <h4 style="margin: 0; font-size: 1rem;">Scandinavian</h4>
                <div style="font-size: 0.875rem; color: var(--color-text-tertiary);">85% Match</div>
              </div>
            </div>
            
            <a href="#/styles" class="btn btn-secondary" style="width: 100%; margin-top: var(--space-sm);">View All Styles</a>
          </div>
        </div>
      </div>
      
    </div>
  `;
}



// --- js/pages/ProfilePage.js ---

function ProfilePage() {
  const user = store.state.user || { name: 'Guest User', email: 'guest@example.com' };

  return `
    <div class="profile-page container fade-in" style="padding: var(--space-4xl) 0; max-width: 800px;">
      <h1 class="slide-up">My Profile</h1>
      
      <div class="card slide-up stagger-1" style="margin-bottom: var(--space-2xl); display: flex; align-items: center; gap: var(--space-xl);">
        <div style="width: 100px; height: 100px; border-radius: 50%; background: var(--color-primary); display: flex; align-items: center; justify-content: center; color: white; font-size: 3rem;">
          <i class="ph ph-user"></i>
        </div>
        <div>
          <h2 style="margin: 0;">${user.name}</h2>
          <div style="color: var(--color-text-secondary); margin-bottom: var(--space-sm);">${user.email}</div>
          <button class="btn btn-secondary btn-sm" style="padding: 0.5rem 1rem;">Edit Profile</button>
        </div>
      </div>
      
      <div class="grid-2 slide-up stagger-2">
        <div class="card">
          <h3 style="margin-bottom: var(--space-lg); border-bottom: 1px solid var(--color-border); padding-bottom: var(--space-sm);">Preferences</h3>
          
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-md);">
            <div>
              <div style="font-weight: 500;">Dark Mode</div>
              <div style="font-size: 0.875rem; color: var(--color-text-tertiary);">Switch to dark theme</div>
            </div>
            <button class="icon-btn" onclick="document.getElementById('theme-toggle').click();"><i class="ph ph-moon"></i></button>
          </div>
          
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-md);">
            <div>
              <div style="font-weight: 500;">Language</div>
              <div style="font-size: 0.875rem; color: var(--color-text-tertiary);">Arabic / English</div>
            </div>
            <button class="icon-btn" onclick="document.getElementById('lang-toggle').click();"><i class="ph ph-translate"></i></button>
          </div>
        </div>
        
        <div class="card">
          <h3 style="margin-bottom: var(--space-lg); border-bottom: 1px solid var(--color-border); padding-bottom: var(--space-sm);">Account Actions</h3>
          <div style="display: flex; flex-direction: column; gap: var(--space-md);">
            <button class="btn btn-secondary" style="justify-content: flex-start;"><i class="ph ph-key"></i> Change Password</button>
            <button class="btn btn-secondary" style="justify-content: flex-start; color: var(--color-error); border-color: rgba(217, 83, 79, 0.3);" onclick="document.getElementById('auth-logout-btn').click();"><i class="ph ph-sign-out"></i> Logout</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Add logic to listen for that logout button without modifying router heavily
document.addEventListener('page-rendered', (e) => {
  if (e.detail.path === 'profile') {
    // Inject a hidden logout button if it doesn't exist, to keep it simple
    if (!document.getElementById('auth-logout-btn')) {
      const btn = document.createElement('button');
      btn.id = 'auth-logout-btn';
      btn.style.display = 'none';
      document.body.appendChild(btn);
      btn.addEventListener('click', () => {
        store.logout();
        window.location.hash = '#/';
      });
    }
  }
});



// --- js/pages/ContactPage.js ---
function ContactPage() {
  return `
    <div class="contact-page container fade-in" style="padding: var(--space-4xl) 0;">
      <div style="text-align: center; margin-bottom: var(--space-4xl);">
        <h1 class="slide-up">Get in Touch</h1>
        <p class="slide-up stagger-1" style="max-width: 600px; margin: 0 auto;">Have a question about your design results or need technical support? Our team is here to help.</p>
      </div>
      
      <div class="grid-2 slide-up stagger-2" style="gap: var(--space-3xl);">
        <div>
          <div class="card">
            <h3 style="margin-bottom: var(--space-xl);">Send us a message</h3>
            <form style="display: flex; flex-direction: column; gap: var(--space-lg);" onsubmit="event.preventDefault(); alert('Message sent successfully!');">
              <div class="grid-2" style="gap: var(--space-md);">
                <div class="form-group" style="margin: 0;">
                  <label class="form-label">First Name</label>
                  <input type="text" class="form-control" required>
                </div>
                <div class="form-group" style="margin: 0;">
                  <label class="form-label">Last Name</label>
                  <input type="text" class="form-control" required>
                </div>
              </div>
              
              <div class="form-group" style="margin: 0;">
                <label class="form-label">Email Address</label>
                <input type="email" class="form-control" required>
              </div>
              
              <div class="form-group" style="margin: 0;">
                <label class="form-label">Subject</label>
                <input type="text" class="form-control" required>
              </div>
              
              <div class="form-group" style="margin: 0;">
                <label class="form-label">Message</label>
                <textarea class="form-control" rows="5" required></textarea>
              </div>
              
              <button type="submit" class="btn btn-primary">Send Message</button>
            </form>
          </div>
        </div>
        
        <div>
          <div style="margin-bottom: var(--space-3xl);">
            <h3 style="margin-bottom: var(--space-lg);">Contact Information</h3>
            <div style="display: flex; flex-direction: column; gap: var(--space-md);">
              <div style="display: flex; align-items: center; gap: var(--space-md);">
                <div style="width: 50px; height: 50px; border-radius: 50%; background: var(--color-surface); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; color: var(--color-primary); box-shadow: var(--shadow-sm);"><i class="ph ph-envelope-simple"></i></div>
                <div>
                  <div style="font-weight: 600;">Email</div>
                  <div style="color: var(--color-text-secondary);">hello@discoverdesign.com</div>
                </div>
              </div>
              <div style="display: flex; align-items: center; gap: var(--space-md);">
                <div style="width: 50px; height: 50px; border-radius: 50%; background: var(--color-surface); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; color: var(--color-primary); box-shadow: var(--shadow-sm);"><i class="ph ph-phone"></i></div>
                <div>
                  <div style="font-weight: 600;">Phone</div>
                  <div style="color: var(--color-text-secondary);">+1 (555) 123-4567</div>
                </div>
              </div>
              <div style="display: flex; align-items: center; gap: var(--space-md);">
                <div style="width: 50px; height: 50px; border-radius: 50%; background: var(--color-surface); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; color: var(--color-primary); box-shadow: var(--shadow-sm);"><i class="ph ph-map-pin"></i></div>
                <div>
                  <div style="font-weight: 600;">Office</div>
                  <div style="color: var(--color-text-secondary);">123 Design Avenue, Creative District</div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="card" style="padding: 0; overflow: hidden; height: 250px;">
            <div style="width: 100%; height: 100%; background: url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800') center/cover; position: relative;">
              <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.3);"></div>
              <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white; text-align: center; font-weight: 600; font-size: 1.25rem;">
                <i class="ph ph-map-pin-line" style="font-size: 2.5rem; margin-bottom: 0.5rem; display: block;"></i>
                Map Placeholder
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}



// --- js/router.js ---

// Import Pages

class Router {
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

const router = new Router();



// --- js/app.js ---

// Application entry point
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Router
  router.init();
});



