import { Phone, MapPin, Camera, MessageSquare, Info, Play } from 'lucide-react';

export const LINK_CONFIG = [
  {
    id: 'whatsapp',
    href: 'https://wa.me/966XXXXXXXXX', 
    icon: MessageSquare,
    labelKey: 'links.whatsapp',
    colorClass: 'bg-[#233a34] hover:bg-[#1a2c27] text-[#ECE7DC]',
    priority: 1,
  },
  {
    id: 'maps',
    href: 'https://maps.app.goo.gl/vzRGvzQYmdi6Yioh9',
    icon: MapPin,
    labelKey: 'links.maps',
    colorClass: 'bg-[#233a34] hover:bg-[#1a2c27] text-[#ECE7DC]',
    priority: 2,
  },
  {
    id: 'instagram',
    href: 'https://instagram.com/layalialbatroun',
    icon: Camera,
    labelKey: 'links.instagram',
    colorClass: 'bg-[#233a34] hover:bg-[#1a2c27] text-[#ECE7DC]',
    priority: 3,
  },
  {
    id: 'tiktok',
    href: 'https://tiktok.com/@layalialbatroun',
    icon: Play,
    labelKey: 'links.tiktok',
    colorClass: 'bg-[#233a34] hover:bg-[#1a2c27] text-[#ECE7DC]',
    priority: 4,
  },
  {
    id: 'call',
    href: 'tel:41115030',
    icon: Phone,
    labelKey: 'links.call',
    colorClass: 'bg-[#233a34] hover:bg-[#1a2c27] text-[#ECE7DC]',
    priority: 5,
  },
  {
    id: 'feedback',
    href: 'tel:41197794',
    icon: Info,
    labelKey: 'links.feedback',
    colorClass: 'bg-[#233a34] hover:bg-[#1a2c27] text-[#ECE7DC]',
    priority: 6,
  },
];
