import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Language, TranslationType } from './translations';

interface I18nContextType {
  lang: Language;
  t: TranslationType;
  toggleLang: () => void;
  setLang: (lang: Language) => void;
  dir: 'rtl' | 'ltr';
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    // Check path or local storage for initial lang
    const pathLang = window.location.pathname.split('/')[1];
    if (pathLang === 'ar' || pathLang === 'en') return pathLang;
    const saved = localStorage.getItem('lang') as Language;
    return saved || 'ar';
  });

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    localStorage.setItem('lang', lang);
  }, [lang]);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    // Ideally update URL here without full reload, we'll handle routing separately if needed
  };

  const toggleLang = () => {
    setLang(lang === 'ar' ? 'en' : 'ar');
  };

  return (
    <I18nContext.Provider value={{ lang, t: translations[lang], toggleLang, setLang, dir: lang === 'ar' ? 'rtl' : 'ltr' }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
