import React from 'react';
import { motion } from 'framer-motion';

export function CategoryTabs({ categories, activeId, onSelect }) {
  return (
    <div className="w-full flex overflow-x-auto gap-3 px-4 py-2 flex-nowrap md:justify-center snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {categories.map((cat) => {
        const isActive = activeId === cat.id;
        
        return (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={`
              relative px-5 py-2 rounded-full text-sm font-bold tracking-tight transition-all duration-300 
              whitespace-nowrap shrink-0 snap-center active:scale-95
              ${isActive 
                ? 'bg-[#1C1C1C] text-[#ECE7DC] shadow-md' 
                : 'bg-transparent text-[#1C1C1C]/70 hover:text-[#1C1C1C] hover:bg-black/5'}
            `}
          >
            {/* Smooth transition for the active indicator if desired, 
                but here we use solid background classes on the button itself as requested */}
            <span className="relative z-10">{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
}

