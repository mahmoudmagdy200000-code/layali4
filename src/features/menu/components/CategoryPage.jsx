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
    <section className="flex flex-col gap-8 py-8 md:py-12 relative">
      <div className="px-6 flex items-center justify-start absolute top-8 md:top-12 z-10 w-full">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-[#1C1C1C]/70 hover:text-[#1C1C1C] transition-colors font-medium bg-[#ECE7DC]/50 hover:bg-[#ECE7DC] backdrop-blur-md px-4 py-2 rounded-full shadow-sm"
        >
          <ChevronLeft size={20} className={isRTL ? 'rotate-180' : ''} />
          <span>{t('common.back', 'Back to Categories')}</span>
        </Link>
      </div>

      <div className="text-center px-6 flex flex-col gap-4 mt-16 md:mt-12">
        <h2 className="font-display text-5xl md:text-7xl text-[#1C1C1C] tracking-tight">
          {t('menu.title')}
        </h2>
        <p className="text-sm text-[#1C1C1C]/80 tracking-widest uppercase font-bold">
          {restaurant.tagline}
        </p>
      </div>

      <div className="sticky top-0 z-50 bg-[#ECE7DC]/85 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.03)] -mx-6 px-6 pt-4 pb-2 transition-all duration-300">
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
