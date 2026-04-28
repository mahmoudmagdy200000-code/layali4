import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { I18nProvider } from '@/features/i18n';

export function AppProviders({ children }) {
  return (
    <BrowserRouter>
      <I18nProvider>
        {children}
      </I18nProvider>
    </BrowserRouter>
  );
}
