import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import type { Testimonial } from '../types';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section id="testimonios" className="barberias-aureo-testimonials py-16 sm:py-24 bg-[#0f0f0f]">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase mb-2">Testimonios</h2>
          <div className="w-20 h-1 bg-red-600 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.blockquote
              key={t.id ?? idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 sm:p-8 bg-zinc-900/60 border-l-4 border-red-600 rounded-r-lg"
            >
              <div className="flex gap-1 text-red-600 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon key={i} icon={i < t.rating ? 'mdi:star' : 'mdi:star-outline'} className="text-lg" />
                ))}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
              <cite className="text-white font-bold text-sm not-italic">— {t.name}</cite>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
