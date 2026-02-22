/**
 * Datos mock para el theme barberias-aureo.
 * Sin APIs; solo para renderizado visual.
 */

import type {
  Company,
  Appearance,
  Service,
  Professional,
  ScheduleItem,
  ServiceSchedule,
  Testimonial,
  Benefit,
  TrustData,
  DayAvailability,
  TimeSlot,
} from './types';

export const mockCompany: Company = {
  name: 'BARBERCROP',
  address: '3891 Ranchview Dr. Richardson, California 62639',
  phone: '+1 234 567 890',
  email: 'barbercrop@ejemplo.com',
  copyright: '© 2024 BARBERCROP. TODOS LOS DERECHOS RESERVADOS.',
  heroTitle: 'MANTENDREMOS EN TI UN LOOK IMPECABLE',
  heroDescription: 'Excelencia en cada corte. Tradición y estilo para el caballero moderno.',
  social: [
    { name: 'Facebook', url: '#', icon: 'mdi:facebook' },
    { name: 'Twitter', url: '#', icon: 'mdi:twitter' },
    { name: 'Instagram', url: '#', icon: 'mdi:instagram' },
    { name: 'YouTube', url: '#', icon: 'mdi:youtube' },
  ],
};

export const mockAppearance: Appearance = {
  primaryColor: '#0f0f0f',
  accentColor: '#dc2626',
};

export const mockServices: Service[] = [
  { id: 'svc-1', name: 'Corte de pelo', price: 'Desde $30', duration: '45 min', description: 'Corte clásico o moderno adaptado a tu estilo.', icon: 'mdi:content-cut' },
  { id: 'svc-2', name: 'Bigote', price: 'Desde $20', duration: '20 min', description: 'Perfilado y cuidado experto.', icon: 'mdi:mustache' },
  { id: 'svc-3', name: 'Afeitado', price: 'Desde $25', duration: '30 min', description: 'Afeitado tradicional a navaja con toallas calientes.', icon: 'mdi:razor-double-edge' },
  { id: 'svc-4', name: 'Peinado', price: 'Desde $15', duration: '15 min', description: 'Acabado profesional con productos de alta gama.', icon: 'mdi:hair-dryer' },
  { id: 'svc-5', name: 'Recorte de barba', price: 'Desde $20', duration: '25 min', description: 'Diseño y mantenimiento de barba.', icon: 'mdi:face-man' },
  { id: 'svc-6', name: 'Tinte de cabello', price: 'Desde $40', duration: '60 min', description: 'Coloración con productos que cuidan tu cabello.', icon: 'mdi:palette' },
];

/** URLs de imágenes temáticas (barbería / cortes masculinos). Fuente: Unsplash (licencia libre). */
export const MOCK_IMAGE_URLS = {
  hero: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1920&q=80',
  gallery: [
    'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=600&q=80',
    'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&q=80',
    'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&q=80',
    'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&q=80',
    'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&q=80',
    'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&q=80',
    'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&q=80',
    'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&q=80',
  ],
  team: [
    'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400&q=80',
    'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&q=80',
    'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&q=80',
  ],
  scheduleBg: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=1920&q=80',
  mapPlaceholder: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=80',
} as const;

export const mockProfessionals: Professional[] = [
  {
    id: 'pro-1',
    name: 'Carlos Méndez',
    photo: MOCK_IMAGE_URLS.team[0],
    specialties: ['Corte clásico', 'Barba'],
    contact: '+56 9 1234 5678',
    socialLinks: [
      { name: 'Instagram', url: 'https://instagram.com/carlosbarber', icon: 'mdi:instagram' },
      { name: 'WhatsApp', url: 'https://wa.me/56912345678', icon: 'mdi:whatsapp' },
    ],
  },
  {
    id: 'pro-2',
    name: 'Miguel Soto',
    photo: MOCK_IMAGE_URLS.team[1],
    specialties: ['Afeitado', 'Estilo moderno'],
    contact: '+56 9 2345 6789',
    socialLinks: [
      { name: 'Instagram', url: 'https://instagram.com/miguelsoto', icon: 'mdi:instagram' },
      { name: 'WhatsApp', url: 'https://wa.me/56923456789', icon: 'mdi:whatsapp' },
    ],
  },
  {
    id: 'pro-3',
    name: 'Antonio Reyes',
    photo: MOCK_IMAGE_URLS.team[2],
    specialties: ['Coloración', 'Peinado'],
    contact: '+56 9 3456 7890',
    socialLinks: [
      { name: 'Instagram', url: 'https://instagram.com/antonioreyes', icon: 'mdi:instagram' },
      { name: 'WhatsApp', url: 'https://wa.me/56934567890', icon: 'mdi:whatsapp' },
    ],
  },
];

