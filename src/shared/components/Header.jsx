import React from 'react';
import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';
import { useLanguage } from '@/features/i18n';
import { useMenuData } from '@/features/menu/hooks/useMenuData';
import { LanguageToggle } from './LanguageToggle';

export function Header() {
  const { t, isRTL } = useLanguage();
  const { restaurant } = useMenuData() || {};

  return (
    <header className="sticky top-0 z-50 bg-surface-950/90 backdrop-blur-md border-b border-outline-variant">
      <motion.div
        className="max-w-md mx-auto px-6 py-4 flex justify-between items-center gap-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="flex items-center gap-3 min-w-0">
          <img 
            src="/assets/logo.png" 
            alt="Logo" 
            className="h-10 w-auto object-contain shrink-0"
            loading="eager"
          />
          <h1 className="text-lg md:text-xl font-bold tracking-wide text-brand-500 truncate">
            {restaurant?.name}
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden xs:flex flex-col items-end">
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-500/70">
              Open Now
            </span>
          </div>
          <Bell size={18} className="text-brand-500" />
          <LanguageToggle />
        </div>
      </motion.div>
    </header>
  );
}
