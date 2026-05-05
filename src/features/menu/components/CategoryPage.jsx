import React, { useMemo, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import useMenuData from '../hooks/useMenuData';
import { useLanguage } from '@/features/i18n';
import { useSwipeGesture } from '../hooks/useSwipeGesture';
import { CategoryTabs } from './CategoryTabs';
import { MenuGrid } from './MenuGrid';
import { ChevronLeft } from 'lucide-react';

export function CategoryPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { categories, restaurant } = useMenuData();
  const { t, isRTL } = useLanguage();

  // Swipe to navigate between categories:
  // Visual swipe-right (in LTR) or swipe-left (in RTL) = go to previous category / back to menu
  // Visual swipe-left (in LTR) or swipe-right (in RTL) = go to next category
  const currentIndex = useMemo(
    () => categories?.findIndex(c => c.id === categoryId) ?? -1,
    [categories, categoryId],
  );

  const swipeHandlers = useSwipeGesture({
    onSwipeLeft: () => {
      // Visual swipe left
      if (isRTL) {
        // RTL: swipe left = go to previous category or back to menu
        if (currentIndex > 0) {
          navigate(`/category/${categories[currentIndex - 1].id}`);
        } else {
          navigate('/menu');
        }
      } else {
        // LTR: swipe left = go to next category
        if (currentIndex < categories.length - 1) {
          navigate(`/category/${categories[currentIndex + 1].id}`);
        }
      }
    },
    onSwipeRight: () => {
      // Visual swipe right
      if (isRTL) {
        // RTL: swipe right = go to next category
        if (currentIndex < categories.length - 1) {
          navigate(`/category/${categories[currentIndex + 1].id}`);
        }
      } else {
        // LTR: swipe right = go to previous category or back to menu
        if (currentIndex > 0) {
          navigate(`/category/${categories[currentIndex - 1].id}`);
        } else {
          navigate('/menu');
        }
      }
    },
    isRTL,
    threshold: 60,
    enabled: !!categories && categories.length > 0,
  });

  // If categoryId is missing or invalid, maybe redirect to home?
  useEffect(() => {
    if (categories && categoryId) {
      const isValid = categories.some(c => c.id === categoryId);
      if (!isValid) {
        navigate('/');
      }
    }
  }, [categories, categoryId, navigate]);

  // Implement Scroll Restoration on Tab Switch (Crucial UX fix)
  useEffect(() => {
    if (categoryId) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [categoryId]);

  const activeItems = useMemo(
    () => categories?.find((cat) => cat.id === categoryId)?.items || [],
    [categories, categoryId],
  );

  const handleSelectCategory = (id) => {
    navigate(`/category/${id}`);
  };

  if (!categories) return null;

  return (
    <section className="flex flex-col pt-24 pb-4 relative">
      <div className="sticky top-24 z-50 bg-[#ECE7DC]/85 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.03)] -mx-6 px-6 pt-2 pb-2 transition-all duration-300">
        <CategoryTabs
          categories={categories}
          activeId={categoryId}
          onSelect={handleSelectCategory}
        />
      </div>

      <div className="mt-6" {...swipeHandlers}>
        <MenuGrid
          items={activeItems}
          isPending={false}
          onReachEnd={() => {
            // Swiped past the last item → go to next category
            if (currentIndex < categories.length - 1) {
              navigate(`/category/${categories[currentIndex + 1].id}`);
            }
          }}
          onReachStart={() => {
            // Swiped before the first item → go to previous category
            if (currentIndex > 0) {
              navigate(`/category/${categories[currentIndex - 1].id}`);
            }
          }}
        />
      </div>
    </section>
  );
}
