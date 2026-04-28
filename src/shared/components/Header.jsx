import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import { useLanguage } from '@/features/i18n';
import { LanguageToggle } from './LanguageToggle';

export function Header() {
  const { isRTL, t } = useLanguage();
  const location = useLocation();
  const isCategoryView = location.pathname.startsWith('/category/');

  if (isCategoryView) {
    return (
      <header className="fixed top-0 left-0 right-0 z-[60] bg-[#ECE7DC]/90 backdrop-blur-md border-b border-black/5 h-16 px-4 flex items-center justify-between">
        {/* Language Switcher */}
        <div className={`relative z-10 flex items-center ${isRTL ? 'order-1' : 'order-3'}`}>
           <LanguageToggle />
        </div>

        {/* Logo & Menu Title */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <img 
            src="/assets/logo.png" 
            alt="Logo" 
            className="h-9 w-auto object-contain"
          />
          <span className="font-arabic text-xs font-bold text-[#233a34] uppercase tracking-wide -mt-0.5">
             {t('menu.title')}
          </span>
        </div>

        {/* Home Icon (Liwan Architectural Emblem) */}
        <Link 
          to="/" 
          className={`relative z-10 p-1 hover:scale-110 transition-transform active:scale-95 ${isRTL ? 'order-3' : 'order-1'}`}
        >
          <img 
            src="/assets/home_icon_new.png" 
            alt="Home" 
            className="w-12 h-12 object-contain drop-shadow-lg"
          />
        </Link>
      </header>
    );
  }

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
