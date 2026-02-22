import React from 'react';
import { motion } from 'framer-motion';

interface CTAFinalSectionProps {
  title?: string;
  onReserve?: () => void;
}

const DEFAULT_TITLE = '¿Listo para tu próxima visita? Reserva ahora y vive la experiencia.';

export function CTAFinalSection({ title, onReserve }: CTAFinalSectionProps) {
  const handleReserve = () => {
    onReserve?.() ?? (typeof window !== 'undefined' && window.alert('Reserva (mock): Próximamente podrás reservar aquí.'));
  };

  return (
    <section id="cta-final" className="barberias-aureo-cta py-16 sm:py-24 bg-[#0f0f0f] border-y border-white/10">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-8 max-w-2xl mx-auto leading-tight">
            {title ?? DEFAULT_TITLE}
          </h2>
          <button
            type="button"
            onClick={handleReserve}
            className="bg-red-600 text-white px-10 py-4 text-sm font-bold tracking-widest hover:bg-white hover:text-black transition-all transform hover:scale-105 active:scale-95"
          >
            Reservar ahora
          </button>
        </motion.div>
      </div>
    </section>
  );
}
