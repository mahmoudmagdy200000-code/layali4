import React, { useMemo, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import useMenuData from '../hooks/useMenuData';
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
    <section className="flex flex-col gap-6 pt-20 pb-4 relative">
      <div className="sticky top-16 z-50 bg-[#ECE7DC]/85 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.03)] -mx-6 px-6 pt-2 pb-2 transition-all duration-300">
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
