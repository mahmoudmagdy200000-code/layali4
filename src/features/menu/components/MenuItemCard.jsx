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
      <div className={`${hasImage ? 'absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end h-full' : 'relative'} z-10`}>
        <div className="flex justify-between items-start mb-2 gap-3">
          <h3 className="font-display font-medium text-xl text-brand-500 leading-tight flex-1 break-words">
            {title}
          </h3>
          <span className="font-display text-sm text-brand-600 font-bold whitespace-nowrap shrink-0 mt-1">
            {formatCurrency(price, currency, isRTL)}
          </span>
        </div>
        <p className={`text-xs leading-relaxed line-clamp-3 ${hasImage ? 'text-brand-500/80' : 'text-on-surface-variant'}`}>
          {description}
        </p>
      </div>
    </motion.div>
  );
}
