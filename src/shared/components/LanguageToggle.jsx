import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/features/i18n';

export function LanguageToggle() {
  const { lang, toggleLang } = useLanguage();

  return (
    <button
      onClick={toggleLang}
      className="relative flex items-center bg-surface-200 dark:bg-surface-800 rounded-pill p-1 w-20 h-9"
    >
      <motion.div
        className="absolute w-9 h-7 bg-brand-500 rounded-pill"
        animate={{ x: lang === 'en' ? 4 : 40 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      />
      <div className="relative flex justify-between w-full px-2 text-[10px] font-bold uppercase tracking-wider z-10 pointer-events-none">
        <span className={lang === 'en' ? 'text-white' : 'text-surface-500'}>EN</span>
        <span className={lang === 'ar' ? 'text-white' : 'text-surface-500'}>AR</span>
      </div>
    </button>
  );
}
