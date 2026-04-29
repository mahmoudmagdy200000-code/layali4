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
            {/* Full-bleed Image Wrapper */}
            <div className="relative aspect-square w-full overflow-hidden">
                <img
                    src={image || '/assets/menu/placeholder.jpg'}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 transform-gpu will-change-transform scale-110 group-hover:scale-[1.25]"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/assets/menu/placeholder.jpg';
                    }}
                />
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

            {/* Popular Badge: Top corner */}
            {tags?.includes('popular') && (
                <div className={`absolute top-2.5 ${isRTL ? 'right-2.5' : 'left-2.5'} z-10`}>
                    <span className="bg-brand-600 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-lg">
                        {t('common.popular')}
                    </span>
                </div>
            )}

            {/* Bottom Text Overlay: Name + Description + Price */}
            <div className="absolute bottom-0 left-0 right-0 px-3 pt-3 pb-4 md:px-4 md:pb-5 flex flex-col justify-end items-start gap-1">
                <h3 className="font-display text-sm sm:text-base md:text-lg font-bold text-white leading-tight w-full">
                    {title}
                </h3>
                {description && (
                    <p className="text-[10px] sm:text-xs text-white/90 leading-snug w-full mb-1">
                        {description}
                    </p>
                )}
                <span
                    className="font-display text-xs sm:text-sm font-semibold text-[#FFD700] drop-shadow-md"
                    dir={isRTL ? 'rtl' : 'ltr'}
                >
                    {`${price} ${currency}`}
                </span>
            </div>
        </motion.div>
    );
}
