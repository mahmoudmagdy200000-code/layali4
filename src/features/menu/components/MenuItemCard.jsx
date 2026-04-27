import React from 'react';
import { motion } from 'framer-motion';
import { formatCurrency } from '@/shared/utils/formatCurrency';
import { useLanguage } from '@/features/i18n';

export function MenuItemCard({ image, title, description, price, currency, tags, categoryId }) {
  const { isRTL, t } = useLanguage();
  
  // The image is strictly provided by useMenuData (hardcoded unsplash or fallback)
  const displayImage = image;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex items-start gap-4 py-4 border-b border-black/5 last:border-0"
    >
      {/* Thumbnail Image: Small and elegant */}
      <div className="flex-shrink-0 w-20 h-20 overflow-hidden rounded-lg bg-gray-100">
        <img
          src={displayImage}
          alt={title}
          className="w-full h-full object-cover grayscale-[0.2] contrast-[1.1]"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = 'https://placehold.co/100x100/e2e8f0/475569?text=Food';
          }}
        />
      </div>

      {/* Content Area: Horizontal layout with dotted connector */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-display text-lg font-bold text-gray-900 break-words leading-tight">
            {title}
          </h3>
          
          {/* Dotted Connector: Hidden on very small screens, visible on tablet */}
          <div className="hidden sm:block flex-1 border-b border-dotted border-gray-300 mx-2 mb-1.5" />
          
          <span className="font-display text-base font-semibold text-brand-900 whitespace-nowrap" dir={isRTL ? "rtl" : "ltr"}>
            {`${price} ${currency}`}
          </span>
        </div>

        {description && description.trim() !== "" && (
          <p className="mt-1 text-sm text-gray-600 font-body leading-relaxed max-w-[85%]">
            {description}
          </p>
        )}
        
        {/* Popular Badge: Minimalist tag */}
        {tags?.includes('popular') && (
          <div className="mt-2 inline-flex items-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 bg-brand-500/10 px-1.5 py-0.5 rounded">
              {t('common.popular')}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

