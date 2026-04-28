import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppProviders } from './providers/AppProviders';
import { MainLayout } from './layouts/MainLayout';
import { MinimalLayout } from './layouts/MinimalLayout';
import { useLanguage } from '@/features/i18n';
import { LinkTreeSection } from '@/features/link-tree';
import { HomeCategoryGrid } from '@/features/home/components/HomeCategoryGrid';
import { CategoryPage } from '@/features/menu/components/CategoryPage';

import { ScrollToTop } from '@/shared/components/ScrollToTop';

function App() {
  const { t } = useLanguage();

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Kiosk Core Experience */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomeCategoryGrid />} />
          <Route path="/menu" element={<Navigate to="/" replace />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
        </Route>

        {/* Marketing Link Tree */}
        <Route element={<MinimalLayout />}>
          <Route 
            path="/linktree" 
            element={
              <div className="pt-12 px-6 pb-20">
                <h2 className="font-display text-2xl text-gray-900 text-center mb-8">
                  {t('links.section_title')}
                </h2>
                <LinkTreeSection />
              </div>
            } 
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
