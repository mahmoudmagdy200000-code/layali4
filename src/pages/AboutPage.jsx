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
    </div>
  );
}
