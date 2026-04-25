import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Info } from 'lucide-react';
import { useLanguage } from '@/features/i18n';
import { useMenuData } from '@/features/menu/hooks/useMenuData';
import { LanguageToggle } from './LanguageToggle';

export function Header({ onAboutOpen }) {
  const { t, isRTL } = useLanguage();
  const { restaurant } = useMenuData() || {};

  return (
    <header className="sticky top-0 z-50 bg-[#ECE7DC]/90 backdrop-blur-md border-b border-black/5">
      <motion.div
        className="max-w-md mx-auto px-6 py-4 flex justify-between items-center gap-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <img 
          src="/assets/logo.png" 
          alt="Logo" 
          className="h-10 w-auto object-contain shrink-0"
          loading="eager"
        />
        
        <div className="flex items-center gap-4">
          <button 
            onClick={onAboutOpen}
            className="w-10 h-10 rounded-full flex items-center justify-center text-gray-900 hover:bg-black/5 transition-colors"
          >
            <Info size={20} />
          </button>
          <LanguageToggle />
        </div>
      </motion.div>
    </header>
  );
}
