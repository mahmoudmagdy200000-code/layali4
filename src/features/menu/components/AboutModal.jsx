import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useMenuData } from '../hooks/useMenuData';
import { useLanguage } from '@/features/i18n';

export function AboutModal({ isOpen, onClose }) {
  const { restaurant } = useMenuData() || {};
  const { t } = useLanguage();

  if (!restaurant) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed inset-0 z-[100] bg-[#ECE7DC] flex flex-col"
        >
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-6 border-b border-black/5">
            <h2 className="font-display text-xl font-bold text-brand-900">
              {t('links.story')}
            </h2>
            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-gray-900"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-12 flex flex-col gap-8 text-center">
            <motion.p 
              className="text-brand-900 leading-relaxed font-serif italic text-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {restaurant.tagline}
            </motion.p>
            
            <motion.div 
              className="h-px bg-brand-900/10 w-24 mx-auto"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4 }}
            />

            <motion.p 
              className="text-gray-700 text-lg leading-relaxed max-w-sm mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {restaurant.description}
            </motion.p>

            <div className="mt-auto py-12">
              <img 
                src="/assets/logo.png" 
                alt="Logo" 
                className="h-16 w-auto mx-auto opacity-20 grayscale"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
