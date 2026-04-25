import React, { createContext, useState, useEffect } from 'react';
import en from '../translations/en.json';
import ar from '../translations/ar.json';

export const I18nContext = createContext();

const translations = { en, ar };

export function I18nProvider({ children }) {
  const [lang, setLang] = useState('ar');
  const isRTL = lang === 'ar';

  const t = (path) => {
    const keys = path.split('.');
    let value = translations[lang];
    for (const key of keys) {
      if (!value[key]) return path;
      value = value[key];
    }
    return value;
  };

  const toggleLang = () => setLang((prev) => (prev === 'en' ? 'ar' : 'en'));

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang, isRTL]);

  return (
    <I18nContext.Provider value={{ lang, isRTL, t, toggleLang }}>
      {children}
    </I18nContext.Provider>
  );
}
