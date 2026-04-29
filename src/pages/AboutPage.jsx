import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/features/i18n';
import useMenuData from '@/features/menu/hooks/useMenuData';
import { Sparkles, ChefHat, Leaf } from 'lucide-react';

export default function AboutPage() {
  const { t, isRTL } = useLanguage();
  const { restaurant } = useMenuData() || {};

  if (!restaurant) return null;

  return (
    <div className="flex flex-col min-h-screen bg-[#ECE7DC]">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <img 
          src="/assets/about/31.webp" 
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
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 font-display">ضيافة راقية</h3>
            <p className="text-gray-600 text-base leading-relaxed">
              نهتم بأدق التفاصيل لنمنحكم تجربة ضيافة ملكية تليق بكم وبأصالة تقاليدنا.
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
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 font-display">شيف محترف</h3>
            <p className="text-gray-600 text-base leading-relaxed">
              فريقنا من الطهاة اللبنانيين يجمعون بين الخبرة الطويلة والشغف في كل طبق يقدمونه.
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
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 font-display">مكونات طازجة</h3>
            <p className="text-gray-600 text-base leading-relaxed">
              نختار أجود المكونات الطازجة يومياً لنضمن نكهة لبنانية أصلية وصحية في كل لقمة.
            </p>
          </motion.div>

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
              '/assets/about/DSC03221.webp',
              '/assets/about/DSC03260.webp',
              '/assets/about/31.webp',
              '/assets/about/7-1.webp',
              '/assets/about/1.webp',
              '/assets/about/2.webp',
              '/assets/about/home_icon_new.webp'
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
