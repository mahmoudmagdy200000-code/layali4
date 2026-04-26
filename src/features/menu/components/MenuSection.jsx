import React from 'react';
import { useMenuData } from '../hooks/useMenuData';
import { useLanguage } from '@/features/i18n';
import { useActiveCategory } from '../hooks/useActiveCategory';
import { CategoryTabs } from './CategoryTabs';
import { MenuGrid } from './MenuGrid';

export function MenuSection() {
  const { categories, restaurant } = useMenuData();
  const { t } = useLanguage();
  const { activeId, setActiveId } = useActiveCategory(categories[0]?.id);

  const activeItems = categories.find((cat) => cat.id === activeId)?.items || [];

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

      <div className="sticky top-0 z-50 bg-[#ECE7DC]/85 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.03)] -mx-6 px-6 pt-4 pb-2 transition-all duration-300">
        <CategoryTabs
          categories={categories}
          activeId={activeId}
          onSelect={setActiveId}
        />
      </div>

      <MenuGrid items={activeItems} />
    </section>
  );
}
