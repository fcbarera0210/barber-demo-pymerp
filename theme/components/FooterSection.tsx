import React from 'react';
import { Icon } from '@iconify/react';
import type { Company } from '../types';

interface FooterSectionProps {
  company: Company;
}

export function FooterSection({ company }: FooterSectionProps) {
  return (
    <footer id="footer" className="barberias-aureo-footer bg-black py-16 sm:py-20 border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-10 mb-12">
          <div className="flex items-center gap-2">
            {company.logo ? (
              <img src={company.logo} alt={company.name} className="h-8 w-auto" />
            ) : (
              <div className="w-8 h-8 bg-red-600 flex items-center justify-center transform -skew-x-12">
                <span className="font-black italic text-xl text-white">{company.name.charAt(0)}</span>
              </div>
            )}
            <span className="text-xl font-bold tracking-widest text-white">{company.name}</span>
          </div>
          {company.social && company.social.length > 0 && (
            <div className="flex gap-4">
              {company.social.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-zinc-900 text-white hover:bg-red-600 transition-colors rounded-sm"
                  aria-label={s.name}
                >
                  <Icon icon={s.icon} className="text-xl" />
                </a>
              ))}
            </div>
          )}
        </div>
        <div className="border-t border-white/5 pt-8 text-center text-xs sm:text-[10px] tracking-[0.2em] text-gray-500 uppercase">
          {company.copyright ?? `© ${new Date().getFullYear()} ${company.name}. Todos los derechos reservados.`}
        </div>
      </div>
    </footer>
  );
}
