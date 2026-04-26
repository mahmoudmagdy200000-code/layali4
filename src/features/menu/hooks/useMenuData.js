import { useMemo } from 'react';
import { useLanguage } from '@/features/i18n';
import menuData from '@/data/menuData.json';

const CATEGORY_IMAGES = {
  "breakfast": "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400&h=300&fit=crop",
  "grills": "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop",
  "hot_meza": "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=400&h=300&fit=crop",
  "daily": "https://images.unsplash.com/photo-1546069901-ba959d3178a4?w=400&h=300&fit=crop",
  "cold_meza": "https://images.unsplash.com/photo-1540420773410-360212a52d2f?w=400&h=300&fit=crop",
  "soup": "https://images.unsplash.com/photo-1547592180-85f1310c8dc3?w=400&h=300&fit=crop",
  "raw_meat": "https://images.unsplash.com/photo-1603048297172-c9254479895e?w=400&h=300&fit=crop",
  "dessert": "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=300&fit=crop",
  "hot_drinks": "https://images.unsplash.com/photo-1544787219-7f47ccb79074?w=400&h=300&fit=crop",
  "coffee": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop",
  "soft_drinks": "https://images.unsplash.com/photo-1622483767028-fd16719b442b?w=400&h=300&fit=crop",
  "juices": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop",
};

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
        id: cat.id,
        label: cat.categoryName[lang],
        items: cat.items.map((item) => ({
          ...item,
          image: CATEGORY_IMAGES[cat.id] || "https://placehold.co/400x300/e2e8f0/475569?text=Food",
          title: item.name?.[lang] || '',
          description: item.description?.[lang] || '',
          currency: item.currency?.[lang] || '',
          price: item.price || '',
          categoryId: cat.id,
        })),
      })),
    };
  }, [lang]);

  return data;
}
