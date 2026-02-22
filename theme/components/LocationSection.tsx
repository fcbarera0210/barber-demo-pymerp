import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import type { Company, ScheduleItem } from '../types';

const ABOUT_LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

function formatHours(item: ScheduleItem): string {
  if (item.closed) return 'Cerrado';
  return `${item.open} - ${item.close}`;
}

const TITLE_STYLE = 'text-xl font-black text-white uppercase tracking-widest mb-4 border-l-4 border-accent pl-4';

interface LocationSectionProps {
  company: Company;
  mapImage?: string;
  schedules: ScheduleItem[];
  scheduleBgImage?: string;
}

export function LocationSection({ company, mapImage, schedules, scheduleBgImage }: LocationSectionProps) {
  const handleComoLlegar = () => {
    if (typeof window !== 'undefined') {
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.address)}`, '_blank');
    }
  };

  return (
    <section id="ubicacion" className="barberias-aureo-location py-16 sm:py-24 bg-black relative overflow-hidden">
      {/* Imagen de fondo en blanco y negro (mismo diseño que la sección de horarios) */}
      <div className="absolute inset-0 opacity-20">
        <img
          src={scheduleBgImage ?? ''}
          alt=""
          className="w-full h-full object-cover grayscale"
          aria-hidden
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Fondo único que encierra Ubicación y Acerca de (sección de datos) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-zinc-900/90 backdrop-blur-sm p-8 sm:p-10 border-l-4 border-accent rounded-r-lg shadow-lg"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Zona izquierda: título Ubicación + contacto + botón + mapa */}
            <div className="space-y-6">
              <h2 className={TITLE_STYLE}>Ubicación</h2>
              <div className="space-y-4">
                <p className="flex items-start gap-3 text-gray-300">
                  <Icon icon="mdi:map-marker" className="text-accent text-xl shrink-0 mt-0.5" />
                  <span>{company.address}</span>
                </p>
                <p className="flex items-center gap-3 text-gray-300">
                  <Icon icon="mdi:phone" className="text-accent text-xl shrink-0" />
                  {company.phone}
                </p>
                <p className="flex items-center gap-3 text-gray-300">
                  <Icon icon="mdi:email" className="text-accent text-xl shrink-0" />
                  {company.email}
                </p>
              </div>
              <button
                type="button"
                onClick={handleComoLlegar}
                className="btn-accent flex items-center justify-center gap-2 bg-accent text-white px-6 py-3 text-sm font-bold tracking-widest hover:bg-white hover:text-[var(--accent)] transition-all rounded-sm w-full sm:w-auto"
              >
                <Icon icon="mdi:map-marker-path" className="text-xl" />
                Cómo llegar
              </button>
              <div className="aspect-video overflow-hidden rounded-lg bg-zinc-900">
                <img
                  src={mapImage ?? ''}
                  alt="Ubicación"
                  loading="lazy"
                  className="w-full h-full object-cover grayscale opacity-80"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1200" height="675"%3E%3Crect fill="%231a1a1a" width="1200" height="675"/%3E%3Ctext x="50%25" y="50%25" fill="%23555" font-size="18" text-anchor="middle" dy=".3em"%3EMapa%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>
            </div>

            {/* Zona derecha: Horarios + Acerca de */}
            <div className="space-y-8">
              <div id="horarios">
                <h3 className={TITLE_STYLE}>Horarios</h3>
                <div className="space-y-4">
                  {schedules.map((item) => (
                    <div
                      key={item.day}
                      className="flex justify-between border-b border-white/10 pb-2 text-sm"
                    >
                      <span className="font-bold text-white uppercase tracking-widest">{item.day}</span>
                      <span className={item.closed ? 'text-accent font-bold' : 'text-gray-400'}>
                        {formatHours(item)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className={TITLE_STYLE}>Acerca de</h3>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                  {ABOUT_LOREM}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
