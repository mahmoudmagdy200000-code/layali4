import React from 'react';
import { LinkTreeSection } from '@/features/link-tree/components/LinkTreeSection';
import { useLanguage } from '@/features/i18n';

export default function LinkTreePage() {
  const { t } = useLanguage();

  return (
    <div className="pt-12 px-6 pb-20">
      <h2 className="font-display text-2xl text-gray-900 text-center mb-8">
        {t('links.section_title')}
      </h2>
      <LinkTreeSection />
    </div>
  );
}
