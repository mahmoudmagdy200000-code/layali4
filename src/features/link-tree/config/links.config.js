import { Phone, MapPin, Camera, MessageSquare, Info, Play } from 'lucide-react';

export const LINK_CONFIG = [
  {
    id: 'whatsapp',
    href: 'https://wa.me/966XXXXXXXXX', 
    icon: MessageSquare,
    labelKey: 'links.whatsapp',
    colorClass: 'bg-green-600 hover:bg-green-700',
    priority: 1,
  },
  {
    id: 'maps',
    href: 'https://maps.app.goo.gl/vzRGvzQYmdi6Yioh9',
    icon: MapPin,
    labelKey: 'links.maps',
    colorClass: 'bg-brand-600 hover:bg-brand-700',
    priority: 2,
  },
  {
    id: 'instagram',
    href: 'https://instagram.com/layalialbatroun',
    icon: Camera,
    labelKey: 'links.instagram',
    colorClass: 'bg-brand-600 hover:bg-brand-700',
    priority: 3,
  },
  {
    id: 'tiktok',
    href: 'https://tiktok.com/@layalialbatroun',
    icon: Play,
    labelKey: 'links.tiktok',
    colorClass: 'bg-brand-600 hover:bg-brand-700',
    priority: 4,
  },
  {
    id: 'call',
    href: 'tel:41115030',
    icon: Phone,
    labelKey: 'links.call',
    colorClass: 'bg-brand-600 hover:bg-brand-700',
    priority: 5,
  },
  {
    id: 'feedback',
    href: 'tel:41197794',
    icon: Info,
    labelKey: 'links.feedback',
    colorClass: 'bg-brand-600 hover:bg-brand-700',
    priority: 6,
  },
];
