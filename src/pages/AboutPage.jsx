import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/features/i18n';
import useMenuData from '@/features/menu/hooks/useMenuData';
import { Sparkles, ChefHat, Leaf, ImageOff } from 'lucide-react';

function GalleryImage({ src, index }) {
  const [error, setError] = React.useState(false);

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative aspect-square bg-[#233a34]/5 rounded-2xl flex flex-col items-center justify-center border border-[#233a34]/10 p-6 text-[#233a34]/20 break-inside-avoid mb-6"
      >
        <ImageOff size={40} strokeWidth={1} />
        <span className="text-xs mt-2 font-serif italic">Layali Batroun</span>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="flex-none w-4/5 md:w-1/2 snap-center relative group overflow-hidden rounded-2xl shadow-lg aspect-[4/5]"
    >
      <img 
        src={src} 
        alt={`Gallery Image ${index + 1}`} 
        onError={() => setError(true)}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}

export default function AboutPage() {
  const { t, isRTL } = useLanguage();
  const { restaurant } = useMenuData() || {};

  if (!restaurant) return null;

  return (
    <div className="flex flex-col min-h-screen bg-[#ECE7DC]">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <img 
          src="/assets/about/DSC03257.webp" 
          alt="Layali Batroun Interior" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-6"
        >
          <h1 className="font-display text-5xl md:text-7xl text-white tracking-tight drop-shadow-xl mb-4">
            {t('links.story')}
          </h1>
          <div className="h-1 w-24 bg-[#D4AF37] mx-auto rounded-full" />
        </motion.div>
      </section>

      {/* Content Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src="/assets/about/7-1.webp" 
                alt="Authentic Lebanese Dining" 
                className="w-full aspect-[4/5] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-full h-full bg-[#233a34]/10 -z-10 rounded-3xl translate-x-3 translate-y-3" />
          </motion.div>

          {/* Text Side */}
          <motion.div 
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-8"
          >
            <h2 className="text-3xl md:text-4xl font-display text-[#233a34] leading-tight font-semibold">
              {t('about.title')}
              <span className="block text-xl text-gray-600 font-normal mt-2 italic font-serif">
                {t('about.subtitle')}
              </span>
            </h2>

            <div className={`space-y-6 text-gray-700 text-lg md:text-xl leading-loose ${isRTL ? 'font-[var(--font-arabic-premium)]' : 'font-serif'}`}>
              <p>{t('about.p1')}</p>
              <p>{t('about.p2')}</p>
              <p>{t('about.p3')}</p>
            </div>

            <div className="mt-4 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-200" />
              <img src="/assets/logo.png" alt="Signature" className="h-12 w-auto opacity-40 grayscale" />
              <div className="h-px flex-1 bg-gray-200" />
            </div>
          </motion.div>

        </div>
      </section>

      {/* Value Proposition Grid */}
      <section className="bg-white/30 py-24 px-6 border-y border-white/20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Hospitality */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/60 backdrop-blur-sm border border-gray-100 rounded-3xl p-10 flex flex-col items-center text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group"
          >
            <div className="bg-[#233a34]/5 p-5 rounded-full mb-6 group-hover:bg-[#233a34] transition-colors duration-500">
              <Sparkles size={32} strokeWidth={1.5} className="text-[#233a34] group-hover:text-white transition-colors duration-500" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 font-display">{t('about.features.hospitality.title')}</h3>
            <p className="text-gray-600 text-base leading-relaxed">
              {t('about.features.hospitality.desc')}
            </p>
          </motion.div>

          {/* Card 2: Chef */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white/60 backdrop-blur-sm border border-gray-100 rounded-3xl p-10 flex flex-col items-center text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group"
          >
            <div className="bg-[#233a34]/5 p-5 rounded-full mb-6 group-hover:bg-[#233a34] transition-colors duration-500">
              <ChefHat size={32} strokeWidth={1.5} className="text-[#233a34] group-hover:text-white transition-colors duration-500" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 font-display">{t('about.features.chef.title')}</h3>
            <p className="text-gray-600 text-base leading-relaxed">
              {t('about.features.chef.desc')}
            </p>
          </motion.div>

          {/* Card 3: Ingredients */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white/60 backdrop-blur-sm border border-gray-100 rounded-3xl p-10 flex flex-col items-center text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group"
          >
            <div className="bg-[#233a34]/5 p-5 rounded-full mb-6 group-hover:bg-[#233a34] transition-colors duration-500">
              <Leaf size={32} strokeWidth={1.5} className="text-[#233a34] group-hover:text-white transition-colors duration-500" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 font-display">{t('about.features.ingredients.title')}</h3>
            <p className="text-gray-600 text-base leading-relaxed">
              {t('about.features.ingredients.desc')}
            </p>
          </motion.div>

        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="py-24 px-6 bg-[#ECE7DC]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display text-[#233a34] mb-4">{t('about.gallery.title')}</h2>
            <div className="h-1 w-20 bg-[#D4AF37] mx-auto rounded-full" />
            <p className="text-gray-600 mt-6 text-lg max-w-2xl mx-auto">
              {t('about.gallery.subtitle')}
            </p>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 hide-scrollbar">
            {[
              '/assets/about/DSC03285.webp',
              '/assets/about/DSC03295.webp',
              '/assets/about/DSC03221.webp',
              '/assets/about/DSC03260.webp',
              '/assets/about/31.webp',
              '/assets/about/7-1.webp',
              '/assets/about/1.webp'
            ].map((src, index) => (
              <GalleryImage key={src} src={src} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
