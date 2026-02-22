import { motion } from 'framer-motion';
import type { Professional } from '../types';

interface TeamSectionProps {
  professionals: Professional[];
}

export function TeamSection({ professionals }: TeamSectionProps) {
  return (
    <section id="equipo" className="barberias-aureo-team py-16 sm:py-24 bg-[#0a0a0a]">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase mb-2">Equipo</h2>
          <div className="section-bar mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {professionals.map((pro, idx) => (
            <motion.article
              key={pro.id ?? idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group text-center"
            >
              <div className="overflow-hidden rounded-lg mb-4 aspect-[3/4] max-h-80 mx-auto">
                <img
                  src={pro.photo}
                  alt={pro.name}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="500"%3E%3Crect fill="%23222" width="400" height="500"/%3E%3Ctext x="50%25" y="50%25" fill="%23555" font-size="14" text-anchor="middle" dy=".3em"%3E%3F%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>
              <h3 className="text-lg font-bold text-white uppercase tracking-wide">{pro.name}</h3>
              {pro.specialties && pro.specialties.length > 0 && (
                <p className="text-gray-500 text-sm mt-1">{pro.specialties.join(' · ')}</p>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
