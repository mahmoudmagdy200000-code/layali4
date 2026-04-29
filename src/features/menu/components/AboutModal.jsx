import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import useMenuData from '../hooks/useMenuData';
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
            <h2 className="font-['Amiri'] text-2xl font-bold text-gray-900">
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
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-3xl mx-auto px-6 py-12 flex flex-col gap-8 text-center">
              <motion.h1
                className="font-['Amiri'] text-4xl md:text-5xl font-medium text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {t('links.story')}
              </motion.h1>

              <motion.p
                className="font-['Amiri'] text-2xl font-normal text-gray-600 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {restaurant.tagline}
              </motion.p>

              {/* Elegant Visual Separator */}
              <motion.div
                className="relative flex items-center justify-center w-full max-w-sm mx-auto mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex-grow h-[1px] bg-gradient-to-r from-transparent via-gray-400/30 to-transparent"></div>
                <span className="mx-4 text-[10px] text-gray-400 rotate-45 border border-gray-400/40 p-[2px]">
                  <div className="w-1 h-1 bg-gray-400/60"></div>
                </span>
                <div className="flex-grow h-[1px] bg-gradient-to-r from-transparent via-gray-400/30 to-transparent"></div>
              </motion.div>

              <motion.p
                className="font-['Alexandria'] text-lg md:text-xl text-gray-700 leading-[2.5] text-center whitespace-pre-line"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                {restaurant.description}
              </motion.p>

              <div className="mt-12 py-12">
                <img
                  src="/assets/logo.png"
                  alt="Logo"
                  className="h-20 w-auto mx-auto opacity-10 grayscale pointer-events-none"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
  );
}
