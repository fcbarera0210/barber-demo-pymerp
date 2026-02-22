import React from 'react';
import {
  BarberiasAureoTheme,
  mockCompany,
  mockAppearance,
  mockServices,
  mockProfessionals,
  mockSchedules,
  mockServiceSchedules,
  mockTrust,
  mockTestimonials,
  mockBenefits,
  mockGalleryImages,
} from './theme';

const App = () => (
  <BarberiasAureoTheme
    company={mockCompany}
    appearance={mockAppearance}
    services={mockServices}
    professionals={mockProfessionals}
    schedules={mockSchedules}
    serviceSchedules={mockServiceSchedules}
    trust={mockTrust}
    testimonials={mockTestimonials}
    benefits={mockBenefits}
    galleryImages={mockGalleryImages}
  />
);

export default App;
