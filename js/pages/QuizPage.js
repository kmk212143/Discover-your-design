import { store } from '../state.js';

export const quizData = [
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

export function QuizPage() {
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
