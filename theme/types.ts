/**
 * Contrato de datos del theme barberias-aureo.
 * Solo props; sin consumo de APIs.
 */

export interface Company {
  name: string;
  logo?: string;
  address: string;
  phone: string;
  email: string;
  social?: SocialLink[];
  copyright?: string;
  /** Hero: título principal */
  heroTitle?: string;
  /** Hero: descripción corta */
  heroDescription?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface Appearance {
  primaryColor?: string;
  accentColor?: string;
  fontFamily?: string;
}

export interface Service {
  id?: string;
  name: string;
  price: string;
  duration: string;
  description?: string;
  icon?: string;
}

export interface ProfessionalSocialLink {
  name: string;
  url: string;
  icon?: string;
}

export interface Professional {
  id?: string;
  name: string;
  photo: string;
  specialties: string[];
  /** Contacto (teléfono/WhatsApp) para reservas */
  contact?: string;
  /** Redes sociales del profesional */
  socialLinks?: ProfessionalSocialLink[];
}

/** Disponibilidad por día para el calendario de reservas */
export type DayAvailability = 'past' | 'available' | 'few_slots' | 'full';

/** Slot de horario para reserva (por fecha) */
export interface TimeSlot {
  id: string;
  start: string;
  end: string;
  professionalIds: string[];
}

/** Datos del cliente en el formulario de reserva */
export interface BookingClientForm {
  fullName: string;
  rut: string;
  whatsapp: string;
  email?: string;
  comments?: string;
}

export interface ScheduleItem {
  day: string;
  open: string;
  close: string;
  closed?: boolean;
}

export interface ServiceSchedule {
  serviceId?: string;
  scheduleId?: string;
  /** Futura integración */
}

export interface Testimonial {
  id?: string;
  name: string;
  text: string;
  rating: number;
}

export interface Benefit {
  id?: string;
  icon: string;
  title: string;
  description: string;
}

export interface ThemeProps {
  company: Company;
  appearance?: Appearance;
  services: Service[];
  professionals: Professional[];
  schedules: ScheduleItem[];
  serviceSchedules?: ServiceSchedule[];
  /** Opcional: datos para Trust / Social proof */
  trust?: TrustData;
  /** Opcional: testimonios (mock o futuro CMS) */
  testimonials?: Testimonial[];
  /** Opcional: beneficios (mock o futuro CMS) */
  benefits?: Benefit[];
  /** Opcional: URLs galería (mock o futuro CMS) */
  galleryImages?: string[];
  /** Opcional: URL imagen hero */
  heroImage?: string;
  /** Opcional: URL imagen fondo sección horarios */
  scheduleBgImage?: string;
  /** Opcional: URL placeholder mapa/ubicación */
  mapImage?: string;
}

/** Trust / Social proof (puede venir de company o mocks) */
export interface TrustData {
  rating: number;
  ratingLabel?: string;
  clientsCount: string;
  yearsExperience: number | string;
}
