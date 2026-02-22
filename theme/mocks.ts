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
  { name: 'Corte de pelo', price: 'Desde $30', duration: '45 min', description: 'Corte clásico o moderno adaptado a tu estilo.', icon: 'mdi:content-cut' },
  { name: 'Bigote', price: 'Desde $20', duration: '20 min', description: 'Perfilado y cuidado experto.', icon: 'mdi:moustache' },
  { name: 'Afeitado', price: 'Desde $25', duration: '30 min', description: 'Afeitado tradicional a navaja con toallas calientes.', icon: 'mdi:razor-double-edge' },
  { name: 'Peinado', price: 'Desde $15', duration: '15 min', description: 'Acabado profesional con productos de alta gama.', icon: 'mdi:hair-dryer' },
  { name: 'Recorte de barba', price: 'Desde $20', duration: '25 min', description: 'Diseño y mantenimiento de barba.', icon: 'mdi:beard' },
  { name: 'Tinte de cabello', price: 'Desde $40', duration: '60 min', description: 'Coloración con productos que cuidan tu cabello.', icon: 'mdi:palette' },
];

export const mockProfessionals: Professional[] = [
  { name: 'Carlos Méndez', photo: 'https://picsum.photos/seed/barber-team-1/400/500', specialties: ['Corte clásico', 'Barba'] },
  { name: 'Miguel Soto', photo: 'https://picsum.photos/seed/barber-team-2/400/500', specialties: ['Afeitado', 'Estilo moderno'] },
  { name: 'Antonio Reyes', photo: 'https://picsum.photos/seed/barber-team-3/400/500', specialties: ['Coloración', 'Peinado'] },
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
  'https://picsum.photos/seed/gallery-1/600/600',
  'https://picsum.photos/seed/gallery-2/600/600',
  'https://picsum.photos/seed/gallery-3/600/600',
  'https://picsum.photos/seed/gallery-4/600/600',
  'https://picsum.photos/seed/gallery-5/600/600',
  'https://picsum.photos/seed/gallery-6/600/600',
  'https://picsum.photos/seed/gallery-7/600/600',
  'https://picsum.photos/seed/gallery-8/600/600',
];
