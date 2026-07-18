import { store } from '../state.js';

export function DashboardPage() {
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
