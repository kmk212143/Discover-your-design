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

export function ResultPage() {
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
