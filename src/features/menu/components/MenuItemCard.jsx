import React from 'react';
import { motion } from 'framer-motion';
import { formatCurrency } from '@/shared/utils/formatCurrency';
import { useLanguage } from '@/features/i18n';

export function MenuItemCard({ image, title, description, price, currency, tags }) {
  const { isRTL, t } = useLanguage();
  const hasImage = !!image;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`relative group rounded-xl overflow-hidden border border-surface-200/20 dark:border-surface-800/20 shadow-sm transition-all duration-300 hover:shadow-md ${
        hasImage ? 'bg-surface-container aspect-square md:aspect-auto md:h-80' : 'bg-surface-900 p-6 flex flex-col justify-center min-h-[160px]'
      }`}
    >
      {hasImage && (
        <>
          {/* Image Layer */}
          <div className="absolute inset-0 w-full h-full bg-surface-200 dark:bg-surface-800">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-surface-950/60 to-transparent" />
        </>
      )}

      {/* Popular Badge */}
      {tags?.includes('popular') && (
        <div className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} bg-brand-500 text-white text-[10px] font-bold uppercase px-2 py-1 rounded-md z-20`}>
          {t('common.popular')}
        </div>
      )}

      {/* Content Layer */}
      <div className={`${hasImage ? 'absolute inset-0 p-6 flex flex-col justify-end' : 'relative flex flex-col h-full'} z-10`}>
        <div className="flex flex-col gap-1 mb-2">
          <h3 className="font-display text-lg font-bold break-words text-brand-500 leading-tight">
            {title}
          </h3>
          <p className={`text-sm line-clamp-3 mb-3 ${hasImage ? 'text-white/80' : 'text-surface-500'}`}>
            {description}
          </p>
        </div>
        
        <div className="mt-auto flex justify-end">
          <span className="font-display text-base font-semibold text-yellow-600 dark:text-yellow-500 whitespace-nowrap">
            {formatCurrency(price, currency, isRTL)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
