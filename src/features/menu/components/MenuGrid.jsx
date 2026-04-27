import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { MenuItemCard } from './MenuItemCard';
import { MenuItemDetailModal } from './MenuItemDetailModal';

/**
 * MenuGrid — Renders menu items in a tight image gallery grid.
 * 2 columns on mobile, 3 on tablets, 4 on large screens.
 * Manages the selected-item state for the detail modal.
 */
export function MenuGrid({ items, isPending = false }) {
  const [selectedItem, setSelectedItem] = useState(null);

  if (!items || items.length === 0) {
    return (
      <div className="w-full py-20 text-center text-brand-900/50 font-display">
        No items available in this category.
      </div>
    );
  }

  return (
    <>
      <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 px-4 sm:px-6 pb-20 transition-opacity duration-200 ${isPending ? 'opacity-70' : 'opacity-100'}`}>
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <MenuItemCard
              key={item.id}
              {...item}
              onSelect={() => setSelectedItem(item)}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Detail Modal: Opens when any card is clicked */}
      <MenuItemDetailModal
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </>
  );
}
