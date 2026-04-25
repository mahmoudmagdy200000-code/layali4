import React from 'react';
import { motion } from 'framer-motion';
import { AppProviders } from './providers/AppProviders';
import { PageShell } from '@/shared/components/PageShell';
import { Header } from '@/shared/components/Header';
import { LinkTreeSection } from '@/features/link-tree';
import { MenuSection } from '@/features/menu';
import { AboutSection } from '@/features/menu/components/AboutSection';

function App() {
  return (
    <AppProviders>
      <PageShell>
        <Header />
        <main className="flex-1 pb-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <AboutSection />

            {/* Link Tree Section */}
            <div className="pt-12 px-6">
              <h2 className="font-display text-2xl text-brand-500 text-center mb-8">
                Connect & Visit
              </h2>
              <LinkTreeSection />
            </div>
            
            <MenuSection />
          </motion.div>
        </main>
      </PageShell>
    </AppProviders>
  );
}

export default App;
