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

      <div className="flex-1">
        <LinkTreeSection />
      </div>

      {/* Agency Footer */}
      <footer className="mt-auto pt-8 pb-4 flex flex-col items-center gap-4">
        <p className="text-[10px] sm:text-xs text-gray-500 font-medium tracking-wide text-center px-4">
          © 2026 جميع الحقوق محفوظة لشركة GSTC
        </p>
        <a 
          href="https://gstckw.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center justify-center gap-3 group transition-all"
        >
          <span className="text-[10px] sm:text-xs text-gray-500 font-medium tracking-wide group-hover:text-gray-800 transition-colors">
            إعداد وتنفيذ: شركة التقنيات العلمية العالمية
          </span>
          {/* GSTC Logo Emblem */}
          <div className="h-6 flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity">
            <img 
              src="/GSTC_logo_white_transparent.png" 
              alt="GSTC Logo" 
              className="h-full object-contain filter invert"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        </a>
      </footer>
    </div>
  );
}
