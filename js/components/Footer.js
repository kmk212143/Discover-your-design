import { t } from '../i18n.js';

export function renderFooter() {
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
