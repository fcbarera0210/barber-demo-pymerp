import React from 'react';
import { Icon } from '@iconify/react';
import type { TrustData } from '../types';

interface TrustSectionProps {
  trust: TrustData;
}

export function TrustSection({ trust }: TrustSectionProps) {
  const fullStars = Math.floor(trust.rating);
  const hasHalf = trust.rating - fullStars >= 0.5;

  return (
    <section className="barberias-aureo-trust py-8 sm:py-12 bg-black/60 border-y border-white/10">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16 text-center">
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5 text-red-600">
              {Array.from({ length: 5 }).map((_, i) => (
                <Icon key={i} icon={i < fullStars ? 'mdi:star' : i === fullStars && hasHalf ? 'mdi:star-half-full' : 'mdi:star-outline'} className="text-2xl" />
              ))}
            </div>
            <span className="text-white font-bold text-lg ml-2">{trust.ratingLabel ?? `${trust.rating} / 5`}</span>
          </div>
          <p className="text-gray-300 text-sm sm:text-base font-medium">{trust.clientsCount}</p>
          <p className="text-gray-300 text-sm sm:text-base font-medium">{trust.yearsExperience}</p>
        </div>
      </div>
    </section>
  );
}
