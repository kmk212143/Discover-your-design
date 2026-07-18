export function LoadingPage() {
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
