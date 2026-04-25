import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuItemCard } from './MenuItemCard';

export function MenuGrid({ items }) {
  return (
    <div className="grid grid-cols-2 gap-4 px-6 pb-20">
      <AnimatePresence mode="popLayout">
        {items.map((item) => (
          <MenuItemCard key={item.id} {...item} />
        ))}
      </AnimatePresence>
    </div>
  );
}
