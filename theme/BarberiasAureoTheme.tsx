import React from 'react';
import type { ThemeProps } from './types';
import {
  mockTrust,
  mockTestimonials,
  mockBenefits,
  mockGalleryImages,
} from './mocks';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TrustSection } from './components/TrustSection';
import { ServicesSection } from './components/ServicesSection';
import { BenefitsSection } from './components/BenefitsSection';
import { GallerySection } from './components/GallerySection';
import { TeamSection } from './components/TeamSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { SchedulesSection } from './components/SchedulesSection';
import { LocationSection } from './components/LocationSection';
import { CTAFinalSection } from './components/CTAFinalSection';
import { FooterSection } from './components/FooterSection';

export function BarberiasAureoTheme(props: ThemeProps) {
  const {
    company,
    services,
    professionals,
    schedules,
    trust = mockTrust,
    testimonials = mockTestimonials,
    benefits = mockBenefits,
    galleryImages = mockGalleryImages,
  } = props;

  const handleReserve = () => {
    if (typeof window !== 'undefined') {
      window.alert('Reserva (mock): Próximamente podrás reservar aquí.');
    }
  };

  return (
    <div className="barberias-aureo bg-[#0f0f0f] text-white font-sans selection:bg-red-600" data-theme="barberias-aureo">
      <Navbar company={company} onReserve={handleReserve} />
      <HeroSection company={company} onReserve={handleReserve} />
      <TrustSection trust={trust} />
      <ServicesSection services={services} onReserve={handleReserve} />
      <BenefitsSection benefits={benefits} />
      <GallerySection images={galleryImages} />
      <TeamSection professionals={professionals} />
      <TestimonialsSection testimonials={testimonials} />
      <SchedulesSection schedules={schedules} />
      <LocationSection company={company} />
      <CTAFinalSection onReserve={handleReserve} />
      <FooterSection company={company} />
    </div>
  );
}

export default BarberiasAureoTheme;
