import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/features/i18n';
import { LanguageToggle } from './LanguageToggle';

export function Header() {
  const { isRTL } = useLanguage();

  return (
    <header className="bg-transparent relative">
      {/* Utilities Container: Pinned to top corners via absolute positioning */}
      <div className="absolute top-4 left-0 right-0 w-full px-6 flex justify-between items-start z-10">
        {/* Language Toggle (AR/EN) */}
        <LanguageToggle />
      </div>

      {/* Hero Logo Container: Centered branding below the utilities */}
      <div className="pt-16 pb-8 w-full flex justify-center items-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <img 
            src="/assets/logo.png" 
            alt="Logo" 
            className="w-48 sm:w-56 h-auto object-contain"
            loading="eager"
          />
        </motion.div>
      </div>
    </header>
  );
}

