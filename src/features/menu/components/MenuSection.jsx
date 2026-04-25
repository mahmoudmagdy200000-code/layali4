import React from 'react';
import { useMenuData } from '../hooks/useMenuData';
import { useActiveCategory } from '../hooks/useActiveCategory';
import { CategoryTabs } from './CategoryTabs';
import { MenuGrid } from './MenuGrid';

export function MenuSection() {
  const { categories, restaurant } = useMenuData();
  const { activeId, setActiveId } = useActiveCategory(categories[0]?.id);

  const activeItems = categories.find((cat) => cat.id === activeId)?.items || [];

  return (
    <section className="flex flex-col gap-10 py-16">
      <div className="text-center px-6 flex flex-col gap-4">
        <h2 className="font-display text-7xl text-brand-500 tracking-tight">
          Menu
        </h2>
        <p className="text-sm text-brand-500/70 tracking-widest uppercase font-bold">
          {restaurant.tagline}
        </p>
      </div>

      <CategoryTabs
        categories={categories}
        activeId={activeId}
        onSelect={setActiveId}
      />

      <MenuGrid items={activeItems} />
    </section>
  );
}