export const mockSchedules: ScheduleItem[] = [
  { day: 'Lunes', open: '09:00', close: '20:00' },
  { day: 'Martes', open: '09:00', close: '20:00' },
  { day: 'Miércoles', open: '09:00', close: '20:00' },
  { day: 'Jueves', open: '09:00', close: '20:00' },
  { day: 'Viernes', open: '09:00', close: '20:00' },
  { day: 'Sábado', open: '10:00', close: '17:30' },
  { day: 'Domingo', open: '—', close: '—', closed: true },
];

export const mockServiceSchedules: ServiceSchedule[] = [];

export const mockTestimonials: Testimonial[] = [
  { name: 'Roberto G.', text: 'La mejor barbería de la ciudad. Siempre salgo impecable y el trato es excelente.', rating: 5 },
  { name: 'Daniel M.', text: 'Profesionales de verdad. Recomiendo el afeitado tradicional.', rating: 5 },
  { name: 'Luis P.', text: 'Ambiente premium y resultados que hablan por sí solos.', rating: 5 },
];

export const mockBenefits: Benefit[] = [
  { icon: 'mdi:account-tie', title: 'Barberos expertos', description: 'Equipo con años de experiencia y formación continua.' },
  { icon: 'mdi:spa', title: 'Productos premium', description: 'Usamos solo productos de alta gama para tu piel y cabello.' },
  { icon: 'mdi:office-building', title: 'Ambiente profesional', description: 'Espacio diseñado para una experiencia cómoda y exclusiva.' },
];

export const mockTrust: TrustData = {
  rating: 4.9,
  ratingLabel: '4.9 / 5',
  clientsCount: '+500 clientes satisfechos',
  yearsExperience: '10+ años de experiencia',
};

export const mockGalleryImages: string[] = [
  ...MOCK_IMAGE_URLS.gallery,
];

/** Devuelve la disponibilidad mock de un día para el calendario de reservas */
export function getDayAvailability(date: Date): DayAvailability {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  if (d.getTime() < today.getTime()) return 'past';
  const dayOfWeek = d.getDay();
  if (dayOfWeek === 0) return 'full';
  if (dayOfWeek === 6) return 'few_slots';
  const day = d.getDate();
  if (day % 7 === 0) return 'full';
  if (day % 5 === 0) return 'few_slots';
  return 'available';
}

/** Genera slots de horario mock para una fecha (hasta 8 slots) */
export function getTimeSlotsForDate(date: Date): TimeSlot[] {
  const dayOfWeek = date.getDay();
  if (dayOfWeek === 0) return [];
  const slots: TimeSlot[] = [];
  const baseHour = dayOfWeek === 6 ? 10 : 9;
  const count = dayOfWeek === 6 ? 6 : 8;
  const proIds = ['pro-1', 'pro-2', 'pro-3'];
  for (let i = 0; i < count; i++) {
    const h = baseHour + i;
    const start = `${String(h).padStart(2, '0')}:00`;
    const end = `${String(h).padStart(2, '0')}:45`;
    const numPros = (i % 3) + 1;
    slots.push({
      id: `slot-${date.getTime()}-${i}`,
      start,
      end,
      professionalIds: proIds.slice(0, numPros),
    });
  }
  return slots;
}
