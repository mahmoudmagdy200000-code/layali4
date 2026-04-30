import { Phone, MapPin, MessageCircle, MessageSquareHeart, Clapperboard, Globe } from 'lucide-react';
import { InstagramIcon as Instagram, TikTokIcon as TikTok } from '@/shared/components/Icons';

export const LINK_CONFIG = [
  {
    id: 'whatsapp',
    href: 'https://wa.me/96541204444',
    icon: MessageCircle,
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
    icon: Instagram,
    labelKey: 'links.instagram',
    colorClass: 'bg-[#233a34] hover:bg-[#1a2c27] text-[#ECE7DC]',
    priority: 3,
  },
  {
    id: 'tiktok',
    href: 'https://tiktok.com/@layalialbatroun',
    icon: TikTok,
    labelKey: 'links.tiktok',
    colorClass: 'bg-[#233a34] hover:bg-[#1a2c27] text-[#ECE7DC]',
    priority: 4,
  },
  {
    id: 'call',
    href: 'https://wa.me/96541204444',
    icon: Phone,
    labelKey: 'links.call',
    colorClass: 'bg-[#233a34] hover:bg-[#1a2c27] text-[#ECE7DC]',
    priority: 5,
  },
  {
    id: 'feedback',
    href: 'https://wa.me/96541204444',
    icon: MessageSquareHeart,
    labelKey: 'links.feedback',
    colorClass: 'bg-[#233a34] hover:bg-[#1a2c27] text-[#ECE7DC]',
    priority: 6,
  },
  {
    id: 'website',
    href: '/',
    icon: Globe,
    labelKey: 'links.website',
    colorClass: 'bg-[#233a34] hover:bg-[#1a2c27] text-[#ECE7DC]',
    priority: 7,
  },
];
