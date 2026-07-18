import { t } from '../i18n.js';

export function LandingPage() {
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
