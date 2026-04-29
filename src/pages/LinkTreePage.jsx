import React from 'react';
import { LinkTreeSection } from '@/features/link-tree/components/LinkTreeSection';
import { useLanguage } from '@/features/i18n';

export default function LinkTreePage() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen pt-12 px-6 pb-4">
      {/* Logo */}
      <div className="flex flex-col items-center mb-10">
        <img 
          src="/assets/logo.png" 
          alt="Layali Albatroun Logo" 
          className="w-48 md:w-56 h-auto drop-shadow-md"
        />
      </div>

      <h2 className="font-display text-2xl text-gray-900 text-center mb-8">
        {t('links.section_title')}
      </h2>
      
      <div className="flex-1">
        <LinkTreeSection />
      </div>

      {/* Agency Footer */}
      <footer className="text-xs md:text-sm text-gray-400 text-center mt-auto pt-8 pb-4">
        <p>
          © 2026 جميع الحقوق محفوظة لـ <a href="#" className="text-gray-300 hover:text-white underline transition-colors">شركة GSTC</a> إعداد وتنفيذ: <a href="#" className="text-gray-300 hover:text-white underline transition-colors">شركة التقنيات العلمية العالمية</a>
        </p>
      </footer>
    </div>
  );
}
