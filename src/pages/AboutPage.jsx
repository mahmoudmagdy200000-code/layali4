import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/features/i18n';
import useMenuData from '@/features/menu/hooks/useMenuData';

export default function AboutPage() {
  const { t, isRTL } = useLanguage();
  const { restaurant } = useMenuData() || {};

  if (!restaurant) return null;

  return (
    <div className="flex flex-col min-h-screen bg-[#ECE7DC]">
      {/* Dual Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-[#233a34] py-20 px-6">
        {/* Background Patterns/Effects */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/assets/pattern.png')] bg-repeat opacity-20" />
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          
          {/* Left Column: Title & Intro */}
          <motion.div 
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="text-center lg:text-right"
          >
            <h1 className="font-display text-6xl md:text-8xl text-white tracking-tight drop-shadow-2xl mb-6">
              {t('links.story')}
            </h1>
            <div className={`h-1.5 w-32 bg-[#D4AF37] mb-8 ${isRTL ? 'mr-0' : 'ml-0'} mx-auto lg:mx-0 rounded-full`} />
            <p className="text-[#ECE7DC]/80 text-xl md:text-2xl font-serif italic max-w-xl">
              تراث يتجدد.. ونكهات تروي حكاية الأصالة اللبنانية في كل زاوية.
            </p>
          </motion.div>

          {/* Right Column: Dual Images */}
          <div className="relative flex justify-center items-center h-[400px] md:h-[500px]">
            {/* Image 1: Main Hero */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: -5 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute z-0 w-3/4 aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10"
            >
              <img 
                src="/assets/about/about-hero.webp" 
                alt="Story Hero" 
                className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700"
              />
            </motion.div>

            {/* Image 2: Home Icon Image (Overlapping) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 5, y: 50 }}
              animate={{ opacity: 1, scale: 1, rotate: 5, y: 50 }}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
              className="absolute z-10 w-3/4 aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 translate-y-12"
            >
              <img 
                src="/assets/about/home_icon_new.webp" 
                alt="Branding Icon" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

        </div>
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
                src="/assets/about/DSC03295.webp" 
                alt="Authentic Lebanese Dining" 
                className="w-full aspect-[4/5] object-cover"
              />
            </div>
            {/* Decorative element */}
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
              ليالي البترون.. حيث تبدأ الحكاية
              <span className="block text-xl text-gray-600 font-normal mt-2 italic font-serif">
                وتأخذكم نكهاتنا في رحلة إلى قلب لبنان..
              </span>
            </h2>

            <div className="space-y-6 text-gray-700 text-lg md:text-xl leading-loose font-[var(--font-arabic-premium)]">
              <p>
                تطّل على أصالة أزقة البترون العريقة، لننقلكم في تجربة حسية فريدة تتجاوز حدود المكان؛ 
                من هنا، ومن قلب الكويت، نفتح لكم أبواباً حيث تجتمع رائحة الياسمين مع عبق المطبخ اللبناني الأصيل.
              </p>
              
              <p>
                في ليالي البترون، نحن لا نقدم مجرد طعام، بل نحيي تراثاً عريقاً ونشارككم تفاصيله في كل طبق. 
                أهلاً بكم في بيتكم الثاني..
              </p>

              <p>
                لأن الضيافة هي جوهر هويتنا، يستقبلكم فريقنا بابتسامة لبنانية دافئة وترحيب ينبع من القلب. 
                نحرص في ليالي البترون على تقديم تجربة ضيافة استثنائية تجعل من كل زيارة ذكرى لا تُنسى.
              </p>
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
      <section className="bg-white/50 py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-[#233a34] text-white rounded-full flex items-center justify-center text-2xl">🌿</div>
            <h3 className="font-bold text-xl text-[#233a34]">مكونات طازجة</h3>
            <p className="text-gray-600">نختار أجود المكونات الطازجة يومياً لنضمن نكهة لبنانية أصلية.</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-[#233a34] text-white rounded-full flex items-center justify-center text-2xl">👨‍🍳</div>
            <h3 className="font-bold text-xl text-[#233a34]">شيف محترف</h3>
            <p className="text-gray-600">فريقنا من الطهاة اللبنانيين يجمعون بين الخبرة والشغف في كل طبق.</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-[#233a34] text-white rounded-full flex items-center justify-center text-2xl">💎</div>
            <h3 className="font-bold text-xl text-[#233a34]">ضيافة راقية</h3>
            <p className="text-gray-600">نهتم بأدق التفاصيل لنمنحكم تجربة ضيافة ملكية تليق بكم.</p>
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="py-24 px-6 bg-[#ECE7DC]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display text-[#233a34] mb-4">معرض الصور</h2>
            <div className="h-1 w-20 bg-[#D4AF37] mx-auto rounded-full" />
            <p className="text-gray-600 mt-6 text-lg max-w-2xl mx-auto">
              لمحات من ليالي البترون.. حيث تجتمع الأصالة مع الرقي في كل زاوية.
            </p>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {[
              '/assets/about/DSC03257.webp',
              '/assets/about/DSC03285.webp',
              '/assets/about/DSC03295.webp',
              '/assets/about/1.webp',
              '/assets/about/2.webp',
              '/assets/about/about-hero.webp',
              '/assets/about/about-story.webp'
            ].map((src, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group overflow-hidden rounded-2xl shadow-lg break-inside-avoid"
              >
                <img 
                  src={src} 
                  alt={`Gallery Image ${index + 1}`} 
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
