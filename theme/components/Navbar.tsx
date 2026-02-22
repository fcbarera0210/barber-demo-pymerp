import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import type { Company } from '../types';

const NAV_LINKS = [
  { name: 'Inicio', href: '#hero' },
  { name: 'Servicios', href: '#servicios' },
  { name: 'Beneficios', href: '#beneficios' },
  { name: 'Galería', href: '#galeria' },
  { name: 'Equipo', href: '#equipo' },
  { name: 'Testimonios', href: '#testimonios' },
  { name: 'Horarios', href: '#horarios' },
  { name: 'Ubicación', href: '#ubicacion' },
  { name: 'Contacto', href: '#cta-final' },
];

interface NavbarProps {
  company: Company;
  onReserve?: () => void;
}

export function Navbar({ company, onReserve }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleReserve = () => {
    onReserve?.() ?? (typeof window !== 'undefined' && window.alert('Reserva (mock): Próximamente podrás reservar aquí.'));
  };

  return (
    <nav
      className={`barberias-aureo-nav fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/90 py-3 backdrop-blur-md shadow-lg' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center max-w-7xl">
        <a href="#hero" className="flex items-center gap-2">
          {company.logo ? (
            <img src={company.logo} alt={company.name} className="h-8 w-auto" />
          ) : (
            <div className="w-8 h-8 bg-red-600 flex items-center justify-center transform -skew-x-12">
              <span className="font-black italic text-xl text-white">{company.name.charAt(0)}</span>
            </div>
          )}
          <span className="text-xl font-bold tracking-widest text-white">{company.name}</span>
        </a>

        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-bold tracking-widest text-white/90 hover:text-red-600 transition-colors uppercase"
            >
              {link.name}
            </a>
          ))}
          <button
            type="button"
            onClick={handleReserve}
            className="bg-red-600 text-white px-6 py-3 text-xs font-bold tracking-widest hover:bg-white hover:text-black transition-all transform hover:scale-105 active:scale-95"
          >
            RESERVAR AHORA
          </button>
        </div>

        <button
          type="button"
          className="lg:hidden text-3xl text-white p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          <Icon icon={isMenuOpen ? 'mdi:close' : 'mdi:menu'} />
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-black z-40 lg:hidden flex flex-col items-center justify-center gap-8 pt-20"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-2xl font-bold tracking-widest text-white hover:text-red-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                handleReserve();
                setIsMenuOpen(false);
              }}
              className="bg-red-600 text-white px-10 py-4 text-sm font-bold tracking-widest"
            >
              RESERVAR AHORA
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
