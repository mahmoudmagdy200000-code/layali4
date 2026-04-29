import React from 'react';
import { motion } from 'framer-motion';
import useMenuData from '../features/menu/hooks/useMenuData';
import { useLanguage } from '@/features/i18n';

export default function LandingPage() {
  const { restaurant } = useMenuData() || {};
  const { t } = useLanguage();

  if (!restaurant) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 py-12 text-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-12"
      >
        <img 
          src="/assets/logo.png" 
          alt="Logo" 
          className="h-32 w-auto mx-auto"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="max-w-2xl mx-auto space-y-8"
      >
        <h1 className="font-display text-3xl md:text-4xl font-bold text-[#233a34] tracking-tight">
          {t('links.story')}
        </h1>

        <div className="h-px bg-[#233a34]/20 w-24 mx-auto" />

        <p className="text-[#233a34] leading-relaxed font-serif italic text-xl md:text-2xl">
          {restaurant.tagline}
        </p>

        <p className="text-gray-700 text-base md:text-lg leading-relaxed whitespace-pre-line">
          {restaurant.description}
        </p>
      </motion.div>
    </div>
  );
}
