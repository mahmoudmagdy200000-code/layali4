import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AppProviders } from './providers/AppProviders';
import { PageShell } from '@/shared/components/PageShell';
import { Header } from '@/shared/components/Header';
import { Footer } from '@/shared/components/Footer';
import { useLanguage } from '@/features/i18n';
import { LinkTreeSection } from '@/features/link-tree';
import { MenuSection } from '@/features/menu';
import { AboutModal } from '@/features/menu/components/AboutModal';

function App() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const { t } = useLanguage();

  const handleLinkAction = (action) => {
    if (action === 'story') {
      setIsAboutOpen(true);
    }
  };

  return (
    <PageShell>
      <Header />
      <main className="flex-1 pb-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Link Tree Section */}
          <div className="pt-12 px-6">
            <h2 className="font-display text-2xl text-gray-900 text-center mb-8">
              {t('links.section_title')}
            </h2>
            <LinkTreeSection onAction={handleLinkAction} />
          </div>
          
          <MenuSection />
        </motion.div>
      </main>

      <Footer />

      <AboutModal 
        isOpen={isAboutOpen} 
        onClose={() => setIsAboutOpen(false)} 
      />
    </PageShell>
  );
}


export default App;
