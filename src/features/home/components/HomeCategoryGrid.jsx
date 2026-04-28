import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMenuData } from '@/features/menu/hooks/useMenuData';
import { useLanguage } from '@/features/i18n';
import { motion } from 'framer-motion';
import { 
  Coffee, 
  Flame, 
  Salad, 
  CakeSlice, 
  Utensils, 
  Soup, 
  Beef, 
  Calendar, 
  CupSoda 
} from 'lucide-react';

const CATEGORY_ICONS = {
  breakfast: Coffee,
  grills: Flame,
  hot_meza: Utensils,
  daily: Calendar,
  cold_meza: Salad,
  soup: Soup,
  raw_meat: Beef,
  dessert: CakeSlice,
  hot_drinks: Coffee,
  coffee: Coffee,
  soft_drinks: CupSoda,
  juices: CupSoda,
};

export function HomeCategoryGrid() {
  const { categories, restaurant } = useMenuData();
  const { t } = useLanguage();
  const navigate = useNavigate();

  if (!categories) return null;

  return (
    <section className="flex flex-col gap-10 py-16">
      <div className="text-center px-6 flex flex-col gap-4">
        <h2 className="font-display text-7xl text-[#1C1C1C] tracking-tight">
          {t('menu.title')}
        </h2>
        <p className="text-sm text-[#1C1C1C]/80 tracking-widest uppercase font-bold">
          {restaurant.tagline}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 px-6 max-w-7xl mx-auto w-full">
        {categories.map((category) => {
          const Icon = CATEGORY_ICONS[category.id] || Utensils;
          
          return (
            <motion.div
              key={category.id}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(`/category/${category.id}`)}
              className="cursor-pointer flex flex-col items-center justify-center p-4 md:p-6 text-center rounded-3xl aspect-square w-full h-full min-h-[160px] shadow-sm hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-[#ECE7DC] to-[#E3DCCF] border border-white/50"
            >
              <div className="bg-[#233a34] text-[#ECE7DC] p-5 rounded-full mb-6 shadow-inner">
                <Icon size={48} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl md:text-3xl font-display text-[#1C1C1C] tracking-wide text-center leading-tight">
                {category.label}
              </h3>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
