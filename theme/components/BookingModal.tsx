import { useState, useEffect, useCallback, useRef } from 'react';
import { Icon } from '@iconify/react';
import type { Service, Professional, Company, TimeSlot, BookingClientForm } from '../types';
import { getDayAvailability, getTimeSlotsForDate } from '../mocks';

export type BookingStep = 1 | 2 | 3 | 4;

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  service: Service | null;
  professionals: Professional[];
  company: Company;
}

const initialForm: BookingClientForm = {
  fullName: '',
  rut: '',
  whatsapp: '',
  email: '',
  comments: '',
};

export function BookingModal({
  open,
  onClose,
  service,
  professionals,
  company,
}: BookingModalProps) {
  const [step, setStep] = useState<BookingStep>(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [clientForm, setClientForm] = useState<BookingClientForm>(initialForm);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof BookingClientForm, string>>>({});
  const [viewMonth, setViewMonth] = useState(() => new Date());
  const modalRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);

  const resetState = useCallback(() => {
    setStep(1);
    setSelectedDate(null);
    setSelectedSlot(null);
    setClientForm(initialForm);
    setFormErrors({});
    setViewMonth(new Date());
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  function getCalendarDays(year: number, month: number): { date: Date; isCurrentMonth: boolean }[] {
    const first = new Date(year, month, 1);
    const last = new Date(year, month + 1, 0);
    const startDay = first.getDay();
    const startOffset = startDay === 0 ? 6 : startDay - 1;
    const days: { date: Date; isCurrentMonth: boolean }[] = [];
    const prevMonth = new Date(year, month, 0);
    const prevCount = prevMonth.getDate();
    for (let i = 0; i < startOffset; i++) {
      const d = new Date(year, month - 1, prevCount - startOffset + i + 1);
      days.push({ date: d, isCurrentMonth: false });
    }
    for (let d = 1; d <= last.getDate(); d++) {
      days.push({ date: new Date(year, month, d), isCurrentMonth: true });
    }
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
    }
    return days;
  }

  const isSameDay = (a: Date, b: Date | null) =>
    b != null &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const handleFilterHoy = () => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    setViewMonth(new Date(d.getFullYear(), d.getMonth(), 1));
    if (getDayAvailability(d) !== 'past') setSelectedDate(d);
  };

  const handleFilterManana = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    d.setHours(0, 0, 0, 0);
    setViewMonth(new Date(d.getFullYear(), d.getMonth(), 1));
    if (getDayAvailability(d) !== 'past') setSelectedDate(d);
  };

  const handleFilterProximaSemana = () => {
    const d = new Date();
    const dayOfWeek = d.getDay();
    const daysUntilNextMonday = dayOfWeek === 0 ? 1 : dayOfWeek === 6 ? 2 : 8 - dayOfWeek;
    d.setDate(d.getDate() + daysUntilNextMonday);
    d.setHours(0, 0, 0, 0);
    setViewMonth(new Date(d.getFullYear(), d.getMonth(), 1));
    if (getDayAvailability(d) !== 'past') setSelectedDate(d);
  };

  useEffect(() => {
    if (open) {
      resetState();
    }
  }, [open, resetState]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !modalRef.current) return;
      const root = modalRef.current;
      const focusable = root.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first && last) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last && first) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (open && firstFocusableRef.current) {
      firstFocusableRef.current.focus();
    }
  }, [open, step]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const handleContinue = () => {
    if (step === 1) {
      if (!selectedDate) return;
      setStep(2);
      return;
    }
    if (step === 2) {
      if (!selectedSlot) return;
      setStep(3);
      return;
    }
    if (step === 3) {
      const errors: Partial<Record<keyof BookingClientForm, string>> = {};
      if (!clientForm.fullName.trim()) errors.fullName = 'Requerido';
      if (!clientForm.rut.trim()) errors.rut = 'Requerido';
      if (!clientForm.whatsapp.trim()) errors.whatsapp = 'Requerido';
      setFormErrors(errors);
      if (Object.keys(errors).length > 0) return;
      setStep(4);
      return;
    }
  };

  const canContinue =
    (step === 1 && selectedDate !== null) ||
    (step === 2 && selectedSlot !== null) ||
    step === 3 ||
    step === 4;

  const footerLabel =
    step === 1 || step === 2
      ? 'Continuar'
      : step === 3
        ? 'Reservar'
        : null;

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <div
        ref={modalRef}
        className="flex flex-col w-full max-w-lg max-h-[90vh] bg-zinc-900 border border-white/10 rounded-lg shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        aria-describedby={step === 1 ? 'booking-step-1' : step === 2 ? 'booking-step-2' : step === 3 ? 'booking-step-3' : 'booking-step-4'}
      >
        {/* Header fijo */}
        <header className="shrink-0 border-b border-white/10 p-4 space-y-2">
          <h2 id="booking-modal-title" className="text-lg font-bold text-white uppercase tracking-wide">
            Agendar servicio
          </h2>
          {service && (
            <>
              <p className="text-white font-medium">{service.name}</p>
              <div className="flex gap-4 text-sm text-gray-400">
                <span>{service.duration}</span>
                <span>{service.price}</span>
              </div>
            </>
          )}
          <div className="flex gap-2 pt-2">
            {([1, 2, 3, 4] as const).map((s) => (
              <div
                key={s}
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                  step === s
                    ? 'bg-accent text-white ring-2 ring-accent ring-offset-2 ring-offset-zinc-900'
                    : 'bg-zinc-800 text-gray-400'
                }`}
              >
                {s}
              </div>
            ))}
          </div>
        </header>

        {/* Body con scroll */}
        <div className="flex-1 overflow-y-auto p-4 min-h-0">
          {step === 1 && (
            <div id="booking-step-1" className="space-y-4">
              <h3 className="text-white font-semibold">Selecciona una fecha</h3>
              <div className="flex gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={handleFilterHoy}
                  className="px-3 py-1.5 text-sm rounded border border-white/20 text-gray-300 hover:bg-white/10"
                >
                  Hoy
                </button>
                <button
                  type="button"
                  onClick={handleFilterManana}
                  className="px-3 py-1.5 text-sm rounded border border-white/20 text-gray-300 hover:bg-white/10"
                >
                  Mañana
                </button>
                <button
                  type="button"
                  onClick={handleFilterProximaSemana}
                  className="px-3 py-1.5 text-sm rounded border border-white/20 text-gray-300 hover:bg-white/10"
                >
                  Próxima semana
                </button>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center">
                {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((day) => (
                  <div key={day} className="text-xs text-gray-500 py-1">
                    {day}
                  </div>
                ))}
                {getCalendarDays(viewMonth.getFullYear(), viewMonth.getMonth()).map(({ date, isCurrentMonth }) => {
                  const availability = getDayAvailability(date);
                  const isPast = date.getTime() < today.getTime();
                  const selected = isSameDay(date, selectedDate);
                  const canSelect = !isPast && availability !== 'full';
                  const bg =
                    isPast || availability === 'past'
                      ? 'bg-gray-700/50 text-gray-500'
                      : availability === 'available'
                        ? 'bg-green-600/30 text-green-200'
                        : availability === 'few_slots'
                          ? 'bg-amber-500/30 text-amber-200'
                          : 'bg-red-600/30 text-red-200';
                  return (
                    <button
                      key={date.getTime()}
                      type="button"
                      disabled={!canSelect}
                      onClick={() => canSelect && setSelectedDate(new Date(date.getTime()))}
                      className={`min-h-[36px] rounded text-sm font-medium transition ${
                        !isCurrentMonth ? 'opacity-40' : ''
                      } ${bg} ${selected ? 'ring-2 ring-accent ring-offset-2 ring-offset-zinc-900' : ''} ${
                        canSelect ? 'hover:opacity-90 cursor-pointer' : 'cursor-default'
                      }`}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          {step === 2 && selectedDate && (
            <div id="booking-step-2" className="space-y-4">
              <h3 className="text-white font-semibold">Selecciona un horario</h3>
              <p className="text-gray-400 text-sm">
                {selectedDate.toLocaleDateString('es-CL', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
              <div className="grid grid-cols-4 gap-2">
                {getTimeSlotsForDate(selectedDate).map((slot) => {
                  const isSelected = selectedSlot?.id === slot.id;
                  return (
                    <button
                      key={slot.id}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-3 rounded border text-left transition ${
                        isSelected
                          ? 'border-accent bg-accent/20 ring-2 ring-accent'
                          : 'border-white/20 bg-zinc-800/50 hover:border-white/40'
                      }`}
                    >
                      <div className="text-white font-medium text-sm">
                        {slot.start} – {slot.end}
                      </div>
                      <div className="text-gray-400 text-xs mt-1">
                        {slot.professionalIds.length} profesional
                        {slot.professionalIds.length !== 1 ? 'es' : ''} disponible
                        {slot.professionalIds.length !== 1 ? 's' : ''}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          {step === 3 && selectedDate && selectedSlot && (
            <div id="booking-step-3" className="space-y-6">
              <h3 className="text-white font-semibold">Resumen de tu reserva</h3>
              <div className="text-sm text-gray-400 space-y-1">
                <p>
                  Fecha:{' '}
                  {selectedDate.toLocaleDateString('es-CL', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
                <p>
                  Horario: {selectedSlot.start} – {selectedSlot.end}
                </p>
              </div>
              <div>
                <p className="text-white font-medium mb-2">Profesionales disponibles</p>
                <div className="space-y-2">
                  {selectedSlot.professionalIds
                    .map((id) => professionals.find((p) => p.id === id))
                    .filter(Boolean)
                    .map((pro) => (
                      <div
                        key={pro!.id}
                        className="p-3 rounded border border-white/10 bg-zinc-800/50 flex flex-wrap items-center justify-between gap-2"
                      >
                        <span className="text-white font-medium">{pro!.name}</span>
                        <div className="flex items-center gap-2 flex-wrap">
                          {pro!.socialLinks?.map((link) => (
                            <a
                              key={link.name}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-accent"
                              aria-label={link.name}
                            >
                              <Icon icon={link.icon ?? 'mdi:link'} className="text-lg" />
                            </a>
                          ))}
                          {pro!.contact && (
                            <a
                              href={`https://wa.me/${pro!.contact.replace(/\D/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-green-400 flex items-center gap-1 text-sm"
                            >
                              <Icon icon="mdi:whatsapp" /> {pro!.contact}
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-white font-medium">Datos del cliente</p>
                <div className="grid gap-3">
                  <div>
                    <label htmlFor="booking-fullName" className="block text-sm text-gray-400 mb-1">
                      Nombre completo *
                    </label>
                    <input
                      id="booking-fullName"
                      type="text"
                      value={clientForm.fullName}
                      onChange={(e) => setClientForm((f) => ({ ...f, fullName: e.target.value }))}
                      className="w-full px-3 py-2 bg-zinc-800 border border-white/20 rounded text-white placeholder-gray-500 focus:border-accent focus:ring-1 focus:ring-accent"
                      placeholder="Nombre completo"
                    />
                    {formErrors.fullName && (
                      <p className="text-red-400 text-xs mt-1">{formErrors.fullName}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="booking-rut" className="block text-sm text-gray-400 mb-1">
                      RUT *
                    </label>
                    <input
                      id="booking-rut"
                      type="text"
                      value={clientForm.rut}
                      onChange={(e) => setClientForm((f) => ({ ...f, rut: e.target.value }))}
                      className="w-full px-3 py-2 bg-zinc-800 border border-white/20 rounded text-white placeholder-gray-500 focus:border-accent focus:ring-1 focus:ring-accent"
                      placeholder="12.345.678-9"
                    />
                    {formErrors.rut && <p className="text-red-400 text-xs mt-1">{formErrors.rut}</p>}
                  </div>
                  <div>
                    <label htmlFor="booking-whatsapp" className="block text-sm text-gray-400 mb-1">
                      WhatsApp *
                    </label>
                    <input
                      id="booking-whatsapp"
                      type="tel"
                      value={clientForm.whatsapp}
                      onChange={(e) => setClientForm((f) => ({ ...f, whatsapp: e.target.value }))}
                      className="w-full px-3 py-2 bg-zinc-800 border border-white/20 rounded text-white placeholder-gray-500 focus:border-accent focus:ring-1 focus:ring-accent"
                      placeholder="+56 9 1234 5678"
                    />
                    {formErrors.whatsapp && (
                      <p className="text-red-400 text-xs mt-1">{formErrors.whatsapp}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="booking-email" className="block text-sm text-gray-400 mb-1">
                      Correo (opcional)
                    </label>
                    <input
                      id="booking-email"
                      type="email"
                      value={clientForm.email ?? ''}
                      onChange={(e) => setClientForm((f) => ({ ...f, email: e.target.value }))}
                      className="w-full px-3 py-2 bg-zinc-800 border border-white/20 rounded text-white placeholder-gray-500 focus:border-accent focus:ring-1 focus:ring-accent"
                      placeholder="correo@ejemplo.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="booking-comments" className="block text-sm text-gray-400 mb-1">
                      Comentarios o solicitudes (opcional)
                    </label>
                    <textarea
                      id="booking-comments"
                      value={clientForm.comments ?? ''}
                      onChange={(e) => setClientForm((f) => ({ ...f, comments: e.target.value }))}
                      rows={2}
                      className="w-full px-3 py-2 bg-zinc-800 border border-white/20 rounded text-white placeholder-gray-500 focus:border-accent focus:ring-1 focus:ring-accent resize-none"
                      placeholder="Indicaciones especiales..."
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {step === 4 && selectedDate && selectedSlot && (
            <div id="booking-step-4" className="space-y-6">
              <div className="text-center">
                <p className="text-accent font-bold text-lg uppercase tracking-wide">Cita reservada</p>
                <p className="text-gray-400 text-sm mt-1">Tu reserva ha sido confirmada</p>
              </div>
              <div className="rounded border border-white/10 bg-zinc-800/50 p-4 space-y-3 text-sm">
                <p className="text-white font-medium">{service?.name ?? 'Servicio'}</p>
                <p className="text-gray-400">
                  {selectedDate.toLocaleDateString('es-CL', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
                <p className="text-gray-400">
                  Horario: {selectedSlot.start} – {selectedSlot.end}
                </p>
                <p className="text-gray-400">
                  Cliente: {clientForm.fullName} · {clientForm.whatsapp}
                </p>
                <p className="text-gray-400">
                  Profesionales:{' '}
                  {selectedSlot.professionalIds
                    .map((id) => professionals.find((p) => p.id === id)?.name)
                    .filter(Boolean)
                    .join(', ')}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer fijo */}
        <footer className="shrink-0 border-t border-white/10 p-4 flex gap-3 justify-end">
          {step === 4 ? (
            <>
              <a
                href={`https://wa.me/${(company.phone || '').replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-4 py-2.5 text-sm font-bold rounded-sm"
              >
                <Icon icon="mdi:whatsapp" className="text-xl" />
                Contactar al local por WhatsApp
              </a>
              <button
                type="button"
                onClick={onClose}
                className="btn-accent bg-accent text-white px-4 py-2.5 text-sm font-bold rounded-sm"
              >
                Volver al home
              </button>
            </>
          ) : (
            <>
              <button
                ref={step === 1 ? firstFocusableRef : undefined}
                type="button"
                onClick={handleCancel}
                className="btn-accent px-4 py-2.5 text-sm font-medium text-gray-300 hover:text-white border border-white/20 rounded-sm"
              >
                Cancelar
              </button>
              {footerLabel && (
                <button
                  type="button"
                  onClick={handleContinue}
                  disabled={step <= 2 && !canContinue}
                  className="btn-accent bg-accent text-white px-4 py-2.5 text-sm font-bold rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {footerLabel}
                </button>
              )}
            </>
          )}
        </footer>
      </div>
    </div>
  );
}
