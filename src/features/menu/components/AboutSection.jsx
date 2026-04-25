import React from 'react';
import { motion } from 'framer-motion';
import { useMenuData } from '../hooks/useMenuData';

export function AboutSection() {
  const { restaurant } = useMenuData() || {};

  if (!restaurant) return null;

  return (
    <section className="px-6 py-12 flex flex-col gap-6 text-center">
      <motion.p 
        className="text-brand-500/90 leading-relaxed font-serif italic text-lg"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {restaurant.tagline}
      </motion.p>
      
      <motion.div 
        className="h-px bg-brand-500/20 w-24 mx-auto"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
      />

      <motion.p 
        className="text-brand-500/60 text-sm leading-relaxed max-w-xs mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        {restaurant.description}
      </motion.p>
    </section>
  );
}
