import React from 'react';
import { LINK_CONFIG } from '@/features/link-tree/config/links.config';
import { useLanguage } from '@/features/i18n';

export function Footer() {
  const { isRTL } = useLanguage();
  
  // Filter out internal app triggers like 'story'
  const externalLinks = LINK_CONFIG.filter(link => link.id !== 'story');

  return (
    <footer className="mt-auto w-full py-10 flex flex-col items-center text-center bg-transparent border-t border-black/5">
      
      {/* Socials & Links Row */}
      <div className="flex gap-6 mb-8 items-center justify-center">
        {externalLinks.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#233a34]/70 hover:text-[#233a34] hover:-translate-y-1 transition-all duration-300"
              aria-label={link.id}
            >
              <Icon size={24} strokeWidth={1.5} />
            </a>
          );
        })}
      </div>

      {/* Copyright & Signature */}
      <div className="flex flex-col items-center gap-4">
        <a 
          href="https://gstckw.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-2 group transition-all"
        >
          {/* GSTC Logo Emblem */}
          <div className="h-8 flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity">
            <img 
              src="/GSTC_logo_white_transparent.png" 
              alt="GSTC Logo" 
              className="h-full object-contain filter invert"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
          <p className="text-[10px] sm:text-xs text-[#233a34]/60 font-medium tracking-wide group-hover:text-[#233a34] text-center px-4">
            © 2026 جميع الحقوق محفوظة لشركة GSTC إعداد وتنفيذ: شركة التقنيات العلمية العالمية
          </p>
        </a>
      </div>
      
    </footer>
  );
}
