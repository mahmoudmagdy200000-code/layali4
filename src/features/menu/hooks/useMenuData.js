import { useMemo } from 'react';
import { useLanguage } from '@/features/i18n';
import menuData from '@/data/menuData.json';

const CATEGORY_IMAGES = {
  "breakfast": "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400&h=300&fit=crop",
  "grills": "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop",
  "hot_meza": "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=400&h=300&fit=crop",
  "daily": "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop", // reused grills
  "cold_meza": "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=400&h=300&fit=crop", // reused meza
  "soup": "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=400&h=300&fit=crop", // reused meza
  "raw_meat": "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop", // reused grills
  "dessert": "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=300&fit=crop", // valid dessert
  "hot_drinks": "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=300&fit=crop", // reused dessert
  "coffee": "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=300&fit=crop", // reused dessert
  "soft_drinks": "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400&h=300&fit=crop", // reused breakfast
  "juices": "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400&h=300&fit=crop", // reused breakfast
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
