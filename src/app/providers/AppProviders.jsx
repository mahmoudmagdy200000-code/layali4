import React from 'react';
import { I18nProvider } from '@/features/i18n';

export function AppProviders({ children }) {
  return (
    <I18nProvider>
      {children}
    </I18nProvider>
  );
}
