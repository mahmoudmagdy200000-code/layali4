import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { useLanguage } from '@/features/i18n';
import { LanguageToggle } from './LanguageToggle';

export function Header() {
  const { isRTL, t } = useLanguage();
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  if (isLandingPage) {
    return (
      <header className="fixed top-0 left-0 right-0 z-[60] h-14 px-6 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto">
          <LanguageToggle />
        </div>
      </header>
    );
  }

  return (
    <header 
      dir={isRTL ? 'rtl' : 'ltr'}
      className="fixed top-0 left-0 right-0 z-[60] bg-[#ECE7DC]/90 backdrop-blur-md border-b border-black/5 h-14 px-4 py-1 flex items-center justify-between"
    >
      {/* Home Icon: Now contextually navigates back to the main Menu Grid (/menu) */}
      <Link 
        to="/menu" 
        className="relative z-10 p-2 hover:scale-110 transition-transform active:scale-95 flex items-center"
      >
        <Home size={28} strokeWidth={1.5} className="text-[#233a34]" />
      </Link>

      {/* Brand Logo: Hidden only on Landing Page to reduce visual noise */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <img 
          src="/assets/logo.png" 
          alt="Logo" 
          className="h-12 w-auto object-contain"
        />
      </div>

      {/* Language Switcher */}
      <div className="relative z-10 flex items-center">
         <LanguageToggle />
      </div>
    </header>
  );
}
