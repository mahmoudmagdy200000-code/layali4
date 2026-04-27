import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuItemCard } from './MenuItemCard';

export function MenuGrid({ items }) {
  if (!items || items.length === 0) {
    return (
      <div className="w-full py-20 text-center text-brand-900/50 font-display">
        No items available in this category.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 px-6 pb-20">
      <AnimatePresence mode="popLayout">
        {items.map((item) => (
          <MenuItemCard key={item.id} {...item} />
        ))}
      </AnimatePresence>
    </div>
  );
}
