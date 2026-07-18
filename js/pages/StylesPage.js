export function StylesPage() {
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
