import { store } from './state.js';

export const dictionary = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      styles: "Design Styles",
      quiz: "Quiz",
      contact: "Contact",
      login: "Login",
      signup: "Sign Up",
      dashboard: "Dashboard"
    },
    hero: {
      title: "Discover Your Perfect Interior Design Style",
      subtitle: "Take a quick quiz and discover the interior design style that perfectly matches your personality, lifestyle, and taste.",
      startQuiz: "Start Quiz",
      exploreStyles: "Explore Styles"
    },
    whyChooseUs: {
      title: "Why Choose Us",
      personalized: "Personalized Results",
      personalizedDesc: "Get a style curated uniquely for your taste and personality.",
      easy: "Easy Interactive Quiz",
      easyDesc: "Answer visually engaging questions to find your match.",
      inspiration: "Design Inspiration",
      inspirationDesc: "Browse beautiful galleries tailored to your style.",
      expert: "Expert Recommendations",
      expertDesc: "Receive furniture and color palettes from professionals."
    },
    footer: {
      about: "About",
      quickLinks: "Quick Links",
      contact: "Contact",
      rights: "© 2026 Discover Your Perfect Design. All rights reserved."
    }
  },
  ar: {
    nav: {
      home: "الرئيسية",
      about: "عن الموقع",
      styles: "أنماط التصميم",
      quiz: "الاختبار",
      contact: "اتصل بنا",
      login: "تسجيل الدخول",
      signup: "إنشاء حساب",
      dashboard: "لوحة التحكم"
    },
    hero: {
      title: "اكتشف نمط التصميم الداخلي المثالي لك",
      subtitle: "قم بإجراء اختبار سريع واكتشف نمط التصميم الداخلي الذي يتناسب تمامًا مع شخصيتك وأسلوب حياتك وذوقك.",
      startQuiz: "ابدأ الاختبار",
      exploreStyles: "استكشف الأنماط"
    },
    whyChooseUs: {
      title: "لماذا تختارنا",
      personalized: "نتائج مخصصة",
      personalizedDesc: "احصل على نمط مصمم خصيصًا لذوقك وشخصيتك.",
      easy: "اختبار تفاعلي سهل",
      easyDesc: "أجب عن أسئلة جذابة بصريًا للعثور على تطابقك.",
      inspiration: "إلهام التصميم",
      inspirationDesc: "تصفح معارض جميلة مصممة خصيصًا لنمطك.",
      expert: "توصيات الخبراء",
      expertDesc: "احصل على توصيات للأثاث ولوحات الألوان من المحترفين."
    },
    footer: {
      about: "عن الموقع",
      quickLinks: "روابط سريعة",
      contact: "اتصل بنا",
      rights: "© 2026 اكتشف تصميمك المثالي. جميع الحقوق محفوظة."
    }
  }
};

export function t(keyPath) {
  const keys = keyPath.split('.');
  let value = dictionary[store.state.lang];
  for (const key of keys) {
    if (value[key] === undefined) return keyPath;
    value = value[key];
  }
  return value;
}
