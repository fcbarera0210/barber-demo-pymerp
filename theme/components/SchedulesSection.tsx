import { motion } from 'framer-motion';
import type { ScheduleItem } from '../types';

interface SchedulesSectionProps {
  schedules: ScheduleItem[];
  scheduleBgImage?: string;
}

function formatHours(item: ScheduleItem): string {
  if (item.closed) return 'Cerrado';
  return `${item.open} - ${item.close}`;
}

export function SchedulesSection({ schedules, scheduleBgImage }: SchedulesSectionProps) {
  return (
    <section id="horarios" className="barberias-aureo-schedules py-16 sm:py-24 bg-black relative overflow-hidden">
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
      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-zinc-900/90 backdrop-blur-sm p-8 sm:p-10 border-l-4 border-accent rounded-r-lg shadow-lg"
          >
            <h2 className="text-2xl font-black text-accent uppercase tracking-widest mb-8">Horarios</h2>
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
