import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/features/i18n';

/**
 * MenuItemCard — Image Grid Overlay variant.
 * Renders as a full-bleed image tile with a gradient overlay
 * displaying only the item name and price.
 * Clicking opens the detail modal (handled by parent via onSelect).
 */
export function MenuItemCard({ image, title, description, price, currency, tags, categoryId, onSelect }) {
  const { isRTL, t } = useLanguage();

  const displayImage = image;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      onClick={onSelect}
      className="relative overflow-hidden rounded-xl cursor-pointer group"
    >
      {/* Full-bleed Image */}
      <div className="aspect-square w-full">
        <img
          src={displayImage}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://placehold.co/400x400/e2e8f0/475569?text=Food';
          }}
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

      {/* Popular Badge: Top corner */}
      {tags?.includes('popular') && (
        <div className={`absolute top-2.5 ${isRTL ? 'right-2.5' : 'left-2.5'} z-10`}>
          <span className="bg-brand-600 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-lg">
            {t('common.popular')}
          </span>
        </div>
      )}

      {/* Bottom Text Overlay: Name + Price */}
      <div className="absolute bottom-0 left-0 right-0 p-3 flex justify-between items-end gap-2">
        <h3 className="font-display text-sm sm:text-base font-bold text-white leading-tight line-clamp-2 flex-1">
          {title}
        </h3>
        <span
          className="font-display text-xs sm:text-sm font-semibold text-brand-500 whitespace-nowrap"
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          {`${price} ${currency}`}
        </span>
      </div>
    </motion.div>
  );
}
