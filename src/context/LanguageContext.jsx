import React, { createContext, useContext, useState } from 'react';
import { translations } from '../i18n/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    return localStorage.getItem('drawitout_ui_lang') || 'hu';
  });

  const setLang = (newLang) => {
    setLangState(newLang);
    localStorage.setItem('drawitout_ui_lang', newLang);
  };

  const t = (key, params = {}) => {
    const dict = translations[lang] || translations.hu;
    let text = dict[key] || translations.hu[key] || key;

    Object.keys(params).forEach((paramKey) => {
      text = text.replace(`{${paramKey}}`, params[paramKey]);
    });

    return text;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
