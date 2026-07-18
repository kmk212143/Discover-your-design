import { store } from '../state.js';

export function ProfilePage() {
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
