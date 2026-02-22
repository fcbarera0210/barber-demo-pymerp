import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import type { Company } from '../types';

const MAP_PLACEHOLDER = 'https://picsum.photos/seed/barber-map/1200/675';

interface LocationSectionProps {
  company: Company;
}

export function LocationSection({ company }: LocationSectionProps) {
  return (
    <section id="ubicacion" className="barberias-aureo-location py-16 sm:py-24 bg-[#0a0a0a]">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase mb-2">Ubicación</h2>
          <div className="w-20 h-1 bg-red-600 mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <p className="flex items-start gap-3 text-gray-300">
              <Icon icon="mdi:map-marker" className="text-red-600 text-xl shrink-0 mt-0.5" />
              <span>{company.address}</span>
            </p>
            <p className="flex items-center gap-3 text-gray-300">
              <Icon icon="mdi:phone" className="text-red-600 text-xl shrink-0" />
              {company.phone}
            </p>
            <p className="flex items-center gap-3 text-gray-300">
              <Icon icon="mdi:email" className="text-red-600 text-xl shrink-0" />
              {company.email}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="aspect-video overflow-hidden rounded-lg bg-zinc-900"
          >
            <img
              src={MAP_PLACEHOLDER}
              alt="Ubicación"
              loading="lazy"
              className="w-full h-full object-cover grayscale opacity-80"
              onError={(e) => {
                e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1200" height="675"%3E%3Crect fill="%231a1a1a" width="1200" height="675"/%3E%3Ctext x="50%25" y="50%25" fill="%23555" font-size="18" text-anchor="middle" dy=".3em"%3EMapa%3C/text%3E%3C/svg%3E';
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
