import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import type { Company } from '../types';

interface HeroSectionProps {
  company: Company;
  onReserve?: () => void;
  onVerServicios?: () => void;
}

const HERO_IMAGE = 'https://picsum.photos/seed/barber-hero/1920/1080';

export function HeroSection({ company, onReserve, onVerServicios }: HeroSectionProps) {
  const handleReserve = () => {
    onReserve?.() ?? (typeof window !== 'undefined' && window.alert('Reserva (mock): Próximamente podrás reservar aquí.'));
  };
  const handleVerServicios = () => {
    onVerServicios?.() ?? (typeof document !== 'undefined' && document.querySelector('#servicios')?.scrollIntoView({ behavior: 'smooth' }));
  };

  return (
    <section id="hero" className="barberias-aureo-hero relative min-h-[100vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Barbería"
          className="w-full h-full object-cover grayscale brightness-50"
          onError={(e) => {
            e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080"%3E%3Crect fill="%231a1a1a" width="1920" height="1080"/%3E%3C/svg%3E';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight mb-6 text-white">
            {company.heroTitle ? (
              company.heroTitle.includes('LOOK IMPECABLE') ? (
                <>
                  {company.heroTitle.replace(' LOOK IMPECABLE', ' ')}
                  <span className="text-red-600"> LOOK IMPECABLE</span>
                </>
              ) : (
                company.heroTitle
              )
            ) : (
              <>
                MANTENDREMOS EN TI UN <span className="text-red-600">LOOK IMPECABLE</span>
              </>
            )}
          </h1>
          {company.heroDescription && (
            <p className="text-gray-300 text-lg mb-8 max-w-xl">{company.heroDescription}</p>
          )}

          <div className="space-y-4 text-gray-400 mb-10 border-l-2 border-red-600 pl-6">
            <p className="flex items-center gap-3 text-sm sm:text-base">
              <Icon icon="mdi:map-marker" className="text-red-600 text-xl shrink-0" />
              {company.address}
            </p>
            <p className="flex items-center gap-3 text-sm sm:text-base">
              <Icon icon="mdi:phone" className="text-red-600 text-xl shrink-0" />
              {company.phone}
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={handleReserve}
              className="bg-red-600 text-white px-8 py-4 text-sm font-bold tracking-widest hover:bg-white hover:text-black transition-all transform hover:scale-105 active:scale-95"
            >
              Reservar ahora
            </button>
            <button
              type="button"
              onClick={handleVerServicios}
              className="border-2 border-white/80 text-white px-8 py-4 text-sm font-bold tracking-widest hover:bg-white hover:text-black transition-all"
            >
              Ver servicios
            </button>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-4 sm:left-6 flex items-center gap-4">
        <div className="w-16 h-1 bg-red-600" />
        <div className="w-8 h-1 bg-gray-600" />
        <div className="w-8 h-1 bg-gray-600" />
      </div>
    </section>
  );
}
