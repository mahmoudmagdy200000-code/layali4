import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/features/i18n';

export function LanguageToggle() {
  const { lang, toggleLang } = useLanguage();

  // Fixed positions: EN is always on the left, AR is always on the right
  const xValue = lang === 'en' ? 4 : 40;

  return (
    <button
      onClick={toggleLang}
      className="relative flex items-center bg-white/20 backdrop-blur-md rounded-full p-1 w-20 h-9 border border-black/5 shadow-sm overflow-hidden"
      aria-label="Toggle Language"
    >
      {/* Sliding Background Pill - Anchored to the left for consistent X translation */}
      <motion.div
        className="absolute left-1 top-1 w-9 h-7 bg-[#233a34] rounded-full"
        animate={{ x: xValue }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      />
      
      {/* Language Labels - Forced to LTR to keep EN/AR positions stable */}
      <div className="relative flex flex-row justify-between w-full px-2 text-[10px] font-bold uppercase tracking-wider z-10 pointer-events-none" style={{ direction: 'ltr' }}>
        <span className={`${lang === 'en' ? 'text-[#ECE7DC]' : 'text-[#233a34]/60'} transition-colors duration-300`}>
          EN
        </span>
        <span className={`${lang === 'ar' ? 'text-[#ECE7DC]' : 'text-[#233a34]/60'} transition-colors duration-300`}>
          AR
        </span>
      </div>

    </button>
  );
}


