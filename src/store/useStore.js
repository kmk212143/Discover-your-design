import { create } from 'zustand';

export const useStore = create((set, get) => ({
  theme: localStorage.getItem('theme') || 'light',
  lang: localStorage.getItem('lang') || 'en',
  user: JSON.parse(localStorage.getItem('user')) || null,
  users_db: JSON.parse(localStorage.getItem('users_db')) || [],

  setTheme: (theme) => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    set({ theme });
  },

  setLang: (lang) => {
    localStorage.setItem('lang', lang);
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    set({ lang });
  },

  signUp: (name, email, password) => {
    const { users_db } = get();
    const exists = users_db.find(u => u.email === email);
    if (exists) throw new Error("Email is already registered.");

    const newUser = {
      id: 'usr_' + Date.now(),
      name,
      email,
      password,
      createdAt: new Date().toISOString(),
      quizHistory: []
    };
    
    const newDb = [...users_db, newUser];
    localStorage.setItem('users_db', JSON.stringify(newDb));
    set({ users_db: newDb });
    return newUser;
  },

  login: (email, password) => {
    const { users_db } = get();
    const user = users_db.find(u => u.email === email && u.password === password);
    if (!user) throw new Error("Invalid email or password.");
    
    const { password: _, ...sessionUser } = user;
    localStorage.setItem('user', JSON.stringify(sessionUser));
    set({ user: sessionUser });
    return sessionUser;
  },

  logout: () => {
    localStorage.removeItem('user');
    set({ user: null });
  },

  saveQuizResult: (style) => {
    const { user, users_db } = get();
    localStorage.setItem('quizResult', style);
    
    if (user) {
      const userIndex = users_db.findIndex(u => u.id === user.id);
      if (userIndex !== -1) {
        const historyItem = { style, date: new Date().toISOString() };
        const newDb = [...users_db];
        newDb[userIndex].quizHistory = newDb[userIndex].quizHistory || [];
        newDb[userIndex].quizHistory.push(historyItem);
        
        localStorage.setItem('users_db', JSON.stringify(newDb));
        
        const updatedUser = { ...user, quizHistory: newDb[userIndex].quizHistory };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        set({ users_db: newDb, user: updatedUser });
      }
    }
  }
}));
