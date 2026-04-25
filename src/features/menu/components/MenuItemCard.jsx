import React from 'react';
import { motion } from 'framer-motion';
import { formatCurrency } from '@/shared/utils/formatCurrency';
import { useLanguage } from '@/features/i18n';

export function MenuItemCard({ image, title, description, price, currency, tags }) {
  const { isRTL, t } = useLanguage();
  
  // Use item image or premium Mediterranean placeholder
  const displayImage = image || 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=600&q=80';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white/90 backdrop-blur-sm rounded-2xl border border-black/5 shadow-[0_4px_30px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col h-full group transition-all duration-300 hover:shadow-lg"
    >
      {/* Image Container: Top-aligned with h-48 and hover effect */}
      <div className="w-full h-48 overflow-hidden rounded-t-2xl relative">
        <img
          src={displayImage}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Popular Badge: Floating over the image */}
        {tags?.includes('popular') && (
          <div className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} bg-brand-950 text-white text-[10px] font-bold uppercase px-2 py-1 rounded-md z-20`}>
            {t('common.popular')}
          </div>
        )}
      </div>

      {/* Content Area: Vertical layout for text and price */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex flex-col gap-1 mb-4">
          <h3 className="font-display text-lg font-bold text-gray-900 break-words leading-tight">
            {title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">
            {description}
          </p>
        </div>
        
        <div className="mt-auto flex justify-between items-center">
          <span className="font-display text-base font-semibold text-brand-900">
            {formatCurrency(price, currency, isRTL)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

