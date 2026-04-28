import React from 'react';
import { Outlet } from 'react-router-dom';
import { PageShell } from '@/shared/components/PageShell';
import { Header } from '@/shared/components/Header';
import { Footer } from '@/shared/components/Footer';

export function MainLayout() {
  return (
    <PageShell>
      <Header />
      <main className="flex-1 pb-20">
        <Outlet />
      </main>
      <Footer />
    </PageShell>
  );
}
