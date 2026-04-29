import React from 'react';
import { motion } from 'framer-motion';
import useMenuData from '../features/menu/hooks/useMenuData';
import { useLanguage } from '@/features/i18n';

export default function LandingPage() {
  const { restaurant } = useMenuData() || {};
  const { t } = useLanguage();

  if (!restaurant) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 pt-28 pb-12 text-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="max-w-2xl mx-auto space-y-10"
      >
        <h1 className="font-display text-3xl md:text-5xl font-bold text-[#233a34] tracking-tight border-b-2 border-[#D4AF37]/20 pb-4 inline-block">
          {t('links.story')}
        </h1>

        <p className="text-[#233a34] leading-relaxed font-serif italic text-2xl md:text-3xl">
          {restaurant.tagline}
        </p>

        <p className="text-gray-700 text-lg md:text-xl leading-loose whitespace-pre-line font-[var(--font-arabic-premium)]">
          {restaurant.description}
        </p>
      </motion.div>
    </div>
  );
}
