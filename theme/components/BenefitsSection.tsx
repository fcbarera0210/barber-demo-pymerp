import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import type { Benefit } from '../types';

interface BenefitsSectionProps {
  benefits: Benefit[];
}

export function BenefitsSection({ benefits }: BenefitsSectionProps) {
  return (
    <section id="beneficios" className="barberias-aureo-benefits py-16 sm:py-24 bg-[#0a0a0a]">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase mb-2">Beneficios</h2>
          <div className="w-20 h-1 bg-red-600 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          {benefits.map((item, idx) => (
            <motion.div
              key={item.id ?? idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex p-4 bg-zinc-900 rounded-lg mb-6">
                <Icon icon={item.icon} className="text-4xl text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-white uppercase tracking-wide mb-3">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
