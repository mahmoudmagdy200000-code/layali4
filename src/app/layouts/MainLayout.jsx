import React from 'react';
import { Outlet } from 'react-router-dom';
import { PageShell } from '@/shared/components/PageShell';
import { Header } from '@/shared/components/Header';
import { Footer } from '@/shared/components/Footer';

export function MainLayout() {
  return (
    <PageShell>
      <Header />
      <main className="flex-1 pb-12">
        <Outlet />
        <div className="flex justify-center py-8 opacity-10 grayscale pointer-events-none select-none">
          <img src="/assets/logo.png" alt="Signature" className="h-20 w-auto" />
        </div>
      </main>
      <Footer />
    </PageShell>
  );
}
