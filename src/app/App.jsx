import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppProviders } from './providers/AppProviders';
import { MainLayout } from './layouts/MainLayout';
import { MinimalLayout } from './layouts/MinimalLayout';
import { useLanguage } from '@/features/i18n';
import MenuPage from '@/pages/MenuPage';
import AboutPage from '@/pages/AboutPage';
import LinkTreePage from '@/pages/LinkTreePage';
import { CategoryPage } from '@/features/menu/components/CategoryPage';

import { ScrollToTop } from '@/shared/components/ScrollToTop';
import { useSmartRefresh } from '@/shared/hooks/useSmartRefresh';

function App() {
  const { t } = useLanguage();
  useSmartRefresh();

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Kiosk Core Experience */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<AboutPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
        </Route>

        {/* Marketing Link Tree */}
        <Route element={<MinimalLayout />}>
          <Route path="/linktree" element={<LinkTreePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
