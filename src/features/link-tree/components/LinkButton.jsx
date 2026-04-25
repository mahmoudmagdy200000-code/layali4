import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/features/i18n';
import { ChevronRight } from 'lucide-react';

export function LinkButton({ href, icon: Icon, label, colorClass, index }) {
  const { isRTL } = useLanguage();

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-4 p-5 rounded-2xl border border-outline-variant transition-all group ${colorClass}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-black/20 text-white transition-colors ${isRTL ? 'order-last' : 'order-first'}`}>
        <Icon size={24} />
      </div>
      <div className="flex-1 flex flex-col">
        <span className="font-display text-lg font-medium text-white">
          {label}
        </span>
      </div>
      <ChevronRight 
        size={20} 
        className={`text-white/50 group-hover:text-white transition-colors ${isRTL ? 'rotate-180 order-first' : 'order-last'}`} 
      />
    </motion.a>
  );
}
