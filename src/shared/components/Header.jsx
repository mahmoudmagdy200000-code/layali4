import React from 'react';
import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';
import { useLanguage } from '@/features/i18n';
import { LanguageToggle } from './LanguageToggle';

export function Header() {
  const { t, isRTL } = useLanguage();

  return (
    <header className="sticky top-0 z-50 bg-surface-950/90 backdrop-blur-md border-b border-outline-variant">
      <motion.div
        className="max-w-md mx-auto px-6 py-4 flex justify-between items-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <img 
          src="/assets/logo.png" 
          alt="Layali Al Batroun Logo" 
          className="h-12 w-auto object-contain"
          loading="eager"
        />
        
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
