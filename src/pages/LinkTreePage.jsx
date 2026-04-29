import React from 'react';
import { LinkTreeSection } from '@/features/link-tree/components/LinkTreeSection';
import { useLanguage } from '@/features/i18n';

export default function LinkTreePage() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen pt-12 px-6 pb-4">
      {/* Logo & Subtitle */}
      <div className="flex flex-col items-center mb-10">
        <img 
          src="/assets/logo.png" 
          alt="Layali Albatroun Logo" 
          className="w-48 md:w-56 h-auto drop-shadow-md"
        />
        <p className="text-lg text-gray-600 font-medium text-center mt-2">
          {t('menu.tagline')}
        </p>
      </div>

      <h2 className="font-display text-2xl text-gray-900 text-center mb-8">
        {t('links.section_title')}
      </h2>
      
      <div className="flex-1">
        <LinkTreeSection />
      </div>

      {/* Agency Footer */}
      <footer className="text-xs md:text-sm text-gray-400 text-center mt-auto pt-8 pb-4">
        © 2026 جميع الحقوق محفوظة لشركة GSTC إعداد وتنفيذ: شركة التقنيات العلمية العالمية
      </footer>
    </div>
  );
}
