import { useMemo } from 'react';
import { useLanguage } from '@/features/i18n';
import menuData from '@/data/menuData.json';

export function useMenuData() {
  const { lang } = useLanguage();

  const data = useMemo(() => {
    if (!menuData) return null;

    return {
      restaurant: {
        name: menuData.restaurantInfo.name[lang],
        tagline: menuData.restaurantInfo.tagline[lang],
        description: menuData.restaurantInfo.about.story[lang],
      },
      categories: menuData.menu.map((cat) => ({
        id: cat.categoryId,
        label: cat.categoryName[lang],
        items: cat.items.map((item) => ({
          ...item,
          title: item.name[lang],
          description: item.description[lang],
          currency: item.currency[lang],
          price: item.price,
        })),
      })),
    };
  }, [lang]);

  return data;
}
