import React from 'react';
import { Outlet } from 'react-router-dom';
import { PageShell } from '@/shared/components/PageShell';

export function MinimalLayout() {
  return (
    <PageShell>
      <main className="flex-1">
        <Outlet />
      </main>
    </PageShell>
  );
}
