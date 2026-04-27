import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useLanguage } from '@/features/i18n';

/**
 * MenuItemDetailModal — Full-screen modal that reveals the
 * high-resolution image, full description, and price of a menu item.
 * Supports click-outside-to-close and Escape key dismissal.
 */
export function MenuItemDetailModal({ item, isOpen, onClose }) {
  const { isRTL, t } = useLanguage();

  // Close on Escape key
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll while modal is open
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!item) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          {/* Modal Content Card */}
          <motion.div
            key="modal-content"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-[#ECE7DC] rounded-2xl overflow-hidden max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <X size={18} className="text-white" />
            </button>

            {/* High-Resolution Image */}
            <div className="w-full aspect-[4/3] overflow-hidden flex-shrink-0">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://placehold.co/800x600/e2e8f0/475569?text=Food';
                }}
              />
            </div>

            {/* Details Section */}
            <div className="p-6 flex flex-col gap-3 overflow-y-auto text-start">
              {/* Name + Price Row */}
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-display text-2xl font-bold text-gray-900 leading-tight flex-1">
                  {item.title}
                </h2>
                <span
                  className="font-display text-xl font-bold text-brand-600 whitespace-nowrap mt-0.5"
                  dir={isRTL ? 'rtl' : 'ltr'}
                >
                  {`${item.price} ${item.currency}`}
                </span>
              </div>

              {/* Popular Badge */}
              {item.tags?.includes('popular') && (
                <div className="inline-flex">
                  <span className="bg-brand-600/15 text-brand-600 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md">
                    {t('common.popular')}
                  </span>
                </div>
              )}

              {/* Full Description */}
              {item.description && item.description.trim() !== '' && (
                <p className="text-base text-gray-800 font-body leading-loose">
                  {item.description}
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
