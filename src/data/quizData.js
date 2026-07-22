export const quizData = [
  {
    id: 1,
    title: "Choose your favorite colors.",
    title_ar: "اختر ألوانك المفضلة.",
    type: "color",
    options: [
      { id: "c1", image: "https://images.unsplash.com/photo-1507643179773-3e975d7ac515?q=80&w=400", label: "Neutral & Earthy", label_ar: "طبيعية وترابية", styles: ["Minimalist", "Japandi", "Scandinavian"] },
      { id: "c2", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=400", label: "Dark & Moody", label_ar: "داكنة وغامضة", styles: ["Industrial", "Luxury", "Contemporary"] },
      { id: "c3", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=400", label: "Bright & Warm", label_ar: "مشرقة ودافئة", styles: ["Bohemian", "Eclectic", "Mediterranean"] },
      { id: "c4", image: "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?q=80&w=400", label: "Classic Whites", label_ar: "الأبيض الكلاسيكي", styles: ["Coastal", "Farmhouse", "Traditional"] }
    ]
  },
  {
    id: 2,
    title: "Choose your dream living room.",
    title_ar: "اختر غرفة معيشة أحلامك.",
    type: "image",
    options: [
      { id: "r1", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800", label: "Luxury", label_ar: "فاخرة", styles: ["Luxury", "Modern", "Classic"] },
      { id: "r2", image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=800", label: "Cozy", label_ar: "دافئة ومريحة", styles: ["Scandinavian", "Farmhouse", "Japandi"] },
      { id: "r3", image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=800", label: "Raw", label_ar: "خام وبسيط", styles: ["Industrial", "Mid-Century Modern"] },
      { id: "r4", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800", label: "Eclectic", label_ar: "متنوع وبوهيمي", styles: ["Bohemian", "Eclectic"] }
    ]
  },
  {
    id: 3,
    title: "Favorite furniture style?",
    title_ar: "نمط الأثاث المفضل لديك؟",
    type: "text",
    options: [
      { id: "f1", label: "Clean, geometric lines", label_ar: "خطوط هندسية ونظيفة", styles: ["Modern", "Minimalist", "Contemporary"] },
      { id: "f2", label: "Curved, vintage silhouettes", label_ar: "منحنيات عتيقة وجميلة", styles: ["Mid-Century Modern", "Classic"] },
      { id: "f3", label: "Plush, velvet, oversized", label_ar: "فخم، مخملي وضخم", styles: ["Luxury", "Traditional"] },
      { id: "f4", label: "Woven, rattan, and relaxed", label_ar: "منسوج من الخيزران ومريح", styles: ["Bohemian", "Coastal"] }
    ]
  },
  {
    id: 4,
    title: "Favorite lighting?",
    title_ar: "الإضاءة المفضلة لديك؟",
    type: "text",
    options: [
      { id: "l1", label: "Maximum natural light", label_ar: "أقصى قدر من الضوء الطبيعي", styles: ["Scandinavian", "Coastal"] },
      { id: "l2", label: "Warm, ambient lamps", label_ar: "مصابيح دافئة وهادئة", styles: ["Bohemian", "Farmhouse"] },
      { id: "l3", label: "Sleek LED strips & recessed", label_ar: "أشرطة إضاءة LED أنيقة ومخفية", styles: ["Modern", "Minimalist"] },
      { id: "l4", label: "Statement chandeliers", label_ar: "ثريات مميزة وفاخرة", styles: ["Luxury", "Classic", "Traditional"] }
    ]
  },
  {
    id: 5,
    title: "Which words describe your ideal home?",
    title_ar: "أي الكلمات تصف منزلك المثالي؟",
    type: "text",
    options: [
      { id: "w1", label: "Calm, airy, organized", label_ar: "هادئ، مريح ومنظم", styles: ["Minimalist", "Japandi"] },
      { id: "w2", label: "Creative, vibrant, free", label_ar: "مبدع، حيوي وحر", styles: ["Bohemian", "Eclectic"] },
      { id: "w3", label: "Elegant, refined, timeless", label_ar: "أنيق، راقٍ وخالد", styles: ["Classic", "Luxury", "Traditional"] },
      { id: "w4", label: "Functional, simple, warm", label_ar: "عملي، بسيط ودافئ", styles: ["Scandinavian", "Farmhouse"] }
    ]
  },
  {
    id: 6,
    title: "Favorite flooring?",
    title_ar: "الأرضية المفضلة لديك؟",
    type: "text",
    options: [
      { id: "fl1", label: "Light oak wood planks", label_ar: "ألواح خشب البلوط الفاتح", styles: ["Scandinavian", "Japandi", "Coastal"] },
      { id: "fl2", label: "Polished marble or stone", label_ar: "رخام أو حجر مصقول", styles: ["Luxury", "Modern", "Mediterranean"] },
      { id: "fl3", label: "Raw concrete", label_ar: "خرسانة خام", styles: ["Minimalist", "Industrial"] },
      { id: "fl4", label: "Patterned tiles or rich rugs", label_ar: "بلاط مزخرف أو سجاد غني", styles: ["Bohemian", "Eclectic", "Classic"] }
    ]
  },
  {
    id: 7,
    title: "How much decoration do you like?",
    title_ar: "ما مقدار الزينة والديكور الذي تفضله؟",
    type: "text",
    options: [
      { id: "d1", label: "Minimal (Less is strictly more)", label_ar: "أقل ما يمكن (البساطة التامة)", styles: ["Minimalist", "Modern"] },
      { id: "d2", label: "Moderate (Carefully curated pieces)", label_ar: "معتدل (قطع منسقة بعناية)", styles: ["Japandi", "Contemporary", "Mid-Century Modern"] },
      { id: "d3", label: "Rich (Books, art, plants everywhere)", label_ar: "غني (كتب، لوحات، ونباتات في كل مكان)", styles: ["Bohemian", "Eclectic", "Traditional"] }
    ]
  },
  {
    id: 8,
    title: "Favorite materials?",
    title_ar: "المواد المفضلة لديك؟",
    type: "text",
    options: [
      { id: "m1", label: "Natural light wood & linen", label_ar: "خشب طبيعي فاتح وكتان", styles: ["Scandinavian", "Japandi", "Coastal"] },
      { id: "m2", label: "Glass, chrome, & leather", label_ar: "زجاج، كروم، وجلد", styles: ["Modern", "Contemporary"] },
      { id: "m3", label: "Exposed brick & black metal", label_ar: "طوب مكشوف ومعدن أسود", styles: ["Industrial"] },
      { id: "m4", label: "Rich mahogany & marble", label_ar: "خشب الماهوجني الغني والرخام", styles: ["Classic", "Traditional", "Luxury"] }
    ]
  },
  {
    id: 9,
    title: "Preferred room atmosphere?",
    title_ar: "أجواء الغرفة المفضلة لديك؟",
    type: "text",
    options: [
      { id: "a1", label: "Cozy & Inviting", label_ar: "دافئة وجذابة", styles: ["Scandinavian", "Farmhouse"] },
      { id: "a2", label: "Bright & Breezy", label_ar: "مشرقة ومنعشة", styles: ["Coastal", "Mediterranean"] },
      { id: "a3", label: "Moody & Sophisticated", label_ar: "غامضة وراقية", styles: ["Industrial", "Luxury"] },
      { id: "a4", label: "Artistic & Vibrant", label_ar: "فنية وحيوية", styles: ["Bohemian", "Eclectic"] }
    ]
  },
  {
    id: 10,
    title: "Choose your favorite bedroom.",
    title_ar: "اختر غرفة النوم المفضلة لديك.",
    type: "image",
    options: [
      { id: "b1", image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=800", label: "Minimalist", label_ar: "بسيطة", styles: ["Minimalist", "Japandi"] },
      { id: "b2", image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=800", label: "Boho", label_ar: "بوهيمية", styles: ["Bohemian", "Eclectic"] },
      { id: "b3", image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=800", label: "Classic", label_ar: "كلاسيكية", styles: ["Classic", "Traditional"] },
      { id: "b4", image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=800", label: "Modern", label_ar: "حديثة", styles: ["Modern", "Contemporary"] }
    ]
  },
  {
    id: 11,
    title: "How do you feel about indoor plants?",
    title_ar: "ما هو شعورك تجاه النباتات الداخلية؟",
    type: "text",
    options: [
      { id: "p1", label: "I want an indoor jungle!", label_ar: "أريد غابة داخلية!", styles: ["Bohemian", "Eclectic"] },
      { id: "p2", label: "A few manicured statement plants.", label_ar: "بضع نباتات منسقة ومميزة.", styles: ["Modern", "Mid-Century Modern", "Japandi"] },
      { id: "p3", label: "Fresh flowers in vases.", label_ar: "زهور طبيعية في المزهريات.", styles: ["Classic", "Traditional", "Farmhouse"] },
      { id: "p4", label: "No plants, keep it clean.", label_ar: "لا نباتات، أحب البساطة.", styles: ["Minimalist", "Industrial"] }
    ]
  },
  {
    id: 12,
    title: "What is your approach to organization?",
    title_ar: "ما هو أسلوبك في التنظيم؟",
    type: "text",
    options: [
      { id: "o1", label: "Everything hidden away seamlessly.", label_ar: "كل شيء مخفي بسلاسة.", styles: ["Minimalist", "Modern"] },
      { id: "o2", label: "Neat, but lived-in and accessible.", label_ar: "منظم، لكن حيوي وسهل الوصول إليه.", styles: ["Scandinavian", "Japandi", "Farmhouse"] },
      { id: "o3", label: "Displaying collections proudly.", label_ar: "عرض المجموعات بفخر.", styles: ["Eclectic", "Bohemian", "Traditional"] }
    ]
  },
  {
    id: 13,
    title: "Favorite window treatments?",
    title_ar: "تغطية النوافذ المفضلة لديك؟",
    type: "text",
    options: [
      { id: "wt1", label: "Heavy, luxurious drapes", label_ar: "ستائر ثقيلة وفاخرة", styles: ["Classic", "Luxury", "Traditional"] },
      { id: "wt2", label: "Light, sheer linen curtains", label_ar: "ستائر كتان خفيفة وشفافة", styles: ["Scandinavian", "Coastal", "Bohemian"] },
      { id: "wt3", label: "Sleek roller blinds or nothing", label_ar: "ستائر رول أنيقة أو بدون ستائر", styles: ["Modern", "Minimalist", "Industrial"] }
    ]
  },
  {
    id: 14,
    title: "How do you view patterns?",
    title_ar: "كيف ترى النقوش والزخارف؟",
    type: "text",
    options: [
      { id: "pt1", label: "I prefer solid colors and textures over patterns.", label_ar: "أفضل الألوان السادة والملمس البارز على النقوش.", styles: ["Minimalist", "Modern", "Japandi"] },
      { id: "pt2", label: "Subtle stripes or geometric shapes.", label_ar: "خطوط خفيفة أو أشكال هندسية.", styles: ["Mid-Century Modern", "Contemporary"] },
      { id: "pt3", label: "Floral, damask, or intricate vintage patterns.", label_ar: "زهور، دمشقي، أو نقوش عتيقة معقدة.", styles: ["Traditional", "Classic", "Farmhouse"] },
      { id: "pt4", label: "Loud, colorful, and clashing patterns!", label_ar: "نقوش جريئة، ملونة ومتناقضة!", styles: ["Bohemian", "Eclectic"] }
    ]
  },
  {
    id: 15,
    title: "Your ultimate design goal?",
    title_ar: "ما هو هدفك النهائي في التصميم؟",
    type: "text",
    options: [
      { id: "g1", label: "To feel peaceful and zen.", label_ar: "الشعور بالسلام والهدوء (Zen).", styles: ["Japandi", "Minimalist", "Scandinavian"] },
      { id: "g2", label: "To impress guests with elegance.", label_ar: "إثارة إعجاب الضيوف بالأناقة.", styles: ["Luxury", "Classic", "Modern"] },
      { id: "g3", label: "To feel comfortable and nostalgic.", label_ar: "الشعور بالراحة والحنين.", styles: ["Farmhouse", "Traditional", "Coastal"] },
      { id: "g4", label: "To express my unique creativity.", label_ar: "التعبير عن إبداعي الفريد.", styles: ["Bohemian", "Eclectic", "Industrial"] }
    ]
  }
];
