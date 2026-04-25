import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/features/i18n';

export function LanguageToggle() {
  const { lang, isRTL, toggleLang } = useLanguage();

  // In LTR: EN is on the left (x=4), AR is on the right (x=40)
  // In RTL: The flex container flips. AR is on the left (x=4), EN is on the right (x=40)
  const xValue = isRTL 
    ? (lang === 'en' ? 40 : 4) 
    : (lang === 'en' ? 4 : 40);

  return (
    <button
      onClick={toggleLang}
      className="relative flex items-center bg-white/20 backdrop-blur-md rounded-full p-1 w-20 h-9 border border-black/5 shadow-sm overflow-hidden"
      aria-label="Toggle Language"
    >
      {/* Sliding Background Pill */}
      <motion.div
        className="absolute w-9 h-7 bg-brand-500 rounded-full"
        animate={{ x: xValue }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      />
      
      {/* Language Labels */}
      <div className="relative flex justify-between w-full px-2 text-[10px] font-bold uppercase tracking-wider z-10 pointer-events-none">
        <span className={`${lang === 'en' ? 'text-brand-950' : 'text-gray-500'} transition-colors duration-300`}>
          EN
        </span>
        <span className={`${lang === 'ar' ? 'text-brand-950' : 'text-gray-500'} transition-colors duration-300`}>
          AR
        </span>
      </div>
    </button>
  );
}

