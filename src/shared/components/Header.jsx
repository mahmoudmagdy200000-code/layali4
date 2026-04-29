import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { useLanguage } from '@/features/i18n';
import { LanguageToggle } from './LanguageToggle';

export function Header() {
  const { isRTL, t } = useLanguage();
  const location = useLocation();
  
  // Route logic: Show Home only when deep in category/item views
  const isLandingPage = location.pathname === '/';
  const isMenuRoot = location.pathname === '/menu';
  const showHomeIcon = !isLandingPage && !isMenuRoot;

  return (
    <header 
      dir={isRTL ? 'rtl' : 'ltr'}
      className="fixed top-0 left-0 right-0 z-[60] bg-[#F4F1EA]/80 backdrop-blur-md border-b border-gray-200/50 w-full h-24 transition-all duration-300"
    >
      <div className="grid grid-cols-3 items-center h-full w-full px-4 max-w-5xl mx-auto">
        
        {/* Column 1: Navigation Actions */}
        <div className="flex items-center">
          {showHomeIcon ? (
            <Link 
              to="/menu" 
              className="p-2 hover:scale-110 transition-transform active:scale-95 flex items-center shrink-0"
            >
              <Home size={28} strokeWidth={1.5} className="text-[#233a34]" />
            </Link>
          ) : (
            <div className="w-10 h-10" /> /* Placeholder to maintain grid symmetry */
          )}
        </div>

        {/* Column 2: Central Branding (Dead Center) */}
        <div className="flex justify-center items-center h-full py-2">
           <img 
             src="/assets/logo.png" 
             alt="Logo" 
             className="h-20 w-auto object-contain max-h-[80px] shrink-0 drop-shadow-2xl"
           />
        </div>

        {/* Column 3: Language & Settings */}
        <div className="flex items-center justify-end">
           <div className="shrink-0 flex items-center">
             <LanguageToggle />
           </div>
        </div>

      </div>
    </header>
  );
}
