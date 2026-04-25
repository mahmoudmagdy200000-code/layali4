import { useLanguage } from '@/features/i18n';
import { LINK_CONFIG } from '../config/links.config';

export function useLinkTree() {
  const { t } = useLanguage();

  const links = LINK_CONFIG.map((link) => ({
    ...link,
    label: t(link.labelKey),
  }));

  return { links };
}
