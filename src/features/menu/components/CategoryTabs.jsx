import React from 'react';
import { motion } from 'framer-motion';

export function CategoryTabs({ categories, activeId, onSelect }) {
  return (
    <div className="flex flex-row overflow-x-auto whitespace-nowrap gap-3 py-3 w-full px-4 sm:px-6 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {categories.map((cat) => {
        const isActive = activeId === cat.id;
        
        return (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={`
              relative px-5 py-2.5 rounded-full text-sm font-bold tracking-tight transition-colors duration-300 
              shrink-0 min-w-max whitespace-nowrap snap-center outline-none
              ${isActive 
                ? 'text-[#ECE7DC]' 
                : 'text-[#233a34]/70 hover:text-[#233a34] hover:bg-black/5'}
            `}
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            {isActive && (
              <motion.div
                layoutId="activeCategoryTab"
                className="absolute inset-0 bg-[#233a34] rounded-full shadow-md"
                initial={false}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 block transform-gpu">{cat.label}</span>
          </button>
        );
      })}


    </div>
  );
}


