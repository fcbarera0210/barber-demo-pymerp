import { useState, useCallback } from 'react';
import type { CSSProperties } from 'react';
import type { ThemeProps, Service } from './types';
import {
  mockTrust,
  mockTestimonials,
  mockBenefits,
  mockGalleryImages,
  MOCK_IMAGE_URLS,
} from './mocks';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TrustSection } from './components/TrustSection';
import { ServicesSection } from './components/ServicesSection';
import { BenefitsSection } from './components/BenefitsSection';
import { GallerySection } from './components/GallerySection';
import { TeamSection } from './components/TeamSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { LocationSection } from './components/LocationSection';
import { CTAFinalSection } from './components/CTAFinalSection';
import { FooterSection } from './components/FooterSection';
import { AccentColorMenu } from './components/AccentColorMenu';
import { BookingModal } from './components/BookingModal';

const ACCENT_STORAGE_KEY = 'barber-accent';
const DEFAULT_ACCENT = '#dc2626';

function getInitialAccent(appearanceAccent?: string): string {
  if (typeof window === 'undefined') return appearanceAccent ?? DEFAULT_ACCENT;
  const stored = localStorage.getItem(ACCENT_STORAGE_KEY);
  if (stored) return stored;
  return appearanceAccent ?? DEFAULT_ACCENT;
}

export function BarberiasAureoTheme(props: ThemeProps) {
  const {
    company,
    services,
    professionals,
    schedules,
    appearance,
    trust = mockTrust,
    testimonials = mockTestimonials,
    benefits = mockBenefits,
    galleryImages = mockGalleryImages,
    heroImage = MOCK_IMAGE_URLS.hero,
    scheduleBgImage = MOCK_IMAGE_URLS.scheduleBg,
    mapImage = MOCK_IMAGE_URLS.mapPlaceholder,
  } = props;

  const [accentColor, setAccentColorState] = useState(() =>
    getInitialAccent(appearance?.accentColor)
  );
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingService, setBookingService] = useState<Service | null>(null);

  const setAccentColor = useCallback((color: string) => {
    setAccentColorState(color);
    if (typeof window !== 'undefined') {
      localStorage.setItem(ACCENT_STORAGE_KEY, color);
    }
  }, []);

  const handleReserve = useCallback((service?: Service) => {
    setBookingService(service ?? null);
    setBookingModalOpen(true);
  }, []);

  return (
    <div
      className="barberias-aureo bg-[#0f0f0f] text-white font-sans selection:bg-accent"
      data-theme="barberias-aureo"
      style={{ '--accent': accentColor, '--accent-hover': accentColor } as CSSProperties}
    >
      <Navbar company={company} onReserve={handleReserve} />
      <HeroSection company={company} heroImage={heroImage} onVerServicios={() => document.querySelector('#servicios')?.scrollIntoView({ behavior: 'smooth' })} />
      <TrustSection trust={trust} />
      <ServicesSection services={services} onReserve={handleReserve} />
      <BenefitsSection benefits={benefits} />
      <GallerySection images={galleryImages} />
      <TeamSection professionals={professionals} />
      <TestimonialsSection testimonials={testimonials} />
      <LocationSection
        company={company}
        mapImage={mapImage}
        schedules={schedules}
        scheduleBgImage={scheduleBgImage}
      />
      <CTAFinalSection onReserve={handleReserve} />
      <FooterSection company={company} />
      <AccentColorMenu accentColor={accentColor} onAccentChange={setAccentColor} />
      <BookingModal
        open={bookingModalOpen}
        onClose={() => {
          setBookingModalOpen(false);
          setBookingService(null);
        }}
        service={bookingService}
        professionals={professionals}
        company={company}
      />
    </div>
  );
}

export default BarberiasAureoTheme;
