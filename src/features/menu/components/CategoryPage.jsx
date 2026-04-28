import React, { useMemo, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useMenuData } from '../hooks/useMenuData';
import { useLanguage } from '@/features/i18n';
import { CategoryTabs } from './CategoryTabs';
import { MenuGrid } from './MenuGrid';
import { ChevronLeft } from 'lucide-react';

export function CategoryPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { categories, restaurant } = useMenuData();
  const { t, isRTL } = useLanguage();

  // If categoryId is missing or invalid, maybe redirect to home?
  useEffect(() => {
    if (categories && categoryId) {
      const isValid = categories.some(c => c.id === categoryId);
      if (!isValid) {
        navigate('/');
      }
    }
  }, [categories, categoryId, navigate]);

  const activeItems = useMemo(
    () => categories?.find((cat) => cat.id === categoryId)?.items || [],
    [categories, categoryId],
  );

  const handleSelectCategory = (id) => {
    navigate(`/category/${id}`);
  };

  if (!categories) return null;

  return (
    <section className="flex flex-col gap-6 py-4 relative">
      <div className="px-6 flex items-center justify-start absolute top-4 z-10 w-full">
        <Link 
          to="/" 
          className="group flex items-center gap-2.5 text-[#1C1C1C] font-semibold text-sm tracking-wide bg-white/40 hover:bg-white/60 border border-white/60 backdrop-blur-xl px-5 py-2.5 rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <div className="bg-[#1C1C1C]/5 p-1 rounded-full group-hover:bg-[#1C1C1C]/10 transition-colors">
            <ChevronLeft size={18} strokeWidth={2.5} className={isRTL ? 'rotate-180' : ''} />
          </div>
          <span>{t('common.back', 'Back to Categories')}</span>
        </Link>
      </div>

      <div className="text-center px-6 flex flex-col gap-2 mt-12 md:mt-10">
        <h2 className="font-display text-4xl md:text-5xl text-[#1C1C1C] tracking-tight">
          {t('menu.title')}
        </h2>
        <p className="text-xs text-[#1C1C1C]/80 tracking-widest uppercase font-bold">
          {restaurant.tagline}
        </p>
      </div>

      <div className="sticky top-0 z-50 bg-[#ECE7DC]/85 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.03)] -mx-6 px-6 pt-2 pb-2 transition-all duration-300">
        <CategoryTabs
          categories={categories}
          activeId={categoryId}
          onSelect={handleSelectCategory}
        />
      </div>

      <MenuGrid items={activeItems} isPending={false} />
    </section>
  );
}
