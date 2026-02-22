import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import type { Service } from '../types';

interface ServicesSectionProps {
  services: Service[];
  onReserve?: (service?: Service) => void;
}

export function ServicesSection({ services, onReserve }: ServicesSectionProps) {
  const handleReserve = (service?: Service) => {
    onReserve?.(service) ?? (typeof window !== 'undefined' && window.alert(`Reserva (mock): ${service ? service.name : 'Servicio'} — Próximamente.`));
  };

  return (
    <section id="servicios" className="barberias-aureo-services py-16 sm:py-24 bg-[#0f0f0f]">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase mb-2">Servicios</h2>
          <div className="w-20 h-1 bg-red-600 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {services.map((service, idx) => (
            <motion.article
              key={service.id ?? idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="group p-6 sm:p-8 bg-zinc-900/50 hover:bg-zinc-900/80 transition-all rounded-lg border border-white/5"
            >
              <div className="flex items-center gap-4 mb-4">
                {service.icon && (
                  <div className="p-3 bg-zinc-800 group-hover:bg-red-600 transition-colors rounded">
                    <Icon icon={service.icon} className="text-3xl text-red-600 group-hover:text-white" />
                  </div>
                )}
                <h3 className="text-xl font-bold text-white tracking-wide uppercase">{service.name}</h3>
              </div>
              {service.description && (
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{service.description}</p>
              )}
              <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
                <div className="flex gap-4 text-sm">
                  <span className="text-red-600 font-bold">{service.price}</span>
                  <span className="text-gray-500">{service.duration}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleReserve(service)}
                  className="bg-red-600 text-white px-5 py-2.5 text-xs font-bold tracking-widest hover:bg-white hover:text-black transition-all"
                >
                  Reservar
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
