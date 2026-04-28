import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppProviders } from './providers/AppProviders';
import { MainLayout } from './layouts/MainLayout';
import { MinimalLayout } from './layouts/MinimalLayout';
import { useLanguage } from '@/features/i18n';
import { LinkTreeSection } from '@/features/link-tree';
import { AboutModal } from '@/features/menu/components/AboutModal';
import { HomeCategoryGrid } from '@/features/home/components/HomeCategoryGrid';
import { CategoryPage } from '@/features/menu/components/CategoryPage';

function App() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const { t } = useLanguage();

  const handleLinkAction = (action) => {
    if (action === 'story') {
      setIsAboutOpen(true);
    }
  };

  return (
    <>
      <Routes>
        {/* Kiosk Core Experience */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomeCategoryGrid />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
        </Route>

        {/* Marketing Link Tree */}
        <Route element={<MinimalLayout />}>
          <Route 
            path="/links" 
            element={
              <div className="pt-12 px-6 pb-20">
                <h2 className="font-display text-2xl text-gray-900 text-center mb-8">
                  {t('links.section_title')}
                </h2>
                <LinkTreeSection onAction={handleLinkAction} />
              </div>
            } 
          />
        </Route>
      </Routes>

      <AboutModal 
        isOpen={isAboutOpen} 
        onClose={() => setIsAboutOpen(false)} 
      />
    </>
  );
}

export default App;
