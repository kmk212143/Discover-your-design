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

export const store = new Store();

// Initialize theme and language on load
document.documentElement.setAttribute('data-theme', store.state.theme);
document.documentElement.setAttribute('lang', store.state.lang);
document.documentElement.setAttribute('dir', store.state.lang === 'ar' ? 'rtl' : 'ltr');
