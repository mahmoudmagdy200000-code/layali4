import React from 'react';
import { motion } from 'framer-motion';

export function CategoryTabs({ categories, activeId, onSelect }) {
  return (
    <div className="flex gap-stack-sm overflow-x-auto scrollbar-hidden px-6 py-2">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={`relative px-4 py-1.5 rounded-sm text-xs font-bold uppercase tracking-widest transition-all duration-200 whitespace-nowrap active:scale-90 ${
            activeId === cat.id ? 'text-surface-950' : 'text-surface-0/40 hover:text-surface-0'
          }`}
        >
          {activeId === cat.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-brand-500 rounded-sm shadow-tab"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{cat.label}</span>
        </button>
      ))}
    </div>
  );
}
